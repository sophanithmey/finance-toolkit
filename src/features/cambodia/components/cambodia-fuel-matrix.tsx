import { Flame, TrendingDown } from 'lucide-react';
import type { NormalizedCountryFuel, DisplayUnit } from '../../../types/fuel';
import { convertUsdPerLiterToDisplay, getDisplayUnitShort } from '../../../utils/units';

interface CambodiaFuelMatrixProps {
  readonly cambodia: NormalizedCountryFuel;
  readonly displayUnit: DisplayUnit;
}

export default function CambodiaFuelMatrix({ cambodia, displayUnit }: CambodiaFuelMatrixProps) {
  const unitLabel = getDisplayUnitShort(displayUnit);

  const fuelGrades = [
    {
      label: 'Unleaded Regular Gasoline (EA92)',
      price: cambodia.prices.gasoline,
      usd: cambodia.usdPrices.gasoline,
      changeText: '-33.3 ៛/L',
      type: 'gasoline',
    },
    {
      label: 'Super Premium Gasoline (EA95)',
      price: cambodia.prices.gasoline_premium,
      usd: cambodia.usdPrices.gasoline_premium,
      changeText: 'Market index',
      type: 'premium',
    },
    {
      label: 'Regular Euro 5 Diesel (DO)',
      price: cambodia.prices.diesel,
      usd: cambodia.usdPrices.diesel,
      changeText: '-150 ៛/L',
      type: 'diesel',
    },
    {
      label: 'Liquefied Petroleum Gas (Autogas)',
      price: cambodia.prices.lpg,
      usd: cambodia.usdPrices.lpg,
      changeText: 'Local retail',
      type: 'lpg',
    },
  ];

  return (
    <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
      {fuelGrades.map((grade) => {
        const displayPrice = convertUsdPerLiterToDisplay(grade.usd, displayUnit);
        const hasData = grade.price !== null && grade.price !== undefined;

        return (
          <div
            key={grade.label}
            className='rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900'
          >
            <div className='flex items-center justify-between text-xs'>
              <span className='font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5'>
                <Flame size={14} className='text-amber-500' />
                <span className='truncate'>{grade.label.split(' ')[0]} {grade.label.split(' ')[1]}</span>
              </span>
              <span className='text-[10px] uppercase font-bold text-slate-400'>
                {hasData ? 'Available' : 'No Feed'}
              </span>
            </div>

            <div className='mt-3'>
              {displayPrice !== null ? (
                <div className='font-mono text-2xl font-black text-slate-900 dark:text-slate-100'>
                  ${displayPrice.toFixed(2)}{' '}
                  <span className='text-xs font-semibold text-slate-400'>{unitLabel}</span>
                </div>
              ) : (
                <div className='font-mono text-2xl font-bold text-slate-300 dark:text-slate-700'>—</div>
              )}

              <p className='mt-1 text-xs font-semibold text-slate-600 dark:text-slate-300 font-mono'>
                {hasData ? `${grade.price?.toLocaleString()} KHR / Liter` : 'Official rate unlisted'}
              </p>

              {hasData && (
                <div className='mt-2 inline-flex items-center gap-1 rounded bg-emerald-50 px-1.5 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300'>
                  <TrendingDown size={11} />
                  <span>{grade.changeText}</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
