import { useState, useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Filter, Fuel, Layers } from 'lucide-react';
import { useFuelPrices } from '../hooks/use-fuel-prices';
import WorldMap from '../features/global-map/components/world-map';
import type { DisplayUnit, FuelType } from '../types/fuel';
import { REGION_NAMES } from '../utils/flags';

interface ContextType {
  displayUnit: DisplayUnit;
}

export default function MapPage() {
  useOutletContext<ContextType>();
  const { countries, isLoading } = useFuelPrices();
  const [fuelType, setFuelType] = useState<FuelType>('gasoline');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');

  const filteredCountries = useMemo(() => {
    if (selectedRegion === 'all') return countries;
    return countries.filter((c) => c.region.toLowerCase() === selectedRegion.toLowerCase());
  }, [countries, selectedRegion]);

  if (isLoading) {
    return <div className='h-[600px] animate-pulse rounded-3xl bg-slate-200/60 dark:bg-slate-800/60' />;
  }

  return (
    <div className='space-y-5'>
      {/* Map Control Bar */}
      <div className='flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900'>
        {/* Fuel Type Switcher */}
        <div className='flex items-center gap-2'>
          <Fuel size={16} className='text-slate-400' />
          <div className='flex items-center gap-1 rounded-xl bg-slate-100 p-1 dark:bg-slate-800'>
            <button
              onClick={() => setFuelType('gasoline')}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                fuelType === 'gasoline'
                  ? 'bg-white text-slate-900 shadow-2xs dark:bg-slate-900 dark:text-slate-100'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
              }`}
            >
              Gasoline
            </button>
            <button
              onClick={() => setFuelType('diesel')}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                fuelType === 'diesel'
                  ? 'bg-white text-slate-900 shadow-2xs dark:bg-slate-900 dark:text-slate-100'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
              }`}
            >
              Diesel
            </button>
          </div>
        </div>

        {/* Region Filter */}
        <div className='flex items-center gap-2'>
          <Filter size={15} className='text-slate-400' />
          <div className='relative'>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className='appearance-none rounded-xl border border-slate-200 bg-white py-1.5 pl-3 pr-7 text-xs font-bold text-slate-700 shadow-2xs hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200'
            >
              <option value='all'>All Regions (Global)</option>
              {Object.entries(REGION_NAMES).map(([key, name]) => (
                <option key={key} value={key}>
                  {name}
                </option>
              ))}
            </select>
            <span className='pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[9px] text-slate-400'>
              ▼
            </span>
          </div>
        </div>
      </div>

      {/* Main Map */}
      <WorldMap countries={filteredCountries} fuelType={fuelType} />

      {/* Quick Tips */}
      <div className='flex items-center gap-2 text-xs text-slate-400'>
        <Layers size={13} />
        <span>Click any country path to navigate directly to its historical prices and detailed breakdown.</span>
      </div>
    </div>
  );
}
