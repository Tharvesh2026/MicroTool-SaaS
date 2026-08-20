"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/primitives";
import { CopyButton } from "@/components/ui/ToolActions";
import { parseColor } from "@/lib/utils/color";

export function ColorConverterTool() {
  const [value, setValue] = useState("#6366F1");

  const result = useMemo(() => parseColor(value), [value]);

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="color-input" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">
          Color value
        </label>
        <Input
          id="color-input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="#6366F1, rgb(99, 102, 241), or hsl(239, 84%, 67%)"
        />
      </div>

      {!result.success && value.trim() && (
        <p className="text-sm text-red-600 dark:text-red-400">{result.error}</p>
      )}

      {result.success && result.formats && (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <div
            className="h-24 w-24 shrink-0 rounded-xl border border-slate-200 dark:border-slate-800"
            style={{ backgroundColor: result.formats.hex }}
            aria-hidden="true"
          />
          <div className="grid flex-1 gap-2">
            {(["hex", "rgb", "hsl"] as const).map((key) => (
              <div
                key={key}
                className="flex items-center justify-between rounded-lg border border-slate-200 dark:border-slate-800 px-3 py-2"
              >
                <div>
                  <span className="mr-2 text-xs uppercase text-slate-400">{key}</span>
                  <span className="font-mono text-sm">{result.formats![key]}</span>
                </div>
                <CopyButton text={result.formats![key]} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
