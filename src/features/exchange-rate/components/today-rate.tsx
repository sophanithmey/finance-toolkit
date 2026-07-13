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
      <div className='flex items-center justify-between'>
        <div>
          <p className='text-sm text-slate-500'>Today's Exchange Rate</p>

          <h2 className='mt-2 text-3xl font-bold text-slate-800'>
            1 {from} = {rate.toLocaleString()} {to}
          </h2>

          <p className='mt-2 flex items-center gap-2 text-sm text-slate-500'>
            <CalendarClock size={16} />
            Updated: {updated.toLocaleString()}
          </p>
        </div>

        <div className='rounded-full bg-emerald-100 p-4'>
          <TrendingUp size={32} className='text-emerald-600' />
        </div>
      </div>
    </Card>
  );
}
