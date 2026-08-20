"use client";

import { AIToolShell } from "./AIToolShell";

export function AiPromptOptimizerTool() {
  return (
    <AIToolShell
      toolId="ai-prompt-optimizer"
      topicLabel="Paste your existing prompt"
      topicPlaceholder="e.g. Write me a blog post about coffee"
      exampleTopics={[]}
      multilineTopic
      maxTopicLength={2000}
      generateLabel="Optimize prompt"
    />
  );
}
