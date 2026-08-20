"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/primitives";
import { Button } from "@/components/ui/Button";
import { CopyButton, DownloadButton, ClearButton } from "@/components/ui/ToolActions";
import type { TextResult } from "@/lib/utils/base64";

interface EncodeDecodeToolProps {
  encode: (input: string) => TextResult;
  decode: (input: string) => TextResult;
  inputLabel?: string;
  outputLabel?: string;
  downloadFilename?: string;
  placeholder?: string;
}

export function EncodeDecodeTool({
  encode,
  decode,
  inputLabel = "Input",
  outputLabel = "Output",
  downloadFilename = "output.txt",
  placeholder = "",
}: EncodeDecodeToolProps) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  function run(fn: (input: string) => TextResult) {
    const result = fn(input);
    if (result.success) {
      setOutput(result.output ?? "");
      setError("");
    } else {
      setError(result.error ?? "Something went wrong.");
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
        <label htmlFor="ed-input" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">
          {inputLabel}
        </label>
        <Textarea
          id="ed-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          className="min-h-[220px]"
        />
        <div className="mt-3 flex flex-wrap gap-2">
          <Button type="button" onClick={() => run(encode)}>
            Encode
          </Button>
          <Button type="button" variant="secondary" onClick={() => run(decode)}>
            Decode
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
          <label htmlFor="ed-output" className="block text-sm font-medium text-slate-700 dark:text-slate-200">
            {outputLabel}
          </label>
          <div className="flex gap-2">
            <CopyButton text={output} />
            <DownloadButton text={output} filename={downloadFilename} />
          </div>
        </div>
        <Textarea id="ed-output" value={output} readOnly className="min-h-[220px] bg-slate-50 dark:bg-slate-900" />
      </div>
    </div>
  );
}
