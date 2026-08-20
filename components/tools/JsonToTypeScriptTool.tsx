"use client";

import { useState } from "react";
import { Textarea, Input } from "@/components/ui/primitives";
import { Button } from "@/components/ui/Button";
import { CopyButton, DownloadButton, ClearButton } from "@/components/ui/ToolActions";
import { jsonToTypeScript } from "@/lib/utils/json-tools";

export function JsonToTypeScriptTool() {
  const [input, setInput] = useState("");
  const [rootName, setRootName] = useState("Root");
  const [optional, setOptional] = useState(false);
  const [exportInterfaces, setExportInterfaces] = useState(true);
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  function handleConvert() {
    const result = jsonToTypeScript(input, {
      rootName: rootName || "Root",
      optionalProperties: optional,
      exportInterfaces,
    });
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
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="root-name" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">
            Root interface name
          </label>
          <Input id="root-name" value={rootName} onChange={(e) => setRootName(e.target.value)} />
        </div>
        <label className="flex items-end gap-2 pb-2 text-sm text-slate-700 dark:text-slate-200">
          <input type="checkbox" checked={optional} onChange={(e) => setOptional(e.target.checked)} />
          Optional properties
        </label>
        <label className="flex items-end gap-2 pb-2 text-sm text-slate-700 dark:text-slate-200">
          <input
            type="checkbox"
            checked={exportInterfaces}
            onChange={(e) => setExportInterfaces(e.target.checked)}
          />
          Export interfaces
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="jsts-input" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">
            Input JSON
          </label>
          <Textarea
            id="jsts-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='{"id": 1, "user": {"name": "Ada"}}'
            className="min-h-[260px]"
          />
          <div className="mt-3 flex flex-wrap gap-2">
            <Button type="button" onClick={handleConvert}>
              Convert
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
            <label htmlFor="jsts-output" className="block text-sm font-medium text-slate-700 dark:text-slate-200">
              TypeScript output
            </label>
            <div className="flex gap-2">
              <CopyButton text={output} />
              <DownloadButton text={output} filename="types.ts" />
            </div>
          </div>
          <Textarea
            id="jsts-output"
            value={output}
            readOnly
            className="min-h-[260px] bg-slate-50 dark:bg-slate-900"
          />
        </div>
      </div>
    </div>
  );
}
