"use client";

import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Textarea, Input } from "@/components/ui/primitives";
import { CopyButton, ClearButton, RegenerateButton } from "@/components/ui/ToolActions";
import type { AiToolId, AiApiResponse } from "@/lib/ai/types";

interface AIToolShellProps {
  toolId: AiToolId;
  topicLabel: string;
  topicPlaceholder: string;
  exampleTopics: string[];
  showDetails?: boolean;
  detailsLabel?: string;
  detailsPlaceholder?: string;
  multilineTopic?: boolean;
  maxTopicLength?: number;
  generateLabel?: string;
}

export function AIToolShell({
  toolId,
  topicLabel,
  topicPlaceholder,
  exampleTopics,
  showDetails = false,
  detailsLabel = "Additional details (optional)",
  detailsPlaceholder = "",
  multilineTopic = false,
  maxTopicLength = 500,
  generateLabel = "Generate",
}: AIToolShellProps) {
  const [topic, setTopic] = useState("");
  const [details, setDetails] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleGenerate() {
    if (!topic.trim()) {
      setError("Please enter a topic first.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tool: toolId,
          input: showDetails ? { topic, details } : { topic },
        }),
      });
      const json: AiApiResponse = await res.json();
      if (json.success) {
        setResult(json.data.text);
      } else {
        setError(json.error.message);
      }
    } catch {
      setError("The AI service is temporarily unavailable. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleClear() {
    setTopic("");
    setDetails("");
    setResult("");
    setError("");
  }

  const TopicField = multilineTopic ? Textarea : Input;

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="ai-topic" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">
          {topicLabel}
        </label>
        <TopicField
          id="ai-topic"
          value={topic}
          maxLength={maxTopicLength}
          onChange={(e) => setTopic(e.target.value)}
          placeholder={topicPlaceholder}
          aria-describedby="ai-topic-help"
        />
        <p id="ai-topic-help" className="mt-1 text-xs text-slate-500">
          {topic.length}/{maxTopicLength} characters
        </p>
        {exampleTopics.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {exampleTopics.map((example) => (
              <button
                key={example}
                type="button"
                onClick={() => setTopic(example)}
                className="rounded-full border border-slate-300 dark:border-slate-700 px-3 py-1 text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                {example}
              </button>
            ))}
          </div>
        )}
      </div>

      {showDetails && (
        <div>
          <label htmlFor="ai-details" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">
            {detailsLabel}
          </label>
          <Input
            id="ai-details"
            value={details}
            maxLength={500}
            onChange={(e) => setDetails(e.target.value)}
            placeholder={detailsPlaceholder}
          />
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2">
        <Button type="button" onClick={handleGenerate} disabled={loading}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
          {loading ? "Generating…" : generateLabel}
        </Button>
        {result && (
          <RegenerateButton onRegenerate={handleGenerate} loading={loading} />
        )}
        <ClearButton onClear={handleClear} disabled={loading} />
      </div>

      {error && (
        <p role="alert" className="rounded-lg bg-red-50 dark:bg-red-500/10 px-3 py-2 text-sm text-red-700 dark:text-red-400">
          {error}
        </p>
      )}

      {loading && !result && (
        <div className="space-y-2 rounded-lg border border-slate-200 dark:border-slate-800 p-4">
          <div className="h-3 w-3/4 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
          <div className="h-3 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
          <div className="h-3 w-5/6 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
        </div>
      )}

      {result && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Result</span>
            <CopyButton text={result} />
          </div>
          <div className="whitespace-pre-wrap rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 p-4 text-sm text-slate-800 dark:text-slate-200">
            {result}
          </div>
          <p className="text-xs text-slate-500">AI-generated output — review before publishing.</p>
        </div>
      )}
    </div>
  );
}
