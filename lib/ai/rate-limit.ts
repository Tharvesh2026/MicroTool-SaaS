/**
 * Lightweight in-memory rate limiter.
 *
 * LIMITATION: this store lives in the Node.js process memory. It works fine
 * for a single long-running server instance (e.g. a traditional Node
 * deployment or a single container), but it will NOT correctly share state
 * across multiple serverless function instances or multiple edge regions
 * (e.g. Vercel/Netlify functions, Cloudflare Workers at scale). For a
 * distributed production deployment, replace this with a shared store such
 * as Upstash Redis, Vercel KV, or a similar edge-compatible rate limiter.
 */

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();

const MAX_REQUESTS = Number(process.env.AI_RATE_LIMIT_REQUESTS ?? 10);
const WINDOW_MS = Number(process.env.AI_RATE_LIMIT_WINDOW_MS ?? 3600000);

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
}

export function checkRateLimit(key: string): RateLimitResult {
  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, remaining: MAX_REQUESTS - 1, resetAt: now + WINDOW_MS };
  }

  if (existing.count >= MAX_REQUESTS) {
    return { allowed: false, remaining: 0, resetAt: existing.resetAt };
  }

  existing.count += 1;
  return { allowed: true, remaining: MAX_REQUESTS - existing.count, resetAt: existing.resetAt };
}

// Periodically clear expired buckets so memory doesn't grow unbounded.
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, bucket] of buckets.entries()) {
      if (bucket.resetAt <= now) buckets.delete(key);
    }
  }, WINDOW_MS).unref?.();
}
