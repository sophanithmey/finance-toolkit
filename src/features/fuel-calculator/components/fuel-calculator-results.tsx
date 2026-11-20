import { DollarSign, Droplets, Gauge, Navigation } from 'lucide-react';
import type { FuelCalculationResult } from '../types';

interface ResultsProps {
  readonly result: FuelCalculationResult;
  readonly distanceKm: number;
}

export default function FuelCalculatorResults({ result, distanceKm }: ResultsProps) {
  return (
    <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
      {/* Total Estimated Cost */}
      <div className='rounded-2xl border border-indigo-200/80 bg-gradient-to-br from-indigo-50/70 to-white p-5 shadow-xs dark:border-indigo-900/50 dark:from-indigo-950/30 dark:to-slate-900'>
        <div className='flex items-center justify-between text-xs text-indigo-700 dark:text-indigo-400'>
          <span className='font-bold uppercase tracking-wider'>Total Trip Cost</span>
          <div className='flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300'>
            <DollarSign size={16} />
          </div>
        </div>
        <div className='mt-2'>
          <div className='font-mono text-3xl font-black text-slate-900 dark:text-slate-100'>
            ${result.totalCostUsd.toFixed(2)}
          </div>
          <p className='mt-1 text-xs font-semibold text-indigo-600 dark:text-indigo-300 font-mono'>
            {result.totalCostNative.toLocaleString(undefined, { maximumFractionDigits: 0 })} {result.currency}
          </p>
        </div>
      </div>

      {/* Fuel Required */}
      <div className='rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900'>
        <div className='flex items-center justify-between text-xs text-slate-400'>
          <span className='font-bold uppercase tracking-wider'>Fuel Volume Required</span>
          <div className='flex h-8 w-8 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400'>
            <Droplets size={16} />
          </div>
        </div>
        <div className='mt-2'>
          <div className='font-mono text-3xl font-black text-slate-900 dark:text-slate-100'>
            {result.fuelRequiredLiters.toFixed(1)}{' '}
            <span className='text-xs font-semibold text-slate-400'>Liters</span>
          </div>
          <p className='mt-1 text-xs font-semibold text-slate-500 font-mono'>
            ~{result.fuelRequiredGallons.toFixed(1)} US Gallons
          </p>
        </div>
      </div>

      {/* Cost per Kilometer */}
      <div className='rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900'>
        <div className='flex items-center justify-between text-xs text-slate-400'>
          <span className='font-bold uppercase tracking-wider'>Cost Per Kilometer</span>
          <div className='flex h-8 w-8 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600 dark:bg-cyan-950/50 dark:text-cyan-400'>
            <Navigation size={16} />
          </div>
        </div>
        <div className='mt-2'>
          <div className='font-mono text-3xl font-black text-slate-900 dark:text-slate-100'>
            ${result.costPerKmUsd.toFixed(3)}{' '}
            <span className='text-xs font-semibold text-slate-400'>/ km</span>
          </div>
          <p className='mt-1 text-xs font-semibold text-slate-500'>
            Based on {distanceKm.toLocaleString()} km travel
          </p>
        </div>
      </div>

      {/* Cost per 100km */}
      <div className='rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900'>
        <div className='flex items-center justify-between text-xs text-slate-400'>
          <span className='font-bold uppercase tracking-wider'>Cost per 100 KM</span>
          <div className='flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400'>
            <Gauge size={16} />
          </div>
        </div>
        <div className='mt-2'>
          <div className='font-mono text-3xl font-black text-slate-900 dark:text-slate-100'>
            ${result.costPer100KmUsd.toFixed(2)}
          </div>
          <p className='mt-1 text-xs font-semibold text-slate-500'>
            Pump price: ${result.unitPriceUsd.toFixed(2)}/L
          </p>
        </div>
      </div>
    </div>
  );
}
