"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/primitives";
import { Button } from "@/components/ui/Button";
import { CopyButton, DownloadButton, ClearButton } from "@/components/ui/ToolActions";
import type { FormatResult } from "@/lib/utils/code-format";

interface AsyncFormatterToolProps {
  format: (input: string) => Promise<FormatResult>;
  placeholder: string;
  downloadFilename: string;
}

export function AsyncFormatterTool({ format, placeholder, downloadFilename }: AsyncFormatterToolProps) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleFormat() {
    setLoading(true);
    const result = await format(input);
    if (result.success) {
      setOutput(result.output ?? "");
      setError("");
    } else {
      setError(result.error ?? "Could not format this code.");
      setOutput("");
    }
    setLoading(false);
  }

  function handleClear() {
    setInput("");
    setOutput("");
    setError("");
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div>
        <label htmlFor="fmt-input" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">
          Input
        </label>
        <Textarea
          id="fmt-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          className="min-h-[280px]"
        />
        <div className="mt-3 flex flex-wrap gap-2">
          <Button type="button" onClick={handleFormat} disabled={loading}>
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            Format
          </Button>
          <ClearButton onClear={handleClear} />
        </div>
        {error && (
          <p role="alert" className="mt-2 rounded-lg bg-red-50 dark:bg-red-500/10 px-3 py-2 text-sm text-red-700 dark:text-red-400">
            {error}
          </p>
        )}
      </div>

      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <label htmlFor="fmt-output" className="block text-sm font-medium text-slate-700 dark:text-slate-200">
            Formatted output
          </label>
          <div className="flex gap-2">
            <CopyButton text={output} />
            <DownloadButton text={output} filename={downloadFilename} />
          </div>
        </div>
        <Textarea id="fmt-output" value={output} readOnly className="min-h-[280px] bg-slate-50 dark:bg-slate-900" />
      </div>
    </div>
  );
}
