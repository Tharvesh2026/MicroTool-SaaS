import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { getAllTools, getToolBySlug, getRelatedTools, CATEGORIES } from "@/lib/tools/registry";
import { TOOL_COMPONENTS } from "@/components/tools/tool-component-map";
import { ToolCard } from "@/components/tools/ToolCard";
import { Card, Badge } from "@/components/ui/primitives";
import { AdSlot } from "@/components/ads/AdSlot";
import { getSiteUrl } from "@/lib/site-url";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllTools().map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return {};

  return {
    title: tool.name,
    description: tool.description,
    alternates: { canonical: `/tools/${tool.slug}` },
    openGraph: {
      title: `${tool.name} | CreatorDevTools`,
      description: tool.description,
      url: `/tools/${tool.slug}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${tool.name} | CreatorDevTools`,
      description: tool.description,
    },
  };
}

export default async function ToolPage({ params }: PageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const ToolComponent = TOOL_COMPONENTS[tool.slug];
  const related = getRelatedTools(tool);
  const categoryMeta = CATEGORIES.find((c) => c.slug === tool.category);
  const siteUrl = getSiteUrl();

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "All Tools", item: `${siteUrl}/tools` },
      { "@type": "ListItem", position: 3, name: tool.name, item: `${siteUrl}/tools/${tool.slug}` },
    ],
  };

  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: tool.name,
    description: tool.description,
    url: `${siteUrl}/tools/${tool.slug}`,
    applicationCategory: "UtilityApplication",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  const faqJsonLd =
    tool.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: tool.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        }
      : null;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Structured data for search engines */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
      {faqJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      )}

      <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-1 text-sm text-slate-500">
        <Link href="/" className="hover:text-slate-900 dark:hover:text-white">
          Home
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href="/tools" className="hover:text-slate-900 dark:hover:text-white">
          All Tools
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        {categoryMeta && (
          <>
            <Link href={`/category/${categoryMeta.slug}`} className="hover:text-slate-900 dark:hover:text-white">
              {categoryMeta.name}
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
          </>
        )}
        <span className="text-slate-700 dark:text-slate-300">{tool.name}</span>
      </nav>

      <div className="mb-2 flex items-center gap-2">
        {tool.type === "local" && <Badge>Free</Badge>}
        {tool.type === "ai" && (
          <Badge className="bg-violet-100 dark:bg-violet-500/10 text-violet-700 dark:text-violet-300">
            AI-powered
          </Badge>
        )}
      </div>
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{tool.name}</h1>
      <p className="mt-2 max-w-2xl text-slate-600 dark:text-slate-300">{tool.longDescription}</p>

      <Card className="mt-6 p-4 sm:p-6">
        {ToolComponent ? <ToolComponent /> : <p>This tool is coming soon.</p>}
      </Card>

      <div className="mt-6">
        <AdSlot position="in-content" />
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          How to use the {tool.name}
        </h2>
        <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-slate-600 dark:text-slate-300">
          {tool.howTo.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </section>

      {tool.faqs.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Frequently asked questions
          </h2>
          <div className="mt-3 space-y-4">
            {tool.faqs.map((faq, i) => (
              <div key={i}>
                <h3 className="font-semibold text-slate-900 dark:text-white">{faq.question}</h3>
                <p className="mt-1 text-slate-600 dark:text-slate-300">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Related tools</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((t) => (
              <ToolCard key={t.slug} tool={t} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
