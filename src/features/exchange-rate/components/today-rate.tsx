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
            <span className='text-xs font-semibold uppercase tracking-wider text-slate-400'>
              Market Reference Rate
            </span>
            <span className='inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-700'>
              <span className='h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse' />
              Realtime
            </span>
          </div>

          <h2 className='mt-2 tabular-nums text-3xl font-black text-slate-900'>
            1 {from} = <span className='text-indigo-600'>{rate ? rate.toLocaleString(undefined, { maximumFractionDigits: 6 }) : '—'}</span> {to}
          </h2>

          <p className='mt-2 flex items-center gap-2 text-xs font-medium text-slate-400'>
            <CalendarClock size={14} />
            Market Quote: {updated.toLocaleString()}
          </p>
        </div>

        <div className='flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-emerald-500/15 to-teal-500/15 text-emerald-600 shadow-inner'>
          <TrendingUp size={28} />
        </div>
      </div>
    </Card>
  );
}
