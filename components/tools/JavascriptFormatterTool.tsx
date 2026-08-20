"use client";

import { AsyncFormatterTool } from "./AsyncFormatterTool";
import { formatJavaScript } from "@/lib/utils/code-format";

export function JavascriptFormatterTool() {
  return (
    <AsyncFormatterTool
      format={formatJavaScript}
      placeholder="function greet(name){return 'Hello '+name}"
      downloadFilename="formatted.js"
    />
  );
}
