import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "Important disclaimers about tool accuracy, AI-generated content, and site use.",
  alternates: { canonical: "/disclaimer" },
};

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8 prose prose-slate dark:prose-invert max-w-none">
      <h1>Disclaimer</h1>
      <p>Last updated: January 2025</p>

      <h2>General information only</h2>
      <p>
        Tools and content on CreatorDevTools are provided for general informational and
        productivity purposes. While we aim for accuracy, we make no warranties about the
        completeness, reliability, or correctness of any tool output.
      </p>

      <h2>AI-generated content</h2>
      <p>
        Tools labeled &ldquo;AI-powered&rdquo; generate content using a third-party language
        model. AI-generated output can contain factual errors, may not perfectly reflect your
        intent, and should always be reviewed and edited before you rely on it or publish it. We
        do not verify or fact-check AI-generated output on your behalf.
      </p>

      <h2>Not professional advice</h2>
      <p>
        Nothing on this site constitutes legal, financial, medical, or other professional advice.
        Our JWT Decoder, for example, decodes tokens locally for inspection purposes only — it
        does not verify signatures, and its output should not be treated as a security
        assessment.
      </p>

      <h2>Third-party links and services</h2>
      <p>
        This site may link to or rely on third-party services (such as our AI provider or, where
        enabled, advertising networks). We are not responsible for the content, accuracy, or
        practices of third-party services.
      </p>

      <h2>Use at your own risk</h2>
      <p>
        You use CreatorDevTools and its output at your own discretion and risk. See our{" "}
        <a href="/terms">Terms of Service</a> for our limitation of liability.
      </p>
    </div>
  );
}
