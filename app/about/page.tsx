import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about CreatorDevTools, a free toolbox of AI and developer utilities for creators and developers.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8 prose prose-slate dark:prose-invert max-w-none">
      <h1>About CreatorDevTools</h1>
      <p>
        CreatorDevTools is a free collection of developer utilities, creator tools, and
        AI-powered generators, built with one goal: let you arrive from a search result, solve
        your problem in under a minute, and get on with your day.
      </p>
      <h2>What we believe</h2>
      <p>
        Most &ldquo;free tool&rdquo; websites are thin wrappers designed purely to capture search
        traffic. We think that&apos;s backwards. Every tool on this site does real work — JSON
        formatting, regex testing, and encoding utilities all run entirely in your browser, and
        our AI tools use clearly scoped, server-controlled prompts rather than open-ended chat.
      </p>
      <h2>How it works</h2>
      <p>
        Tools that can run locally in your browser (formatters, converters, generators) do —
        nothing is uploaded to a server, and there&apos;s no tracking of what you paste in. Tools
        that genuinely need AI reasoning (like title or prompt generation) call a language model
        through a rate-limited server endpoint, with no login required.
      </p>
      <h2>No account required</h2>
      <p>
        You can use every tool on this site without creating an account. AI tools are subject to
        reasonable rate limits to keep the service sustainable and free for everyone.
      </p>
      <h2>Feedback</h2>
      <p>
        Found a bug, or have an idea for a tool we should build? Reach out via our{" "}
        <a href="/contact">contact page</a>.
      </p>
    </div>
  );
}
