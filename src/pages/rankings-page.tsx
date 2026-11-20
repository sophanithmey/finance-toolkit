import { useState, useMemo } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { useFuelPrices } from '../hooks/use-fuel-prices';
import { getRankedCountries } from '../services/fuel/calculations';
import { filterAseanCountries } from '../features/asean/utils';
import { getCountryFlag } from '../utils/flags';
import { convertUsdPerLiterToDisplay, getDisplayUnitShort } from '../utils/units';
import type { DisplayUnit } from '../types/fuel';

interface ContextType {
  displayUnit: DisplayUnit;
}

type Scope = 'asean' | 'global';
type RankingCategory =
  | 'cheapest_gas'
  | 'expensive_gas'
  | 'cheapest_diesel'
  | 'expensive_diesel';

export default function RankingsPage() {
  const { displayUnit } = useOutletContext<ContextType>();
  const { countries, isLoading } = useFuelPrices();
  const [scope, setScope] = useState<Scope>('asean');
  const [category, setCategory] = useState<RankingCategory>('cheapest_gas');
  const unitLabel = getDisplayUnitShort(displayUnit);

  const targetCountries = useMemo(() => {
    return scope === 'asean' ? filterAseanCountries(countries) : countries;
  }, [countries, scope]);

  const rankedData = useMemo(() => {
    switch (category) {
      case 'expensive_gas':
        return getRankedCountries(targetCountries, 'gasoline', 'expensive');
      case 'cheapest_diesel':
        return getRankedCountries(targetCountries, 'diesel', 'cheapest');
      case 'expensive_diesel':
        return getRankedCountries(targetCountries, 'diesel', 'expensive');
      case 'cheapest_gas':
      default:
        return getRankedCountries(targetCountries, 'gasoline', 'cheapest');
    }
  }, [targetCountries, category]);

  if (isLoading) {
    return <div className='h-96 animate-pulse rounded-3xl bg-slate-200/60 dark:bg-slate-800/60' />;
  }

  const tabs = [
    { id: 'cheapest_gas', label: 'Cheapest Gas' },
    { id: 'expensive_gas', label: 'Most Expensive Gas' },
    { id: 'cheapest_diesel', label: 'Cheapest Diesel' },
    { id: 'expensive_diesel', label: 'Most Expensive Diesel' },
  ];

  return (
    <div className='space-y-6'>
      {/* Scope and Category Selectors */}
      <div className='flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200/80 bg-white p-3 shadow-xs dark:border-slate-800 dark:bg-slate-900'>
        {/* Scope Pill Toggle */}
        <div className='flex rounded-xl border border-slate-200 bg-slate-100 p-1 dark:border-slate-800 dark:bg-slate-950'>
          <button
            type='button'
            onClick={() => setScope('asean')}
            className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
              scope === 'asean'
                ? 'bg-white text-indigo-700 shadow-xs dark:bg-slate-800 dark:text-indigo-400'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400'
            }`}
          >
            ASEAN Leaderboard
          </button>
          <button
            type='button'
            onClick={() => setScope('global')}
            className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
              scope === 'global'
                ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-800 dark:text-slate-100'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400'
            }`}
          >
            Global Leaderboard
          </button>
        </div>

        {/* Category Tabs */}
        <div className='flex flex-wrap items-center gap-1.5'>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setCategory(tab.id as RankingCategory)}
              className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                category === tab.id
                  ? 'bg-slate-900 text-white shadow-xs dark:bg-white dark:text-slate-900'
                  : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Rankings Table */}
      <div className='overflow-x-auto rounded-3xl border border-slate-200/80 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900'>
        <table className='w-full text-left text-sm'>
          <thead className='border-b border-slate-100 bg-slate-50/75 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-500'>
            <tr>
              <th className='py-3.5 px-4 text-center w-14'>Rank</th>
              <th className='py-3.5 px-4'>Country</th>
              <th className='py-3.5 px-4'>Region</th>
              <th className='py-3.5 px-4 text-right'>Normalized ({unitLabel})</th>
              <th className='py-3.5 px-4 text-right'>Native Pump Price</th>
              <th className='py-3.5 px-4 text-right'>Updated</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-slate-100 text-xs font-semibold text-slate-700 dark:divide-slate-800 dark:text-slate-300'>
            {rankedData.map((item, idx) => {
              const displayPrice = convertUsdPerLiterToDisplay(item.price, displayUnit);
              const rank = idx + 1;
              const isKh = item.country.code.toUpperCase() === 'KH';

              return (
                <tr
                  key={item.country.code}
                  className={
                    isKh
                      ? 'bg-indigo-50/60 dark:bg-indigo-950/20 font-bold'
                      : 'hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors'
                  }
                >
                  <td className='py-3 px-4 text-center font-mono font-bold'>
                    {rank <= 3 ? (
                      <span className='inline-flex h-6 w-6 items-center justify-center rounded-full bg-amber-100 text-amber-800 text-[11px] font-black dark:bg-amber-950/60 dark:text-amber-300'>
                        #{rank}
                      </span>
                    ) : (
                      <span className='text-slate-400 text-xs'>#{rank}</span>
                    )}
                  </td>
                  <td className='py-3 px-4'>
                    <Link
                      to={isKh ? '/cambodia' : `/country/${item.country.code.toLowerCase()}`}
                      className='flex items-center gap-2.5 font-bold text-slate-900 hover:text-indigo-600 dark:text-slate-100 dark:hover:text-indigo-400'
                    >
                      <span className='text-xl'>{getCountryFlag(item.country.code)}</span>
                      <span>{item.country.name}</span>
                      {isKh && (
                        <span className='rounded bg-amber-400/20 px-1.5 py-0.2 text-[9px] font-extrabold text-amber-700 dark:text-amber-300'>
                          Featured
                        </span>
                      )}
                    </Link>
                  </td>
                  <td className='py-3 px-4 text-slate-500 uppercase text-[10px] font-bold'>
                    {item.country.region}
                  </td>
                  <td className='py-3 px-4 text-right font-mono font-black text-sm text-slate-900 dark:text-slate-100'>
                    ${displayPrice?.toFixed(2)}{' '}
                    <span className='text-[10px] font-normal text-slate-400'>{unitLabel}</span>
                  </td>
                  <td className='py-3 px-4 text-right font-mono text-slate-400'>
                    {item.country.prices.gasoline ?? '—'} {item.country.currency} / {item.country.nativeUnit}
                  </td>
                  <td className='py-3 px-4 text-right font-mono text-slate-400 text-[11px]'>
                    {new Date(item.country.updatedAt).toLocaleDateString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
