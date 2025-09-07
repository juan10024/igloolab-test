import React, { createContext, useState, useMemo, useEffect } from 'react';
import type { Currency } from '../config/CurrencyConfig';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
}

export const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrencyState] = useState<Currency>(() => {
    // Load currency from localStorage or use 'USD' by default
    const storedCurrency = localStorage.getItem('currency') as Currency;
    return storedCurrency || 'USD';
  });

  const setCurrency = (newCurrency: Currency) => {
    setCurrencyState(newCurrency);
  };

  // Save the selected currency to localStorage every time it changes
  useEffect(() => {
    localStorage.setItem('currency', currency);
  }, [currency]);
  
  const value = useMemo(() => ({ currency, setCurrency }), [currency]);

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};