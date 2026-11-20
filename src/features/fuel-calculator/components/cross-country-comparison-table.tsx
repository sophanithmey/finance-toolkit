import { ArrowDownRight, ArrowUpRight, Scale } from 'lucide-react';
import type { TripComparisonItem } from '../types';

interface ComparisonTableProps {
  readonly items: readonly TripComparisonItem[];
  readonly selectedCountryCode: string;
  readonly distanceKm: number;
}

export default function CrossCountryComparisonTable({
  items,
  selectedCountryCode,
  distanceKm,
}: ComparisonTableProps) {
  return (
    <div className='overflow-x-auto rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900'>
      <div className='border-b border-slate-100 pb-3 mb-4 dark:border-slate-800'>
        <h3 className='text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2'>
          <Scale size={16} className='text-indigo-600 dark:text-indigo-400' />
          <span>Cross-Country Journey Cost Parity ({distanceKm.toLocaleString()} km Trip)</span>
        </h3>
        <p className='text-xs text-slate-400'>
          How much this identical trip costs across ASEAN and major global vehicle markets
        </p>
      </div>

      <table className='w-full text-left text-sm'>
        <thead className='border-b border-slate-100 bg-slate-50/75 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-500'>
          <tr>
            <th className='py-3 px-3.5'>Country / Market</th>
            <th className='py-3 px-3.5 text-right'>Pump Rate (USD/L)</th>
            <th className='py-3 px-3.5 text-right'>Total Trip Cost (USD)</th>
            <th className='py-3 px-3.5 text-right'>Local Currency Cost</th>
            <th className='py-3 px-3.5 text-right'>Cost / km</th>
            <th className='py-3 px-3.5 text-right'>Variance vs Selected</th>
          </tr>
        </thead>
        <tbody className='divide-y divide-slate-100 text-xs font-semibold text-slate-700 dark:divide-slate-800 dark:text-slate-300'>
          {items.map((item) => {
            const isBase = item.countryCode.toUpperCase() === selectedCountryCode.toUpperCase();
            const isCheaper = item.pctVsSelected <= 0;

            return (
              <tr
                key={item.countryCode}
                className={
                  isBase
                    ? 'bg-indigo-50/70 font-bold dark:bg-indigo-950/30'
                    : 'hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors'
                }
              >
                <td className='py-3 px-3.5 flex items-center gap-2'>
                  <span className='text-base'>{item.flag}</span>
                  <span className='text-slate-900 dark:text-slate-100'>{item.name}</span>
                  {isBase && (
                    <span className='rounded bg-indigo-600 px-1.5 py-0.2 text-[9px] font-bold text-white'>
                      Base
                    </span>
                  )}
                </td>
                <td className='py-3 px-3.5 text-right font-mono text-slate-600 dark:text-slate-300'>
                  ${item.unitPriceUsd.toFixed(2)}
                </td>
                <td className='py-3 px-3.5 text-right font-mono font-black text-slate-900 dark:text-slate-100'>
                  ${item.totalCostUsd.toFixed(2)}
                </td>
                <td className='py-3 px-3.5 text-right font-mono text-slate-500'>
                  {item.totalCostNative.toLocaleString(undefined, { maximumFractionDigits: 0 })} {item.currency}
                </td>
                <td className='py-3 px-3.5 text-right font-mono text-slate-500'>
                  ${item.costPerKmUsd.toFixed(3)}
                </td>
                <td className='py-3 px-3.5 text-right font-mono'>
                  {isBase ? (
                    <span className='text-slate-400'>0.0%</span>
                  ) : (
                    <span
                      className={`inline-flex items-center gap-0.5 font-bold ${
                        isCheaper ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                      }`}
                    >
                      {isCheaper ? <ArrowDownRight size={13} /> : <ArrowUpRight size={13} />}
                      {item.pctVsSelected > 0 ? `+${item.pctVsSelected.toFixed(1)}%` : `${item.pctVsSelected.toFixed(1)}%`}
                    </span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
