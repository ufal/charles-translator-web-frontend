/**
 * The cunispeech model returns translation in segments, continuously updating
 * the very recent segment. Each segments has cca 10 seconds. The coplete text
 * is obtained by concatenating results from individual segments.
 */
export interface Segment {
  // I don't know what this is, was always empty
  readonly context_scores: any[];

  /**
   * The server sets this value to true, when the next message to come
   * will be the next segment. Another words, when this is true, the
   * segment will no longer be updated by the model. It's in final state.
   */
  readonly is_final: boolean;

  // language model probabilities? I don't know... Array of negative floats,
  // one value for each returned token. Probbably logits.
  // Probbably to gauge recognition certainty.
  readonly lm_probs: number[];

  /**
   * Index of this segment, starting from 0 and incrementing up
   * (scoped to the web socket connection)
   */
  readonly segment: number;

  /**
   * Starting time of this segment in seconds, since the beginning of the
   * audio stream.
   */
  readonly start_time: number;

  /**
   * The plain text for the segment. Tokens are *somehow* concatenated by the
   * server. The text AFAIK always starts with a space, because most tokens
   * are in the form of a space and a word, e.g. " hello", " wor", "ld".
   */
  readonly text: string;

  /**
   * Timestamps of individual tokens in seconds.
   * Since the start of the audio or the segment? IDK.
   */
  readonly timestamps: number[];

  /**
   * Tokens detected in the audio. Each token is a short string, typically
   * a word or a sub-word unit.
   */
  readonly tokens: string[];

  // Probbably logit probabilities (negative floats) of the recognition model.
  // One value for each token.
  readonly ys_probs: number[];
}
