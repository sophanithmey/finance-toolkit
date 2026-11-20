import { useState, useMemo } from 'react';
import { Calculator, Info } from 'lucide-react';
import { useFuelPrices } from '../hooks/use-fuel-prices';
import FuelCalculatorForm from '../features/fuel-calculator/components/fuel-calculator-form';
import FuelCalculatorResults from '../features/fuel-calculator/components/fuel-calculator-results';
import CrossCountryComparisonTable from '../features/fuel-calculator/components/cross-country-comparison-table';
import { calculateTripExpense, calculateCrossCountryTripComparison } from '../features/fuel-calculator/utils';
import type { FuelCalculatorInputs } from '../features/fuel-calculator/types';

export default function FuelCalculatorPage() {
  const { countries, isLoading } = useFuelPrices();

  const [inputs, setInputs] = useState<FuelCalculatorInputs>({
    countryCode: 'KH', // Default: Cambodia
    fuelType: 'gasoline',
    consumptionL100km: 7.2,
    distanceKm: 315, // Phnom Penh to Siem Reap
    customPriceOverride: null,
  });

  const selectedCountry = useMemo(() => {
    return countries.find((c) => c.code.toUpperCase() === inputs.countryCode.toUpperCase()) || null;
  }, [countries, inputs.countryCode]);

  const calculationResult = useMemo(() => {
    return calculateTripExpense(inputs, selectedCountry);
  }, [inputs, selectedCountry]);

  const comparisonItems = useMemo(() => {
    return calculateCrossCountryTripComparison(
      inputs.distanceKm,
      inputs.consumptionL100km,
      inputs.fuelType,
      selectedCountry,
      countries
    );
  }, [inputs.distanceKm, inputs.consumptionL100km, inputs.fuelType, selectedCountry, countries]);

  if (isLoading) {
    return <div className='h-96 animate-pulse rounded-3xl bg-slate-200/60 dark:bg-slate-800/60' />;
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900'>
        <div className='flex items-center gap-3.5'>
          <div className='flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400'>
            <Calculator size={22} />
          </div>
          <div>
            <h1 className='text-xl font-black text-slate-900 dark:text-slate-100 flex items-center gap-2'>
              <span>Vehicle Fuel Travel Cost Estimator</span>
              <span className='rounded bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400'>
                Live Rates
              </span>
            </h1>
            <p className='text-xs text-slate-400'>
              Calculate trip fuel consumption, cost per kilometer, and cross-border road travel expenses
            </p>
          </div>
        </div>
      </div>

      {/* Input Parameters Form */}
      <FuelCalculatorForm inputs={inputs} onChange={setInputs} countries={countries} />

      {/* Primary Calculated Metrics */}
      <FuelCalculatorResults result={calculationResult} distanceKm={inputs.distanceKm} />

      {/* Cross-Country Parity Comparison Table */}
      <CrossCountryComparisonTable
        items={comparisonItems}
        selectedCountryCode={inputs.countryCode}
        distanceKm={inputs.distanceKm}
      />

      {/* Methodology & Formula Disclosure */}
      <div className='flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50/70 p-4 text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-900/40'>
        <Info size={16} className='shrink-0 text-indigo-500 mt-0.5' />
        <div className='space-y-1'>
          <p className='font-bold text-slate-700 dark:text-slate-300'>Travel Cost Formula & Assumptions</p>
          <p className='leading-relaxed'>
            Calculated as: <code className='font-mono text-slate-700 dark:text-slate-300'>Liters = (Distance × Consumption) / 100</code>,
            and <code className='font-mono text-slate-700 dark:text-slate-300'>Cost = Liters × Unit Pump Rate</code>.
            Fuel prices reflect official retail pump values converted using real-time forex exchange rates.
          </p>
        </div>
      </div>
    </div>
  );
}
