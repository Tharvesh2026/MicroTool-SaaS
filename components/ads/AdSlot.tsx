import { cn } from "@/lib/utils/cn";

type AdPosition = "header" | "in-content" | "sidebar" | "footer";

const POSITION_LABEL: Record<AdPosition, string> = {
  header: "Header ad slot",
  "in-content": "In-content ad slot",
  sidebar: "Sidebar ad slot",
  footer: "Footer ad slot",
};

/**
 * A placeholder for a future Google AdSense unit. When
 * NEXT_PUBLIC_ADSENSE_CLIENT_ID is not set, this renders nothing so the
 * site never ships broken or empty ad boxes before AdSense approval.
 *
 * Once approved, set NEXT_PUBLIC_ADSENSE_CLIENT_ID and wire the AdSense
 * script/ins tags here for the given position.
 */
export function AdSlot({ position, className }: { position: AdPosition; className?: string }) {
  const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  if (!adsenseClientId) {
    return null;
  }

  // Intentionally minimal: real <ins class="adsbygoogle"> markup and the
  // AdSense loader script should be added here once a publisher ID is
  // configured and the site has been approved.
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-lg border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 py-6 text-xs text-slate-400",
        className
      )}
      data-ad-position={position}
      aria-label={POSITION_LABEL[position]}
    >
      Advertisement
    </div>
  );
}
