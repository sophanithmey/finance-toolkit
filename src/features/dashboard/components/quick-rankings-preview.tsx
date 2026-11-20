import { Link } from 'react-router-dom';
import type { NormalizedCountryFuel, DisplayUnit } from '../../../types/fuel';
import { getCountryFlag } from '../../../utils/flags';
import { convertUsdPerLiterToDisplay, getDisplayUnitShort } from '../../../utils/units';
import { getRankedCountries } from '../../../services/fuel/calculations';

interface Props {
  readonly countries: NormalizedCountryFuel[];
  readonly displayUnit: DisplayUnit;
}

export default function QuickRankingsPreview({ countries, displayUnit }: Props) {
  const unitLabel = getDisplayUnitShort(displayUnit);
  const cheapest = getRankedCountries(countries, 'gasoline', 'cheapest').slice(0, 5);
  const expensive = getRankedCountries(countries, 'gasoline', 'expensive').slice(0, 5);

  return (
    <div className='grid gap-4 md:grid-cols-2'>
      {/* Cheapest 5 */}
      <div className='rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900'>
        <div className='flex items-center justify-between border-b border-slate-100 pb-3 mb-3 dark:border-slate-800'>
          <h3 className='text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400'>
            Top 5 Cheapest Gasoline
          </h3>
          <Link to='/rankings' className='text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline'>
            View all →
          </Link>
        </div>

        <div className='divide-y divide-slate-100 dark:divide-slate-800'>
          {cheapest.map((item, idx) => {
            const price = convertUsdPerLiterToDisplay(item.price, displayUnit);
            return (
              <Link
                key={item.country.code}
                to={`/country/${item.country.code.toLowerCase()}`}
                className='flex items-center justify-between py-2.5 text-xs hover:bg-slate-50 dark:hover:bg-slate-800/40 rounded-lg px-2 transition-colors'
              >
                <div className='flex items-center gap-2.5'>
                  <span className='font-mono font-bold text-slate-400 text-[11px] w-4'>#{idx + 1}</span>
                  <span className='text-base'>{getCountryFlag(item.country.code)}</span>
                  <span className='font-semibold text-slate-800 dark:text-slate-200'>{item.country.name}</span>
                </div>
                <div className='font-mono font-bold text-emerald-600 dark:text-emerald-400'>
                  ${price?.toFixed(2)} <span className='text-[10px] text-slate-400'>{unitLabel}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Most Expensive 5 */}
      <div className='rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900'>
        <div className='flex items-center justify-between border-b border-slate-100 pb-3 mb-3 dark:border-slate-800'>
          <h3 className='text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400'>
            Top 5 Most Expensive Gasoline
          </h3>
          <Link to='/rankings' className='text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline'>
            View all →
          </Link>
        </div>

        <div className='divide-y divide-slate-100 dark:divide-slate-800'>
          {expensive.map((item, idx) => {
            const price = convertUsdPerLiterToDisplay(item.price, displayUnit);
            return (
              <Link
                key={item.country.code}
                to={`/country/${item.country.code.toLowerCase()}`}
                className='flex items-center justify-between py-2.5 text-xs hover:bg-slate-50 dark:hover:bg-slate-800/40 rounded-lg px-2 transition-colors'
              >
                <div className='flex items-center gap-2.5'>
                  <span className='font-mono font-bold text-slate-400 text-[11px] w-4'>#{idx + 1}</span>
                  <span className='text-base'>{getCountryFlag(item.country.code)}</span>
                  <span className='font-semibold text-slate-800 dark:text-slate-200'>{item.country.name}</span>
                </div>
                <div className='font-mono font-bold text-rose-600 dark:text-rose-400'>
                  ${price?.toFixed(2)} <span className='text-[10px] text-slate-400'>{unitLabel}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
