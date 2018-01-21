import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { reactI18nextModule } from 'react-i18next';

function configureI18n(translations){
  i18n
  .use(LanguageDetector)
  .use(reactI18nextModule)
  .init({
    fallbackLng: 'fr-FR',
    debug: false,
    resources:translations,
    interpolation: {
      escapeValue: false, // not needed for react
    },
    react: {
      wait: true
    }
  });
}
export {configureI18n};