import type { NormalizedCountryFuel } from '../../types/fuel';
import { ASEAN_COUNTRY_CODES, ASEAN_METADATA } from './constants';
import type { AseanCountryCode, AseanFuelStats, NeighborComparisonItem } from './types';

export function isAseanCountry(code: string): boolean {
  return ASEAN_COUNTRY_CODES.includes(code.toUpperCase() as AseanCountryCode);
}

export function filterAseanCountries(countries: readonly NormalizedCountryFuel[]): NormalizedCountryFuel[] {
  const codeSet = new Set<string>(ASEAN_COUNTRY_CODES);
  return countries.filter((c) => codeSet.has(c.code.toUpperCase()));
}

export function calculateAseanFuelStats(
  allCountries: readonly NormalizedCountryFuel[],
  lastUpdated: string,
): AseanFuelStats {
  const aseanList = filterAseanCountries(allCountries);
  const cambodia = aseanList.find((c) => c.code.toUpperCase() === 'KH') || null;

  const validGas = aseanList
    .map((c) => ({ country: c, price: c.usdPrices.gasoline }))
    .filter((c): c is { country: NormalizedCountryFuel; price: number } => c.price !== null && c.price > 0);

  const validDiesel = aseanList
    .map((c) => ({ country: c, price: c.usdPrices.diesel }))
    .filter((c): c is { country: NormalizedCountryFuel; price: number } => c.price !== null && c.price > 0);

  const avgGas = validGas.length > 0
    ? validGas.reduce((acc, curr) => acc + curr.price, 0) / validGas.length
    : 0;

  const avgDiesel = validDiesel.length > 0
    ? validDiesel.reduce((acc, curr) => acc + curr.price, 0) / validDiesel.length
    : 0;

  validGas.sort((a, b) => a.price - b.price);
  validDiesel.sort((a, b) => a.price - b.price);

  return {
    totalAseanCount: ASEAN_COUNTRY_CODES.length,
    availableCount: aseanList.length,
    avgGasolineUsdPerL: avgGas,
    avgDieselUsdPerL: avgDiesel,
    cheapestGasoline: validGas[0] ? { country: validGas[0].country, priceUsdPerL: validGas[0].price } : null,
    mostExpensiveGasoline: validGas[validGas.length - 1]
      ? { country: validGas[validGas.length - 1].country, priceUsdPerL: validGas[validGas.length - 1].price }
      : null,
    cheapestDiesel: validDiesel[0] ? { country: validDiesel[0].country, priceUsdPerL: validDiesel[0].price } : null,
    mostExpensiveDiesel: validDiesel[validDiesel.length - 1]
      ? { country: validDiesel[validDiesel.length - 1].country, priceUsdPerL: validDiesel[validDiesel.length - 1].price }
      : null,
    cambodia,
    lastUpdated,
  };
}

export function getMekongNeighborComparison(
  cambodia: NormalizedCountryFuel | null,
  allCountries: readonly NormalizedCountryFuel[],
): NeighborComparisonItem[] {
  const targetCodes: AseanCountryCode[] = ['KH', 'TH', 'VN', 'LA', 'MY', 'SG'];
  const camGasUsd = cambodia?.usdPrices.gasoline ?? null;

  return targetCodes.map((code) => {
    const meta = ASEAN_METADATA[code];
    const country = allCountries.find((c) => c.code.toUpperCase() === code);
    const gasUsdL = country?.usdPrices.gasoline ?? null;
    const dieselUsdL = country?.usdPrices.diesel ?? null;

    let delta: number | null = null;
    let pct: number | null = null;
    if (gasUsdL !== null && camGasUsd !== null) {
      delta = gasUsdL - camGasUsd;
      pct = (delta / camGasUsd) * 100;
    }

    return {
      code,
      name: meta.name,
      flag: meta.flag,
      currency: meta.currency,
      gasolineUsdL: gasUsdL,
      dieselUsdL: dieselUsdL,
      gasDeltaVsCambodia: delta,
      gasPctVsCambodia: pct,
    };
  });
}
