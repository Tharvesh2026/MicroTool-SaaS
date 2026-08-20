"use client";

import { AIToolShell } from "./AIToolShell";

export function AiPromptGeneratorTool() {
  return (
    <AIToolShell
      toolId="ai-prompt-generator"
      topicLabel="What do you want an AI to help you do?"
      topicPlaceholder="e.g. Write a product description for a wireless charger"
      exampleTopics={[
        "Summarize a research paper for a general audience",
        "Plan a 3-day itinerary for Rome",
      ]}
      generateLabel="Generate prompt"
    />
  );
}
