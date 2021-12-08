import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from './locales/en/translation.json';
import translationHI from './locales/hi/translation.json';

const fallbackLng = ['en'];
const availableLanguages = ['en', 'hi'];

const resources = {
  en: {
    translation: translationEN,
  },
  hi: {
    translation: translationHI,
  },
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng,
  lng: window.localStorage.getItem('i18nextLng') || 'en',

  detection: {
    checkWhitelist: true,
  },

  debug: false,

  whitelist: availableLanguages,

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
