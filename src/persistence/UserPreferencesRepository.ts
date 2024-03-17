import { UserPreferences } from "./UserPreferences";

/**
 * Provides access and persistance to user preferences regarding privacy
 * (data collection, cookies)
 */
export class UserPreferencesRepository {
  private static readonly STORAGE_KEY = "charlesTranslator::userPreferences";

  private static readonly DEFAULTS: UserPreferences = {
    organizationName: "",
    isDeveloperMode: false,
    allowsLocalHistory: true
  };

  /**
   * Loads user preferences from the local storage,
   * returns default values if not present yet
   */
  public load(): UserPreferences {
    const json = window.localStorage.getItem(
      UserPreferencesRepository.STORAGE_KEY,
    );

    if (json === null) {
      return UserPreferencesRepository.DEFAULTS;
    }

    try {
      const data = JSON.parse(json);
      return {
        organizationName: String(data.organizationName),
        isDeveloperMode: Boolean(data.isDeveloperMode),
        allowsLocalHistory: Boolean(data.allowsLocalHistory),
      };
    } catch (e) {
      console.error(e);
      return UserPreferencesRepository.DEFAULTS;
    }
  }

  /**
   * Stores user preferences to the local storage
   */
  public store(preferences: UserPreferences): void {
    const json = JSON.stringify(preferences);
    window.localStorage.setItem(UserPreferencesRepository.STORAGE_KEY, json);
  }
}

/**
 * The default singleton to use in the app
 */
export const userPreferencesRepository = new UserPreferencesRepository();
