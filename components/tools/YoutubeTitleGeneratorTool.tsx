"use client";

import { AIToolShell } from "./AIToolShell";

export function YoutubeTitleGeneratorTool() {
  return (
    <AIToolShell
      toolId="youtube-title-generator"
      topicLabel="What's your video about?"
      topicPlaceholder="e.g. Beginner's guide to sourdough bread baking"
      exampleTopics={[
        "How I built a SaaS in 30 days",
        "Budget travel tips for Japan",
        "Home workout for beginners",
      ]}
      generateLabel="Generate titles"
    />
  );
}
