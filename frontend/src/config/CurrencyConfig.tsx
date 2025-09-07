/**
 * @fileoverview This file centralizes currency configuration so it's easily scalable.
 * @module config/CurrencyConfig
 */

export type Currency = 'USD' | 'COP';

interface CurrencyConfig {
  symbol: string;
  rate: number; // Conversion rate from the base currency (USD)
  format: (value: number) => string;
}

// USD is the base currency. All prices are stored in USD.
export const currencies: Record<Currency, CurrencyConfig> = {
  USD: {
    symbol: '$',
    rate: 1,
    format: (value) => `$${value.toFixed(2)} USD`,
  },
  COP: {
    symbol: '$',
    rate: 4120, // Example rate. In a real app, this would come from an API.
    format: (value) => `$${value.toLocaleString('es-CO', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} COP`,
  },
};