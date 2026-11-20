export type CalculatorFuelType =
  | 'gasoline'
  | 'gasoline_premium'
  | 'diesel'
  | 'lpg';

export interface FuelCalculatorInputs {
  countryCode: string;
  fuelType: CalculatorFuelType;
  consumptionL100km: number;
  distanceKm: number;
  customPriceOverride: number | null;
}

export interface FuelCalculationResult {
  fuelRequiredLiters: number;
  fuelRequiredGallons: number;
  totalCostNative: number;
  totalCostUsd: number;
  costPerKmUsd: number;
  costPer100KmUsd: number;
  unitPriceNative: number;
  unitPriceUsd: number;
  currency: string;
}

export interface TripComparisonItem {
  countryCode: string;
  name: string;
  flag: string;
  currency: string;
  totalCostUsd: number;
  totalCostNative: number;
  unitPriceUsd: number;
  costPerKmUsd: number;
  pctVsSelected: number;
}

export interface TripPreset {
  id: string;
  label: string;
  countryCode: string;
  distanceKm: number;
  defaultConsumption: number;
}
