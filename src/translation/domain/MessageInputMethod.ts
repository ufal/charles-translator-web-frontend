/**
 * The method by which a message has been entered by the user
 */
export enum MessageInputMethod {
  /**
   * The message was typed on a keyboard
   */
  Keyboard = "keyboard",

  /**
   * The message was pasted into the input field from the clipboard
   */
  Clipboard = "clipboard",

  /**
   * The message was entered using ASR
   */
  Voice = "voice",

  /**
   * The message was loaded from the translation history
   */
  History = "history",

  /**
   * The message in its current form was produced by another translation step
   * during pivoted translation
   */
  Translation = "translation",
}
