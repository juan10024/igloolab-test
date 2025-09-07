import { useContext } from 'react';
import { CurrencyContext } from '../contexts/CurrencyProvider';
import { currencies } from '../config/CurrencyConfig';

/**
 * Hook personalizado para acceder al contexto de la moneda.
 * Proporciona la moneda actual, una función para cambiarla y utilidades de formato.
 */
export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }

  const { currency, setCurrency } = context;
  const currencyConfig = currencies[currency];

  const formatPrice = (priceInUsd: number) => {
    const convertedPrice = priceInUsd * currencyConfig.rate;
    return currencyConfig.format(convertedPrice);
  };

  return {
    currency,
    setCurrency,
    formatPrice,
  };
};
