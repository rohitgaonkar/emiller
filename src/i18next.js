import React from 'react';
import ReactDOM from 'react-dom/client';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

i18next  
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: true,

    detection: {
      order: [ 'cookie', 'path', 'htmlTag'],
      caches: ['cookie'],
    },
    ns: "common",

    //react: { useSuspense: false },
    backend: {
      
      loadPath: '.json',
    },
    interpolation:{
      escapeValue: false,
      formatSeparator: ",",
    }
  })

  export default i18next;