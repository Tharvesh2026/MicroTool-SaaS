"use client";

import { useState } from "react";
import { Input } from "@/components/ui/primitives";
import { Button } from "@/components/ui/Button";
import { CopyButton, DownloadButton, ClearButton } from "@/components/ui/ToolActions";
import { generateUuids } from "@/lib/utils/uuid";

export function UuidGeneratorTool() {
  const [count, setCount] = useState(5);
  const [uuids, setUuids] = useState<string[]>([]);

  function handleGenerate() {
    setUuids(generateUuids(count));
  }

  function handleClear() {
    setUuids([]);
  }

  const joined = uuids.join("\n");

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end gap-3">
        <div>
          <label htmlFor="uuid-count" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">
            How many?
          </label>
          <Input
            id="uuid-count"
            type="number"
            min={1}
            max={1000}
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="w-28"
          />
        </div>
        <Button type="button" onClick={handleGenerate}>
          Generate
        </Button>
        <ClearButton onClear={handleClear} disabled={uuids.length === 0} />
      </div>

      {uuids.length > 0 && (
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
              {uuids.length} generated
            </span>
            <div className="flex gap-2">
              <CopyButton text={joined} />
              <DownloadButton text={joined} filename="uuids.txt" />
            </div>
          </div>
          <ul className="max-h-80 space-y-1 overflow-y-auto rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 p-3 font-mono text-sm">
            {uuids.map((id) => (
              <li key={id}>{id}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
