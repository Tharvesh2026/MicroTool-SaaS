export interface TimestampResult {
  success: boolean;
  output?: string;
  error?: string;
}

export function timestampToDate(
  value: string,
  unit: "seconds" | "milliseconds" = "seconds"
): TimestampResult {
  if (!value.trim()) return { success: false, error: "Please enter a Unix timestamp." };
  const num = Number(value.trim());
  if (!Number.isFinite(num)) {
    return { success: false, error: "Timestamp must be a number." };
  }
  const ms = unit === "seconds" ? num * 1000 : num;
  const date = new Date(ms);
  if (Number.isNaN(date.getTime())) {
    return { success: false, error: "That timestamp could not be converted to a date." };
  }
  return { success: true, output: date.toISOString() };
}

export function dateToTimestamp(
  value: string,
  unit: "seconds" | "milliseconds" = "seconds"
): TimestampResult {
  if (!value.trim()) return { success: false, error: "Please enter a date." };
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return { success: false, error: "That doesn't look like a valid date." };
  }
  const ms = date.getTime();
  return { success: true, output: String(unit === "seconds" ? Math.floor(ms / 1000) : ms) };
}

export function currentTimestamp(unit: "seconds" | "milliseconds" = "seconds"): number {
  const now = Date.now();
  return unit === "seconds" ? Math.floor(now / 1000) : now;
}
