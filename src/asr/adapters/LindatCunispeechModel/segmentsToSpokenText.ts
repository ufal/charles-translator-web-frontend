import { Segment } from "./Segment";

/**
 * Returns a transcription of what the person said for real.
 * No leading spaces, but also no punctuation. Just a sequence of words.
 * Also no newlines or paragraphs or anything.
 */
export function segmentsToSpokenText(segments: Segment[]): string {
  return segments
    .map((s) => s.text)
    .join("")
    .trim();
}
