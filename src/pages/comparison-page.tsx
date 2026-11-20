import { useState, useMemo } from 'react';
import { useSearchParams, useOutletContext } from 'react-router-dom';
import { Scale, Trash2 } from 'lucide-react';
import { useFuelPrices } from '../hooks/use-fuel-prices';
import ComparisonBarChart from '../components/organisms/comparison-bar-chart';
import ComparisonTable from '../features/countries/components/comparison-table';
import { getCountryFlag } from '../utils/flags';
import type { DisplayUnit } from '../types/fuel';

interface ContextType {
  displayUnit: DisplayUnit;
}

const presets = [
  { label: '🇰🇭 Mekong Neighbors', codes: ['KH', 'TH', 'VN', 'LA'] },
  { label: '🌏 ASEAN Core', codes: ['KH', 'TH', 'VN', 'MY', 'SG'] },
  { label: 'G7 Nations', codes: ['US', 'CA', 'GB', 'FR', 'DE'] },
  { label: 'Oil Exporters', codes: ['SA', 'AE', 'QA', 'KW', 'DZ'] },
];

export default function ComparisonPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { displayUnit } = useOutletContext<ContextType>();
  const { countries, isLoading } = useFuelPrices();

  const [selectedCodes, setSelectedCodes] = useState<string[]>(() => {
    const fromUrl = searchParams.get('codes');
    if (fromUrl) return fromUrl.split(',').slice(0, 5);
    return ['KH', 'TH', 'VN', 'MY', 'SG'];
  });

  const selectedCountries = useMemo(() => {
    return selectedCodes
      .map((code) => countries.find((c) => c.code.toUpperCase() === code.toUpperCase()))
      .filter((c): c is (typeof countries)[0] => c !== undefined);
  }, [selectedCodes, countries]);

  const addCode = (code: string) => {
    if (selectedCodes.includes(code) || selectedCodes.length >= 5) return;
    const next = [...selectedCodes, code];
    setSelectedCodes(next);
    setSearchParams({ codes: next.join(',') });
  };

  const removeCode = (code: string) => {
    const next = selectedCodes.filter((c) => c !== code);
    setSelectedCodes(next);
    setSearchParams(next.length ? { codes: next.join(',') } : {});
  };

  const applyPreset = (codes: string[]) => {
    setSelectedCodes(codes);
    setSearchParams({ codes: codes.join(',') });
  };

  if (isLoading) {
    return <div className='h-96 animate-pulse rounded-3xl bg-slate-200/60 dark:bg-slate-800/60' />;
  }

  return (
    <div className='space-y-6'>
      {/* Header and Presets */}
      <div className='rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900'>
        <div className='flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4 mb-4 dark:border-slate-800'>
          <div>
            <h2 className='text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2'>
              <Scale size={18} className='text-indigo-600 dark:text-indigo-400' />
              <span>Cross-Country Fuel Comparison</span>
            </h2>
            <p className='text-xs text-slate-400'>Select up to 5 countries for side-by-side fuel parity</p>
          </div>

          <div className='flex items-center gap-2'>
            <select
              onChange={(e) => {
                if (e.target.value) {
                  addCode(e.target.value);
                  e.target.value = '';
                }
              }}
              disabled={selectedCodes.length >= 5}
              className='rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200'
            >
              <option value=''>+ Add Country ({5 - selectedCodes.length} left)...</option>
              {countries.map((c) => (
                <option key={c.code} value={c.code} disabled={selectedCodes.includes(c.code)}>
                  {getCountryFlag(c.code)} {c.name} ({c.code})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Preset Buttons */}
        <div className='flex flex-wrap items-center gap-1.5'>
          <span className='text-xs text-slate-400 mr-1'>Presets:</span>
          {presets.map((p) => (
            <button
              key={p.label}
              type='button'
              onClick={() => applyPreset(p.codes)}
              className='rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300'
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Selected Country Tags */}
        <div className='mt-4 flex flex-wrap gap-2'>
          {selectedCountries.map((c) => (
            <div
              key={c.code}
              className='inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 py-1 pl-2.5 pr-1.5 text-xs font-bold text-slate-800 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-200'
            >
              <span>{getCountryFlag(c.code)}</span>
              <span>{c.name}</span>
              <button
                type='button'
                onClick={() => removeCode(c.code)}
                aria-label={`Remove ${c.name}`}
                className='rounded-md p-0.5 text-slate-400 hover:text-rose-600'
              >
                <Trash2 size={12} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Comparison Chart */}
      <div className='rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900'>
        <ComparisonBarChart countries={selectedCountries} />
      </div>

      {/* Itemized Comparison Table */}
      <ComparisonTable countries={selectedCountries} displayUnit={displayUnit} />
    </div>
  );
}
