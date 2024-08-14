/**
 * List of explicitly UI-implemented input modes
 */
export enum UiInputMode {
  /**
   * No input mode is active
   * (the source text field is not focused)
   */
  None = "none",

  /**
   * The native text field input method provided by the user agent (browser),
   * this is hardware keyboard for PCs and OS-based virtual keyboard for
   * mobiles. This corresponds to the text field having focus.
   */
  UserAgentNative = "user-agent-native",

  /**
   * Automatic speech recognition
   */
  ASR = "asr",

  /**
   * Virtual keyboard provided by the app itself, NOT the operating system
   */
  VirtualKeyboard = "virtual-keyboard",

  /**
   * ASR on audio coming from another browser tab
   */
  AudioCapture = "audio-capture",

  // Possible additions may be:
  // -----------------------------------------
  // HTR - handwritten text recognition
  // OCR - optical character recognition
}
