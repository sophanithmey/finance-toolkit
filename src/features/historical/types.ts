export type TimeRangeFilter = '7d' | '30d' | '90d' | '1y' | 'all';

export interface PriceSnapshotRecord {
  timestamp: string; // ISO string
  code: string;
  name: string;
  currency: string;
  gasolineUsdL: number | null;
  dieselUsdL: number | null;
  nativeGasoline: number | null;
  nativeDiesel: number | null;
}

export interface StoredSnapshotsCollection {
  version: number;
  lastUpdated: string;
  snapshots: PriceSnapshotRecord[];
}

export interface TrendDataPoint {
  date: string;
  displayDate: string;
  [countryCode: string]: number | string | null;
}

export interface CountryTrendSummary {
  code: string;
  name: string;
  flag: string;
  currentPrice: number;
  startPrice: number;
  netChange: number;
  pctChange: number;
}
