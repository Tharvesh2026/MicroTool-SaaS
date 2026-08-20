import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ToolCard } from "@/components/tools/ToolCard";
import { AdSlot } from "@/components/ads/AdSlot";
import {
  getPopularTools,
  getRecentTools,
  getToolsByCategory,
} from "@/lib/tools/registry";

export default function HomePage() {
  const popular = getPopularTools(6);
  const recent = getRecentTools(6);
  const aiTools = getToolsByCategory("ai").slice(0, 3);
  const devTools = getToolsByCategory("developer").slice(0, 3);
  const creatorTools = getToolsByCategory("creator").slice(0, 3);
  const textTools = getToolsByCategory("text").slice(0, 3);

  return (
    <div>
      <section className="border-b border-slate-200 dark:border-slate-800 bg-gradient-to-b from-indigo-50/60 dark:from-indigo-950/20 to-transparent">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24 text-center">
          <h1 className="mx-auto max-w-3xl text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            Free AI &amp; Developer Tools for Creators
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
            Build faster, create better, and solve everyday problems with free developer,
            creator, SEO, and AI tools.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/tools">
              <Button size="lg">
                Explore Tools <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/category/ai">
              <Button size="lg" variant="outline">
                AI Tools
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <AdSlot position="header" />
      </div>

      <ToolSection title="Popular tools" href="/tools" tools={popular} />
      <ToolSection title="Recently added" href="/tools" tools={recent} />

      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <AdSlot position="in-content" />
      </div>

      <ToolSection title="AI Tools" href="/category/ai" tools={aiTools} />
      <ToolSection title="Developer Tools" href="/category/developer" tools={devTools} />
      <ToolSection title="Creator Tools" href="/category/creator" tools={creatorTools} />
      <ToolSection title="Text Tools" href="/category/text" tools={textTools} />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 p-8 text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            One place for the small tools you need every day
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-slate-600 dark:text-slate-300">
            No sign-up, no paywalls for core tools. Just fast, genuinely useful utilities —
            whenever you need them.
          </p>
          <Link href="/tools" className="mt-6 inline-block">
            <Button size="lg">Browse all tools</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

function ToolSection({
  title,
  href,
  tools,
}: {
  title: string;
  href: string;
  tools: ReturnType<typeof getPopularTools>;
}) {
  if (tools.length === 0) return null;
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">{title}</h2>
        <Link href={href} className="flex items-center gap-1 text-sm font-medium text-indigo-600 dark:text-indigo-400">
          View all <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>
    </section>
  );
}
