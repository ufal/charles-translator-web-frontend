import { PrivacyPreferences } from "./PrivacyPreferences";

/**
 * Provides access and persistance to user preferences regarding privacy
 * (data collection, cookies)
 */
export class PrivacyPreferencesRepository {
  private static readonly STORAGE_KEY = "charlesTranslator::privacyPreferences";

  /**
   * Loads user preferences from the local storage,
   * returns null if the used has not set them yet
   */
  public load(): PrivacyPreferences | null {
    const json = window.localStorage.getItem(
      PrivacyPreferencesRepository.STORAGE_KEY,
    );

    if (json === null) {
      return null;
    }

    try {
      const data = JSON.parse(json);
      return {
        allowsDataCollection: data.allowsDataCollection,
        allowsCookies: data.allowsCookies,
      };
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  /**
   * Stores user preferences to the local storage
   */
  public store(preferences: PrivacyPreferences): void {
    const json = JSON.stringify(preferences);
    window.localStorage.setItem(PrivacyPreferencesRepository.STORAGE_KEY, json);
  }
}

/**
 * The default singleton to use in the app
 */
export const privacyPreferencesRepository = new PrivacyPreferencesRepository();
