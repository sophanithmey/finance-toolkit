import { getCountryFlag } from '../../../utils/flags';
import { convertUsdPerLiterToDisplay, getDisplayUnitShort } from '../../../utils/units';
import type { NormalizedCountryFuel, DisplayUnit } from '../../../types/fuel';

interface ComparisonTableProps {
  readonly countries: readonly NormalizedCountryFuel[];
  readonly displayUnit: DisplayUnit;
}

export default function ComparisonTable({ countries, displayUnit }: ComparisonTableProps) {
  const unitLabel = getDisplayUnitShort(displayUnit);

  return (
    <div className='overflow-x-auto rounded-2xl border border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900'>
      <table className='w-full text-left text-sm'>
        <thead className='border-b border-slate-100 bg-slate-50/75 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-500'>
          <tr>
            <th className='py-3 px-4'>Country</th>
            <th className='py-3 px-4 text-right'>Gasoline ({unitLabel})</th>
            <th className='py-3 px-4 text-right'>Premium Gas</th>
            <th className='py-3 px-4 text-right'>Diesel ({unitLabel})</th>
            <th className='py-3 px-4 text-right'>Autogas (LPG)</th>
            <th className='py-3 px-4 text-right'>Native Pump Price</th>
          </tr>
        </thead>
        <tbody className='divide-y divide-slate-100 text-xs font-semibold text-slate-700 dark:divide-slate-800 dark:text-slate-300'>
          {countries.map((c) => {
            const gas = convertUsdPerLiterToDisplay(c.usdPrices.gasoline, displayUnit);
            const gasPrem = convertUsdPerLiterToDisplay(c.usdPrices.gasoline_premium, displayUnit);
            const diesel = convertUsdPerLiterToDisplay(c.usdPrices.diesel, displayUnit);
            const lpg = convertUsdPerLiterToDisplay(c.usdPrices.lpg, displayUnit);

            return (
              <tr key={c.code} className='hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors'>
                <td className='py-3 px-4 font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2'>
                  <span>{getCountryFlag(c.code)}</span>
                  <span>{c.name}</span>
                </td>
                <td className='py-3 px-4 text-right font-mono font-bold text-emerald-600 dark:text-emerald-400'>
                  {gas !== null ? `$${gas.toFixed(2)}` : '—'}
                </td>
                <td className='py-3 px-4 text-right font-mono'>
                  {gasPrem !== null ? `$${gasPrem.toFixed(2)}` : '—'}
                </td>
                <td className='py-3 px-4 text-right font-mono font-bold text-cyan-600 dark:text-cyan-400'>
                  {diesel !== null ? `$${diesel.toFixed(2)}` : '—'}
                </td>
                <td className='py-3 px-4 text-right font-mono'>
                  {lpg !== null ? `$${lpg.toFixed(2)}` : '—'}
                </td>
                <td className='py-3 px-4 text-right font-mono text-slate-400'>
                  {c.prices.gasoline ?? '—'} {c.currency}/{c.nativeUnit}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
