import { privacyPreferencesRepository } from "./persistence/PrivacyPreferencesRepository";

// create the exchange variable between us the the Google Analytics library
(window as any).dataLayer = (window as any).dataLayer || [];
const _dataLayer = (window as any).dataLayer as any[];

// provides access to the exchange variable indirectly
export function gtag(...args: any[]) {
  _dataLayer.push(arguments);
}

// call this during bootstrap to set up analytics
export function bootstrapAnalytics() {
  // do nothing if cookies are not allowed
  let privacyPreferences = privacyPreferencesRepository.load();
  if (privacyPreferences === null) return;
  if (!privacyPreferences.allowsCookies) return;

  // do nothing if we are not in production
  if (window.location.hostname !== "translator.cuni.cz") return;

  // load google analytics asynchronously
  var scriptElement = document.createElement("script");
  scriptElement.async = true;
  scriptElement.src =
    "https://www.googletagmanager.com/gtag/js?id=G-5BJ74PW7X1";
  document.head.appendChild(scriptElement);

  // insert the first event representing the page view
  gtag("js", new Date());
  gtag("config", "G-5BJ74PW7X1");
}
