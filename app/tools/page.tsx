import { Suspense } from "react";
import type { Metadata } from "next";
import { ToolsDirectory } from "@/components/tools/ToolsDirectory";

export const metadata: Metadata = {
  title: "All Tools",
  description:
    "Browse the full directory of free AI and developer tools on CreatorDevTools. Search, filter by category, and sort by popularity.",
  alternates: { canonical: "/tools" },
};

export default function ToolsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">All Tools</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-300">
        Every free tool on CreatorDevTools, in one place.
      </p>
      <div className="mt-8">
        <Suspense fallback={<p className="text-sm text-slate-500">Loading tools…</p>}>
          <ToolsDirectory />
        </Suspense>
      </div>
    </div>
  );
}
