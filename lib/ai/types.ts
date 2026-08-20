export type AiToolId =
  | "youtube-title-generator"
  | "youtube-description-generator"
  | "youtube-tags-generator"
  | "social-media-caption-generator"
  | "content-idea-generator"
  | "blog-outline-generator"
  | "instagram-caption-generator"
  | "linkedin-post-generator"
  | "hashtag-generator"
  | "ai-prompt-generator"
  | "ai-prompt-optimizer"
  | "ai-blog-outline"
  | "ai-content-ideas"
  | "ai-seo-meta-generator"
  | "ai-youtube-title-generator"
  | "ai-social-caption-generator";

export interface AiRequestBody {
  tool: AiToolId;
  input: Record<string, string>;
}

export interface AiSuccessResponse {
  success: true;
  data: {
    text: string;
  };
}

export interface AiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
  };
}

export type AiApiResponse = AiSuccessResponse | AiErrorResponse;
