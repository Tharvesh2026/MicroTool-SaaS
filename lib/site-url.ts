const FALLBACK_SITE_URL = "http://localhost:3000";

/**
 * Resolves the site's base URL from NEXT_PUBLIC_SITE_URL, falling back to a
 * safe default if the variable is unset, empty, or not a valid absolute URL
 * (e.g. accidentally set to a placeholder like "#" in a hosting dashboard).
 * This prevents `new URL(...)` calls elsewhere in the app from crashing the
 * build when the env var is misconfigured.
 */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return FALLBACK_SITE_URL;
  try {
    return new URL(raw).toString().replace(/\/$/, "");
  } catch {
    return FALLBACK_SITE_URL;
  }
}
