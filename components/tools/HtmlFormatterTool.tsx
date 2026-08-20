"use client";

import { AsyncFormatterTool } from "./AsyncFormatterTool";
import { formatHtml } from "@/lib/utils/code-format";

export function HtmlFormatterTool() {
  return (
    <AsyncFormatterTool
      format={formatHtml}
      placeholder="<div><p>Hello world</p></div>"
      downloadFilename="formatted.html"
    />
  );
}
