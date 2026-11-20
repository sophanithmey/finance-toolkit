import { Link } from 'react-router-dom';
import { ArrowUpRight, Scale } from 'lucide-react';
import type { NormalizedCountryFuel, DisplayUnit } from '../../../types/fuel';
import { getCountryFlag } from '../../../utils/flags';
import { convertUsdPerLiterToDisplay, getDisplayUnitShort } from '../../../utils/units';

interface Props {
  readonly country: NormalizedCountryFuel;
  readonly displayUnit: DisplayUnit;
  readonly onCompare?: (code: string) => void;
  readonly isComparing?: boolean;
}

export default function CountryCard({
  country,
  displayUnit,
  onCompare,
  isComparing = false,
}: Props) {
  const flag = getCountryFlag(country.code);
  const unitLabel = getDisplayUnitShort(displayUnit);

  const displayGas = convertUsdPerLiterToDisplay(country.usdPrices.gasoline, displayUnit);
  const displayDiesel = convertUsdPerLiterToDisplay(country.usdPrices.diesel, displayUnit);

  return (
    <div className='group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs transition-all hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900'>
      <div>
        <div className='flex items-start justify-between gap-2'>
          <div className='flex items-center gap-2 min-w-0'>
            <span className='text-2xl shrink-0'>{flag}</span>
            <div className='min-w-0'>
              <h3 className='text-sm font-bold text-slate-900 dark:text-slate-100 truncate'>
                {country.name}
              </h3>
              <p className='text-[10px] font-semibold uppercase text-slate-400'>
                {country.region}
              </p>
            </div>
          </div>

          <span className='rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[10px] font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300 shrink-0'>
            {country.code}
          </span>
        </div>

        {/* Prices Grid */}
        <div className='mt-3.5 grid grid-cols-2 gap-2 rounded-xl bg-slate-50/60 p-2.5 text-xs dark:bg-slate-800/40'>
          <div>
            <p className='text-[10px] text-slate-400 uppercase font-semibold'>Gasoline</p>
            <p className='font-mono font-bold text-emerald-600 dark:text-emerald-400 text-sm'>
              {displayGas !== null ? `$${displayGas.toFixed(2)}` : 'N/A'}
              {displayGas !== null && <span className='text-[10px] font-normal text-slate-400 ml-0.5'>{unitLabel}</span>}
            </p>
          </div>

          <div>
            <p className='text-[10px] text-slate-400 uppercase font-semibold'>Diesel</p>
            <p className='font-mono font-bold text-cyan-600 dark:text-cyan-400 text-sm'>
              {displayDiesel !== null ? `$${displayDiesel.toFixed(2)}` : 'N/A'}
              {displayDiesel !== null && <span className='text-[10px] font-normal text-slate-400 ml-0.5'>{unitLabel}</span>}
            </p>
          </div>
        </div>

        {/* Native Currency Reference */}
        <p className='mt-2 text-[10px] text-slate-400 dark:text-slate-500 truncate'>
          Native: {country.prices.gasoline ?? '—'} {country.currency} / {country.nativeUnit}
        </p>
      </div>

      {/* Card Actions */}
      <div className='mt-3.5 flex items-center justify-between border-t border-slate-100 pt-2.5 dark:border-slate-800'>
        {onCompare && (
          <button
            type='button'
            onClick={() => onCompare(country.code)}
            className={`inline-flex items-center gap-1 text-[11px] font-semibold transition-colors ${
              isComparing
                ? 'text-indigo-600 dark:text-indigo-400 font-bold'
                : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
            }`}
          >
            <Scale size={13} />
            <span>{isComparing ? 'Comparing' : 'Compare'}</span>
          </button>
        )}

        <Link
          to={`/country/${country.code.toLowerCase()}`}
          className='inline-flex items-center gap-1 text-[11px] font-bold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400'
        >
          <span>Profile</span>
          <ArrowUpRight size={13} />
        </Link>
      </div>
    </div>
  );
}
