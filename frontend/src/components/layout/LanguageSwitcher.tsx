import React from 'react';
import { useI18n } from '../../hooks/useI18n';

/**
* A component to change the application language.
*/
export const LanguageSwitcher: React.FC = () => {
  const { changeLanguage, currentLanguage } = useI18n();

  const buttonStyle = (lang: string) =>
    `font-bold py-1 px-3 rounded-full transition-colors duration-200 ${
      currentLanguage === lang
        ? 'bg-teal-500 text-white'
        : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
    }`;

  return (
    <div className="flex items-center space-x-2">
      <button onClick={() => changeLanguage('en')} className={buttonStyle('en')}>
        EN
      </button>
      <button onClick={() => changeLanguage('es')} className={buttonStyle('es')}>
        ES
      </button>
    </div>
  );
};

export default LanguageSwitcher;

