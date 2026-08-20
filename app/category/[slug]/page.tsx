import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CATEGORIES, getToolsByCategory, type ToolCategory } from "@/lib/tools/registry";
import { ToolCard } from "@/components/tools/ToolCard";
import { AdSlot } from "@/components/ads/AdSlot";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = CATEGORIES.find((c) => c.slug === slug);
  if (!category) return {};
  return {
    title: category.name,
    description: category.description,
    alternates: { canonical: `/category/${category.slug}` },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = CATEGORIES.find((c) => c.slug === slug);
  if (!category) notFound();

  const tools = getToolsByCategory(category.slug as ToolCategory);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{category.name}</h1>
      <p className="mt-2 max-w-2xl text-slate-600 dark:text-slate-300">{category.description}</p>

      <div className="mt-6">
        <AdSlot position="header" />
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>

      {tools.length === 0 && (
        <p className="mt-8 text-slate-500">No tools in this category yet — check back soon.</p>
      )}
    </div>
  );
}
