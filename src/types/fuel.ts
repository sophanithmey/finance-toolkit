export type FuelType =
  | 'gasoline'
  | 'gasoline_regular'
  | 'gasoline_premium'
  | 'diesel'
  | 'diesel_premium'
  | 'lpg';

export type NativeUnit = 'liter' | 'gallon' | 'imperial_gallon';

export type DisplayUnit =
  | 'usd_per_liter'
  | 'usd_per_gallon'
  | 'usd_per_imp_gallon'
  | 'local_per_unit';

export interface RawPrices {
  gasoline_regular: number | null;
  gasoline: number | null;
  gasoline_premium: number | null;
  gasoline_super: number | null;
  diesel_regular: number | null;
  diesel: number | null;
  diesel_premium: number | null;
  lpg: number | null;
  cng: number | null;
  e85: number | null;
  kerosene: number | null;
  premium?: number | null;
}

export interface RawPriceChanges {
  gasoline?: number | null;
  gasoline_premium?: number | null;
  diesel?: number | null;
  diesel_premium?: number | null;
  lpg?: number | null;
}

export interface OpenVanCountryRaw {
  country_code: string;
  country_name: string;
  region: string;
  currency: string;
  local_currency: string;
  unit: NativeUnit;
  prices: RawPrices;
  price_changes?: RawPriceChanges;
  fetched_at: string;
  sources: string[];
  sources_count?: number;
  is_excluded?: boolean;
}

export interface OpenVanResponse {
  success: boolean;
  data: Record<string, OpenVanCountryRaw>;
  meta: {
    total_countries: number;
    updated_at: string;
    cache_ttl_hours: number;
  };
  _attribution: {
    data_source: string;
    license: string;
    required: boolean;
    attribution_url: string;
    attribution_html: string;
    instructions: string;
    your_source: string;
  };
}

export interface NormalizedCountryFuel {
  code: string;
  name: string;
  region: string;
  currency: string;
  nativeUnit: NativeUnit;
  prices: RawPrices;
  priceChanges?: RawPriceChanges;
  usdPrices: {
    gasoline: number | null;
    gasoline_premium: number | null;
    diesel: number | null;
    diesel_premium: number | null;
    lpg: number | null;
    cng: number | null;
  };
  updatedAt: string;
  sources: string[];
  hasFxRate: boolean;
}

export interface GlobalFuelStats {
  totalCountries: number;
  avgGasolineUsdPerL: number;
  avgDieselUsdPerL: number;
  cheapestGasoline: {
    country: NormalizedCountryFuel;
    priceUsdPerL: number;
  } | null;
  mostExpensiveGasoline: {
    country: NormalizedCountryFuel;
    priceUsdPerL: number;
  } | null;
  cheapestDiesel: {
    country: NormalizedCountryFuel;
    priceUsdPerL: number;
  } | null;
  mostExpensiveDiesel: {
    country: NormalizedCountryFuel;
    priceUsdPerL: number;
  } | null;
  lastUpdated: string;
  sourceAttribution: {
    name: string;
    url: string;
    license: string;
  };
}
