import type { NormalizedCountryFuel } from '../../types/fuel';

export interface MapCountryHover {
  code: string;
  country: NormalizedCountryFuel | null;
  x: number;
  y: number;
}

export type PriceTier = 'subsidized' | 'low' | 'moderate' | 'high' | 'extreme' | 'no_data';

export function getPriceTier(priceUsdPerL: number | null): PriceTier {
  if (priceUsdPerL === null || priceUsdPerL <= 0) return 'no_data';
  if (priceUsdPerL < 0.8) return 'subsidized';
  if (priceUsdPerL < 1.25) return 'low';
  if (priceUsdPerL < 1.65) return 'moderate';
  if (priceUsdPerL < 2.1) return 'high';
  return 'extreme';
}

export const TIER_COLORS: Record<PriceTier, { fill: string; stroke: string; label: string; text: string }> = {
  subsidized: { fill: '#10b981', stroke: '#059669', label: '< $0.80 / L', text: 'Subsidized' },
  low: { fill: '#06b6d4', stroke: '#0891b2', label: '$0.80 – $1.25', text: 'Low Cost' },
  moderate: { fill: '#f59e0b', stroke: '#d97706', label: '$1.25 – $1.65', text: 'Moderate' },
  high: { fill: '#f97316', stroke: '#ea580c', label: '$1.65 – $2.10', text: 'High' },
  extreme: { fill: '#ef4444', stroke: '#dc2626', label: '> $2.10 / L', text: 'Expensive' },
  no_data: { fill: '#64748b', stroke: '#475569', label: 'No Data', text: 'Unavailable' },
};
