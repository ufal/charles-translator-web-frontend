/**
 * Dataclass that encapsulates various user preferences
 * that can be set in the app settings
 */
 export interface UserPreferences {
  /**
   * Whether the translation input-output data can be collected
   */
  readonly organizationName: string;

  /**
   * In developer mode, more advanced options are available
   */
  readonly isDeveloperMode: boolean;

  /**
   * Store translation history in browser's local storage
   */
  readonly allowsLocalHistory: boolean;
}
