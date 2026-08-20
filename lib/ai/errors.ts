export class AiError extends Error {
  code: string;
  status: number;

  constructor(code: string, message: string, status: number = 500) {
    super(message);
    this.name = "AiError";
    this.code = code;
    this.status = status;
  }
}

export const AiErrors = {
  invalidInput: (message = "Please provide valid input.") =>
    new AiError("INVALID_INPUT", message, 400),
  inputTooLong: (max: number) =>
    new AiError("INPUT_TOO_LONG", `Input is too long. Please keep it under ${max} characters.`, 400),
  unknownTool: () => new AiError("UNKNOWN_TOOL", "This tool is not available.", 400),
  rateLimited: () =>
    new AiError(
      "RATE_LIMITED",
      "You've reached the current usage limit. Please try again later.",
      429
    ),
  unavailable: () =>
    new AiError(
      "AI_UNAVAILABLE",
      "The AI service is temporarily unavailable. Please try again.",
      503
    ),
  timeout: () =>
    new AiError("AI_TIMEOUT", "The request took too long. Please try again.", 504),
  misconfigured: () =>
    new AiError(
      "AI_MISCONFIGURED",
      "AI features are not configured on this server yet.",
      503
    ),
};
