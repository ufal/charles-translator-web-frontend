/**
 * Numeric code for a translation error
 */
export enum TranslationErrorCode {
  /**
   * No error has in fact occured
   * (not really used, but still defined)
   */
  NoError = 0,

  /**
   * General, unspecified error
   */
  Failed = 1,

  /**
   * Message to be translated is too large
   */
  MessageTooLarge = 2,

  /**
   * The backend server cannot be reached
   */
  NoInternetConnection = 3,

  /**
   * The response from the backend server has unexpected format
   */
  InvalidServerResponseFormat = 4,

  /**
   * Translation process took too long and timed out
   */
  TranslationTimeout = 5,
}
