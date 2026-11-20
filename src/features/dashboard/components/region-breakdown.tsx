import type { NormalizedCountryFuel, DisplayUnit } from '../../../types/fuel';
import { formatRegionName } from '../../../utils/flags';
import { convertUsdPerLiterToDisplay, getDisplayUnitShort } from '../../../utils/units';

interface Props {
  readonly countries: NormalizedCountryFuel[];
  readonly displayUnit: DisplayUnit;
}

export default function RegionBreakdown({ countries, displayUnit }: Props) {
  const unitLabel = getDisplayUnitShort(displayUnit);

  const regionMap = new Map<string, { gas: number[]; diesel: number[]; count: number }>();

  countries.forEach((c) => {
    const reg = c.region || 'other';
    if (!regionMap.has(reg)) {
      regionMap.set(reg, { gas: [], diesel: [], count: 0 });
    }
    const entry = regionMap.get(reg)!;
    entry.count++;
    if (c.usdPrices.gasoline !== null && c.usdPrices.gasoline > 0 && c.usdPrices.gasoline < 20) {
      entry.gas.push(c.usdPrices.gasoline);
    }
    if (c.usdPrices.diesel !== null && c.usdPrices.diesel > 0 && c.usdPrices.diesel < 20) {
      entry.diesel.push(c.usdPrices.diesel);
    }
  });

  const regions = Array.from(regionMap.entries())
    .map(([region, data]) => ({
      region,
      name: formatRegionName(region),
      count: data.count,
      avgGas: data.gas.length ? data.gas.reduce((a, b) => a + b, 0) / data.gas.length : null,
      avgDiesel: data.diesel.length ? data.diesel.reduce((a, b) => a + b, 0) / data.diesel.length : null,
    }))
    .filter((r) => r.avgGas !== null)
    .sort((a, b) => (a.avgGas || 0) - (b.avgGas || 0));

  return (
    <div className='rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900'>
      <div className='flex items-center justify-between border-b border-slate-100 pb-3 mb-4 dark:border-slate-800'>
        <div>
          <h3 className='text-sm font-bold text-slate-900 dark:text-slate-100'>
            Regional Fuel Price Averages
          </h3>
          <p className='text-xs text-slate-400'>Continental comparisons normalized to {unitLabel}</p>
        </div>
      </div>

      <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-3'>
        {regions.map((reg) => {
          const displayGas = convertUsdPerLiterToDisplay(reg.avgGas, displayUnit);
          const displayDiesel = convertUsdPerLiterToDisplay(reg.avgDiesel, displayUnit);

          return (
            <div
              key={reg.region}
              className='rounded-xl border border-slate-200/80 bg-slate-50/50 p-3.5 dark:border-slate-800 dark:bg-slate-800/40'
            >
              <div className='flex items-center justify-between'>
                <h4 className='text-xs font-bold text-slate-900 dark:text-slate-100 truncate'>
                  {reg.name}
                </h4>
                <span className='text-[10px] font-semibold text-slate-400'>
                  {reg.count} nations
                </span>
              </div>

              <div className='mt-2.5 flex items-center justify-between text-xs'>
                <div>
                  <p className='text-[10px] text-slate-400 uppercase font-semibold'>Gasoline</p>
                  <p className='font-mono font-bold text-emerald-600 dark:text-emerald-400'>
                    ${displayGas?.toFixed(2)}
                  </p>
                </div>
                <div className='text-right'>
                  <p className='text-[10px] text-slate-400 uppercase font-semibold'>Diesel</p>
                  <p className='font-mono font-bold text-cyan-600 dark:text-cyan-400'>
                    ${displayDiesel?.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
