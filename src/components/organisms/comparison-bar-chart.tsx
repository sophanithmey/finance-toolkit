import type { NormalizedCountryFuel } from '../../types/fuel';
import { getCountryFlag } from '../../utils/flags';

interface Props {
  readonly countries: NormalizedCountryFuel[];
}

export default function ComparisonBarChart({ countries }: Props) {
  if (countries.length === 0) return null;

  const maxPrice = Math.max(
    ...countries.map((c) => Math.max(c.usdPrices.gasoline || 0, c.usdPrices.diesel || 0)),
    3.0
  );

  return (
    <div className='w-full space-y-4'>
      <div className='flex items-center justify-between text-xs font-semibold'>
        <span className='text-slate-500 dark:text-slate-400 uppercase tracking-wider text-[10px]'>
          Fuel Price Benchmark (USD / Liter)
        </span>
        <div className='flex items-center gap-4'>
          <div className='flex items-center gap-1.5'>
            <span className='h-2.5 w-2.5 rounded-sm bg-emerald-500' />
            <span className='text-slate-700 dark:text-slate-300'>Gasoline</span>
          </div>
          <div className='flex items-center gap-1.5'>
            <span className='h-2.5 w-2.5 rounded-sm bg-cyan-500' />
            <span className='text-slate-700 dark:text-slate-300'>Diesel</span>
          </div>
        </div>
      </div>

      <div className='space-y-4'>
        {countries.map((c) => {
          const gasPrice = c.usdPrices.gasoline || 0;
          const dieselPrice = c.usdPrices.diesel || 0;
          const gasWidth = Math.min((gasPrice / maxPrice) * 100, 100);
          const dieselWidth = Math.min((dieselPrice / maxPrice) * 100, 100);

          return (
            <div key={c.code} className='space-y-1.5'>
              <div className='flex items-center justify-between text-xs'>
                <span className='flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200'>
                  <span>{getCountryFlag(c.code)}</span>
                  <span>{c.name}</span>
                </span>
                <span className='font-mono text-slate-500 text-[11px]'>
                  Gas: ${gasPrice.toFixed(2)} | Dsl: ${dieselPrice.toFixed(2)}
                </span>
              </div>

              <div className='space-y-1'>
                <div className='h-3 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden'>
                  <div
                    className='h-full rounded-full bg-emerald-500 transition-all duration-300'
                    style={{ width: `${gasWidth}%` }}
                  />
                </div>
                <div className='h-3 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden'>
                  <div
                    className='h-full rounded-full bg-cyan-500 transition-all duration-300'
                    style={{ width: `${dieselWidth}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
