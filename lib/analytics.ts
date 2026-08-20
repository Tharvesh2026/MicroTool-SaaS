/**
 * A minimal analytics abstraction. No provider is wired up by default —
 * calls are no-ops until NEXT_PUBLIC_ANALYTICS_ID (or similar) is
 * configured and a provider is added below. This keeps the app free of
 * hidden tracking scripts out of the box.
 *
 * Never pass private user input (AI prompts, decoded tokens, etc.) to
 * trackEvent — only pass event names and non-sensitive metadata.
 */

type EventProperties = Record<string, string | number | boolean | undefined>;

export function trackEvent(eventName: string, properties?: EventProperties): void {
  if (typeof window === "undefined") return;
  const analyticsId = process.env.NEXT_PUBLIC_ANALYTICS_ID;
  if (!analyticsId) return;

  // Intentionally left as a stub. Wire up your analytics provider's
  // client-side call here, e.g.:
  //   window.plausible?.(eventName, { props: properties });
  void eventName;
  void properties;
}

export function trackPageView(path: string): void {
  trackEvent("page_view", { path });
}
