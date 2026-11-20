import type { NormalizedCountryFuel } from '../../types/fuel';
import type {
  CalculatorFuelType,
  FuelCalculationResult,
  FuelCalculatorInputs,
  TripComparisonItem,
  TripPreset,
} from './types';
import { getCountryFlag } from '../../utils/flags';

export const TRIP_PRESETS: readonly TripPreset[] = [
  { id: 'kh-sr', label: '🇰🇭 Phnom Penh ➔ Siem Reap', countryCode: 'KH', distanceKm: 315, defaultConsumption: 7.2 },
  { id: 'kh-shv', label: '🇰🇭 Phnom Penh ➔ Sihanoukville', countryCode: 'KH', distanceKm: 230, defaultConsumption: 6.8 },
  { id: 'th-pt', label: '🇹🇭 Bangkok ➔ Pattaya', countryCode: 'TH', distanceKm: 150, defaultConsumption: 7.0 },
  { id: 'vn-dn', label: '🇻🇳 Hanoi ➔ Da Nang', countryCode: 'VN', distanceKm: 760, defaultConsumption: 7.5 },
  { id: 'my-sg', label: '🇲🇾 Kuala Lumpur ➔ Singapore', countryCode: 'MY', distanceKm: 355, defaultConsumption: 7.0 },
];

export function calculateTripExpense(
  inputs: FuelCalculatorInputs,
  country: NormalizedCountryFuel | null,
): FuelCalculationResult {
  const distance = Math.max(1, inputs.distanceKm);
  const consumption = Math.max(0.5, inputs.consumptionL100km);

  const fuelRequiredLiters = (distance * consumption) / 100;
  const fuelRequiredGallons = fuelRequiredLiters / 3.78541;

  let unitPriceUsd = 1.5;
  let unitPriceNative = 0;
  const currency = country?.currency || 'USD';

  if (inputs.customPriceOverride !== null && inputs.customPriceOverride > 0) {
    unitPriceUsd = inputs.customPriceOverride;
    unitPriceNative = country?.prices[inputs.fuelType] || unitPriceUsd;
  } else if (country) {
    const rawUsd = country.usdPrices[inputs.fuelType];
    const rawNative = country.prices[inputs.fuelType];
    unitPriceUsd = rawUsd && rawUsd > 0 ? rawUsd : 1.5;
    unitPriceNative = rawNative && rawNative > 0 ? rawNative : unitPriceUsd;
  }

  const totalCostUsd = fuelRequiredLiters * unitPriceUsd;
  const totalCostNative = unitPriceNative > 0 ? fuelRequiredLiters * unitPriceNative : totalCostUsd;
  const costPerKmUsd = totalCostUsd / distance;
  const costPer100KmUsd = costPerKmUsd * 100;

  return {
    fuelRequiredLiters,
    fuelRequiredGallons,
    totalCostNative,
    totalCostUsd,
    costPerKmUsd,
    costPer100KmUsd,
    unitPriceNative,
    unitPriceUsd,
    currency,
  };
}

export function calculateCrossCountryTripComparison(
  distanceKm: number,
  consumptionL100km: number,
  fuelType: CalculatorFuelType,
  selectedCountry: NormalizedCountryFuel | null,
  allCountries: readonly NormalizedCountryFuel[],
): TripComparisonItem[] {
  const targetCodes = ['KH', 'TH', 'VN', 'LA', 'MY', 'SG', 'ID', 'PH', 'US', 'JP', 'DE'];
  const basePriceUsd = selectedCountry?.usdPrices[fuelType] || 1.5;
  const liters = (Math.max(1, distanceKm) * Math.max(0.5, consumptionL100km)) / 100;
  const baseTotalCost = liters * basePriceUsd;

  return targetCodes.map((code) => {
    const c = allCountries.find((item) => item.code.toUpperCase() === code);
    const priceUsd = c?.usdPrices[fuelType] ?? basePriceUsd;
    const priceNative = c?.prices[fuelType] ?? priceUsd;
    const totalUsd = liters * priceUsd;
    const totalNative = liters * priceNative;
    const costPerKm = totalUsd / Math.max(1, distanceKm);
    const pct = baseTotalCost > 0 ? ((totalUsd - baseTotalCost) / baseTotalCost) * 100 : 0;

    return {
      countryCode: code,
      name: c?.name || code,
      flag: getCountryFlag(code),
      currency: c?.currency || 'USD',
      totalCostUsd: totalUsd,
      totalCostNative: totalNative,
      unitPriceUsd: priceUsd,
      costPerKmUsd: costPerKm,
      pctVsSelected: pct,
    };
  });
}
