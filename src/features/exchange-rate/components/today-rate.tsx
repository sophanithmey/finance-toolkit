import { CalendarClock, TrendingUp } from 'lucide-react';

import Card from '../../../components/ui/card';

interface Props {
  readonly from: string;
  readonly to: string;
  readonly rate: number;
  readonly timestamp?: number;
}

export default function TodayRate({ from, to, rate, timestamp }: Props) {
  const updated = timestamp ? new Date(timestamp * 1000) : new Date();

  return (
    <Card>
      <div className='flex flex-wrap items-center justify-between gap-4'>
        <div>
          <div className='flex items-center gap-2'>
            <span className='text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400'>
              Market Quote
            </span>
            <span className='inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'>
              <span className='h-1.5 w-1.5 rounded-full bg-emerald-500' />
              Realtime
            </span>
          </div>

          <div className='mt-2 tabular-nums text-2xl font-black text-slate-900 dark:text-slate-100'>
            1 {from} = <span className='text-indigo-600 dark:text-indigo-400'>{rate ? rate.toLocaleString(undefined, { maximumFractionDigits: 6 }) : '—'}</span> {to}
          </div>

          <p className='mt-1.5 flex items-center gap-1.5 text-xs font-medium text-slate-400 dark:text-slate-500'>
            <CalendarClock size={13} />
            Timestamp: {updated.toLocaleString()}
          </p>
        </div>

        <div className='flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200'>
          <TrendingUp size={20} />
        </div>
      </div>
    </Card>
  );
}
