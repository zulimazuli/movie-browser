import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import tmdb from './axios-tmdb';

// don't want to use this?
// have a look at the Quick start guide 
// for passing in lng and translations on init

const availableLanguages = ['en', 'pl'];

i18n
  // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // learn more: https://github.com/i18next/i18next-http-backend
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector) //todo: PL fully operational
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: 'en',
    debug: true,
    whitelist: availableLanguages,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    detection: {
        lookupQuerystring: "lang",
    },
    backend: {
      loadPath: function(lng, ns) {
        if (typeof window == "undefined") {
          return `./public/locales/${lng}/${ns}.json`;
        } else {
          return `/movie-browser/locales/${lng}/${ns}.json`;
        } }
    },
  }).then(() => {
        tmdb.defaults.params = { language: i18n.language };
        console.log('[i18n] Language changed:', tmdb.defaults.params.language)
  });


export default i18n;