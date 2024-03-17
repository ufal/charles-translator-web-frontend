import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { ParcelAsyncImportBackend } from "./ParcelAsyncImportBackend";
import LanguageDetector from "i18next-browser-languagedetector";
import localeImporters from "../../locales";

export default async function bootstrapInternacionalization() {
  // Loads the translation files via the parcel lazy loading module system
  i18n.use(new ParcelAsyncImportBackend());

  // Detects the language during first startup,
  // Persists the language in local storage
  // https://github.com/i18next/i18next-browser-languageDetector
  i18n.use(LanguageDetector);

  // Binds i18next with React
  // https://react.i18next.com/
  i18n.use(initReactI18next);

  await i18n.init({
    debug: false, // enable to see console logs regarding missing keys and loads
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // react already escapes
    },

    // Needs to be set, otherwise the language detector may decide to use
    // say en-US, or some other language all together
    supportedLngs: Object.keys(localeImporters),
    partialBundledLanguages: true, // so that resources get loaded on demand
    resources: {
      // all are loaded by the backend
    },
  });
}
