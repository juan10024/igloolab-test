import React from 'react';
import { Trans } from 'react-i18next';
import ThemeSwitcher from '../common/ThemeSwitcher';
import LanguageSwitcher from './LanguageSwitcher';
import { useI18n } from '../../hooks/useI18n';

/**
* The main header of the application.
* Includes the title, theme switcher, and language switcher.
*/
const Header: React.FC = () => {
    const { t } = useI18n();
    return (
        <header className="mb-8">
            <div className="flex justify-between items-center mb-4">
                <div/> {/* Espaciador */}
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white text-center">
                    <Trans i18nKey="main_title">
                        Product <span className="text-teal-500 dark:text-teal-400">Management</span>
                    </Trans>
                </h1>
                <div className="flex items-center space-x-4">
                    <LanguageSwitcher />
                    <ThemeSwitcher />
                </div>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-center">{t('main_subtitle')}</p>
        </header>
    );
};

export default Header;

