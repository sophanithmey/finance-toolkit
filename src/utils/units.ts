import type { DisplayUnit, NativeUnit } from '../types/fuel';

export const LITERS_PER_US_GALLON = 3.78541;
export const LITERS_PER_IMP_GALLON = 4.54609;

export function convertNativeToLiters(
  price: number | null,
  unit: NativeUnit,
): number | null {
  if (price === null || price === undefined || price <= 0) return null;
  if (unit === 'gallon') return price / LITERS_PER_US_GALLON;
  if (unit === 'imperial_gallon') return price / LITERS_PER_IMP_GALLON;
  return price;
}

export function convertUsdPerLiterToDisplay(
  usdPerLiter: number | null,
  displayUnit: DisplayUnit,
): number | null {
  if (usdPerLiter === null || usdPerLiter <= 0) return null;
  switch (displayUnit) {
    case 'usd_per_gallon':
      return usdPerLiter * LITERS_PER_US_GALLON;
    case 'usd_per_imp_gallon':
      return usdPerLiter * LITERS_PER_IMP_GALLON;
    case 'usd_per_liter':
    default:
      return usdPerLiter;
  }
}

export function getDisplayUnitLabel(displayUnit: DisplayUnit): string {
  switch (displayUnit) {
    case 'usd_per_gallon':
      return 'USD / US Gallon';
    case 'usd_per_imp_gallon':
      return 'USD / Imp Gallon';
    case 'local_per_unit':
      return 'Local Currency';
    case 'usd_per_liter':
    default:
      return 'USD / Liter';
  }
}

export function getDisplayUnitShort(displayUnit: DisplayUnit): string {
  switch (displayUnit) {
    case 'usd_per_gallon':
      return '$/gal';
    case 'usd_per_imp_gallon':
      return '$/imp.gal';
    case 'local_per_unit':
      return 'Local';
    case 'usd_per_liter':
    default:
      return '$/L';
  }
}
