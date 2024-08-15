import { IsoLanguage } from "../../../translation/domain/IsoLanguage";
import { AsrModel } from "../../domain/AsrModel";
import { AsrStream } from "../../domain/AsrStream";
import { CunispeechAsrStreamProcessor } from "./CunispeechAsrStreamProcessor";

export const CUNISPEECH_URL =
  "wss://lindat.cz/services/cunispeech/socket.io:8082";

const SUPPORTED_LANGUAGES = new Set<IsoLanguage>(["cs"]);

/**
 * Uses the "cunispeech" LINDAT service for ASR via a WebSocket connection
 */
export class LindatCunispeechModel implements AsrModel {
  public get supportedLanguages() {
    return SUPPORTED_LANGUAGES;
  }

  public get desiredSampleRateHz(): number {
    return 12; // TODO
  }

  public get desiredChunkDurationSeconds(): number {
    return 12; // TODO
  }

  public processAsrStream(stream: AsrStream): void {
    const processor = new CunispeechAsrStreamProcessor(
      stream,
      this.desiredSampleRateHz,
    );
    processor.start();
  }
}
