import { TranslationErrorCode } from "./TranslationErrorCode";

/**
 * Returned during translation when the translation could be finished
 */
export class TranslationError {
  public code: TranslationErrorCode;
  public message: string;

  constructor(code: TranslationErrorCode, message: string) {
    this.code = code;
    this.message = message;
  }
}
