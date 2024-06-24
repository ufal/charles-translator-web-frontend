import { IsoLanguage } from "../translation/domain/IsoLanguage";

/**
 * Represents the translation target information (the output text,
 * language, errors, loading state)
 */
export interface TargetInfo {
  /**
   * The translated text in the target field (exactly)
   */
  readonly text: string;

  /**
   * The language to translate to (as selected in the language switcher)
   */
  readonly language: IsoLanguage;

  /**
   * Is the target text being loaded from the backend
   */
  readonly isLoading: boolean;

  /**
   * If something fails (usually the network), the error message
   * will be strored here
   */
  readonly loadingError: string | null;
}

export const DEFAULT_TARGET_INFO: TargetInfo = {
  text: "",
  language: "uk",
  isLoading: false,
  loadingError: null,
};