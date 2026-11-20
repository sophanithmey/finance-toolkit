import type { NormalizedCountryFuel, GlobalFuelStats } from '../../types/fuel';

export function calculateGlobalFuelStats(
  countries: NormalizedCountryFuel[],
  lastUpdated: string,
): GlobalFuelStats {
  const validGas = countries
    .map((c) => ({ country: c, price: c.usdPrices.gasoline }))
    .filter((c): c is { country: NormalizedCountryFuel; price: number } => 
      c.price !== null && c.price > 0 && c.price < 20 // filter hyperinflation outliers for realistic global benchmark
    );

  const validDiesel = countries
    .map((c) => ({ country: c, price: c.usdPrices.diesel }))
    .filter((c): c is { country: NormalizedCountryFuel; price: number } => 
      c.price !== null && c.price > 0 && c.price < 20
    );

  const avgGas = validGas.length > 0
    ? validGas.reduce((acc, curr) => acc + curr.price, 0) / validGas.length
    : 0;

  const avgDiesel = validDiesel.length > 0
    ? validDiesel.reduce((acc, curr) => acc + curr.price, 0) / validDiesel.length
    : 0;

  validGas.sort((a, b) => a.price - b.price);
  validDiesel.sort((a, b) => a.price - b.price);

  return {
    totalCountries: countries.length,
    avgGasolineUsdPerL: avgGas,
    avgDieselUsdPerL: avgDiesel,
    cheapestGasoline: validGas[0] ? { country: validGas[0].country, priceUsdPerL: validGas[0].price } : null,
    mostExpensiveGasoline: validGas[validGas.length - 1] ? { country: validGas[validGas.length - 1].country, priceUsdPerL: validGas[validGas.length - 1].price } : null,
    cheapestDiesel: validDiesel[0] ? { country: validDiesel[0].country, priceUsdPerL: validDiesel[0].price } : null,
    mostExpensiveDiesel: validDiesel[validDiesel.length - 1] ? { country: validDiesel[validDiesel.length - 1].country, priceUsdPerL: validDiesel[validDiesel.length - 1].price } : null,
    lastUpdated,
    sourceAttribution: {
      name: 'OpenVan.camp',
      url: 'https://openvan.camp/',
      license: 'CC BY 4.0',
    },
  };
}

export function getRankedCountries(
  countries: NormalizedCountryFuel[],
  fuelType: 'gasoline' | 'diesel' = 'gasoline',
  direction: 'cheapest' | 'expensive' = 'cheapest',
): { country: NormalizedCountryFuel; price: number }[] {
  const filtered = countries
    .map((c) => ({
      country: c,
      price: fuelType === 'gasoline' ? c.usdPrices.gasoline : c.usdPrices.diesel,
    }))
    .filter((item): item is { country: NormalizedCountryFuel; price: number } => 
      item.price !== null && item.price > 0 && item.price < 25 // Exclude extreme hyperinflation FX distortion
    );

  return filtered.sort((a, b) => direction === 'cheapest' ? a.price - b.price : b.price - a.price);
}
