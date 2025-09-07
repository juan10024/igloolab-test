import React from 'react';
import { Trans } from 'react-i18next';
import ThemeSwitcher from '../common/ThemeSwitcher';
import LanguageSwitcher from './LanguageSwitcher';
import CurrencySwitcher from './CurrencySwitcher';
import { useI18n } from '../../hooks/useI18n';
import Logo from '../../assets/logo.png'

/**
 * El encabezado principal de la aplicación.
 * Incluye título, y los selectores de tema, idioma y moneda.
 */
const Header: React.FC = () => {
    const { t } = useI18n();
    return (
        <header className="mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
                <div className="flex justify-start">
                    <a href="/">
                        <img src={Logo} alt="Logo de la empresa" className="h-12 w-auto" />
                    </a>
                </div>
                <div className="w-full sm:w-1/3 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white whitespace-nowrap">
                        <Trans i18nKey="main_title">
                            Product <span className="text-teal-500 dark:text-teal-400">Management</span>
                        </Trans>
                    </h1>
                </div>
                <div className="w-full sm:w-1/3 flex justify-center sm:justify-end items-center space-x-2 sm:space-x-4">
                    <CurrencySwitcher />
                    <LanguageSwitcher />
                    <ThemeSwitcher />
                </div>
            </div>
            <div className="text-center py-2 bg-gray-200 dark:bg-gray-800">
                <p className="text-gray-600 dark:text-gray-400">{t('main_subtitle')}</p>
            </div>
        </header>
    );
};

export default Header;