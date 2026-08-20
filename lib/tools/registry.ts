export type ToolCategory = "ai" | "developer" | "creator" | "seo" | "text" | "image";

export interface ToolMeta {
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  category: ToolCategory;
  icon: string; // lucide-react icon name
  keywords: string[];
  type: "local" | "ai";
  popularity: number; // higher = more popular, used for sorting
  featured: boolean;
  addedAt: string; // ISO date, used for "recently added"
  howTo: string[];
  faqs: { question: string; answer: string }[];
}

export const CATEGORIES: { slug: ToolCategory; name: string; description: string }[] = [
  {
    slug: "developer",
    name: "Developer Tools",
    description: "Everyday utilities for formatting, converting, and debugging code and data.",
  },
  {
    slug: "ai",
    name: "AI Tools",
    description: "AI-powered generators for prompts, outlines, and metadata.",
  },
  {
    slug: "creator",
    name: "Creator Tools",
    description: "AI helpers for YouTube, social media, and content creation.",
  },
  {
    slug: "seo",
    name: "SEO Tools",
    description: "Tools to help you write and structure content that performs well in search.",
  },
  {
    slug: "text",
    name: "Text Tools",
    description: "Utilities for counting, generating, and manipulating text.",
  },
  {
    slug: "image",
    name: "Image Tools",
    description: "Utilities for working with colors and image-adjacent data.",
  },
];

export const TOOLS: ToolMeta[] = [
  {
    slug: "json-formatter",
    name: "JSON Formatter",
    description: "Format and beautify JSON with proper indentation, instantly in your browser.",
    longDescription:
      "Paste minified or messy JSON and get clean, indented, readable output. All formatting happens locally in your browser — nothing is uploaded to a server.",
    category: "developer",
    icon: "Braces",
    keywords: ["json", "format", "beautify", "pretty print", "indent"],
    type: "local",
    popularity: 100,
    featured: true,
    addedAt: "2025-01-05",
    howTo: [
      "Paste your JSON into the input box.",
      "Click Format to beautify it, or Minify to compress it.",
      "Review the formatted output and any error messages.",
      "Copy or download the result.",
    ],
    faqs: [
      {
        question: "Is my JSON sent to a server?",
        answer:
          "No. JSON formatting runs entirely in your browser using JavaScript's built-in JSON parser — your data never leaves your device.",
      },
      {
        question: "What happens if my JSON is invalid?",
        answer:
          "The tool shows a clear error message, including the line and column where the problem was found, so you can fix it quickly.",
      },
    ],
  },
  {
    slug: "json-validator",
    name: "JSON Validator",
    description: "Check whether your JSON is valid and see exactly where syntax errors occur.",
    longDescription:
      "A focused validator that tells you immediately whether your JSON is syntactically correct, with precise error locations when it isn't.",
    category: "developer",
    icon: "CheckCircle2",
    keywords: ["json", "validate", "syntax", "lint", "check"],
    type: "local",
    popularity: 80,
    featured: false,
    addedAt: "2025-01-05",
    howTo: [
      "Paste your JSON into the input box.",
      "Click Validate.",
      "See a confirmation if it's valid, or a detailed error if it's not.",
    ],
    faqs: [
      {
        question: "How is this different from the JSON Formatter?",
        answer:
          "The formatter focuses on producing clean output; the validator focuses purely on confirming correctness and pinpointing errors.",
      },
    ],
  },
  {
    slug: "json-to-typescript",
    name: "JSON to TypeScript",
    description: "Convert JSON objects into TypeScript interfaces automatically.",
    longDescription:
      "Paste a JSON object or array and instantly generate matching TypeScript interfaces, including nested objects, with configurable naming and optional properties.",
    category: "developer",
    icon: "FileCode2",
    keywords: ["json", "typescript", "interface", "types", "convert"],
    type: "local",
    popularity: 75,
    featured: true,
    addedAt: "2025-01-08",
    howTo: [
      "Paste a JSON object or array.",
      "Set a root interface name if you'd like.",
      "Choose whether properties should be optional.",
      "Click Convert and copy the generated TypeScript.",
    ],
    faqs: [
      {
        question: "Does it handle nested objects?",
        answer:
          "Yes. Nested objects are extracted into their own named interfaces and referenced from the parent type.",
      },
      {
        question: "Does it handle arrays?",
        answer:
          "Yes. Arrays of primitives and arrays of objects are both supported and typed accordingly.",
      },
    ],
  },
  {
    slug: "regex-tester",
    name: "Regex Tester",
    description: "Test regular expressions against sample text with live match highlighting.",
    longDescription:
      "Write a regular expression, paste in test text, and see every match, its position, and captured groups — all processed locally in your browser.",
    category: "developer",
    icon: "Regex",
    keywords: ["regex", "regular expression", "pattern", "test", "match"],
    type: "local",
    popularity: 85,
    featured: true,
    addedAt: "2025-01-06",
    howTo: [
      "Enter a regular expression pattern.",
      "Choose flags such as case-insensitive or multiline.",
      "Paste your test string.",
      "Review highlighted matches and capture groups below.",
    ],
    faqs: [
      {
        question: "Which regex flavor does this use?",
        answer:
          "It uses standard JavaScript regular expressions, the same engine used in browsers and Node.js.",
      },
    ],
  },
  {
    slug: "uuid-generator",
    name: "UUID Generator",
    description: "Generate one or many random UUID v4 identifiers instantly.",
    longDescription:
      "Generate cryptographically random UUID v4 values for use as database keys, tracking IDs, or test data — as many as you need, all at once.",
    category: "developer",
    icon: "Fingerprint",
    keywords: ["uuid", "guid", "unique id", "generator"],
    type: "local",
    popularity: 70,
    featured: false,
    addedAt: "2025-01-05",
    howTo: [
      "Choose how many UUIDs you want to generate.",
      "Click Generate.",
      "Copy individual UUIDs or download the full list.",
    ],
    faqs: [
      {
        question: "Are these UUIDs cryptographically random?",
        answer:
          "Yes, they use the browser's built-in crypto.randomUUID() where available, which is a cryptographically secure random source.",
      },
    ],
  },
  {
    slug: "base64",
    name: "Base64 Encoder / Decoder",
    description: "Encode text to Base64 or decode Base64 back to readable text.",
    longDescription:
      "Convert plain text to Base64 encoding or decode Base64 strings back into their original text, entirely client-side.",
    category: "developer",
    icon: "Binary",
    keywords: ["base64", "encode", "decode", "convert"],
    type: "local",
    popularity: 65,
    featured: false,
    addedAt: "2025-01-05",
    howTo: [
      "Enter text or Base64 in the input box.",
      "Choose Encode or Decode.",
      "Copy the result.",
    ],
    faqs: [
      {
        question: "Does this support Unicode text?",
        answer:
          "Yes, the encoder correctly handles UTF-8 text including emoji and non-Latin characters.",
      },
    ],
  },
  {
    slug: "url-encoder",
    name: "URL Encoder / Decoder",
    description: "Encode special characters for URLs or decode percent-encoded strings.",
    longDescription:
      "Safely encode text for use in URLs and query strings, or decode percent-encoded URLs back into readable text.",
    category: "developer",
    icon: "Link2",
    keywords: ["url", "encode", "decode", "percent encoding", "uri"],
    type: "local",
    popularity: 60,
    featured: false,
    addedAt: "2025-01-05",
    howTo: [
      "Paste text or a URL-encoded string.",
      "Choose Encode or Decode.",
      "Copy the result.",
    ],
    faqs: [
      {
        question: "What's the difference between encodeURI and encodeURIComponent?",
        answer:
          "This tool uses encodeURIComponent, which is appropriate for encoding individual query parameter values rather than a full URL.",
      },
    ],
  },
  {
    slug: "timestamp",
    name: "Unix Timestamp Converter",
    description: "Convert between Unix timestamps and human-readable dates.",
    longDescription:
      "Convert Unix timestamps (seconds or milliseconds) to readable dates and back, plus see the current timestamp at a glance.",
    category: "developer",
    icon: "Clock",
    keywords: ["timestamp", "unix", "epoch", "date", "convert"],
    type: "local",
    popularity: 68,
    featured: false,
    addedAt: "2025-01-06",
    howTo: [
      "Enter a Unix timestamp to convert it to a date, or enter a date to get its timestamp.",
      "Choose whether you're working in seconds or milliseconds.",
      "Copy the converted value.",
    ],
    faqs: [
      {
        question: "Does this handle milliseconds as well as seconds?",
        answer: "Yes, you can toggle between seconds and milliseconds for both directions.",
      },
    ],
  },
  {
    slug: "jwt-decoder",
    name: "JWT Decoder",
    description: "Decode a JWT's header and payload locally — no signature verification.",
    longDescription:
      "Paste a JSON Web Token to see its decoded header and payload. This tool decodes JWTs locally in your browser; it does not verify signatures and tokens are never sent anywhere.",
    category: "developer",
    icon: "KeyRound",
    keywords: ["jwt", "json web token", "decode", "auth"],
    type: "local",
    popularity: 72,
    featured: true,
    addedAt: "2025-01-07",
    howTo: [
      "Paste a JWT into the input box.",
      "The decoded header and payload appear automatically.",
      "Copy the decoded JSON if needed.",
    ],
    faqs: [
      {
        question: "Does this verify the token's signature?",
        answer:
          "No. This tool only decodes the Base64URL-encoded header and payload segments. It does not verify the signature, so a decoded token is not proof that it's authentic or untampered.",
      },
      {
        question: "Is my token sent to a server?",
        answer: "No, decoding happens entirely in your browser and the token is never transmitted.",
      },
    ],
  },
  {
    slug: "markdown-to-html",
    name: "Markdown to HTML",
    description: "Convert Markdown text into clean HTML with a live preview.",
    longDescription:
      "Write or paste Markdown and instantly see the rendered preview alongside the generated HTML source, ready to copy into your project.",
    category: "developer",
    icon: "FileText",
    keywords: ["markdown", "html", "convert", "preview"],
    type: "local",
    popularity: 62,
    featured: false,
    addedAt: "2025-01-08",
    howTo: [
      "Type or paste Markdown into the editor.",
      "View the live HTML preview.",
      "Copy the generated HTML.",
    ],
    faqs: [
      {
        question: "Which Markdown flavor is supported?",
        answer: "Standard Markdown syntax including headings, lists, links, code blocks, and emphasis.",
      },
    ],
  },
  {
    slug: "html-formatter",
    name: "HTML Formatter",
    description: "Beautify messy or minified HTML with consistent indentation.",
    longDescription:
      "Clean up HTML markup with consistent indentation and line breaks, making it easier to read and debug.",
    category: "developer",
    icon: "Code2",
    keywords: ["html", "format", "beautify", "indent"],
    type: "local",
    popularity: 55,
    featured: false,
    addedAt: "2025-01-09",
    howTo: ["Paste your HTML.", "Click Format.", "Copy the beautified markup."],
    faqs: [
      {
        question: "Will this change my HTML's behavior?",
        answer: "No, only whitespace and indentation are changed; tags and attributes are preserved.",
      },
    ],
  },
  {
    slug: "css-formatter",
    name: "CSS Formatter",
    description: "Beautify or minify CSS stylesheets instantly in your browser.",
    longDescription:
      "Format compressed CSS into a readable structure, or minify readable CSS down for production use.",
    category: "developer",
    icon: "Paintbrush",
    keywords: ["css", "format", "beautify", "minify"],
    type: "local",
    popularity: 55,
    featured: false,
    addedAt: "2025-01-09",
    howTo: ["Paste your CSS.", "Choose Format or Minify.", "Copy the result."],
    faqs: [
      {
        question: "Does this validate CSS syntax?",
        answer: "It performs basic formatting; it doesn't fully validate CSS against the spec.",
      },
    ],
  },
  {
    slug: "javascript-formatter",
    name: "JavaScript Formatter",
    description: "Beautify minified or messy JavaScript code for easier reading.",
    longDescription:
      "Clean up JavaScript code with consistent indentation and spacing so it's easier to read, review, and debug.",
    category: "developer",
    icon: "FileCode",
    keywords: ["javascript", "js", "format", "beautify"],
    type: "local",
    popularity: 58,
    featured: false,
    addedAt: "2025-01-09",
    howTo: ["Paste your JavaScript code.", "Click Format.", "Copy the beautified code."],
    faqs: [
      {
        question: "Does this run or evaluate my code?",
        answer: "No, your code is only reformatted for readability — it is never executed.",
      },
    ],
  },
  {
    slug: "color-converter",
    name: "Color Converter",
    description: "Convert colors between HEX, RGB, and HSL formats instantly.",
    longDescription:
      "Enter a color in HEX, RGB, or HSL format and instantly see it converted to the other formats, with a live preview swatch.",
    category: "image",
    icon: "Palette",
    keywords: ["color", "hex", "rgb", "hsl", "convert"],
    type: "local",
    popularity: 64,
    featured: false,
    addedAt: "2025-01-10",
    howTo: [
      "Enter a color in HEX, RGB, or HSL format.",
      "See it instantly converted to the other formats.",
      "Copy any of the values.",
    ],
    faqs: [
      {
        question: "What color formats are supported as input?",
        answer: "HEX (#RRGGBB or #RGB), rgb()/rgba(), and hsl()/hsla() are all supported.",
      },
    ],
  },
  {
    slug: "word-counter",
    name: "Word Counter",
    description: "Count words, characters, sentences, paragraphs, and estimated reading time.",
    longDescription:
      "Paste any text to instantly see word count, character count, sentence and paragraph counts, and an estimated reading time.",
    category: "text",
    icon: "Type",
    keywords: ["word count", "character count", "reading time", "text"],
    type: "local",
    popularity: 78,
    featured: true,
    addedAt: "2025-01-06",
    howTo: ["Paste or type your text.", "View live statistics below the editor."],
    faqs: [
      {
        question: "How is reading time calculated?",
        answer: "Reading time is estimated using an average adult reading speed of about 225 words per minute.",
      },
    ],
  },
  {
    slug: "lorem-ipsum-generator",
    name: "Lorem Ipsum Generator",
    description: "Generate placeholder Lorem Ipsum text by words, sentences, or paragraphs.",
    longDescription:
      "Quickly generate placeholder text for mockups and layouts, choosing the exact number of words, sentences, or paragraphs you need.",
    category: "text",
    icon: "AlignLeft",
    keywords: ["lorem ipsum", "placeholder", "dummy text", "filler"],
    type: "local",
    popularity: 52,
    featured: false,
    addedAt: "2025-01-10",
    howTo: [
      "Choose words, sentences, or paragraphs.",
      "Set how many you need.",
      "Click Generate and copy the result.",
    ],
    faqs: [
      {
        question: "Why is my text called 'Lorem Ipsum'?",
        answer:
          "Lorem Ipsum is scrambled Latin text that has been used as placeholder copy in printing and design since the 1500s.",
      },
    ],
  },
  {
    slug: "youtube-title-generator",
    name: "YouTube Title Generator",
    description: "Generate compelling, truthful YouTube video title ideas with AI.",
    longDescription:
      "Describe your video's topic and get multiple title options crafted to be engaging without resorting to misleading clickbait.",
    category: "creator",
    icon: "Youtube",
    keywords: ["youtube", "title", "video", "ai", "generator"],
    type: "ai",
    popularity: 90,
    featured: true,
    addedAt: "2025-01-12",
    howTo: [
      "Describe your video's topic in a sentence or two.",
      "Click Generate.",
      "Review the AI-generated title, then copy or regenerate.",
    ],
    faqs: [
      {
        question: "Will the titles be misleading clickbait?",
        answer:
          "No. The AI is instructed to write compelling but truthful titles and avoid deceptive clickbait.",
      },
      {
        question: "Should I edit the AI's suggestions?",
        answer:
          "Yes — treat AI output as a starting point. Review it before publishing, as noted on the tool.",
      },
    ],
  },
  {
    slug: "youtube-description-generator",
    name: "YouTube Description Generator",
    description: "Write an engaging, SEO-friendly YouTube video description with AI.",
    longDescription:
      "Provide your video's topic and key points, and get a ready-to-edit description with a hook, summary, and call to action.",
    category: "creator",
    icon: "Youtube",
    keywords: ["youtube", "description", "video", "ai", "seo"],
    type: "ai",
    popularity: 74,
    featured: false,
    addedAt: "2025-01-12",
    howTo: [
      "Enter your video's topic.",
      "Optionally add key points to include.",
      "Click Generate and review the description.",
    ],
    faqs: [
      {
        question: "Will it invent facts about my video?",
        answer:
          "The AI is instructed not to fabricate facts. Always review the output and adjust details to match your actual video.",
      },
    ],
  },
  {
    slug: "ai-prompt-generator",
    name: "AI Prompt Generator",
    description: "Turn a short goal into a clear, detailed prompt for any AI assistant.",
    longDescription:
      "Describe what you're trying to accomplish, and get a well-structured prompt — with context, constraints, and output format — ready to paste into your favorite AI tool.",
    category: "ai",
    icon: "Sparkles",
    keywords: ["ai prompt", "prompt generator", "prompt engineering"],
    type: "ai",
    popularity: 88,
    featured: true,
    addedAt: "2025-01-13",
    howTo: [
      "Describe your goal in a sentence or two.",
      "Click Generate.",
      "Copy the resulting prompt into your AI tool of choice.",
    ],
    faqs: [
      {
        question: "Which AI assistant is this compatible with?",
        answer: "The generated prompts are plain text and work with any AI chat assistant.",
      },
    ],
  },
  {
    slug: "ai-prompt-optimizer",
    name: "AI Prompt Optimizer",
    description: "Improve an existing AI prompt's clarity, specificity, and structure.",
    longDescription:
      "Paste a prompt you've already written and get an improved version with better clarity, constraints, and output format — plus an explanation of what changed.",
    category: "ai",
    icon: "Wand2",
    keywords: ["prompt optimizer", "prompt engineering", "improve prompt"],
    type: "ai",
    popularity: 76,
    featured: false,
    addedAt: "2025-01-13",
    howTo: [
      "Paste your existing prompt.",
      "Click Optimize.",
      "Review the improved prompt and the explanation of changes.",
    ],
    faqs: [
      {
        question: "Will it change what I'm trying to accomplish?",
        answer:
          "No, the AI is instructed to preserve your intended goal while improving clarity and structure.",
      },
    ],
  },
];

export function getAllTools(): ToolMeta[] {
  return TOOLS;
}

export function getToolBySlug(slug: string): ToolMeta | undefined {
  return TOOLS.find((tool) => tool.slug === slug);
}

export function getToolsByCategory(category: ToolCategory): ToolMeta[] {
  return TOOLS.filter((tool) => tool.category === category);
}

export function getFeaturedTools(): ToolMeta[] {
  return TOOLS.filter((tool) => tool.featured);
}

export function getPopularTools(limit: number = 6): ToolMeta[] {
  return [...TOOLS].sort((a, b) => b.popularity - a.popularity).slice(0, limit);
}

export function getRecentTools(limit: number = 6): ToolMeta[] {
  return [...TOOLS]
    .sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime())
    .slice(0, limit);
}

export function getRelatedTools(tool: ToolMeta, limit: number = 4): ToolMeta[] {
  return TOOLS.filter((t) => t.slug !== tool.slug && t.category === tool.category)
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, limit);
}

export function searchTools(query: string): ToolMeta[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return TOOLS.filter((tool) => {
    const haystack = [tool.name, tool.description, tool.category, ...tool.keywords]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}
