import type { MetadataRoute } from "next";
import { getAllTools, CATEGORIES } from "@/lib/tools/registry";
import { getAllBlogPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const staticRoutes = [
    "",
    "/tools",
    "/blog",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/cookie-policy",
    "/disclaimer",
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
  }));

  const categoryRoutes = CATEGORIES.map((c) => ({
    url: `${siteUrl}/category/${c.slug}`,
    lastModified: new Date(),
  }));

  const toolRoutes = getAllTools().map((tool) => ({
    url: `${siteUrl}/tools/${tool.slug}`,
    lastModified: new Date(tool.addedAt),
  }));

  const blogRoutes = getAllBlogPosts().map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  return [...staticRoutes, ...categoryRoutes, ...toolRoutes, ...blogRoutes];
}
