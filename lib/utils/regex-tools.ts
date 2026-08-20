export interface RegexMatch {
  match: string;
  index: number;
  groups: string[];
}

export interface RegexTestResult {
  success: boolean;
  matches?: RegexMatch[];
  error?: string;
}

export function testRegex(
  pattern: string,
  testString: string,
  flags: string
): RegexTestResult {
  if (!pattern) {
    return { success: false, error: "Please enter a regular expression pattern." };
  }

  let regex: RegExp;
  try {
    const safeFlags = flags.includes("g") ? flags : `${flags}g`;
    regex = new RegExp(pattern, safeFlags);
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Invalid regular expression.",
    };
  }

  const matches: RegexMatch[] = [];
  let match: RegExpExecArray | null;
  let iterations = 0;

  while ((match = regex.exec(testString)) !== null && iterations < 1000) {
    matches.push({
      match: match[0],
      index: match.index,
      groups: match.slice(1),
    });
    if (match[0] === "") {
      regex.lastIndex += 1;
    }
    iterations += 1;
  }

  return { success: true, matches };
}

export const COMMON_REGEX_EXAMPLES = [
  { label: "Email address", pattern: "[\\w.+-]+@[\\w-]+\\.[\\w.-]+" },
  { label: "URL", pattern: "https?:\\/\\/[\\w.-]+(?:\\.[\\w\\.-]+)+[\\w\\-\\._~:/?#[\\]@!\\$&'\\(\\)\\*\\+,;=.]+" },
  { label: "IPv4 address", pattern: "\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b" },
  { label: "Hex color", pattern: "#(?:[0-9a-fA-F]{3}){1,2}\\b" },
  { label: "Digits only", pattern: "\\d+" },
  { label: "Whitespace", pattern: "\\s+" },
];
