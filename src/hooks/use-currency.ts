import { useState, useEffect } from 'react';

export interface CurrencyConfig {
  code: string;
  symbol: string;
  name: string;
  locale: string;
}

export const SUPPORTED_CURRENCIES: CurrencyConfig[] = [
  { code: 'USD', symbol: '$', name: 'US Dollar', locale: 'en-US' },
  { code: 'EUR', symbol: '€', name: 'Euro', locale: 'de-DE' },
  { code: 'GBP', symbol: '£', name: 'British Pound', locale: 'en-GB' },
  { code: 'KHR', symbol: '៛', name: 'Cambodian Riel', locale: 'km-KH' },
  { code: 'VND', symbol: '₫', name: 'Vietnamese Dong', locale: 'vi-VN' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen', locale: 'ja-JP' },
];

export function useCurrency() {
  const [currencyCode, setCurrencyCode] = useState<string>(() => {
    if (typeof window === 'undefined') return 'USD';
    return localStorage.getItem('finance-currency') || 'USD';
  });

  useEffect(() => {
    localStorage.setItem('finance-currency', currencyCode);
  }, [currencyCode]);

  const activeCurrency =
    SUPPORTED_CURRENCIES.find((c) => c.code === currencyCode) || SUPPORTED_CURRENCIES[0];

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat(activeCurrency.locale, {
      style: 'currency',
      currency: activeCurrency.code,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return {
    currency: activeCurrency,
    currencies: SUPPORTED_CURRENCIES,
    setCurrencyCode,
    formatAmount,
  };
}
