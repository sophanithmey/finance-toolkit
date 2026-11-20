import type { MapCountryHover } from '../map-types';
import { getCountryFlag } from '../../../utils/flags';

interface Props {
  readonly hover: MapCountryHover;
}

export default function MapTooltip({ hover }: Props) {
  const { country, code } = hover;
  const flag = getCountryFlag(code);

  return (
    <div
      className='pointer-events-none fixed z-50 min-w-[210px] -translate-x-1/2 -translate-y-full rounded-2xl border border-slate-200 bg-white/95 p-3.5 shadow-xl backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/95'
      style={{ left: hover.x, top: hover.y - 12 }}
    >
      <div className='flex items-center gap-2 border-b border-slate-100 pb-2 mb-2 dark:border-slate-800'>
        <span className='text-lg'>{flag}</span>
        <div>
          <p className='text-xs font-bold text-slate-900 dark:text-slate-100'>
            {country?.name || code}
          </p>
          <p className='text-[10px] font-semibold uppercase text-slate-400 dark:text-slate-500'>
            {country?.region || 'Global'}
          </p>
        </div>
      </div>

      {country ? (
        <div className='space-y-1.5 text-xs'>
          <div className='flex justify-between'>
            <span className='text-slate-500 dark:text-slate-400'>Gasoline:</span>
            <span className='font-mono font-bold text-slate-900 dark:text-slate-100'>
              {country.usdPrices.gasoline !== null
                ? `$${country.usdPrices.gasoline.toFixed(2)}/L`
                : 'N/A'}
            </span>
          </div>

          <div className='flex justify-between'>
            <span className='text-slate-500 dark:text-slate-400'>Diesel:</span>
            <span className='font-mono font-bold text-slate-900 dark:text-slate-100'>
              {country.usdPrices.diesel !== null
                ? `$${country.usdPrices.diesel.toFixed(2)}/L`
                : 'N/A'}
            </span>
          </div>

          <p className='pt-1 text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold text-center'>
            Click to view full country profile →
          </p>
        </div>
      ) : (
        <p className='text-xs text-slate-400'>Fuel data not reported for this territory</p>
      )}
    </div>
  );
}
