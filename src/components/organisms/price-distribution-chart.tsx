import type { NormalizedCountryFuel } from '../../types/fuel';

interface Props {
  readonly countries: NormalizedCountryFuel[];
}

export default function PriceDistributionChart({ countries }: Props) {
  const buckets = [
    { label: '< $1.00', min: 0, max: 1.0, color: 'bg-emerald-500', count: 0 },
    { label: '$1.00 – $1.35', min: 1.0, max: 1.35, color: 'bg-teal-500', count: 0 },
    { label: '$1.35 – $1.70', min: 1.35, max: 1.70, color: 'bg-amber-500', count: 0 },
    { label: '$1.70 – $2.05', min: 1.70, max: 2.05, color: 'bg-orange-500', count: 0 },
    { label: '> $2.05', min: 2.05, max: 999, color: 'bg-rose-500', count: 0 },
  ];

  countries.forEach((c) => {
    const p = c.usdPrices.gasoline;
    if (p !== null && p > 0) {
      const b = buckets.find((bucket) => p >= bucket.min && p < bucket.max);
      if (b) b.count++;
    }
  });

  const maxCount = Math.max(...buckets.map((b) => b.count), 1);

  return (
    <div className='w-full space-y-3'>
      <div className='flex items-center justify-between text-xs'>
        <span className='font-bold uppercase tracking-wider text-slate-400 text-[10px]'>
          Global Gasoline Distribution (USD/L)
        </span>
        <span className='text-slate-500 font-mono text-[11px]'>{countries.length} Nations</span>
      </div>

      <div className='grid grid-cols-5 gap-2 pt-4 items-end h-32'>
        {buckets.map((b) => {
          const heightPercent = Math.max((b.count / maxCount) * 100, 6);

          return (
            <div key={b.label} className='flex flex-col items-center h-full justify-end group'>
              <span className='text-[10px] font-mono font-bold text-slate-700 dark:text-slate-300 mb-1'>
                {b.count}
              </span>
              <div className='w-full h-full flex items-end'>
                <div
                  className={`w-full rounded-t-lg ${b.color} transition-all duration-300 group-hover:brightness-110`}
                  style={{ height: `${heightPercent}%` }}
                />
              </div>
              <span className='mt-1.5 text-[9px] font-semibold text-slate-400 text-center truncate w-full'>
                {b.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
