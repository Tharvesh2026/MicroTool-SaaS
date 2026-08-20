"use client";

import { useMemo, useState } from "react";
import { Textarea } from "@/components/ui/primitives";
import { ClearButton } from "@/components/ui/ToolActions";
import { countWords } from "@/lib/utils/word-count";

const STAT_LABELS: { key: keyof ReturnType<typeof countWords>; label: string }[] = [
  { key: "words", label: "Words" },
  { key: "characters", label: "Characters" },
  { key: "charactersNoSpaces", label: "Characters (no spaces)" },
  { key: "sentences", label: "Sentences" },
  { key: "paragraphs", label: "Paragraphs" },
  { key: "readingTimeMinutes", label: "Reading time (min)" },
];

export function WordCounterTool() {
  const [text, setText] = useState("");
  const stats = useMemo(() => countWords(text), [text]);

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="wc-input" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">
          Your text
        </label>
        <Textarea
          id="wc-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or type your text here…"
          className="min-h-[240px]"
        />
        <div className="mt-3">
          <ClearButton onClear={() => setText("")} disabled={!text} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
        {STAT_LABELS.map(({ key, label }) => (
          <div
            key={key}
            className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 p-3 text-center"
          >
            <div className="text-xl font-bold text-slate-900 dark:text-white">{stats[key]}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
