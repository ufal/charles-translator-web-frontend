import { AsrStream } from "../../domain/AsrStream";
import { CUNISPEECH_URL } from "./LindatCunispeechModel";
import { Segment } from "./Segment";
import { CzechSpeechInterpreter } from "./CzechSpeechInterpreter";
import { segmentsToSpokenText } from "./segmentsToSpokenText";
import { downsampleBuffer } from "../../audio/downsampleBuffer";

/**
 * Encapsulates the processing and state necessary
 * for handling a single ASR stream
 */
export class CunispeechAsrStreamProcessor {
  private stream: AsrStream;
  private socket: WebSocket;
  private segments: Segment[];
  private readonly desiredSampleRateHz: number;

  constructor(stream: AsrStream, desiredSampleRateHz: number) {
    // TODO: check stream not closed

    this.stream = stream;
    this.attachStreamListeners();

    this.socket = new WebSocket(CUNISPEECH_URL);
    this.attachSocketListeners();

    this.segments = [];
    this.desiredSampleRateHz = desiredSampleRateHz;
  }

  private attachStreamListeners() {
    this.stream.onNewAudio = this.onNewAudio.bind(this);
  }

  private attachSocketListeners() {
    this.socket.addEventListener("open", (e) => {
      // TODO: handle connection openned
    });

    this.socket.addEventListener("close", (e) => {
      // TODO: handle connection closed
    });

    this.socket.addEventListener("message", (e) => {
      const segment = JSON.parse(e.data) as Segment;
      this.onSegmentReceived(segment);
    });
  }

  public start() {
    // TODO
  }

  /**
   * Invoked when a new audio chunk is available from the microphone
   */
  private onNewAudio(buffer: AudioBuffer) {
    // we listen only on the first (left) channel
    const inputSamples = buffer.getChannelData(0);

    const downsampledSamples = downsampleBuffer(
      inputSamples,
      buffer.sampleRate, // input rate
      Math.min(this.desiredSampleRateHz, buffer.sampleRate), // target rate
    );

    // send samples via the web socket connection to server
    this.socket.send(downsampledSamples);
  }

  /**
   * Invoked when a new segment is received by the socket
   * (or an update to the last segment)
   */
  private onSegmentReceived(segment: Segment) {
    if (segment.segment < 0 || segment.segment > this.segments.length) {
      throw new Error("Received segment has an unexpected segment number");
    }

    // this will actually make the array grow when outside the range
    this.segments[segment.segment] = segment;

    this.sendTextToStream();
  }

  /**
   * Compiles a string representation of received segments and sends it
   * into the ASR stream
   */
  private sendTextToStream() {
    const spokenText = segmentsToSpokenText(this.segments);
    const interpreter = new CzechSpeechInterpreter(spokenText);
    const intendedText = interpreter.run();

    this.stream.updateText(intendedText);
  }
}
