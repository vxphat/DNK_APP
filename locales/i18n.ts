import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from 'expo-localization';
import en from "./en.json";
import vi from "./vi.json";

const resources = { en: { translation: en }, vi: { translation: vi } };

i18next
  .use(initReactI18next)
  .init({
    resources,
    lng: Localization.getLocales()[0].languageCode || "en", // Lấy ngôn ngữ của thiết bị
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });

export default i18next;
