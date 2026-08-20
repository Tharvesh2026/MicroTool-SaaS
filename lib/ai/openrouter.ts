import "server-only";
import { AiErrors } from "./errors";

const OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1";
const DEFAULT_MODEL = "google/gemma-4-26b-a4b-it:free";
const REQUEST_TIMEOUT_MS = 30_000;
const MAX_INPUT_LENGTH = 2000;

export const MAX_AI_INPUT_LENGTH = MAX_INPUT_LENGTH;

interface OpenRouterMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface OpenRouterChoice {
  message?: { content?: string };
}

interface OpenRouterResponse {
  choices?: OpenRouterChoice[];
  error?: { message?: string };
}

async function callModel(model: string, messages: OpenRouterMessage[]): Promise<string> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw AiErrors.misconfigured();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  let response: Response;
  try {
    response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": siteUrl,
        "X-OpenRouter-Title": "CreatorDevTools",
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.7,
        max_tokens: 800,
      }),
      signal: controller.signal,
    });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw AiErrors.timeout();
    }
    // Network-level failure talking to OpenRouter — never leak the raw error.
    throw AiErrors.unavailable();
  } finally {
    clearTimeout(timeout);
  }

  if (response.status === 429) {
    throw AiErrors.rateLimited();
  }

  if (!response.ok) {
    throw AiErrors.unavailable();
  }

  let data: OpenRouterResponse;
  try {
    data = await response.json();
  } catch {
    throw AiErrors.unavailable();
  }

  const text = data.choices?.[0]?.message?.content?.trim();
  if (!text) {
    throw AiErrors.unavailable();
  }

  return text;
}

/**
 * The single entry point for all OpenRouter requests in the application.
 * Do not call the OpenRouter API from anywhere else.
 */
export async function generateAIResponse(
  systemPrompt: string,
  userPrompt: string
): Promise<string> {
  if (!userPrompt || userPrompt.trim().length === 0) {
    throw AiErrors.invalidInput();
  }
  if (userPrompt.length > MAX_INPUT_LENGTH) {
    throw AiErrors.inputTooLong(MAX_INPUT_LENGTH);
  }

  const model = process.env.OPENROUTER_MODEL || DEFAULT_MODEL;
  const fallbackModel = process.env.OPENROUTER_FALLBACK_MODEL;

  const messages: OpenRouterMessage[] = [
    { role: "system", content: systemPrompt },
    { role: "user", content: userPrompt },
  ];

  try {
    return await callModel(model, messages);
  } catch (err) {
    // Only fall back if a fallback model was explicitly configured. We never
    // silently switch to a paid model to protect the site owner from
    // unexpected costs.
    if (fallbackModel && err instanceof Error && "code" in err) {
      const code = (err as { code: string }).code;
      if (code === "AI_UNAVAILABLE" || code === "AI_TIMEOUT") {
        return await callModel(fallbackModel, messages);
      }
    }
    throw err;
  }
}
