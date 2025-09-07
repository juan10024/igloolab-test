import { useContext } from 'react';
import { CurrencyContext } from '../contexts/CurrencyProvider';
import { currencies } from '../config/CurrencyConfig';

/**
* Custom hook to access the currency context.
* Provides the current currency, a function to change it, and formatting utilities.
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
