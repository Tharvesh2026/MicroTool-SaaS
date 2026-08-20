import type { TextResult } from "./base64";

export function encodeUrl(input: string): TextResult {
  if (!input) return { success: false, error: "Please enter text to encode." };
  try {
    return { success: true, output: encodeURIComponent(input) };
  } catch {
    return { success: false, error: "Unable to encode this text." };
  }
}

export function decodeUrl(input: string): TextResult {
  if (!input) return { success: false, error: "Please enter a URL-encoded string to decode." };
  try {
    return { success: true, output: decodeURIComponent(input) };
  } catch {
    return { success: false, error: "Invalid URL-encoded string." };
  }
}
