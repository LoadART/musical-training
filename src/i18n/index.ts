// src/i18n/index.ts

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation resources
import ru from './ru.json';
import en from './en.json';

/**
 * Defines the supported application languages.
 * Extend this union type if new languages are added in the future.
 */
export type SupportedLanguage = 'ru' | 'en';

/**
 * Initializes and configures the global i18next instance.
 * 
 * - Registers the react-i18next plugin.
 * - Loads Russian and English translation dictionaries.
 * - Reads the initial language from localStorage, falling back to 'ru'.
 * - Disables HTML escaping in interpolation (safe in React, as JSX handles escaping by default).
 */
i18n
  .use(initReactI18next)
  .init({
    resources: {
      ru: { translation: ru },
      en: { translation: en },
    },
    // Safely cast the localStorage value to our SupportedLanguage type
    lng: (localStorage.getItem('language') as SupportedLanguage) || 'ru',
    fallbackLng: 'ru',
    interpolation: {
      // React already escapes values by default. Setting this to false prevents 
      // double-escaping and is the recommended practice for react-i18next.
      escapeValue: false,
    },
  });

export default i18n;