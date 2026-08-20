"use client";

import { useMemo, useState } from "react";
import { Input, Textarea } from "@/components/ui/primitives";
import { ClearButton } from "@/components/ui/ToolActions";
import { testRegex, COMMON_REGEX_EXAMPLES } from "@/lib/utils/regex-tools";

const FLAG_OPTIONS = [
  { flag: "i", label: "Case-insensitive" },
  { flag: "m", label: "Multiline" },
  { flag: "s", label: "Dot matches newline" },
];

export function RegexTesterTool() {
  const [pattern, setPattern] = useState("");
  const [testString, setTestString] = useState("");
  const [flags, setFlags] = useState<string[]>([]);

  const result = useMemo(
    () => testRegex(pattern, testString, flags.join("")),
    [pattern, testString, flags]
  );

  function toggleFlag(flag: string) {
    setFlags((prev) => (prev.includes(flag) ? prev.filter((f) => f !== flag) : [...prev, flag]));
  }

  function handleClear() {
    setPattern("");
    setTestString("");
    setFlags([]);
  }

  const highlighted = useMemo(() => {
    if (!result.success || !result.matches || result.matches.length === 0 || !testString) {
      return null;
    }
    const parts: { text: string; isMatch: boolean }[] = [];
    let lastIndex = 0;
    for (const m of result.matches) {
      if (m.index > lastIndex) parts.push({ text: testString.slice(lastIndex, m.index), isMatch: false });
      parts.push({ text: m.match || "", isMatch: true });
      lastIndex = m.index + (m.match?.length || 0);
    }
    if (lastIndex < testString.length) parts.push({ text: testString.slice(lastIndex), isMatch: false });
    return parts;
  }, [result, testString]);

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="regex-pattern" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">
          Regular expression
        </label>
        <div className="flex items-center gap-1 font-mono">
          <span className="text-slate-400">/</span>
          <Input
            id="regex-pattern"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            placeholder="[a-z]+"
            className="font-mono"
          />
          <span className="text-slate-400">/{flags.join("")}</span>
        </div>
        <div className="mt-2 flex flex-wrap gap-3">
          {FLAG_OPTIONS.map((opt) => (
            <label key={opt.flag} className="flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-300">
              <input
                type="checkbox"
                checked={flags.includes(opt.flag)}
                onChange={() => toggleFlag(opt.flag)}
              />
              {opt.label} ({opt.flag})
            </label>
          ))}
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {COMMON_REGEX_EXAMPLES.map((ex) => (
            <button
              key={ex.label}
              type="button"
              onClick={() => setPattern(ex.pattern)}
              className="rounded-full border border-slate-300 dark:border-slate-700 px-3 py-1 text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {ex.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="regex-test-string" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">
          Test string
        </label>
        <Textarea
          id="regex-test-string"
          value={testString}
          onChange={(e) => setTestString(e.target.value)}
          placeholder="Paste text to test your pattern against…"
          className="min-h-[160px]"
        />
        <div className="mt-3">
          <ClearButton onClear={handleClear} />
        </div>
      </div>

      {pattern && !result.success && (
        <p role="alert" className="rounded-lg bg-red-50 dark:bg-red-500/10 px-3 py-2 text-sm text-red-700 dark:text-red-400">
          {result.error}
        </p>
      )}

      {pattern && result.success && highlighted && (
        <div>
          <h3 className="mb-1.5 text-sm font-medium text-slate-700 dark:text-slate-200">Highlighted matches</h3>
          <div className="whitespace-pre-wrap rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 p-4 text-sm font-mono">
            {highlighted.map((part, i) =>
              part.isMatch ? (
                <mark key={i} className="rounded bg-indigo-200 dark:bg-indigo-500/40 px-0.5">
                  {part.text}
                </mark>
              ) : (
                <span key={i}>{part.text}</span>
              )
            )}
          </div>
        </div>
      )}

      {pattern && result.success && result.matches && (
        <div>
          <h3 className="mb-1.5 text-sm font-medium text-slate-700 dark:text-slate-200">
            {result.matches.length} match{result.matches.length === 1 ? "" : "es"}
          </h3>
          {result.matches.length > 0 && (
            <ul className="space-y-1 text-sm">
              {result.matches.map((m, i) => (
                <li key={i} className="rounded-lg border border-slate-200 dark:border-slate-800 px-3 py-2 font-mono">
                  <span className="text-slate-500">#{i + 1} at index {m.index}:</span>{" "}
                  <span className="font-semibold">{m.match}</span>
                  {m.groups.length > 0 && (
                    <span className="ml-2 text-slate-500">groups: {JSON.stringify(m.groups)}</span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
