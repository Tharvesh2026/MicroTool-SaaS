import { describe, it, expect } from "vitest";
import { formatJson, minifyJson, validateJson, jsonToTypeScript } from "@/lib/utils/json-tools";

describe("formatJson", () => {
  it("formats valid JSON with indentation", () => {
    const result = formatJson('{"a":1,"b":2}');
    expect(result.success).toBe(true);
    expect(result.output).toBe('{\n  "a": 1,\n  "b": 2\n}');
  });

  it("returns an error for invalid JSON", () => {
    const result = formatJson("{a:1}");
    expect(result.success).toBe(false);
    expect(result.error).toBeTruthy();
  });

  it("returns an error for empty input", () => {
    const result = formatJson("");
    expect(result.success).toBe(false);
  });
});

describe("minifyJson", () => {
  it("removes whitespace from JSON", () => {
    const result = minifyJson('{\n  "a": 1\n}');
    expect(result.success).toBe(true);
    expect(result.output).toBe('{"a":1}');
  });
});

describe("validateJson", () => {
  it("validates correct JSON", () => {
    const result = validateJson('{"valid": true}');
    expect(result.success).toBe(true);
  });

  it("rejects malformed JSON", () => {
    const result = validateJson('{"valid": true,}');
    expect(result.success).toBe(false);
  });
});

describe("jsonToTypeScript", () => {
  it("converts a flat object to an interface", () => {
    const result = jsonToTypeScript('{"name": "Ada", "age": 36}');
    expect(result.success).toBe(true);
    expect(result.output).toContain("export interface Root {");
    expect(result.output).toContain("name: string;");
    expect(result.output).toContain("age: number;");
  });

  it("converts nested objects into separate interfaces", () => {
    const result = jsonToTypeScript('{"user": {"id": 1}}');
    expect(result.success).toBe(true);
    expect(result.output).toContain("interface User {");
    expect(result.output).toContain("user: User;");
  });

  it("handles arrays of objects", () => {
    const result = jsonToTypeScript('[{"id": 1}]');
    expect(result.success).toBe(true);
    expect(result.output).toMatch(/type Root = Root2\[\];/);
    expect(result.output).toContain("id: number;");
  });

  it("returns an error for invalid JSON", () => {
    const result = jsonToTypeScript("not json");
    expect(result.success).toBe(false);
  });
});
