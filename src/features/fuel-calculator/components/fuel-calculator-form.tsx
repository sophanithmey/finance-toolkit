import type { NormalizedCountryFuel } from '../../../types/fuel';
import type { CalculatorFuelType, FuelCalculatorInputs, TripPreset } from '../types';
import { TRIP_PRESETS } from '../utils';
import { getCountryFlag } from '../../../utils/flags';

interface FormProps {
  readonly inputs: FuelCalculatorInputs;
  readonly onChange: (next: FuelCalculatorInputs) => void;
  readonly countries: readonly NormalizedCountryFuel[];
}

export default function FuelCalculatorForm({ inputs, onChange, countries }: FormProps) {
  const handlePresetSelect = (preset: TripPreset) => {
    onChange({
      ...inputs,
      countryCode: preset.countryCode,
      distanceKm: preset.distanceKm,
      consumptionL100km: preset.defaultConsumption,
      customPriceOverride: null,
    });
  };

  return (
    <div className='rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-5'>
      {/* Route Presets */}
      <div>
        <span className='text-xs font-bold uppercase tracking-wider text-slate-400'>Popular Regional Itineraries</span>
        <div className='mt-2 flex flex-wrap gap-1.5'>
          {TRIP_PRESETS.map((preset) => (
            <button
              key={preset.id}
              type='button'
              onClick={() => handlePresetSelect(preset)}
              className='rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:border-indigo-400 hover:bg-indigo-50/50 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300 transition-all'
            >
              {preset.label} ({preset.distanceKm} km)
            </button>
          ))}
        </div>
      </div>

      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        {/* Country Picker */}
        <div>
          <label className='block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5'>Country / Market</label>
          <select
            value={inputs.countryCode}
            onChange={(e) => onChange({ ...inputs, countryCode: e.target.value, customPriceOverride: null })}
            className='w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs font-bold text-slate-800 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200'
          >
            {countries.map((c) => (
              <option key={c.code} value={c.code}>
                {getCountryFlag(c.code)} {c.name} ({c.code})
              </option>
            ))}
          </select>
        </div>

        {/* Fuel Grade */}
        <div>
          <label className='block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5'>Fuel Grade</label>
          <select
            value={inputs.fuelType}
            onChange={(e) => onChange({ ...inputs, fuelType: e.target.value as CalculatorFuelType })}
            className='w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs font-bold text-slate-800 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200'
          >
            <option value='gasoline'>Regular Gasoline (EA92)</option>
            <option value='gasoline_premium'>Premium Gasoline (EA95)</option>
            <option value='diesel'>Regular Diesel</option>
            <option value='lpg'>Autogas (LPG)</option>
          </select>
        </div>

        {/* Travel Distance (km) */}
        <div>
          <label className='block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5'>
            Travel Distance (Kilometers)
          </label>
          <input
            type='number'
            min='1'
            max='100000'
            value={inputs.distanceKm}
            onChange={(e) => onChange({ ...inputs, distanceKm: Number(e.target.value) || 0 })}
            className='w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 font-mono text-xs font-bold text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100'
          />
        </div>

        {/* Consumption (L/100km) */}
        <div>
          <label className='block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5'>
            Efficiency (L / 100 km)
          </label>
          <input
            type='number'
            step='0.1'
            min='1'
            max='50'
            value={inputs.consumptionL100km}
            onChange={(e) => onChange({ ...inputs, consumptionL100km: Number(e.target.value) || 0 })}
            className='w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 font-mono text-xs font-bold text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100'
          />
        </div>
      </div>
    </div>
  );
}
