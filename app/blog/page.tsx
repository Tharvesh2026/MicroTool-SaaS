import type { Metadata } from "next";
import Link from "next/link";
import { getAllBlogPosts } from "@/lib/blog";
import { Card } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Blog",
  description: "Practical guides on JSON, regex, JWTs, Markdown, and writing better AI prompts.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  const posts = getAllBlogPosts();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Blog</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-300">
        Practical guides on the tools and formats developers and creators use every day.
      </p>

      <div className="mt-8 space-y-4">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="block">
            <Card className="p-5 transition-shadow hover:shadow-md">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{post.title}</h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{post.description}</p>
              <p className="mt-2 text-xs text-slate-400">
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}{" "}
                · {post.author}
              </p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
