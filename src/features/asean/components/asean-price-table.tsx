import { Link } from 'react-router-dom';
import { ExternalLink, Flame, Scale, Sparkles } from 'lucide-react';
import { ASEAN_COUNTRY_CODES, ASEAN_METADATA } from '../constants';
import type { NormalizedCountryFuel, DisplayUnit } from '../../../types/fuel';
import { convertUsdPerLiterToDisplay, getDisplayUnitShort } from '../../../utils/units';

interface AseanPriceTableProps {
  readonly countries: readonly NormalizedCountryFuel[];
  readonly displayUnit: DisplayUnit;
}

export default function AseanPriceTable({ countries, displayUnit }: AseanPriceTableProps) {
  const countryMap = new Map(countries.map((c) => [c.code.toUpperCase(), c]));
  const unitLabel = getDisplayUnitShort(displayUnit);

  return (
    <div className='overflow-x-auto rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900'>
      <div className='flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4 mb-4 dark:border-slate-800'>
        <div>
          <h3 className='text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2'>
            <Flame size={16} className='text-indigo-600 dark:text-indigo-400' />
            <span>Complete ASEAN 11 Fuel Parity Matrix</span>
          </h3>
          <p className='text-xs text-slate-400'>
            Normalized against live forex rates • Unit: {unitLabel}
          </p>
        </div>

        <Link
          to='/compare?codes=KH,TH,VN,LA,MY'
          className='inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300'
        >
          <Scale size={13} />
          <span>Compare Top 5 in ASEAN</span>
        </Link>
      </div>

      <table className='w-full text-left text-sm'>
        <thead className='border-b border-slate-100 bg-slate-50/75 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-500'>
          <tr>
            <th className='py-3 px-3.5'>Member State</th>
            <th className='py-3 px-3.5 text-right'>Regular Gas ({unitLabel})</th>
            <th className='py-3 px-3.5 text-right'>Premium Gas</th>
            <th className='py-3 px-3.5 text-right'>Diesel ({unitLabel})</th>
            <th className='py-3 px-3.5 text-right'>Native Pump Price</th>
            <th className='py-3 px-3.5 text-right'>Status</th>
          </tr>
        </thead>
        <tbody className='divide-y divide-slate-100 text-xs font-semibold text-slate-700 dark:divide-slate-800 dark:text-slate-300'>
          {ASEAN_COUNTRY_CODES.map((code) => {
            const meta = ASEAN_METADATA[code];
            const c = countryMap.get(code);
            const isKh = code === 'KH';

            const gas = convertUsdPerLiterToDisplay(c?.usdPrices.gasoline ?? null, displayUnit);
            const gasPrem = convertUsdPerLiterToDisplay(c?.usdPrices.gasoline_premium ?? null, displayUnit);
            const diesel = convertUsdPerLiterToDisplay(c?.usdPrices.diesel ?? null, displayUnit);

            return (
              <tr
                key={code}
                className={`transition-colors ${
                  isKh
                    ? 'bg-indigo-50/60 dark:bg-indigo-950/25 font-bold hover:bg-indigo-50 dark:hover:bg-indigo-950/40'
                    : 'hover:bg-slate-50/70 dark:hover:bg-slate-800/40'
                }`}
              >
                <td className='py-3 px-3.5 flex items-center gap-2'>
                  <span className='text-base'>{meta.flag}</span>
                  <div>
                    <Link
                      to={isKh ? '/cambodia' : `/country/${code.toLowerCase()}`}
                      className='text-slate-900 hover:text-indigo-600 dark:text-slate-100 dark:hover:text-indigo-400 flex items-center gap-1.5'
                    >
                      <span>{meta.name}</span>
                      {isKh && (
                        <span className='inline-flex items-center gap-0.5 rounded-full bg-amber-400/20 px-1.5 py-0.2 text-[9px] font-extrabold text-amber-600 dark:text-amber-300'>
                          <Sparkles size={9} /> Featured
                        </span>
                      )}
                      <ExternalLink size={11} className='opacity-40' />
                    </Link>
                    <span className='text-[10px] text-slate-400 font-mono'>
                      {meta.currency} • {meta.nativeName}
                    </span>
                  </div>
                </td>

                <td className='py-3 px-3.5 text-right font-mono font-bold text-emerald-600 dark:text-emerald-400'>
                  {gas !== null ? `$${gas.toFixed(2)}` : '—'}
                </td>
                <td className='py-3 px-3.5 text-right font-mono text-slate-500'>
                  {gasPrem !== null ? `$${gasPrem.toFixed(2)}` : '—'}
                </td>
                <td className='py-3 px-3.5 text-right font-mono font-bold text-cyan-600 dark:text-cyan-400'>
                  {diesel !== null ? `$${diesel.toFixed(2)}` : '—'}
                </td>
                <td className='py-3 px-3.5 text-right font-mono text-slate-500'>
                  {c?.prices.gasoline !== null && c?.prices.gasoline !== undefined
                    ? `${c.prices.gasoline?.toLocaleString()} ${meta.currency}/L`
                    : '—'}
                </td>
                <td className='py-3 px-3.5 text-right'>
                  {meta.hasDataFeed && c ? (
                    <span className='inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400'>
                      <span className='h-1.5 w-1.5 rounded-full bg-emerald-500' /> Live
                    </span>
                  ) : (
                    <span className='inline-flex items-center gap-1 rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 dark:bg-slate-800'>
                      No Feed
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
