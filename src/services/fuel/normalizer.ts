import type { OpenVanResponse, NormalizedCountryFuel } from '../../types/fuel';
import type { ExchangeRates } from '../../types/exchange';
import { convertNativeToLiters } from '../../utils/units';

export function normalizeFuelData(
  openVanData: OpenVanResponse,
  fxRates: ExchangeRates | null,
): NormalizedCountryFuel[] {
  const rawCountries = openVanData.data;
  const rates = fxRates?.rates || {};

  return Object.values(rawCountries).map((raw) => {
    const currency = raw.currency || 'USD';
    const rate = currency === 'USD' ? 1 : rates[currency] || null;
    const hasFxRate = rate !== null && rate > 0;

    const toUsdLiter = (price: number | null): number | null => {
      if (price === null || price === undefined || price <= 0) return null;
      if (!hasFxRate || !rate) return null;
      const usdPerNativeUnit = price / rate;
      return convertNativeToLiters(usdPerNativeUnit, raw.unit);
    };

    return {
      code: raw.country_code,
      name: raw.country_name,
      region: raw.region || 'other',
      currency: raw.currency,
      nativeUnit: raw.unit,
      prices: raw.prices,
      priceChanges: raw.price_changes,
      usdPrices: {
        gasoline: toUsdLiter(raw.prices.gasoline),
        gasoline_premium: toUsdLiter(raw.prices.gasoline_premium),
        diesel: toUsdLiter(raw.prices.diesel),
        diesel_premium: toUsdLiter(raw.prices.diesel_premium),
        lpg: toUsdLiter(raw.prices.lpg),
        cng: toUsdLiter(raw.prices.cng),
      },
      updatedAt: raw.fetched_at,
      sources: raw.sources || [],
      hasFxRate,
    };
  });
}
