import { ArrowDownRight, ArrowUpRight, Scale } from 'lucide-react';
import type { NormalizedCountryFuel, DisplayUnit } from '../../../types/fuel';
import { filterAseanCountries } from '../../asean/utils';
import { convertUsdPerLiterToDisplay, getDisplayUnitShort } from '../../../utils/units';
import { getCountryFlag } from '../../../utils/flags';

interface BorderAnalysisProps {
  readonly cambodia: NormalizedCountryFuel;
  readonly allCountries: readonly NormalizedCountryFuel[];
  readonly displayUnit: DisplayUnit;
}

export default function CambodiaBorderAnalysis({
  cambodia,
  allCountries,
  displayUnit,
}: BorderAnalysisProps) {
  const asean = filterAseanCountries(allCountries);
  const camGasUsd = cambodia.usdPrices.gasoline || 1;
  const unitLabel = getDisplayUnitShort(displayUnit);

  return (
    <div className='overflow-x-auto rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900'>
      <div className='border-b border-slate-100 pb-3 mb-4 dark:border-slate-800'>
        <h3 className='text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2'>
          <Scale size={16} className='text-indigo-600 dark:text-indigo-400' />
          <span>Regional Fuel Benchmark: Cambodia vs ASEAN Member States</span>
        </h3>
        <p className='text-xs text-slate-400'>
          Comparative delta against Cambodia retail regular gasoline ($
          {convertUsdPerLiterToDisplay(camGasUsd, displayUnit)?.toFixed(2)} {unitLabel})
        </p>
      </div>

      <table className='w-full text-left text-sm'>
        <thead className='border-b border-slate-100 bg-slate-50/75 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-500'>
          <tr>
            <th className='py-3 px-3.5'>Country</th>
            <th className='py-3 px-3.5 text-right'>Regular Gas ({unitLabel})</th>
            <th className='py-3 px-3.5 text-right'>Regular Diesel ({unitLabel})</th>
            <th className='py-3 px-3.5 text-right'>Price Delta</th>
            <th className='py-3 px-3.5 text-right'>Variance vs Cambodia</th>
          </tr>
        </thead>
        <tbody className='divide-y divide-slate-100 text-xs font-semibold text-slate-700 dark:divide-slate-800 dark:text-slate-300'>
          {asean.map((c) => {
            const isKh = c.code.toUpperCase() === 'KH';
            const gasUsd = convertUsdPerLiterToDisplay(c.usdPrices.gasoline, displayUnit);
            const dieselUsd = convertUsdPerLiterToDisplay(c.usdPrices.diesel, displayUnit);
            const rawGas = c.usdPrices.gasoline;

            let deltaVal: number | null = null;
            let deltaPct: number | null = null;
            if (rawGas !== null) {
              deltaVal = rawGas - camGasUsd;
              deltaPct = (deltaVal / camGasUsd) * 100;
            }

            return (
              <tr
                key={c.code}
                className={
                  isKh
                    ? 'bg-indigo-50/70 font-bold dark:bg-indigo-950/30'
                    : 'hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors'
                }
              >
                <td className='py-3 px-3.5 flex items-center gap-2'>
                  <span className='text-base'>{getCountryFlag(c.code)}</span>
                  <span>{c.name}</span>
                  {isKh && (
                    <span className='rounded bg-indigo-600 px-1.5 py-0.2 text-[9px] font-bold text-white'>
                      Base (0%)
                    </span>
                  )}
                </td>
                <td className='py-3 px-3.5 text-right font-mono font-bold text-emerald-600 dark:text-emerald-400'>
                  {gasUsd !== null ? `$${gasUsd.toFixed(2)}` : '—'}
                </td>
                <td className='py-3 px-3.5 text-right font-mono font-bold text-cyan-600 dark:text-cyan-400'>
                  {dieselUsd !== null ? `$${dieselUsd.toFixed(2)}` : '—'}
                </td>
                <td className='py-3 px-3.5 text-right font-mono'>
                  {isKh ? (
                    '—'
                  ) : deltaVal !== null ? (
                    <span className={deltaVal <= 0 ? 'text-emerald-600' : 'text-rose-600'}>
                      {deltaVal > 0 ? `+$${deltaVal.toFixed(2)}` : `-$${Math.abs(deltaVal).toFixed(2)}`}
                    </span>
                  ) : (
                    '—'
                  )}
                </td>
                <td className='py-3 px-3.5 text-right font-mono'>
                  {isKh ? (
                    '0.0%'
                  ) : deltaPct !== null ? (
                    <span
                      className={`inline-flex items-center gap-0.5 font-bold ${
                        deltaPct <= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                      }`}
                    >
                      {deltaPct <= 0 ? <ArrowDownRight size={13} /> : <ArrowUpRight size={13} />}
                      {deltaPct > 0 ? `+${deltaPct.toFixed(1)}%` : `${deltaPct.toFixed(1)}%`}
                    </span>
                  ) : (
                    '—'
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
