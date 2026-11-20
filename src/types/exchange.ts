export interface ExchangeRates {
  base: string;
  rates: Record<string, number>;
  time_last_update_utc?: string;
}

export interface FxConversionResult {
  converted: number;
  rate: number;
  currency: string;
  source: string;
  date: string;
}
