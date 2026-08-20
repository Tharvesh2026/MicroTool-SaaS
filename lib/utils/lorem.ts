const LOREM_WORDS = (
  "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod " +
  "tempor incididunt ut labore et dolore magna aliqua ut enim ad minim " +
  "veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea " +
  "commodo consequat duis aute irure dolor in reprehenderit voluptate velit " +
  "esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat " +
  "cupidatat non proident sunt in culpa qui officia deserunt mollit anim id " +
  "est laborum"
).split(" ");

function randomWord(): string {
  return LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)];
}

function generateSentence(wordCount: number): string {
  const words = Array.from({ length: wordCount }, () => randomWord());
  const sentence = words.join(" ");
  return sentence.charAt(0).toUpperCase() + sentence.slice(1) + ".";
}

function generateParagraph(sentenceCount: number): string {
  return Array.from({ length: sentenceCount }, () =>
    generateSentence(5 + Math.floor(Math.random() * 10))
  ).join(" ");
}

export type LoremUnit = "words" | "sentences" | "paragraphs";

export function generateLoremIpsum(
  count: number,
  unit: LoremUnit,
  startWithLorem: boolean = true
): string {
  const safeCount = Math.min(Math.max(1, count), 200);
  let result: string;

  switch (unit) {
    case "words":
      result = Array.from({ length: safeCount }, () => randomWord()).join(" ");
      break;
    case "sentences":
      result = Array.from({ length: safeCount }, () =>
        generateSentence(6 + Math.floor(Math.random() * 8))
      ).join(" ");
      break;
    case "paragraphs":
    default:
      result = Array.from({ length: safeCount }, () =>
        generateParagraph(3 + Math.floor(Math.random() * 4))
      ).join("\n\n");
      break;
  }

  if (startWithLorem) {
    const prefix = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
    if (unit === "paragraphs") {
      const rest = result.split("\n\n").slice(1).join("\n\n");
      result = rest ? `${prefix} ${result.split("\n\n")[0]}\n\n${rest}` : prefix;
    } else {
      result = `${prefix} ${result}`;
    }
  }

  return result;
}
