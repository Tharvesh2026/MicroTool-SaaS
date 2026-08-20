"use client";

import { AsyncFormatterTool } from "./AsyncFormatterTool";
import { formatCss } from "@/lib/utils/code-format";

export function CssFormatterTool() {
  return (
    <AsyncFormatterTool
      format={formatCss}
      placeholder=".class { color: red; margin:0 }"
      downloadFilename="formatted.css"
    />
  );
}
