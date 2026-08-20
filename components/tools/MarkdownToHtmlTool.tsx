"use client";

import { useMemo, useState } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { Textarea } from "@/components/ui/primitives";
import { CopyButton, DownloadButton, ClearButton } from "@/components/ui/ToolActions";

const DEFAULT_MARKDOWN = "# Hello world\n\nThis is **bold** and this is *italic*.\n\n- Item one\n- Item two\n";

export function MarkdownToHtmlTool() {
  const [markdown, setMarkdown] = useState(DEFAULT_MARKDOWN);

  const html = useMemo(() => {
    try {
      const raw = marked.parse(markdown, { async: false }) as string;
      return typeof window !== "undefined" ? DOMPurify.sanitize(raw) : raw;
    } catch {
      return "";
    }
  }, [markdown]);

  function handleClear() {
    setMarkdown("");
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="md-input" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">
            Markdown
          </label>
          <Textarea
            id="md-input"
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            className="min-h-[280px]"
          />
          <div className="mt-3">
            <ClearButton onClear={handleClear} />
          </div>
        </div>

        <div>
          <span className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">
            Live preview
          </span>
          <div
            className="prose prose-sm dark:prose-invert min-h-[280px] max-w-none rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-4"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>

      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">HTML output</span>
          <div className="flex gap-2">
            <CopyButton text={html} />
            <DownloadButton text={html} filename="output.html" />
          </div>
        </div>
        <Textarea value={html} readOnly className="min-h-[160px] bg-slate-50 dark:bg-slate-900" />
      </div>
    </div>
  );
}
