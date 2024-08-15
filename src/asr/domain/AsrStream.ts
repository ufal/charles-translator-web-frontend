export type NewAudioHandler = (buffer: AudioBuffer) => void;
export type TextUpdatedHandler = (newText: string, oldText: string) => void;

/**
 * Represents a stream of audio going into an ASR model
 * and a stream of text going out of the model.
 * The stream is created by the user and passed into an ASR model.
 */
export class AsrStream {
  /**
   * Must be set by the ASR model before the first audio is sent by the user
   */
  public onNewAudio: NewAudioHandler | null = null;

  /**
   * Must be set by the user before the first text is produced by the ASR model
   */
  public onTextUpdated: TextUpdatedHandler | null = null;

  /**
   * The state of text that was last sent to the user
   */
  private lastSentText: string = "";

  /**
   * Sends an audio buffer to the ASR model
   */
  public sendAudioBuffer(buffer: AudioBuffer) {
    if (this.onNewAudio === null) {
      throw new Error("The onNewAudio handler has not been set yet");
    }
    this.onNewAudio(buffer);
  }

  /**
   * Sends a new version of the entire recognized text to the user
   */
  public updateText(newText: string) {
    if (this.onTextUpdated === null) {
      throw new Error("The onNewText handler has not been set yet");
    }
    this.onTextUpdated(newText, this.lastSentText);
    this.lastSentText = newText;
  }

  /**
   * Closes the stream
   * (can be called by the user as well as the ASR model)
   */
  public close() {
    // TODO
  }
}
