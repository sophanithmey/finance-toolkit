import { Flame } from 'lucide-react';
import { convertUsdPerLiterToDisplay, getDisplayUnitShort } from '../../../utils/units';
import type { NormalizedCountryFuel, DisplayUnit } from '../../../types/fuel';

interface CountryFuelCardsProps {
  readonly country: NormalizedCountryFuel;
  readonly displayUnit: DisplayUnit;
}

export default function CountryFuelCards({ country, displayUnit }: CountryFuelCardsProps) {
  const unitLabel = getDisplayUnitShort(displayUnit);

  const fuelTypesList = [
    { label: 'Unleaded Gasoline', price: country.prices.gasoline, usd: country.usdPrices.gasoline },
    { label: 'Premium Gasoline', price: country.prices.gasoline_premium, usd: country.usdPrices.gasoline_premium },
    { label: 'Regular Diesel', price: country.prices.diesel, usd: country.usdPrices.diesel },
    { label: 'Premium Diesel', price: country.prices.diesel_premium, usd: country.usdPrices.diesel_premium },
    { label: 'Autogas (LPG)', price: country.prices.lpg, usd: country.usdPrices.lpg },
    { label: 'Compressed Natural Gas (CNG)', price: country.prices.cng, usd: country.usdPrices.cng },
    { label: 'Kerosene', price: country.prices.kerosene, usd: null },
  ];

  return (
    <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
      {fuelTypesList.map((item) => {
        const displayPrice = convertUsdPerLiterToDisplay(item.usd, displayUnit);
        const hasData = item.price !== null && item.price !== undefined;

        return (
          <div
            key={item.label}
            className='rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900'
          >
            <div className='flex items-center justify-between text-xs'>
              <span className='font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5'>
                <Flame size={14} className='text-indigo-500' />
                <span>{item.label}</span>
              </span>
              <span className='text-[10px] uppercase font-bold text-slate-400'>
                {hasData ? 'Available' : 'No Feed'}
              </span>
            </div>

            <div className='mt-3.5'>
              {displayPrice !== null ? (
                <div className='tabular-nums text-2xl font-black text-slate-900 dark:text-slate-100'>
                  ${displayPrice.toFixed(2)}{' '}
                  <span className='text-xs font-semibold text-slate-400'>{unitLabel}</span>
                </div>
              ) : (
                <div className='text-lg font-bold text-slate-400'>—</div>
              )}

              <p className='mt-1 text-xs text-slate-400 dark:text-slate-500'>
                Native: {hasData ? `${item.price} ${country.currency} / ${country.nativeUnit}` : 'Not reported'}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
