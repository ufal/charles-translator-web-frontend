/**
 * Interprets commands in the spoken text
 * and constructs the resulting desired written text
 */
export class CzechSpeechInterpreter {
  /**
   * The raw speech transcription, only words separated by spaces. No newlines.
   */
  private spokenText: string;

  /**
   * Collects parts of the final output string. It gets concatenated at the end.
   */
  private outputStringBuilder: string[] = [];

  /**
   * True when the output stands on a new empty line. This controls
   * whether an emitted word should be preceeded by a space.
   */
  private onNewLine: boolean = true;

  constructor(spokenText: string) {
    this.spokenText = spokenText;
  }

  public run(): string {
    this.outputStringBuilder = [];
    this.onNewLine = true;

    const words = this.spokenText.split(" ");
    for (let i = 0; i < words.length; i++) {
      this.processFrame(words[i], words[i - 1]);
    }

    return this.outputStringBuilder.join("");
  }

  private processFrame(word: string, previousWord: string | undefined) {
    // TODO: implement commands

    this.emitWord(word);
  }

  private emitWord(word: string) {
    if (this.onNewLine) {
      this.outputStringBuilder.push(" ");
    }
    this.outputStringBuilder.push(word);
    this.onNewLine = false;
  }

  private emitNewline() {
    this.outputStringBuilder.push("\n");
    this.onNewLine = true;
  }
}
