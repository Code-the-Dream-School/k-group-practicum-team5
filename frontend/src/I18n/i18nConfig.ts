import i18n from "i18next";
import type { InitOptions } from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import languageEN from "./en/translate.json";
import languageUA from "./ua/translate.json";
import languageRU from "./ru/translate.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: languageEN,
      ua: languageUA,
      ru: languageRU,
    },
    fallbackLng: "en",
    debug: true,
    ns: ["translations"],
    defaultNS: "translations",
    keySeparator: ".",
    interpolation: {
      escapeValue: false,
      formatSeparator: ",",
    },
    react: {
      wait: true,
      bindI18n: "languageChanged loaded",
      bindStore: "added removed",
      nsMode: "default",
    },
  } as InitOptions);
export default i18n;
