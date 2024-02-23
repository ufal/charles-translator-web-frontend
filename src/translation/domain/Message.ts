import { IsoLanguage } from "./IsoLanguage";
import { MessageInputMethod } from "./MessageInputMethod";
import { User } from "./User";

/**
 * A message in a specific language that can be translated to some other language
 */
export class Message {
  /**
   * What language is this message written in
   */
  public readonly language: IsoLanguage;

  /**
   * Plain-text body of the message
   */
  public readonly text: string;

  /**
   * The author of the message (a translation system user)
   * It's the original author of the message in the language in which the
   * message entered the system.
   */
  public readonly author: User;

  /**
   * Is this message the original message entered by the user,
   * or an already translated message produced by some translation step?
   * (originality is tracked with regards to pivoted translation only,
   * not saved translations in history or any other way)
   */
  public readonly isOriginal: boolean;

  /**
   * The method by which the original message was created
   */
  public readonly originalInputMethod: MessageInputMethod;

  /**
   * Input method by which this message was created
   */
  public get inputMethod(): MessageInputMethod {
    if (this.isOriginal) {
      return this.originalInputMethod;
    }
    return MessageInputMethod.Translation;
  }

  constructor(data: {
    language: IsoLanguage;
    text: string;
    author: User;
    isOriginal: boolean;
    originalInputMethod: MessageInputMethod;
  }) {
    this.language = data.language;
    this.text = data.text;
    this.author = data.author;
    this.isOriginal = data.isOriginal;
    this.originalInputMethod = data.originalInputMethod;

    if (
      this.originalInputMethod === MessageInputMethod.Translation &&
      this.isOriginal
    ) {
      throw Error(
        "Original message cannot have been created by previous translation.",
      );
    }
  }

  /**
   * Creates a translated version of this message
   */
  public makeTranslation(newLanguage: IsoLanguage, newText: string): Message {
    return new Message({
      language: newLanguage,
      text: newText,
      author: this.author,
      isOriginal: false, // it's been translated so it's definitely not original
      originalInputMethod: this.originalInputMethod,
    });
  }
}
