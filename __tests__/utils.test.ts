import { describe, it, expect } from "vitest";
import { encodeBase64, decodeBase64 } from "@/lib/utils/base64";
import { encodeUrl, decodeUrl } from "@/lib/utils/url-tools";
import { timestampToDate, dateToTimestamp } from "@/lib/utils/timestamp";
import { decodeJwt } from "@/lib/utils/jwt";
import { parseColor } from "@/lib/utils/color";
import { countWords } from "@/lib/utils/word-count";
import { generateUuidV4, generateUuids, isValidUuidV4 } from "@/lib/utils/uuid";
import { generateLoremIpsum } from "@/lib/utils/lorem";
import { testRegex } from "@/lib/utils/regex-tools";

describe("base64", () => {
  it("round-trips text through encode/decode", () => {
    const encoded = encodeBase64("Hello, world!");
    expect(encoded.success).toBe(true);
    const decoded = decodeBase64(encoded.output!);
    expect(decoded.success).toBe(true);
    expect(decoded.output).toBe("Hello, world!");
  });

  it("rejects invalid base64 on decode", () => {
    const result = decodeBase64("not-valid-base64!!!");
    expect(result.success).toBe(false);
  });

  it("rejects empty input", () => {
    expect(encodeBase64("").success).toBe(false);
    expect(decodeBase64("").success).toBe(false);
  });
});

describe("url encode/decode", () => {
  it("round-trips a query string", () => {
    const encoded = encodeUrl("hello world & friends?");
    expect(encoded.output).toBe("hello%20world%20%26%20friends%3F");
    const decoded = decodeUrl(encoded.output!);
    expect(decoded.output).toBe("hello world & friends?");
  });

  it("rejects malformed percent-encoding", () => {
    const result = decodeUrl("%E0%A4%A");
    expect(result.success).toBe(false);
  });
});

describe("timestamp conversion", () => {
  it("converts a unix seconds timestamp to an ISO date", () => {
    const result = timestampToDate("0", "seconds");
    expect(result.success).toBe(true);
    expect(result.output).toBe("1970-01-01T00:00:00.000Z");
  });

  it("converts a date string to a unix seconds timestamp", () => {
    const result = dateToTimestamp("1970-01-01T00:00:00.000Z", "seconds");
    expect(result.success).toBe(true);
    expect(result.output).toBe("0");
  });

  it("rejects non-numeric timestamps", () => {
    const result = timestampToDate("not-a-number");
    expect(result.success).toBe(false);
  });
});

describe("jwt decoder", () => {
  it("decodes header and payload without verifying signature", () => {
    // { "alg": "HS256", "typ": "JWT" } . { "sub": "123", "name": "Ada" }
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjMiLCJuYW1lIjoiQWRhIn0.signature";
    const result = decodeJwt(token);
    expect(result.success).toBe(true);
    expect(result.header).toEqual({ alg: "HS256", typ: "JWT" });
    expect(result.payload).toEqual({ sub: "123", name: "Ada" });
  });

  it("rejects tokens without three segments", () => {
    const result = decodeJwt("not.a.jwt.token.here");
    expect(result.success).toBe(false);
  });
});

describe("color conversion", () => {
  it("parses hex and returns rgb/hsl", () => {
    const result = parseColor("#FF0000");
    expect(result.success).toBe(true);
    expect(result.formats?.rgb).toBe("rgb(255, 0, 0)");
    expect(result.formats?.hsl).toBe("hsl(0, 100%, 50%)");
  });

  it("parses shorthand hex", () => {
    const result = parseColor("#0f0");
    expect(result.formats?.hex).toBe("#00FF00");
  });

  it("parses rgb() strings", () => {
    const result = parseColor("rgb(0, 0, 255)");
    expect(result.formats?.hex).toBe("#0000FF");
  });

  it("rejects unrecognized formats", () => {
    const result = parseColor("not-a-color");
    expect(result.success).toBe(false);
  });
});

describe("word counter", () => {
  it("counts words, characters, sentences, paragraphs", () => {
    const stats = countWords("Hello world. This is great!\n\nNew paragraph here.");
    expect(stats.words).toBe(8);
    expect(stats.sentences).toBe(3);
    expect(stats.paragraphs).toBe(2);
  });

  it("handles empty input", () => {
    const stats = countWords("");
    expect(stats.words).toBe(0);
    expect(stats.sentences).toBe(0);
  });
});

describe("uuid generator", () => {
  it("generates a valid v4 uuid", () => {
    const id = generateUuidV4();
    expect(isValidUuidV4(id)).toBe(true);
  });

  it("generates the requested number of uuids, capped at 1000", () => {
    expect(generateUuids(5)).toHaveLength(5);
    expect(generateUuids(5000)).toHaveLength(1000);
  });
});

describe("lorem ipsum generator", () => {
  it("generates the requested number of words", () => {
    const text = generateLoremIpsum(10, "words", false);
    expect(text.split(" ")).toHaveLength(10);
  });

  it("generates paragraphs separated by blank lines", () => {
    const text = generateLoremIpsum(2, "paragraphs", false);
    expect(text.split("\n\n")).toHaveLength(2);
  });
});

describe("regex tester", () => {
  it("finds all matches with capture groups", () => {
    const result = testRegex("(\\d+)-(\\d+)", "10-20 and 30-40", "");
    expect(result.success).toBe(true);
    expect(result.matches).toHaveLength(2);
    expect(result.matches?.[0].groups).toEqual(["10", "20"]);
  });

  it("returns an error for invalid patterns", () => {
    const result = testRegex("(", "test", "");
    expect(result.success).toBe(false);
  });
});
