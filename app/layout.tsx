import type { Metadata } from "next";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieConsent } from "@/components/privacy/CookieConsent";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "CreatorDevTools — Free AI & Developer Tools for Creators",
    template: "%s | CreatorDevTools",
  },
  description:
    "Free AI and developer tools for creators and developers: JSON formatters, regex testers, YouTube title generators, AI prompt tools, and more.",
  openGraph: {
    type: "website",
    siteName: "CreatorDevTools",
    title: "CreatorDevTools — Free AI & Developer Tools for Creators",
    description:
      "Free AI and developer tools for creators and developers: JSON formatters, regex testers, YouTube title generators, AI prompt tools, and more.",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "CreatorDevTools — Free AI & Developer Tools for Creators",
    description: "Free AI and developer tools for creators and developers.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="antialiased bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100"
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <CookieConsent />
          <Toaster richColors position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
