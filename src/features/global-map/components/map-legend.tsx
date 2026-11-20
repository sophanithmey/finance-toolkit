import { TIER_COLORS, type PriceTier } from '../map-types';

export default function MapLegend() {
  const tiers: PriceTier[] = ['subsidized', 'low', 'moderate', 'high', 'extreme', 'no_data'];

  return (
    <div className='flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200/80 bg-white/95 p-3 text-xs shadow-2xs backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/95'>
      <span className='font-bold uppercase tracking-wider text-slate-400 text-[10px]'>
        Price Legend (USD/L)
      </span>
      <div className='flex flex-wrap items-center gap-3'>
        {tiers.map((tier) => {
          const config = TIER_COLORS[tier];
          return (
            <div key={tier} className='flex items-center gap-1.5'>
              <span
                className='h-3 w-3 rounded-full border border-black/10 shadow-2xs'
                style={{ backgroundColor: config.fill }}
              />
              <span className='font-medium text-slate-700 dark:text-slate-300 text-[11px]'>
                {config.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
