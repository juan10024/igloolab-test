import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

/**
 * Custom hook for handling internationalization (i18n).
 * It provides the translation function `t` and the ability to change languages.
 */
export const useI18n = () => {
  const { t, i18n } = useTranslation();

  // Effect to persist language choice in localStorage
  useEffect(() => {
    localStorage.setItem('language', i18n.language);
  }, [i18n.language]);

  const changeLanguage = (lang: 'en' | 'es') => {
    i18n.changeLanguage(lang);
  };

  return { t, changeLanguage, currentLanguage: i18n.language };
};
