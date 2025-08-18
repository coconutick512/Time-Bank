import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

void i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    fallbackLng: 'ru', // язык по умолчанию
    resources: {
      en: {
        translation: {
          greeting: 'Hello!',
          // ...другие переводы
        },
      },
      ru: {
        translation: {
          greeting: 'Здравствуйте!',
          // ...другие переводы
        },
      },
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
