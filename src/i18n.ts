import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import es from './locales/es/translation.json';
import en from './locales/en/translation.json';
import fr from './locales/fr/translation.json';
import de from './locales/de/translation.json';
import it from './locales/it/translation.json';
import pt from './locales/pt/translation.json';

i18n
    .use(initReactI18next)
    .init({
    resources: {
        es: { translation: es },
        en: { translation: en },
        fr: { translation: fr },
        de: { translation: de },
        it: { translation: it },
        pt: { translation: pt }
    },
    lng: 'es',
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false
    }
    });

export default i18n;