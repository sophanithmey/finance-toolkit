import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
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
    <section className='overflow-hidden rounded-3xl border border-slate-200/80 bg-white/90 shadow-sm backdrop-blur-md transition-all duration-300 hover:shadow-xl'>
      {/* Header bar */}
      <div className='flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 p-6 bg-slate-50/50'>
        <div className='flex items-center gap-3'>
          <div className='flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600'>
            <CalendarIcon size={20} />
          </div>
          <div>
            <p className='text-xs font-semibold uppercase tracking-wider text-slate-400'>
              Financial Calendar
            </p>
            <h2 className='text-xl font-extrabold text-slate-900'>
              {format(currentDate, 'MMMM yyyy')}
            </h2>
          </div>
        </div>

        <div className='flex items-center gap-2'>
          <button
            onClick={() => setCurrentDate(subMonths(currentDate, 1))}
            className='flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-2xs hover:bg-slate-50 hover:text-indigo-600 active:scale-95 transition-all'
            aria-label='Previous Month'
          >
            <ChevronLeft size={18} />
          </button>

          <button
            onClick={() => setCurrentDate(new Date())}
            className='px-3 py-1.5 text-xs font-bold text-slate-600 hover:text-indigo-600 hover:bg-slate-100 rounded-xl transition-all'
          >
            Today
          </button>

          <button
            onClick={() => setCurrentDate(addMonths(currentDate, 1))}
            className='flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-2xs hover:bg-slate-50 hover:text-indigo-600 active:scale-95 transition-all'
            aria-label='Next Month'
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className='grid lg:grid-cols-[1.6fr_1fr] divide-y lg:divide-y-0 lg:divide-x divide-slate-100'>
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
