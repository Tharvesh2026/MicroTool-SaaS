"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/primitives";
import { Button } from "@/components/ui/Button";
import { CopyButton } from "@/components/ui/ToolActions";
import { timestampToDate, dateToTimestamp, currentTimestamp } from "@/lib/utils/timestamp";

type Unit = "seconds" | "milliseconds";

export function TimestampTool() {
  const [unit, setUnit] = useState<Unit>("seconds");
  const [timestamp, setTimestamp] = useState("");
  const [dateOutput, setDateOutput] = useState("");
  const [dateError, setDateError] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [timestampOutput, setTimestampOutput] = useState("");
  const [timestampError, setTimestampError] = useState("");
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing with the system clock, an external source
    setNow(currentTimestamp(unit));
    const interval = setInterval(() => setNow(currentTimestamp(unit)), 1000);
    return () => clearInterval(interval);
  }, [unit]);

  function handleTimestampToDate() {
    const result = timestampToDate(timestamp, unit);
    if (result.success) {
      setDateOutput(result.output ?? "");
      setDateError("");
    } else {
      setDateError(result.error ?? "Invalid timestamp.");
      setDateOutput("");
    }
  }

  function handleDateToTimestamp() {
    const result = dateToTimestamp(dateInput, unit);
    if (result.success) {
      setTimestampOutput(result.output ?? "");
      setTimestampError("");
    } else {
      setTimestampError(result.error ?? "Invalid date.");
      setTimestampOutput("");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-4">
        <fieldset className="flex items-center gap-3">
          <legend className="sr-only">Unit</legend>
          <label className="flex items-center gap-1.5 text-sm">
            <input type="radio" checked={unit === "seconds"} onChange={() => setUnit("seconds")} />
            Seconds
          </label>
          <label className="flex items-center gap-1.5 text-sm">
            <input type="radio" checked={unit === "milliseconds"} onChange={() => setUnit("milliseconds")} />
            Milliseconds
          </label>
        </fieldset>
        {now !== null && (
          <div className="rounded-lg bg-slate-100 dark:bg-slate-800 px-3 py-1.5 text-sm">
            Current timestamp: <span className="font-mono font-semibold">{now}</span>
          </div>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="ts-to-date" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">
            Timestamp → Date
          </label>
          <div className="flex gap-2">
            <Input
              id="ts-to-date"
              value={timestamp}
              onChange={(e) => setTimestamp(e.target.value)}
              placeholder="1700000000"
            />
            <Button type="button" onClick={handleTimestampToDate}>
              Convert
            </Button>
          </div>
          {dateError && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{dateError}</p>}
          {dateOutput && (
            <div className="mt-2 flex items-center justify-between rounded-lg border border-slate-200 dark:border-slate-800 px-3 py-2">
              <span className="font-mono text-sm">{dateOutput}</span>
              <CopyButton text={dateOutput} />
            </div>
          )}
        </div>

        <div>
          <label htmlFor="date-to-ts" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">
            Date → Timestamp
          </label>
          <div className="flex gap-2">
            <Input
              id="date-to-ts"
              value={dateInput}
              onChange={(e) => setDateInput(e.target.value)}
              placeholder="2024-01-01T00:00:00Z"
            />
            <Button type="button" onClick={handleDateToTimestamp}>
              Convert
            </Button>
          </div>
          {timestampError && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{timestampError}</p>}
          {timestampOutput && (
            <div className="mt-2 flex items-center justify-between rounded-lg border border-slate-200 dark:border-slate-800 px-3 py-2">
              <span className="font-mono text-sm">{timestampOutput}</span>
              <CopyButton text={timestampOutput} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
