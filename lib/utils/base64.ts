export interface TextResult {
  success: boolean;
  output?: string;
  error?: string;
}

export function encodeBase64(input: string): TextResult {
  if (!input) return { success: false, error: "Please enter text to encode." };
  try {
    const bytes = new TextEncoder().encode(input);
    let binary = "";
    bytes.forEach((byte) => {
      binary += String.fromCharCode(byte);
    });
    return { success: true, output: btoa(binary) };
  } catch {
    return { success: false, error: "Unable to encode this text." };
  }
}

export function decodeBase64(input: string): TextResult {
  if (!input) return { success: false, error: "Please enter Base64 text to decode." };
  try {
    const binary = atob(input.trim());
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return { success: true, output: new TextDecoder().decode(bytes) };
  } catch {
    return {
      success: false,
      error: "Invalid Base64 string. Check for missing characters or padding.",
    };
  }
}
