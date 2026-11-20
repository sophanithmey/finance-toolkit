import { Award, Fuel, Globe, TrendingUp } from 'lucide-react';
import type { AseanFuelStats } from '../types';
import type { DisplayUnit } from '../../../types/fuel';
import { convertUsdPerLiterToDisplay, getDisplayUnitShort } from '../../../utils/units';

interface AseanKpiGridProps {
  readonly stats: AseanFuelStats;
  readonly displayUnit: DisplayUnit;
}

export default function AseanKpiGrid({ stats, displayUnit }: AseanKpiGridProps) {
  const unitLabel = getDisplayUnitShort(displayUnit);

  const avgGas = convertUsdPerLiterToDisplay(stats.avgGasolineUsdPerL, displayUnit);
  const avgDiesel = convertUsdPerLiterToDisplay(stats.avgDieselUsdPerL, displayUnit);
  const cheapestGas = convertUsdPerLiterToDisplay(stats.cheapestGasoline?.priceUsdPerL ?? null, displayUnit);
  const mostExpGas = convertUsdPerLiterToDisplay(stats.mostExpensiveGasoline?.priceUsdPerL ?? null, displayUnit);

  return (
    <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
      {/* Total Coverage */}
      <div className='rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900'>
        <div className='flex items-center justify-between text-xs text-slate-400'>
          <span className='font-bold uppercase tracking-wider'>ASEAN Coverage</span>
          <div className='flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400'>
            <Globe size={16} />
          </div>
        </div>
        <div className='mt-2'>
          <div className='flex items-baseline gap-1.5'>
            <span className='font-mono text-2xl font-black text-slate-900 dark:text-slate-100'>
              {stats.availableCount}
            </span>
            <span className='text-xs font-semibold text-slate-400'>/ {stats.totalAseanCount} Nations</span>
          </div>
          <p className='mt-1 text-[11px] font-medium text-slate-500'>
            10 feeds active • Brunei reported as no data
          </p>
        </div>
      </div>

      {/* ASEAN Avg Gasoline */}
      <div className='rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900'>
        <div className='flex items-center justify-between text-xs text-slate-400'>
          <span className='font-bold uppercase tracking-wider'>ASEAN Avg Gasoline</span>
          <div className='flex h-8 w-8 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400'>
            <Fuel size={16} />
          </div>
        </div>
        <div className='mt-2'>
          <div className='font-mono text-2xl font-black text-slate-900 dark:text-slate-100'>
            {avgGas !== null ? `$${avgGas.toFixed(2)}` : '—'}{' '}
            <span className='text-xs font-semibold text-slate-400'>{unitLabel}</span>
          </div>
          <p className='mt-1 text-[11px] font-medium text-slate-500'>Across all active member states</p>
        </div>
      </div>

      {/* ASEAN Avg Diesel */}
      <div className='rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900'>
        <div className='flex items-center justify-between text-xs text-slate-400'>
          <span className='font-bold uppercase tracking-wider'>ASEAN Avg Diesel</span>
          <div className='flex h-8 w-8 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600 dark:bg-cyan-950/50 dark:text-cyan-400'>
            <Fuel size={16} />
          </div>
        </div>
        <div className='mt-2'>
          <div className='font-mono text-2xl font-black text-slate-900 dark:text-slate-100'>
            {avgDiesel !== null ? `$${avgDiesel.toFixed(2)}` : '—'}{' '}
            <span className='text-xs font-semibold text-slate-400'>{unitLabel}</span>
          </div>
          <p className='mt-1 text-[11px] font-medium text-slate-500'>Commercial transport benchmark</p>
        </div>
      </div>

      {/* Regional Spread */}
      <div className='rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900'>
        <div className='flex items-center justify-between text-xs text-slate-400'>
          <span className='font-bold uppercase tracking-wider'>Regional Spread</span>
          <div className='flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400'>
            <TrendingUp size={16} />
          </div>
        </div>
        <div className='mt-2'>
          <div className='flex items-center justify-between text-xs'>
            <span className='text-slate-500 flex items-center gap-1'>
              <Award size={12} className='text-emerald-500' /> Low:
            </span>
            <span className='font-mono font-bold text-emerald-600 dark:text-emerald-400'>
              {stats.cheapestGasoline?.country.name} (${cheapestGas?.toFixed(2)})
            </span>
          </div>
          <div className='mt-1 flex items-center justify-between text-xs'>
            <span className='text-slate-500 flex items-center gap-1'>
              <Award size={12} className='text-rose-500' /> High:
            </span>
            <span className='font-mono font-bold text-rose-600 dark:text-rose-400'>
              {stats.mostExpensiveGasoline?.country.name} (${mostExpGas?.toFixed(2)})
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
