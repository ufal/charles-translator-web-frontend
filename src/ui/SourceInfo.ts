import { IsoLanguage } from "../translation/domain/IsoLanguage";
import { MessageInputMethod } from "../translation/domain/MessageInputMethod";
import { UiInputMode } from "./UiInputMode";

/**
 * Represents the translation source information (the text, language,
 * and additional metadata)
 */
export interface SourceInfo {
  /**
   * The text displayed in the source field (exactly)
   */
  readonly text: string;

  /**
   * The language of the source text (as selected in the language switcher)
   */
  readonly language: IsoLanguage;

  /**
   * With what method was the current source text created
   * (or most recently updated)
   */
  readonly messageInputMethod: MessageInputMethod;

  /**
   * What UI input method is currently active
   */
  readonly uiInputMode: UiInputMode;
}

export const DEFAULT_SOURCE_INFO: SourceInfo = {
  text: "",
  language: "cs",
  messageInputMethod: MessageInputMethod.Keyboard,
  uiInputMode: UiInputMode.None,
};
