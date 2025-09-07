// Este archivo centraliza la configuración de las monedas para que sea fácilmente escalable.

export type Currency = 'USD' | 'COP';

interface CurrencyConfig {
  symbol: string;
  rate: number; // Tasa de conversión con respecto a la moneda base (USD)
  format: (value: number) => string;
}

// USD es la moneda base. Todos los precios se almacenan en USD.
export const currencies: Record<Currency, CurrencyConfig> = {
  USD: {
    symbol: '$',
    rate: 1,
    format: (value) => `$${value.toFixed(2)} USD`,
  },
  COP: {
    symbol: '$',
    rate: 4000, // Tasa de ejemplo. En una app real, esto vendría de una API.
    format: (value) => `$${value.toLocaleString('es-CO', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} COP`,
  },
};