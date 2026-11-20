import { useState, useMemo, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Info, TrendingUp } from 'lucide-react';
import { useFuelPrices } from '../hooks/use-fuel-prices';
import { saveCurrentSnapshots, generateTrendSeries } from '../features/historical/storage';
import TrendChart from '../features/historical/components/trend-chart';
import TrendSummaryCards from '../features/historical/components/trend-summary-cards';
import type { TimeRangeFilter } from '../features/historical/types';
import type { DisplayUnit } from '../types/fuel';
import { getDisplayUnitShort } from '../utils/units';
import { getCountryFlag } from '../utils/flags';

interface ContextType {
  displayUnit: DisplayUnit;
}

const timeFilters: { label: string; value: TimeRangeFilter }[] = [
  { label: '7 Days', value: '7d' },
  { label: '30 Days', value: '30d' },
  { label: '90 Days', value: '90d' },
  { label: '1 Year', value: '1y' },
  { label: 'All History', value: 'all' },
];

export default function HistoricalPage() {
  const { displayUnit } = useOutletContext<ContextType>();
  const { countries, isLoading } = useFuelPrices();

  const [timeRange, setTimeRange] = useState<TimeRangeFilter>('30d');
  const [fuelType, setFuelType] = useState<'gasoline' | 'diesel'>('gasoline');
  const [selectedCodes, setSelectedCodes] = useState<string[]>(['KH', 'TH', 'VN', 'MY', 'SG']);

  // Persist snapshot of current fetch
  useEffect(() => {
    if (countries.length > 0) {
      saveCurrentSnapshots(countries);
    }
  }, [countries]);

  const { points, summaries } = useMemo(() => {
    return generateTrendSeries(selectedCodes, countries, timeRange, fuelType);
  }, [selectedCodes, countries, timeRange, fuelType]);

  const unitLabel = getDisplayUnitShort(displayUnit);

  if (isLoading) {
    return <div className='h-96 animate-pulse rounded-3xl bg-slate-200/60 dark:bg-slate-800/60' />;
  }

  return (
    <div className='space-y-6'>
      {/* Header & Controls */}
      <div className='rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900'>
        <div className='flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4 mb-4 dark:border-slate-800'>
          <div>
            <h2 className='text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2'>
              <TrendingUp size={18} className='text-indigo-600 dark:text-indigo-400' />
              <span>Historical Fuel Price Movement & Trends</span>
            </h2>
            <p className='text-xs text-slate-400'>
              Track cross-border price volatility, percentage shifts, and regional momentum
            </p>
          </div>

          <div className='flex flex-wrap items-center gap-2'>
            {/* Fuel Type Switcher */}
            <div className='flex rounded-xl border border-slate-200 bg-slate-50 p-1 dark:border-slate-800 dark:bg-slate-950'>
              <button
                type='button'
                onClick={() => setFuelType('gasoline')}
                className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
                  fuelType === 'gasoline'
                    ? 'bg-white shadow-xs text-slate-900 dark:bg-slate-800 dark:text-slate-100'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Gasoline
              </button>
              <button
                type='button'
                onClick={() => setFuelType('diesel')}
                className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
                  fuelType === 'diesel'
                    ? 'bg-white shadow-xs text-slate-900 dark:bg-slate-800 dark:text-slate-100'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Diesel
              </button>
            </div>

            {/* Time Filter Tabs */}
            <div className='flex rounded-xl border border-slate-200 bg-slate-50 p-1 dark:border-slate-800 dark:bg-slate-950'>
              {timeFilters.map((f) => (
                <button
                  key={f.value}
                  type='button'
                  onClick={() => setTimeRange(f.value)}
                  className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
                    timeRange === f.value
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Country Multi-Select Chips */}
        <div className='flex flex-wrap items-center gap-1.5'>
          <span className='text-xs font-bold text-slate-400 mr-1'>Active Series:</span>
          {['KH', 'TH', 'VN', 'LA', 'MY', 'SG', 'ID', 'PH'].map((code) => {
            const isSelected = selectedCodes.includes(code);
            return (
              <button
                key={code}
                type='button'
                onClick={() => {
                  if (isSelected) {
                    if (selectedCodes.length > 1) setSelectedCodes(selectedCodes.filter((c) => c !== code));
                  } else {
                    setSelectedCodes([...selectedCodes, code]);
                  }
                }}
                className={`inline-flex items-center gap-1.5 rounded-xl border px-2.5 py-1 text-xs font-bold transition ${
                  isSelected
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300'
                    : 'border-slate-200 bg-slate-50 text-slate-400 hover:text-slate-700 dark:border-slate-800 dark:bg-slate-800'
                }`}
              >
                <span>{getCountryFlag(code)}</span>
                <span>{code}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Summary Stat Cards */}
      <TrendSummaryCards summaries={summaries} unitLabel={unitLabel} />

      {/* Chart Canvas */}
      <div className='rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900'>
        <TrendChart points={points} selectedCodes={selectedCodes} unitLabel={unitLabel} />
      </div>

      {/* Methodology Notice */}
      <div className='flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50/70 p-4 text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-900/40'>
        <Info size={16} className='shrink-0 text-indigo-500 mt-0.5' />
        <div className='space-y-1'>
          <p className='font-bold text-slate-700 dark:text-slate-300'>Snapshot Storage & Delta Verification</p>
          <p className='leading-relaxed'>
            Trend lines incorporate locally recorded daily snapshots combined with verified recent price change
            deltas (<code className='font-mono text-slate-700 dark:text-slate-300'>price_changes</code>) reported by
            the OpenVan API. Prices are never fabricated.
          </p>
        </div>
      </div>
    </div>
  );
}
