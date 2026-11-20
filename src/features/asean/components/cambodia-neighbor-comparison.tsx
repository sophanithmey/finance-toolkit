import { ArrowDownRight, ArrowUpRight, Scale } from 'lucide-react';
import type { NormalizedCountryFuel, DisplayUnit } from '../../../types/fuel';
import { getMekongNeighborComparison } from '../utils';
import { convertUsdPerLiterToDisplay, getDisplayUnitShort } from '../../../utils/units';

interface NeighborComparisonProps {
  readonly cambodia: NormalizedCountryFuel | null;
  readonly allCountries: readonly NormalizedCountryFuel[];
  readonly displayUnit: DisplayUnit;
}

export default function CambodiaNeighborComparison({
  cambodia,
  allCountries,
  displayUnit,
}: NeighborComparisonProps) {
  const comparisonList = getMekongNeighborComparison(cambodia, allCountries);
  const unitLabel = getDisplayUnitShort(displayUnit);

  return (
    <div className='rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900'>
      <div className='border-b border-slate-100 pb-3 mb-4 dark:border-slate-800'>
        <h3 className='text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2'>
          <Scale size={16} className='text-indigo-600 dark:text-indigo-400' />
          <span>Cross-Border Fuel Parity: Cambodia vs Neighbors</span>
        </h3>
        <p className='text-xs text-slate-400'>
          Retail gasoline price differences benchmarked directly against Cambodia (&ldquo;0% Baseline&rdquo;)
        </p>
      </div>

      <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-3'>
        {comparisonList.map((item) => {
          const isKh = item.code === 'KH';
          const gasPrice = convertUsdPerLiterToDisplay(item.gasolineUsdL, displayUnit);
          const hasData = item.gasolineUsdL !== null;
          const deltaPct = item.gasPctVsCambodia;

          return (
            <div
              key={item.code}
              className={`rounded-2xl border p-4 transition-all ${
                isKh
                  ? 'border-indigo-300/80 bg-indigo-50/60 dark:border-indigo-800/80 dark:bg-indigo-950/20 shadow-xs'
                  : 'border-slate-200/70 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-800/30'
              }`}
            >
              <div className='flex items-center justify-between text-xs'>
                <div className='flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100'>
                  <span className='text-base'>{item.flag}</span>
                  <span>{item.name}</span>
                  {isKh && (
                    <span className='rounded bg-indigo-600 px-1.5 py-0.2 text-[9px] font-extrabold text-white'>
                      Base
                    </span>
                  )}
                </div>
                <span className='font-mono text-[10px] text-slate-400 font-semibold'>{item.currency}</span>
              </div>

              <div className='mt-3 flex items-baseline justify-between'>
                <div>
                  <div className='font-mono text-xl font-black text-slate-900 dark:text-slate-100'>
                    {gasPrice !== null ? `$${gasPrice.toFixed(2)}` : '—'}{' '}
                    <span className='text-[10px] font-semibold text-slate-400'>{unitLabel}</span>
                  </div>
                  <p className='text-[10px] text-slate-400'>Unleaded Regular</p>
                </div>

                {!isKh && deltaPct !== null && (
                  <div
                    className={`flex items-center gap-0.5 font-mono text-xs font-bold ${
                      deltaPct <= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                    }`}
                  >
                    {deltaPct <= 0 ? <ArrowDownRight size={13} /> : <ArrowUpRight size={13} />}
                    <span>{deltaPct > 0 ? `+${deltaPct.toFixed(1)}%` : `${deltaPct.toFixed(1)}%`}</span>
                  </div>
                )}
              </div>

              {/* Visual meter */}
              {hasData && (
                <div className='mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700'>
                  <div
                    className={`h-full rounded-full ${
                      isKh
                        ? 'bg-indigo-600'
                        : deltaPct && deltaPct <= 0
                        ? 'bg-emerald-500'
                        : 'bg-rose-500'
                    }`}
                    style={{ width: `${Math.min(100, Math.max(10, ((item.gasolineUsdL || 1) / 3) * 100))}%` }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
