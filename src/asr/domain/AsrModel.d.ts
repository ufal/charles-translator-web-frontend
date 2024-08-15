import { IsoLanguage } from "../../translation/domain/IsoLanguage";
import { AsrStream } from "./AsrStream";

/**
 * Represents an ASR model capable of recognizing input audio
 */
export interface AsrModel {
  /**
   * Set of supported input languages
   */
  readonly supportedLanguages: Set<IsoLanguage>;

  /**
   * Expected input sample rate (audio samples per second = Hz)
   */
  readonly desiredSampleRateHz: number;

  /**
   * How many seconds does an optimal audio chunk sent to the model have
   */
  readonly desiredChunkDurationSeconds: number;

  /**
   * Starts and handles the translation of a given new ASR stream
   */
  processAsrStream(stream: AsrStream): void;
}
