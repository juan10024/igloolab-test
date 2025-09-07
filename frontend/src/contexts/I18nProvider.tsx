import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { resources } from '../translations';

// Initialize i18next
i18next
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: localStorage.getItem('language') || 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

// Wrapper component to provide i18n context to the app
export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <I18nextProvider i18n={i18next}>
      {children}
    </I18nextProvider>
  );
};
