export interface JwtDecodeResult {
  success: boolean;
  header?: Record<string, unknown>;
  payload?: Record<string, unknown>;
  signature?: string;
  error?: string;
}

function base64UrlDecode(segment: string): string {
  const normalized = segment.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(
    normalized.length + ((4 - (normalized.length % 4)) % 4),
    "="
  );
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new TextDecoder().decode(bytes);
}

/**
 * Decodes a JWT's header and payload locally in the browser.
 * IMPORTANT: this does NOT verify the token's signature. It only decodes
 * the Base64URL-encoded segments.
 */
export function decodeJwt(token: string): JwtDecodeResult {
  if (!token || !token.trim()) {
    return { success: false, error: "Please paste a JWT to decode." };
  }

  const parts = token.trim().split(".");
  if (parts.length !== 3) {
    return {
      success: false,
      error: "That doesn't look like a valid JWT. Expected 3 dot-separated parts.",
    };
  }

  const [headerPart, payloadPart, signaturePart] = parts;

  try {
    const header = JSON.parse(base64UrlDecode(headerPart));
    const payload = JSON.parse(base64UrlDecode(payloadPart));
    return { success: true, header, payload, signature: signaturePart };
  } catch {
    return {
      success: false,
      error: "Could not decode this token. Make sure it's a valid JWT.",
    };
  }
}
