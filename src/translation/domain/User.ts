/**
 * Represents the person who is making the translation,
 * their identity and their preferences.
 */
export class User {
  /**
   * If true, the user accepts that usage data can be collected
   * in order to improve the services
   */
  readonly acceptsDataCollection: boolean;

  /**
   * Name of the organization the User belongs to
   * (or an empty string if an individual from the public)
   */
  readonly organizationName: string = "";

  constructor(acceptsDataCollection: boolean, organizationName: string) {
    this.acceptsDataCollection = acceptsDataCollection;
    this.organizationName = organizationName;
  }
}
