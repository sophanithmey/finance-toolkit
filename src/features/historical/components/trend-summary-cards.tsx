import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import type { CountryTrendSummary } from '../types';

interface TrendSummaryCardsProps {
  readonly summaries: readonly CountryTrendSummary[];
  readonly unitLabel: string;
}

export default function TrendSummaryCards({ summaries, unitLabel }: TrendSummaryCardsProps) {
  return (
    <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-5'>
      {summaries.map((s) => {
        const isUp = s.netChange > 0;
        const isKh = s.code === 'KH';

        return (
          <div
            key={s.code}
            className={`rounded-2xl border p-4 transition-all ${
              isKh
                ? 'border-indigo-300 bg-indigo-50/50 shadow-xs dark:border-indigo-800 dark:bg-indigo-950/20'
                : 'border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900'
            }`}
          >
            <div className='flex items-center justify-between text-xs'>
              <span className='font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5'>
                <span>{s.flag}</span>
                <span className='truncate'>{s.name}</span>
              </span>
              <span className='font-mono text-[10px] text-slate-400 font-semibold'>{s.code}</span>
            </div>

            <div className='mt-2.5 flex items-baseline justify-between'>
              <div>
                <span className='font-mono text-xl font-black text-slate-900 dark:text-slate-100'>
                  ${s.currentPrice.toFixed(2)}
                </span>
                <span className='text-[10px] text-slate-400 ml-1'>{unitLabel}</span>
              </div>

              <div
                className={`flex items-center gap-0.5 font-mono text-xs font-bold ${
                  isUp ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'
                }`}
              >
                {isUp ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
                <span>{isUp ? `+${s.pctChange.toFixed(1)}%` : `${s.pctChange.toFixed(1)}%`}</span>
              </div>
            </div>

            <p className='mt-1 text-[11px] text-slate-400'>
              Prev: ${s.startPrice.toFixed(2)} • Net: {isUp ? '+' : ''}${s.netChange.toFixed(2)}
            </p>
          </div>
        );
      })}
    </div>
  );
}
