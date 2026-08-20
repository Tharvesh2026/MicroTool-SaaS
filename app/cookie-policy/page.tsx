import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "How CreatorDevTools uses cookies and local storage.",
  alternates: { canonical: "/cookie-policy" },
};

export default function CookiePolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8 prose prose-slate dark:prose-invert max-w-none">
      <h1>Cookie Policy</h1>
      <p>Last updated: January 2025</p>

      <h2>What we use</h2>
      <p>
        CreatorDevTools uses browser local storage (not third-party tracking cookies) for
        essential site functionality: remembering your theme preference (light/dark) and, if you
        use those features, your favorited or recently used tools. This data stays on your
        device.
      </p>

      <h2>Cookie consent</h2>
      <p>
        Where required by your jurisdiction, we display a cookie consent banner before enabling
        any non-essential cookies, such as those used by advertising or analytics providers.
      </p>

      <h2>Third-party cookies</h2>
      <p>
        If Google AdSense or an analytics provider is enabled on this site, those third parties
        may set their own cookies to serve relevant ads or measure site usage. We do not control
        these cookies directly — you can find more information in Google&apos;s own policies, and
        manage ad personalization through{" "}
        <a href="https://adssettings.google.com" target="_blank" rel="noreferrer">
          Google Ads Settings
        </a>
        .
      </p>

      <h2>Managing cookies</h2>
      <p>
        Most browsers let you block or delete cookies through their settings. Note that blocking
        essential local storage may affect features like theme persistence.
      </p>

      <h2>Contact us</h2>
      <p>
        Questions about this policy? Reach out via our <a href="/contact">contact page</a>.
      </p>
    </div>
  );
}
