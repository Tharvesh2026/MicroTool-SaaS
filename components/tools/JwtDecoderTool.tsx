"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/primitives";
import { CopyButton, ClearButton } from "@/components/ui/ToolActions";
import { decodeJwt } from "@/lib/utils/jwt";

export function JwtDecoderTool() {
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [header, setHeader] = useState("");
  const [payload, setPayload] = useState("");

  function handleChange(value: string) {
    setToken(value);
    if (!value.trim()) {
      setHeader("");
      setPayload("");
      setError("");
      return;
    }
    const result = decodeJwt(value);
    if (result.success) {
      setHeader(JSON.stringify(result.header, null, 2));
      setPayload(JSON.stringify(result.payload, null, 2));
      setError("");
    } else {
      setHeader("");
      setPayload("");
      setError(result.error ?? "Could not decode this token.");
    }
  }

  function handleClear() {
    handleChange("");
  }

  return (
    <div className="space-y-4">
      <p className="rounded-lg bg-amber-50 dark:bg-amber-500/10 px-3 py-2 text-sm text-amber-800 dark:text-amber-300">
        This tool decodes JWTs locally in your browser. It does not verify signatures, and your
        token is never sent anywhere.
      </p>

      <div>
        <label htmlFor="jwt-input" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">
          JWT
        </label>
        <Textarea
          id="jwt-input"
          value={token}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
          className="min-h-[100px]"
        />
        <div className="mt-2">
          <ClearButton onClear={handleClear} disabled={!token} />
        </div>
        {error && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>}
      </div>

      {(header || payload) && (
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Header</span>
              <CopyButton text={header} />
            </div>
            <Textarea value={header} readOnly className="min-h-[160px] bg-slate-50 dark:bg-slate-900" />
          </div>
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Payload</span>
              <CopyButton text={payload} />
            </div>
            <Textarea value={payload} readOnly className="min-h-[160px] bg-slate-50 dark:bg-slate-900" />
          </div>
        </div>
      )}
    </div>
  );
}
