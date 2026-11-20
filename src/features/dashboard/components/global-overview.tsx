import { Coins, Flame, Globe2, TrendingDown, TrendingUp } from 'lucide-react';
import type { GlobalFuelStats, DisplayUnit } from '../../../types/fuel';
import { convertUsdPerLiterToDisplay, getDisplayUnitShort } from '../../../utils/units';
import { getCountryFlag } from '../../../utils/flags';

interface Props {
  readonly stats: GlobalFuelStats;
  readonly displayUnit: DisplayUnit;
}

export default function GlobalOverview({ stats, displayUnit }: Props) {
  const unitLabel = getDisplayUnitShort(displayUnit);
  const avgGas = convertUsdPerLiterToDisplay(stats.avgGasolineUsdPerL, displayUnit);
  const avgDiesel = convertUsdPerLiterToDisplay(stats.avgDieselUsdPerL, displayUnit);

  const cheapestGas = stats.cheapestGasoline
    ? convertUsdPerLiterToDisplay(stats.cheapestGasoline.priceUsdPerL, displayUnit)
    : null;

  const mostExpGas = stats.mostExpensiveGasoline
    ? convertUsdPerLiterToDisplay(stats.mostExpensiveGasoline.priceUsdPerL, displayUnit)
    : null;

  return (
    <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
      {/* Total Tracked Nations */}
      <div className='rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900'>
        <div className='flex items-start justify-between'>
          <div>
            <p className='text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400'>
              Tracked Countries
            </p>
            <div className='mt-1.5 tabular-nums text-3xl font-black text-slate-900 dark:text-slate-100'>
              {stats.totalCountries}
            </div>
            <p className='mt-1 text-xs text-slate-400'>Worldwide retail pump feeds</p>
          </div>
          <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200'>
            <Globe2 size={18} />
          </div>
        </div>
      </div>

      {/* Avg Gasoline */}
      <div className='rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900'>
        <div className='flex items-start justify-between'>
          <div>
            <p className='text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400'>
              Global Avg Gasoline
            </p>
            <div className='mt-1.5 tabular-nums text-3xl font-black text-emerald-600 dark:text-emerald-400'>
              ${avgGas ? avgGas.toFixed(2) : '—'}
              <span className='ml-1 text-xs font-bold text-slate-400'>{unitLabel}</span>
            </div>
            <p className='mt-1 text-xs text-slate-400'>Unleaded regular / 95 RON</p>
          </div>
          <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400'>
            <Flame size={18} />
          </div>
        </div>
      </div>

      {/* Avg Diesel */}
      <div className='rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900'>
        <div className='flex items-start justify-between'>
          <div>
            <p className='text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400'>
              Global Avg Diesel
            </p>
            <div className='mt-1.5 tabular-nums text-3xl font-black text-cyan-600 dark:text-cyan-400'>
              ${avgDiesel ? avgDiesel.toFixed(2) : '—'}
              <span className='ml-1 text-xs font-bold text-slate-400'>{unitLabel}</span>
            </div>
            <p className='mt-1 text-xs text-slate-400'>Automotive diesel benchmark</p>
          </div>
          <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600 dark:bg-cyan-950/60 dark:text-cyan-400'>
            <Coins size={18} />
          </div>
        </div>
      </div>

      {/* Extremes (Cheapest vs Most Expensive) */}
      <div className='rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900'>
        <p className='text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400'>
          Market Extremes
        </p>
        <div className='mt-2 space-y-2 text-xs'>
          <div className='flex items-center justify-between'>
            <span className='flex items-center gap-1.5 text-emerald-600 font-semibold'>
              <TrendingDown size={13} />
              <span>Low:</span>
              <span>{stats.cheapestGasoline ? getCountryFlag(stats.cheapestGasoline.country.code) : ''}</span>
              <span className='text-slate-800 dark:text-slate-200 truncate max-w-[85px]'>{stats.cheapestGasoline?.country.name}</span>
            </span>
            <span className='font-mono font-bold text-slate-900 dark:text-slate-100'>
              ${cheapestGas?.toFixed(2)}
            </span>
          </div>

          <div className='flex items-center justify-between'>
            <span className='flex items-center gap-1.5 text-rose-600 font-semibold'>
              <TrendingUp size={13} />
              <span>High:</span>
              <span>{stats.mostExpensiveGasoline ? getCountryFlag(stats.mostExpensiveGasoline.country.code) : ''}</span>
              <span className='text-slate-800 dark:text-slate-200 truncate max-w-[85px]'>{stats.mostExpensiveGasoline?.country.name}</span>
            </span>
            <span className='font-mono font-bold text-slate-900 dark:text-slate-100'>
              ${mostExpGas?.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
