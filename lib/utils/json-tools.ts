export interface JsonResult {
  success: boolean;
  output?: string;
  error?: string;
}

/**
 * Parses a JSON string and returns a friendly error message with line/column
 * information when parsing fails.
 */
export function parseJsonWithError(input: string): JsonResult {
  if (!input || !input.trim()) {
    return { success: false, error: "Please enter some JSON to process." };
  }

  try {
    const parsed = JSON.parse(input);
    return { success: true, output: JSON.stringify(parsed) };
  } catch (err) {
    return { success: false, error: formatJsonError(err, input) };
  }
}

function formatJsonError(err: unknown, input: string): string {
  const message = err instanceof Error ? err.message : "Invalid JSON";

  // Most JS engines include a character position in the message, e.g.
  // "Unexpected token } in JSON at position 42"
  const positionMatch = message.match(/position (\d+)/i);
  if (positionMatch) {
    const position = Number(positionMatch[1]);
    const { line, column } = getLineAndColumn(input, position);
    return `${message} (line ${line}, column ${column})`;
  }

  const lineColMatch = message.match(/line (\d+) column (\d+)/i);
  if (lineColMatch) {
    return message;
  }

  return message;
}

function getLineAndColumn(input: string, position: number) {
  const upToPosition = input.slice(0, position);
  const lines = upToPosition.split("\n");
  const line = lines.length;
  const column = lines[lines.length - 1].length + 1;
  return { line, column };
}

export function formatJson(input: string, indent: number = 2): JsonResult {
  if (!input || !input.trim()) {
    return { success: false, error: "Please enter some JSON to format." };
  }
  try {
    const parsed = JSON.parse(input);
    return { success: true, output: JSON.stringify(parsed, null, indent) };
  } catch (err) {
    return { success: false, error: formatJsonError(err, input) };
  }
}

export function minifyJson(input: string): JsonResult {
  if (!input || !input.trim()) {
    return { success: false, error: "Please enter some JSON to minify." };
  }
  try {
    const parsed = JSON.parse(input);
    return { success: true, output: JSON.stringify(parsed) };
  } catch (err) {
    return { success: false, error: formatJsonError(err, input) };
  }
}

export function validateJson(input: string): JsonResult {
  if (!input || !input.trim()) {
    return { success: false, error: "Please enter some JSON to validate." };
  }
  try {
    JSON.parse(input);
    return { success: true, output: "Valid JSON" };
  } catch (err) {
    return { success: false, error: formatJsonError(err, input) };
  }
}

// --- JSON to TypeScript -----------------------------------------------

export interface JsonToTsOptions {
  rootName?: string;
  optionalProperties?: boolean;
  exportInterfaces?: boolean;
}

export function jsonToTypeScript(
  input: string,
  options: JsonToTsOptions = {}
): JsonResult {
  const { rootName = "Root", optionalProperties = false, exportInterfaces = true } = options;

  if (!input || !input.trim()) {
    return { success: false, error: "Please enter some JSON to convert." };
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(input);
  } catch (err) {
    return { success: false, error: formatJsonError(err, input) };
  }

  const interfaces = new Map<string, string>();
  const usedNames = new Set<string>();

  function toPascalCase(name: string): string {
    const cleaned = name.replace(/[^a-zA-Z0-9]+/g, " ").trim();
    if (!cleaned) return "Field";
    return cleaned
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("");
  }

  function uniqueName(base: string): string {
    let candidate = base;
    let counter = 2;
    while (usedNames.has(candidate)) {
      candidate = `${base}${counter}`;
      counter += 1;
    }
    usedNames.add(candidate);
    return candidate;
  }

  function typeOfValue(value: unknown, suggestedName: string): string {
    if (value === null) return "null";
    if (Array.isArray(value)) {
      if (value.length === 0) return "unknown[]";
      const elementTypes = new Set(
        value.map((item) => typeOfValue(item, suggestedName))
      );
      if (elementTypes.size === 1) {
        return `${[...elementTypes][0]}[]`;
      }
      return `(${[...elementTypes].join(" | ")})[]`;
    }
    switch (typeof value) {
      case "string":
        return "string";
      case "number":
        return "number";
      case "boolean":
        return "boolean";
      case "object": {
        const name = uniqueName(toPascalCase(suggestedName));
        buildInterface(name, value as Record<string, unknown>);
        return name;
      }
      default:
        return "unknown";
    }
  }

  function buildInterface(name: string, obj: Record<string, unknown>) {
    const lines: string[] = [];
    const exportKeyword = exportInterfaces ? "export " : "";
    lines.push(`${exportKeyword}interface ${name} {`);
    for (const [key, value] of Object.entries(obj)) {
      const safeKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : `"${key}"`;
      const optionalMark = optionalProperties ? "?" : "";
      const type = typeOfValue(value, key);
      lines.push(`  ${safeKey}${optionalMark}: ${type};`);
    }
    lines.push("}");
    interfaces.set(name, lines.join("\n"));
  }

  const rootTypeName = uniqueName(toPascalCase(rootName));

  if (Array.isArray(parsed)) {
    const elementType = typeOfValue(parsed[0] ?? {}, rootName);
    const output = [...interfaces.values()].join("\n\n");
    return {
      success: true,
      output: `${output}${output ? "\n\n" : ""}type ${rootTypeName} = ${elementType}[];`,
    };
  }

  if (typeof parsed === "object" && parsed !== null) {
    buildInterface(rootTypeName, parsed as Record<string, unknown>);
    return { success: true, output: [...interfaces.values()].join("\n\n") };
  }

  return {
    success: true,
    output: `type ${rootTypeName} = ${typeOfValue(parsed, rootName)};`,
  };
}
