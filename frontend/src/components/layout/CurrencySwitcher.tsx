import React from 'react';
import { useCurrency } from '../../hooks/useCurrency';
import { currencies } from '../../config/CurrencyConfig';

/**
 * Componente para cambiar la moneda de la aplicación.
 */
export const CurrencySwitcher: React.FC = () => {
  const { currency, setCurrency } = useCurrency();

  const buttonStyle = (curr: string) =>
    `font-bold py-1 px-3 rounded-full transition-colors duration-200 ${
      currency === curr
        ? 'bg-teal-500 text-white'
        : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
    }`;

  return (
    <div className="flex items-center space-x-2">
      {(Object.keys(currencies) as Array<keyof typeof currencies>).map((curr) => (
        <button key={curr} onClick={() => setCurrency(curr)} className={buttonStyle(curr)}>
          {curr}
        </button>
      ))}
    </div>
  );
};

export default CurrencySwitcher;
