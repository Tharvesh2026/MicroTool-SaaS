"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Wrench } from "lucide-react";
import { MainNav } from "@/components/navigation/MainNav";
import { SearchBar } from "@/components/search/SearchBar";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 text-white">
            <Wrench className="h-4 w-4" />
          </span>
          <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
            CreatorDevTools
          </span>
        </Link>

        <MainNav className="hidden flex-1 xl:flex" />

        <div className="ml-auto hidden items-center gap-3 md:flex">
          <SearchBar className="relative w-64" />
          <ThemeToggle />
        </div>

        <button
          type="button"
          className="ml-auto inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-300 dark:border-slate-700 md:hidden"
          aria-label="Toggle menu"
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-slate-200 dark:border-slate-800 px-4 py-4 md:hidden">
          <SearchBar className="relative mb-3" />
          <MainNav className="flex-col items-stretch gap-0.5" onNavigate={() => setMobileOpen(false)} />
          <div className="mt-3 flex items-center justify-between border-t border-slate-200 dark:border-slate-800 pt-3">
            <span className="text-sm text-slate-500">Theme</span>
            <ThemeToggle />
          </div>
        </div>
      )}
    </header>
  );
}
