# CreatorDevTools

Free AI & Developer Tools for Creators and Developers.

A fast, SEO-friendly toolbox of genuinely useful developer utilities, creator tools, and
AI-powered generators. Built with a local-first principle: anything that can run in your
browser does, and AI is only used where it's actually needed.

## Features

- **20 working tools**, 16 of which run entirely client-side (JSON formatter/validator,
  JSON→TypeScript, regex tester, UUID generator, Base64 / URL encode-decode, Unix timestamp
  converter, JWT decoder, Markdown→HTML, HTML/CSS/JS formatters, color converter, word counter,
  Lorem Ipsum generator) and 4 AI-powered tools (YouTube title/description generators, AI prompt
  generator, AI prompt optimizer) served through a single rate-limited API route.
- Tool directory with search, category filtering, and sorting.
- Category pages, a blog with real articles, and SEO content (how-to, FAQs, JSON-LD) on every
  tool page.
- Dark mode, responsive design, accessible components, no login required.
- AdSense-ready ad slots that render nothing until configured.

## Tech Stack

- Next.js (App Router) + TypeScript + React
- Tailwind CSS v4
- Zod for input validation
- Vitest for unit tests
- Prettier (standalone, client-side) for the HTML/CSS/JS formatter tools
- `marked` + DOMPurify for Markdown rendering
- OpenRouter for AI tool generation

## Local Development

```bash
npm install
cp .env.example .env.local   # then fill in OPENROUTER_API_KEY
npm run dev
```

Visit http://localhost:3000.

## Environment Variables

See `.env.example` for the full list with comments. Key ones:

| Variable | Required | Description |
|---|---|---|
| `OPENROUTER_API_KEY` | For AI tools | Server-side only. Never expose this in client code. |
| `OPENROUTER_MODEL` | No | Defaults to `google/gemma-4-26b-a4b-it:free`. |
| `OPENROUTER_FALLBACK_MODEL` | No | Only used if explicitly set — see Cost Protection below. |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Used for canonical URLs, sitemap, OG tags. |
| `NEXT_PUBLIC_ADSENSE_CLIENT_ID` | No | Ad slots stay hidden until this is set. |
| `AI_RATE_LIMIT_REQUESTS` / `AI_RATE_LIMIT_WINDOW_MS` | No | Per-IP AI rate limiting. |

## OpenRouter Setup

1. Create an API key at https://openrouter.ai/keys.
2. Set it as `OPENROUTER_API_KEY` in your `.env.local` (never commit this file, never put it in
   a `NEXT_PUBLIC_` variable, and never paste it into a component or README).
3. All OpenRouter calls go through a single client: `lib/ai/openrouter.ts`. Do not add
   OpenRouter fetch calls anywhere else in the codebase.

### AI Model Configuration

The model is controlled entirely server-side via `OPENROUTER_MODEL`. The frontend cannot select
a model — it can only choose which pre-defined tool (with its own fixed system prompt) to call.

### Cost Protection

The app never automatically switches from the configured free model to a paid one. If
`OPENROUTER_FALLBACK_MODEL` is left empty (the default), a failure of the primary model returns
a controlled error to the user instead of silently trying something else. Only set a fallback
model if you've deliberately chosen one and understand its cost implications.

## Adding a New (Non-AI) Tool

1. Add a utility function (and test) in `lib/utils/`.
2. Create a client component in `components/tools/` that uses it.
3. Register the component in `components/tools/tool-component-map.tsx`.
4. Add metadata (slug, name, description, category, icon, keywords, howTo, faqs) to
   `lib/tools/registry.ts`.

The route, SEO metadata, breadcrumbs, JSON-LD, and related-tools section are generated
automatically from the registry entry — no other files need to change.

## Adding an AI Tool

1. Add a controlled system prompt and input schema to `lib/ai/prompts.ts`. Do not accept a
   system prompt from the client — it must be defined here.
2. Add the tool ID to the `AiToolId` union in `lib/ai/types.ts`.
3. Add a small wrapper component using `<AIToolShell toolId="..." ... />` in `components/tools/`.
4. Register it in `tool-component-map.tsx` and `lib/tools/registry.ts` (with `type: "ai"`).

## SEO

- Every tool and blog page has unique metadata, a canonical URL, Open Graph/Twitter tags, and
  JSON-LD (`WebApplication` + `BreadcrumbList` + `FAQPage` for tools, `Article` for blog posts).
- `app/sitemap.ts` and `app/robots.ts` generate `/sitemap.xml` and `/robots.txt` dynamically from
  the tool/category/blog registries — no manual sitemap maintenance needed.
- Content is hand-written per tool, not templated filler — see `lib/tools/registry.ts`.

## AdSense Setup

1. Apply for AdSense once the site has real content and traffic.
2. On approval, set `NEXT_PUBLIC_ADSENSE_CLIENT_ID`.
3. Wire the AdSense loader script and `<ins class="adsbygoogle">` markup into
   `components/ads/AdSlot.tsx` (currently a placeholder that renders nothing until configured).

AdSense approval and search rankings are never guaranteed — this project only prepares the
technical groundwork.

## Deployment

Works on any Node-compatible host (Vercel, Netlify, etc.):

1. `npm install`
2. Set environment variables (see above) in your hosting provider's dashboard.
3. `npm run build`
4. Deploy / start with `npm run start`.
5. Point your domain at the deployment.
6. Add your OpenRouter key and, once approved, your AdSense client ID.

## Security

- The OpenRouter API key is never sent to the browser and is only read server-side.
- The `/api/ai` route rejects any client-supplied `systemPrompt` field outright.
- All AI system prompts are fixed, server-defined strings per tool (`lib/ai/prompts.ts`).
- Input is validated with Zod before being sent to the model; length limits are enforced.
- Errors from OpenRouter are never passed through raw — only sanitized, friendly messages.
- Markdown-to-HTML output is sanitized with DOMPurify before being rendered as HTML.

## Rate Limiting

`lib/ai/rate-limit.ts` implements a simple per-IP in-memory limiter (defaults: 10 requests/hour,
configurable via env vars). **This only works correctly on a single long-running server
instance.** On distributed/serverless deployments (e.g. many concurrent Vercel functions), each
instance has its own memory, so the limit is effectively per-instance, not global. For a
production deployment at scale, replace it with a shared store (e.g. Upstash Redis, Vercel KV).

## Troubleshooting

- **AI tools return "AI features are not configured"**: set `OPENROUTER_API_KEY`.
- **Build fails fetching Google Fonts**: this project intentionally uses the system font stack
  (no `next/font/google`) specifically to avoid requiring network access to Google Fonts during
  build in restricted/offline environments.
- **Rate limit hit unexpectedly**: check `AI_RATE_LIMIT_REQUESTS` / `AI_RATE_LIMIT_WINDOW_MS`,
  and remember the limiter is per-process (see Rate Limiting above).

## Known Limitations

- The in-memory rate limiter isn't shared across serverless instances (see above).
- AdSense integration is a placeholder pending approval; no ad script is wired in yet.
- Analytics (`lib/analytics.ts`) is a no-op stub until a provider is configured.
- The blog currently ships with 5 hand-written articles; more can be added as plain Markdown
  files in `content/blog/`.
