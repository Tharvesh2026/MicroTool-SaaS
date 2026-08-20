"use client";

import { EncodeDecodeTool } from "./EncodeDecodeTool";
import { encodeBase64, decodeBase64 } from "@/lib/utils/base64";

export function Base64Tool() {
  return (
    <EncodeDecodeTool
      encode={encodeBase64}
      decode={decodeBase64}
      inputLabel="Text or Base64"
      outputLabel="Result"
      downloadFilename="base64-output.txt"
      placeholder="Enter text to encode, or Base64 to decode…"
    />
  );
}
