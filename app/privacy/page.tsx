import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How CreatorDevTools handles data, cookies, and third-party services.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8 prose prose-slate dark:prose-invert max-w-none">
      <h1>Privacy Policy</h1>
      <p>Last updated: January 2025</p>

      <h2>Overview</h2>
      <p>
        This Privacy Policy explains how CreatorDevTools (&ldquo;we,&rdquo; &ldquo;us&rdquo;)
        handles information when you use our website and tools. We built this site with a
        local-first principle: most tools process your data entirely in your browser and never
        transmit it anywhere.
      </p>

      <h2>Information processed locally in your browser</h2>
      <p>
        Tools such as the JSON Formatter, Base64 Encoder/Decoder, Regex Tester, JWT Decoder,
        Color Converter, Word Counter, and similar utilities run entirely client-side using
        JavaScript in your browser. The text or data you enter into these tools is not sent to
        our servers.
      </p>

      <h2>Information sent to our servers</h2>
      <p>
        AI-powered tools (such as the YouTube Title Generator or AI Prompt Generator) send the
        text you enter to our server, which forwards a constructed prompt to a third-party AI
        provider (OpenRouter) to generate a response. We do not intentionally log the content of
        your prompts beyond what is necessary to process the request and apply rate limiting. We
        do not sell your data.
      </p>

      <h2>Cookies and local storage</h2>
      <p>
        We use local storage in your browser to remember preferences such as your theme (light or
        dark mode) and, if you use them, your favorited or recently used tools. If advertising or
        analytics are enabled on this site, those services may set their own cookies — see our{" "}
        <a href="/cookie-policy">Cookie Policy</a> for details.
      </p>

      <h2>Third-party services</h2>
      <p>
        We may use third-party services for AI processing (OpenRouter), and, subject to approval,
        advertising (Google AdSense) and analytics. These providers may process limited data
        according to their own privacy policies when their features are active on this site.
      </p>

      <h2>Children&apos;s privacy</h2>
      <p>
        This site is not directed at children under 13, and we do not knowingly collect personal
        information from children.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this Privacy Policy from time to time. Material changes will be reflected
        by updating the &ldquo;Last updated&rdquo; date above.
      </p>

      <h2>Contact us</h2>
      <p>
        Questions about this policy? Reach out via our <a href="/contact">contact page</a>.
      </p>
    </div>
  );
}
