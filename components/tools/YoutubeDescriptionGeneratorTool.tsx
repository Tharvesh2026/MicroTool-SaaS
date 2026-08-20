"use client";

import { AIToolShell } from "./AIToolShell";

export function YoutubeDescriptionGeneratorTool() {
  return (
    <AIToolShell
      toolId="youtube-description-generator"
      topicLabel="What's your video about?"
      topicPlaceholder="e.g. A tutorial on setting up a home espresso station"
      exampleTopics={["A tour of my home office setup", "10-minute morning yoga routine"]}
      showDetails
      detailsLabel="Key points to include (optional)"
      detailsPlaceholder="e.g. timestamps, gear list, discount code"
      generateLabel="Generate description"
    />
  );
}
