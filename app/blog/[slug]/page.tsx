import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { marked } from "marked";
import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/blog";
import { AdSlot } from "@/components/ads/AdSlot";
import { getSiteUrl } from "@/lib/site-url";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: `/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  // Blog content is authored by CreatorDevTools, not user-submitted, so it's
  // safe to render without client-side sanitization.
  const html = marked.parse(post.content, { async: false }) as string;
  const siteUrl = getSiteUrl();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Organization", name: post.author },
    url: `${siteUrl}/blog/${post.slug}`,
  };

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      <nav className="mb-6 text-sm text-slate-500">
        <Link href="/blog" className="hover:text-slate-900 dark:hover:text-white">
          Blog
        </Link>
      </nav>

      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{post.title}</h1>
      <p className="mt-2 text-sm text-slate-400">
        {new Date(post.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}{" "}
        · {post.author}
      </p>

      <div className="my-6">
        <AdSlot position="in-content" />
      </div>

      <div
        className="prose prose-slate dark:prose-invert max-w-none prose-a:text-indigo-600 dark:prose-a:text-indigo-400"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </article>
  );
}
