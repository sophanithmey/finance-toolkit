import { useQuery } from '@tanstack/react-query';
import { fetchOpenVanFuelPrices } from '../services/api/openvan-adapter';
import { fetchGlobalExchangeRates } from '../services/api/exchange-adapter';
import { normalizeFuelData } from '../services/fuel/normalizer';
import { calculateGlobalFuelStats } from '../services/fuel/calculations';
import type { NormalizedCountryFuel, GlobalFuelStats, OpenVanResponse } from '../types/fuel';

export function useFuelPrices() {
  const fuelQuery = useQuery<OpenVanResponse>({
    queryKey: ['fuel-prices-openvan'],
    queryFn: fetchOpenVanFuelPrices,
    staleTime: 1000 * 60 * 30, // 30 minutes cache
    refetchOnWindowFocus: false,
  });

  const fxQuery = useQuery({
    queryKey: ['exchange-rates-usd'],
    queryFn: fetchGlobalExchangeRates,
    staleTime: 1000 * 60 * 60 * 4, // 4 hours
    refetchOnWindowFocus: false,
  });

  const rawData = fuelQuery.data;
  const fxRates = fxQuery.data || null;

  const countries: NormalizedCountryFuel[] = rawData
    ? normalizeFuelData(rawData, fxRates)
    : [];

  const stats: GlobalFuelStats | null =
    rawData && countries.length > 0
      ? calculateGlobalFuelStats(countries, rawData.meta?.updated_at || new Date().toISOString())
      : null;

  return {
    countries,
    stats,
    attribution: rawData?._attribution,
    meta: rawData?.meta,
    isLoading: fuelQuery.isLoading || fxQuery.isLoading,
    isError: fuelQuery.isError,
    error: fuelQuery.error,
    refetch: () => {
      fuelQuery.refetch();
      fxQuery.refetch();
    },
  };
}
