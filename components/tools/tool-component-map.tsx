import type { ComponentType } from "react";
import { JsonFormatterTool } from "@/components/tools/JsonFormatterTool";
import { JsonValidatorTool } from "@/components/tools/JsonValidatorTool";
import { JsonToTypeScriptTool } from "@/components/tools/JsonToTypeScriptTool";
import { RegexTesterTool } from "@/components/tools/RegexTesterTool";
import { UuidGeneratorTool } from "@/components/tools/UuidGeneratorTool";
import { Base64Tool } from "@/components/tools/Base64Tool";
import { UrlEncoderTool } from "@/components/tools/UrlEncoderTool";
import { TimestampTool } from "@/components/tools/TimestampTool";
import { JwtDecoderTool } from "@/components/tools/JwtDecoderTool";
import { MarkdownToHtmlTool } from "@/components/tools/MarkdownToHtmlTool";
import { HtmlFormatterTool } from "@/components/tools/HtmlFormatterTool";
import { CssFormatterTool } from "@/components/tools/CssFormatterTool";
import { JavascriptFormatterTool } from "@/components/tools/JavascriptFormatterTool";
import { ColorConverterTool } from "@/components/tools/ColorConverterTool";
import { WordCounterTool } from "@/components/tools/WordCounterTool";
import { LoremIpsumTool } from "@/components/tools/LoremIpsumTool";
import { YoutubeTitleGeneratorTool } from "@/components/tools/YoutubeTitleGeneratorTool";
import { YoutubeDescriptionGeneratorTool } from "@/components/tools/YoutubeDescriptionGeneratorTool";
import { AiPromptGeneratorTool } from "@/components/tools/AiPromptGeneratorTool";
import { AiPromptOptimizerTool } from "@/components/tools/AiPromptOptimizerTool";

export const TOOL_COMPONENTS: Record<string, ComponentType> = {
  "json-formatter": JsonFormatterTool,
  "json-validator": JsonValidatorTool,
  "json-to-typescript": JsonToTypeScriptTool,
  "regex-tester": RegexTesterTool,
  "uuid-generator": UuidGeneratorTool,
  base64: Base64Tool,
  "url-encoder": UrlEncoderTool,
  timestamp: TimestampTool,
  "jwt-decoder": JwtDecoderTool,
  "markdown-to-html": MarkdownToHtmlTool,
  "html-formatter": HtmlFormatterTool,
  "css-formatter": CssFormatterTool,
  "javascript-formatter": JavascriptFormatterTool,
  "color-converter": ColorConverterTool,
  "word-counter": WordCounterTool,
  "lorem-ipsum-generator": LoremIpsumTool,
  "youtube-title-generator": YoutubeTitleGeneratorTool,
  "youtube-description-generator": YoutubeDescriptionGeneratorTool,
  "ai-prompt-generator": AiPromptGeneratorTool,
  "ai-prompt-optimizer": AiPromptOptimizerTool,
};
