"use client";

import { useState } from "react";
import { Input, Textarea } from "@/components/ui/primitives";
import { Button } from "@/components/ui/Button";
import { CopyButton, DownloadButton } from "@/components/ui/ToolActions";
import { generateLoremIpsum, type LoremUnit } from "@/lib/utils/lorem";

export function LoremIpsumTool() {
  const [count, setCount] = useState(3);
  const [unit, setUnit] = useState<LoremUnit>("paragraphs");
  const [startWithLorem, setStartWithLorem] = useState(true);
  const [output, setOutput] = useState("");

  function handleGenerate() {
    setOutput(generateLoremIpsum(count, unit, startWithLorem));
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end gap-4">
        <div>
          <label htmlFor="lorem-count" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">
            Count
          </label>
          <Input
            id="lorem-count"
            type="number"
            min={1}
            max={200}
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="w-24"
          />
        </div>
        <div>
          <label htmlFor="lorem-unit" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">
            Unit
          </label>
          <select
            id="lorem-unit"
            value={unit}
            onChange={(e) => setUnit(e.target.value as LoremUnit)}
            className="h-10 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 text-sm"
          >
            <option value="words">Words</option>
            <option value="sentences">Sentences</option>
            <option value="paragraphs">Paragraphs</option>
          </select>
        </div>
        <label className="flex items-center gap-2 pb-2 text-sm text-slate-700 dark:text-slate-200">
          <input
            type="checkbox"
            checked={startWithLorem}
            onChange={(e) => setStartWithLorem(e.target.checked)}
          />
          Start with &ldquo;Lorem ipsum…&rdquo;
        </label>
        <Button type="button" onClick={handleGenerate}>
          Generate
        </Button>
      </div>

      {output && (
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Result</span>
            <div className="flex gap-2">
              <CopyButton text={output} />
              <DownloadButton text={output} filename="lorem-ipsum.txt" />
            </div>
          </div>
          <Textarea value={output} readOnly className="min-h-[200px] bg-slate-50 dark:bg-slate-900" />
        </div>
      )}
    </div>
  );
}
