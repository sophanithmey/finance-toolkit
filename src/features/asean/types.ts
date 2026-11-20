import type { NormalizedCountryFuel } from '../../types/fuel';

export type AseanCountryCode =
  | 'KH'
  | 'TH'
  | 'VN'
  | 'LA'
  | 'MY'
  | 'SG'
  | 'ID'
  | 'PH'
  | 'MM'
  | 'BN'
  | 'TL';

export interface AseanCountryMeta {
  code: AseanCountryCode;
  name: string;
  nativeName: string;
  capital: string;
  currency: string;
  currencySymbol: string;
  flag: string;
  hasDataFeed: boolean;
}

export interface AseanFuelStats {
  totalAseanCount: number;
  availableCount: number;
  avgGasolineUsdPerL: number;
  avgDieselUsdPerL: number;
  cheapestGasoline: { country: NormalizedCountryFuel; priceUsdPerL: number } | null;
  mostExpensiveGasoline: { country: NormalizedCountryFuel; priceUsdPerL: number } | null;
  cheapestDiesel: { country: NormalizedCountryFuel; priceUsdPerL: number } | null;
  mostExpensiveDiesel: { country: NormalizedCountryFuel; priceUsdPerL: number } | null;
  cambodia: NormalizedCountryFuel | null;
  lastUpdated: string;
}

export interface NeighborComparisonItem {
  code: string;
  name: string;
  flag: string;
  currency: string;
  gasolineUsdL: number | null;
  dieselUsdL: number | null;
  gasDeltaVsCambodia: number | null;
  gasPctVsCambodia: number | null;
}
