import { useMemo } from 'react';
import { useExchangeRate } from '../features/exchange-rate/hooks/use-exchange-rate';
import { useGoldPrice } from '../features/gold/hooks/use-gold-price';

export function useDashboard() {
  const { data: goldData, isLoading: isGettingGoldRate } =
    useGoldPrice('SJL1L10');
  const { data: exchangeData, isLoading: isGettingXchangeRate } =
    useExchangeRate('USD');

  const isLoading = useMemo(
    () => isGettingGoldRate || isGettingXchangeRate,
    [isGettingGoldRate, isGettingXchangeRate],
  );

  return {
    goldData,
    exchangeData,
    isLoading,
  };
}
