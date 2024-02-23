import { IsoLanguage } from "./IsoLanguage";
import { Message } from "./Message";
import { TranslationError } from "./TranslationError";

/**
 * A single translation step between two languages
 * (encapsulates the invocation of a single direct translation model)
 */
export interface TranslationStep {
  /**
   * The language from which this step translates
   */
  readonly origin: IsoLanguage;

  /**
   * The language to which this step translates
   */
  readonly target: IsoLanguage;

  /**
   * Execute the translation on a given message by a user
   */
  executeOn(message: Message): Promise<Message | TranslationError>;
}
