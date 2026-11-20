import { useState, useEffect } from 'react';
import type { DisplayUnit, FuelType } from '../types/fuel';

export function useFuelSettings() {
  const [displayUnit, setDisplayUnit] = useState<DisplayUnit>(() => {
    if (typeof window === 'undefined') return 'usd_per_liter';
    return (localStorage.getItem('fuel_display_unit') as DisplayUnit) || 'usd_per_liter';
  });

  const [fuelType, setFuelType] = useState<FuelType>(() => {
    if (typeof window === 'undefined') return 'gasoline';
    return (localStorage.getItem('fuel_type_preference') as FuelType) || 'gasoline';
  });

  useEffect(() => {
    localStorage.setItem('fuel_display_unit', displayUnit);
  }, [displayUnit]);

  useEffect(() => {
    localStorage.setItem('fuel_type_preference', fuelType);
  }, [fuelType]);

  return {
    displayUnit,
    setDisplayUnit,
    fuelType,
    setFuelType,
  };
}
