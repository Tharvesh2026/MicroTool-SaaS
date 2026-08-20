"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/category/ai", label: "AI Tools" },
  { href: "/category/developer", label: "Developer Tools" },
  { href: "/category/creator", label: "Creator Tools" },
  { href: "/category/seo", label: "SEO Tools" },
  { href: "/category/text", label: "Text Tools" },
  { href: "/category/image", label: "Image Tools" },
  { href: "/tools", label: "All Tools" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

export function MainNav({ className, onNavigate }: { className?: string; onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className={cn("flex items-center gap-1", className)}>
      {NAV_LINKS.map((link) => {
        const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onNavigate}
            className={cn(
              "rounded-md px-3 py-2 text-sm font-medium transition-colors",
              active
                ? "text-indigo-600 dark:text-indigo-400"
                : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
