"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/primitives";
import { Button } from "@/components/ui/Button";
import { CopyButton, DownloadButton, ClearButton } from "@/components/ui/ToolActions";
import { formatJson, minifyJson } from "@/lib/utils/json-tools";

export function JsonFormatterTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  function handleFormat() {
    const result = formatJson(input);
    if (result.success) {
      setOutput(result.output ?? "");
      setError("");
    } else {
      setError(result.error ?? "Invalid JSON.");
      setOutput("");
    }
  }

  function handleMinify() {
    const result = minifyJson(input);
    if (result.success) {
      setOutput(result.output ?? "");
      setError("");
    } else {
      setError(result.error ?? "Invalid JSON.");
      setOutput("");
    }
  }

  function handleClear() {
    setInput("");
    setOutput("");
    setError("");
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div>
        <label htmlFor="json-input" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">
          Input JSON
        </label>
        <Textarea
          id="json-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='{"name": "example", "values": [1, 2, 3]}'
          className="min-h-[280px]"
        />
        <div className="mt-3 flex flex-wrap gap-2">
          <Button type="button" onClick={handleFormat}>
            Format
          </Button>
          <Button type="button" variant="secondary" onClick={handleMinify}>
            Minify
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
          <label htmlFor="json-output" className="block text-sm font-medium text-slate-700 dark:text-slate-200">
            Output
          </label>
          <div className="flex gap-2">
            <CopyButton text={output} />
            <DownloadButton text={output} filename="formatted.json" />
          </div>
        </div>
        <Textarea id="json-output" value={output} readOnly className="min-h-[280px] bg-slate-50 dark:bg-slate-900" />
      </div>
    </div>
  );
}
