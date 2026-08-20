"use client";

import { useState } from "react";
import { Copy, Check, Download, X, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { Button } from "./Button";

export function CopyButton({ text, disabled }: { text: string; disabled?: boolean }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success("Copied to clipboard.");
      setTimeout(() => setCopied(false), 1500);
    } catch {
      toast.error("Couldn't copy to clipboard.");
    }
  }

  return (
    <Button type="button" variant="outline" size="sm" onClick={handleCopy} disabled={disabled || !text}>
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      {copied ? "Copied" : "Copy"}
    </Button>
  );
}

export function DownloadButton({
  text,
  filename,
  disabled,
}: {
  text: string;
  filename: string;
  disabled?: boolean;
}) {
  function handleDownload() {
    if (!text) return;
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success("Download started.");
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={handleDownload}
      disabled={disabled || !text}
    >
      <Download className="h-4 w-4" />
      Download
    </Button>
  );
}

export function ClearButton({ onClear, disabled }: { onClear: () => void; disabled?: boolean }) {
  return (
    <Button type="button" variant="ghost" size="sm" onClick={onClear} disabled={disabled}>
      <X className="h-4 w-4" />
      Clear
    </Button>
  );
}

export function RegenerateButton({
  onRegenerate,
  loading,
  disabled,
}: {
  onRegenerate: () => void;
  loading?: boolean;
  disabled?: boolean;
}) {
  return (
    <Button type="button" variant="outline" size="sm" onClick={onRegenerate} disabled={disabled || loading}>
      <RotateCcw className={loading ? "h-4 w-4 animate-spin" : "h-4 w-4"} />
      Regenerate
    </Button>
  );
}
