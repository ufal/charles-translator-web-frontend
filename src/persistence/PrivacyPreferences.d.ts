/**
 * Dataclass that encapsulates user's privacy preferences
 */
export interface PrivacyPreferences {
  /**
   * Whether the translation input-output data can be collected
   */
  readonly allowsDataCollection: boolean;

  /**
   * Whether cookies can be used
   */
  readonly allowsCookies: boolean;
}
