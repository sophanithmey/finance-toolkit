import { ChevronLeft, ChevronRight } from 'lucide-react';
import { addMonths, format, subMonths } from 'date-fns';
import { useState } from 'react';

import CalendarGrid from './calendar-grid';
import TodayMarket from './today-market';

interface Props {
  readonly goldPrice: string;
  readonly goldChange: string;
  readonly exchangeRate: string;
  readonly updatedTime: string;
}


export default function FinancePlanner(props: Props) {
  const { goldPrice, goldChange, exchangeRate, updatedTime } = props;
  const [currentDate, setCurrentDate] = useState(new Date());

  return (
    <section className='overflow-hidden rounded-3xl border bg-white shadow-lg'>
      <div className='flex items-center justify-between border-b p-6'>
        <div>
          <p className='text-sm text-slate-500'>Finance Planner</p>

          <h2 className='text-2xl font-bold'>
            {format(currentDate, 'MMMM yyyy')}
          </h2>
        </div>

        <div className='flex gap-2'>
          <button
            onClick={() => setCurrentDate(subMonths(currentDate, 1))}
            className='rounded-xl border p-2 hover:bg-slate-100'
          >
            <ChevronLeft />
          </button>

          <button
            onClick={() => setCurrentDate(addMonths(currentDate, 1))}
            className='rounded-xl border p-2 hover:bg-slate-100'
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      <div className='grid lg:grid-cols-[2fr_1fr]'>
        <CalendarGrid currentDate={currentDate} />

        <TodayMarket
          goldPrice={goldPrice}
          goldChange={goldChange}
          exchangeRate={exchangeRate}
          updatedTime={updatedTime}
        />
      </div>
    </section>
  );
}
