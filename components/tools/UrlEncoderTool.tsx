"use client";

import { EncodeDecodeTool } from "./EncodeDecodeTool";
import { encodeUrl, decodeUrl } from "@/lib/utils/url-tools";

export function UrlEncoderTool() {
  return (
    <EncodeDecodeTool
      encode={encodeUrl}
      decode={decodeUrl}
      inputLabel="Text or URL-encoded string"
      outputLabel="Result"
      downloadFilename="url-output.txt"
      placeholder="Enter text to encode, or a URL-encoded string to decode…"
    />
  );
}
