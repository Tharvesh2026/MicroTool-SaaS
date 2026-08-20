"use client";

import { useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { Textarea } from "@/components/ui/primitives";
import { Button } from "@/components/ui/Button";
import { ClearButton } from "@/components/ui/ToolActions";
import { validateJson } from "@/lib/utils/json-tools";

export function JsonValidatorTool() {
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"idle" | "valid" | "invalid">("idle");
  const [message, setMessage] = useState("");

  function handleValidate() {
    const result = validateJson(input);
    if (result.success) {
      setStatus("valid");
      setMessage("Valid JSON");
    } else {
      setStatus("invalid");
      setMessage(result.error ?? "Invalid JSON.");
    }
  }

  function handleClear() {
    setInput("");
    setStatus("idle");
    setMessage("");
  }

  return (
    <div>
      <label htmlFor="json-validate-input" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">
        JSON to validate
      </label>
      <Textarea
        id="json-validate-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder='{"name": "example"}'
        className="min-h-[240px]"
      />
      <div className="mt-3 flex flex-wrap gap-2">
        <Button type="button" onClick={handleValidate}>
          Validate
        </Button>
        <ClearButton onClear={handleClear} />
      </div>

      {status !== "idle" && (
        <div
          role="status"
          className={`mt-4 flex items-start gap-2 rounded-lg px-4 py-3 text-sm ${
            status === "valid"
              ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
              : "bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400"
          }`}
        >
          {status === "valid" ? (
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
          ) : (
            <XCircle className="mt-0.5 h-4 w-4 shrink-0" />
          )}
          <span>{message}</span>
        </div>
      )}
    </div>
  );
}
