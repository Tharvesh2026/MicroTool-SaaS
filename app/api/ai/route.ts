import { NextRequest, NextResponse } from "next/server";
import { getAiToolDefinition } from "@/lib/ai/prompts";
import { generateAIResponse } from "@/lib/ai/openrouter";
import { AiError, AiErrors } from "@/lib/ai/errors";
import { checkRateLimit } from "@/lib/ai/rate-limit";
import type { AiApiResponse } from "@/lib/ai/types";

export const runtime = "nodejs";

function getClientKey(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : "unknown";
  return ip;
}

function errorResponse(err: unknown): NextResponse<AiApiResponse> {
  if (err instanceof AiError) {
    return NextResponse.json(
      { success: false, error: { code: err.code, message: err.message } },
      { status: err.status }
    );
  }
  // Never leak raw/internal error details to the client.
  const fallback = AiErrors.unavailable();
  return NextResponse.json(
    { success: false, error: { code: fallback.code, message: fallback.message } },
    { status: fallback.status }
  );
}

export async function POST(req: NextRequest): Promise<NextResponse<AiApiResponse>> {
  try {
    const clientKey = getClientKey(req);
    const rateLimit = checkRateLimit(clientKey);
    if (!rateLimit.allowed) {
      throw AiErrors.rateLimited();
    }

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      throw AiErrors.invalidInput("Request body must be valid JSON.");
    }

    if (
      typeof body !== "object" ||
      body === null ||
      !("tool" in body) ||
      typeof (body as Record<string, unknown>).tool !== "string"
    ) {
      throw AiErrors.invalidInput("Missing required 'tool' field.");
    }

    // Reject any attempt to pass a custom system prompt from the client.
    if ("systemPrompt" in (body as Record<string, unknown>)) {
      throw AiErrors.invalidInput("System prompts cannot be set by the client.");
    }

    const { tool, input } = body as { tool: string; input?: unknown };
    const definition = getAiToolDefinition(tool);
    if (!definition) {
      throw AiErrors.unknownTool();
    }

    const parsedInput = definition.inputSchema.safeParse(input ?? {});
    if (!parsedInput.success) {
      const firstIssue = parsedInput.error.issues[0];
      throw AiErrors.invalidInput(firstIssue?.message ?? "Invalid input.");
    }

    const userPrompt = definition.buildUserPrompt(parsedInput.data);
    const text = await generateAIResponse(definition.systemPrompt, userPrompt);

    return NextResponse.json({ success: true, data: { text } });
  } catch (err) {
    return errorResponse(err);
  }
}
