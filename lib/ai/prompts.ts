import { z } from "zod";
import type { AiToolId } from "./types";

const topic = z.string().trim().min(2, "Please enter at least 2 characters.").max(300);
const longText = z.string().trim().min(2, "Please enter at least 2 characters.").max(2000);
const optionalText = z.string().trim().max(500).optional().default("");

export interface AiToolDefinition {
  systemPrompt: string;
  inputSchema: z.ZodType<Record<string, string>>;
  buildUserPrompt: (input: Record<string, string>) => string;
}

export const AI_TOOL_DEFINITIONS: Record<AiToolId, AiToolDefinition> = {
  "youtube-title-generator": {
    systemPrompt:
      "You are an expert YouTube content strategist. Generate 8 compelling but truthful video title options based on the user's topic. Do not use deceptive clickbait, ALL CAPS spam, or false claims. Return the titles as a plain numbered list, nothing else.",
    inputSchema: z.object({ topic }),
    buildUserPrompt: (input) => `Video topic: ${input.topic}`,
  },
  "ai-youtube-title-generator": {
    systemPrompt:
      "You are an expert YouTube content strategist. Generate 8 compelling but truthful video title options based on the user's topic. Do not use deceptive clickbait, ALL CAPS spam, or false claims. Return the titles as a plain numbered list, nothing else.",
    inputSchema: z.object({ topic }),
    buildUserPrompt: (input) => `Video topic: ${input.topic}`,
  },
  "youtube-description-generator": {
    systemPrompt:
      "You are an expert YouTube content strategist. Write a clear, engaging, SEO-friendly video description (150-300 words) based on the user's topic and key points. Include a short hook, a summary of what viewers will learn, and a call to action. Do not fabricate facts about the video.",
    inputSchema: z.object({ topic, details: optionalText }),
    buildUserPrompt: (input) =>
      `Video topic: ${input.topic}${input.details ? `\nKey points to include: ${input.details}` : ""}`,
  },
  "youtube-tags-generator": {
    systemPrompt:
      "You are a YouTube SEO specialist. Generate a list of 15-20 relevant, non-spammy search tags/keywords for the given video topic. Return them as a comma-separated list only.",
    inputSchema: z.object({ topic }),
    buildUserPrompt: (input) => `Video topic: ${input.topic}`,
  },
  "social-media-caption-generator": {
    systemPrompt:
      "You are a social media copywriter. Write 5 short, engaging caption options for the given topic and platform. Keep each caption authentic and free of misleading claims. Return them as a numbered list.",
    inputSchema: z.object({ topic, details: optionalText }),
    buildUserPrompt: (input) =>
      `Topic/post subject: ${input.topic}${input.details ? `\nPlatform or tone: ${input.details}` : ""}`,
  },
  "ai-social-caption-generator": {
    systemPrompt:
      "You are a social media copywriter. Write 5 short, engaging caption options for the given topic and platform. Keep each caption authentic and free of misleading claims. Return them as a numbered list.",
    inputSchema: z.object({ topic, details: optionalText }),
    buildUserPrompt: (input) =>
      `Topic/post subject: ${input.topic}${input.details ? `\nPlatform or tone: ${input.details}` : ""}`,
  },
  "content-idea-generator": {
    systemPrompt:
      "You are a content strategy assistant. Generate 10 original content ideas for the given niche or topic. For each idea, give a short title and a one-sentence angle. Return as a numbered list.",
    inputSchema: z.object({ topic }),
    buildUserPrompt: (input) => `Niche or topic: ${input.topic}`,
  },
  "ai-content-ideas": {
    systemPrompt:
      "You are a content strategy assistant. Generate 10 original content ideas for the given niche or topic. For each idea, give a short title and a one-sentence angle. Return as a numbered list.",
    inputSchema: z.object({ topic }),
    buildUserPrompt: (input) => `Niche or topic: ${input.topic}`,
  },
  "blog-outline-generator": {
    systemPrompt:
      "You are an experienced content editor. Create a clear, well-structured blog post outline (title, introduction bullet, H2/H3 sections with brief notes, and a conclusion bullet) for the user's topic. Keep it practical and genuinely useful, not generic filler.",
    inputSchema: z.object({ topic }),
    buildUserPrompt: (input) => `Blog post topic: ${input.topic}`,
  },
  "ai-blog-outline": {
    systemPrompt:
      "You are an experienced content editor. Create a clear, well-structured blog post outline (title, introduction bullet, H2/H3 sections with brief notes, and a conclusion bullet) for the user's topic. Keep it practical and genuinely useful, not generic filler.",
    inputSchema: z.object({ topic }),
    buildUserPrompt: (input) => `Blog post topic: ${input.topic}`,
  },
  "instagram-caption-generator": {
    systemPrompt:
      "You are a social media copywriter specializing in Instagram. Write 5 caption options matching the given topic and mood, each under 150 characters plus optional relevant hashtags. Return as a numbered list.",
    inputSchema: z.object({ topic, details: optionalText }),
    buildUserPrompt: (input) =>
      `Post topic: ${input.topic}${input.details ? `\nMood/style: ${input.details}` : ""}`,
  },
  "linkedin-post-generator": {
    systemPrompt:
      "You are a professional LinkedIn ghostwriter. Write a single well-structured LinkedIn post (150-250 words) on the given topic, in a professional but human tone, with a clear takeaway. Do not fabricate personal experience or statistics.",
    inputSchema: z.object({ topic, details: optionalText }),
    buildUserPrompt: (input) =>
      `Post topic: ${input.topic}${input.details ? `\nKey points: ${input.details}` : ""}`,
  },
  "hashtag-generator": {
    systemPrompt:
      "You are a social media hashtag specialist. Generate 20 relevant, non-spammy hashtags for the given topic, mixing broad and niche tags. Return as a space-separated list starting with #.",
    inputSchema: z.object({ topic }),
    buildUserPrompt: (input) => `Topic: ${input.topic}`,
  },
  "ai-prompt-generator": {
    systemPrompt:
      "You are an expert prompt engineer. Given a short description of a goal, write one clear, detailed, well-structured prompt someone could paste into an AI assistant to accomplish that goal. Include relevant context, constraints, and desired output format. Return only the prompt text.",
    inputSchema: z.object({ topic }),
    buildUserPrompt: (input) => `Goal: ${input.topic}`,
  },
  "ai-prompt-optimizer": {
    systemPrompt:
      "You are an expert prompt engineer. Improve the clarity, specificity, constraints, output format, and context of the user's prompt while preserving their intended goal. Return the improved prompt, followed by a short bullet list explaining the key changes you made.",
    inputSchema: z.object({ topic: longText }),
    buildUserPrompt: (input) => `Original prompt:\n${input.topic}`,
  },
  "ai-seo-meta-generator": {
    systemPrompt:
      "You are an SEO copywriting assistant. Generate a concise, useful meta title (under 60 characters) and meta description (under 160 characters) for the given page topic. Do not make unsupported claims. Return exactly two labeled lines: 'Meta Title:' and 'Meta Description:'.",
    inputSchema: z.object({ topic, details: optionalText }),
    buildUserPrompt: (input) =>
      `Page topic: ${input.topic}${input.details ? `\nTarget keyword: ${input.details}` : ""}`,
  },
};

export function getAiToolDefinition(tool: string): AiToolDefinition | undefined {
  return AI_TOOL_DEFINITIONS[tool as AiToolId];
}
