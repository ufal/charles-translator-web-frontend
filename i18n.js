import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import csTranslation from "./public/locales/cs";
import ukTranslation from "./public/locales/uk";
import enTranslation from "./public/locales/en";

i18n
	.use(initReactI18next) // passes i18n down to react-i18next
	.init({
		debug: process.env.NODE_ENV === "development",
		partialBundledLanguages: true,
		resources: {
			cs: csTranslation,
			uk: ukTranslation,
			en: enTranslation,
		},
		
		// TODO: set default language via the i18next detector
		// and persist the chosen language
		// https://github.com/i18next/i18next-browser-languageDetector
		fallbackLng: "en",
		interpolation: {
			// react already protects from xss
			// https://www.i18next.com/translation-function/interpolation#unescape
			escapeValue: false,
		},
		react: {
			bindI18n: 'languageChanged',
			bindI18nStore: '',
			transEmptyNodeValue: '',
			transSupportBasicHtmlNodes: true,
			transKeepBasicHtmlNodesFor: ['br', 'strong', 'i'],
			useSuspense: true,
		},
	});