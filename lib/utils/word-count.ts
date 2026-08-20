export interface WordCountStats {
  words: number;
  characters: number;
  charactersNoSpaces: number;
  sentences: number;
  paragraphs: number;
  readingTimeMinutes: number;
}

const WORDS_PER_MINUTE = 225;

export function countWords(input: string): WordCountStats {
  const text = input ?? "";
  const trimmed = text.trim();

  const words = trimmed.length === 0 ? 0 : trimmed.split(/\s+/).length;
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, "").length;

  const sentenceMatches = trimmed.match(/[^.!?]+[.!?]+|\S+$/g);
  const sentences = trimmed.length === 0 ? 0 : (sentenceMatches?.length ?? (trimmed ? 1 : 0));

  const paragraphs =
    trimmed.length === 0
      ? 0
      : trimmed.split(/\n\s*\n/).filter((p) => p.trim().length > 0).length;

  const readingTimeMinutes = words === 0 ? 0 : Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));

  return { words, characters, charactersNoSpaces, sentences, paragraphs, readingTimeMinutes };
}
