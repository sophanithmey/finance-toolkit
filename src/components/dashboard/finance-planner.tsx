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
    <section className='overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xs dark:border-slate-800/80 dark:bg-slate-900'>
      {/* Header bar */}
      <div className='flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 p-5 bg-white dark:border-slate-800 dark:bg-slate-900'>
        <div className='flex items-center gap-3'>
          <div className='flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200'>
            <CalendarIcon size={17} />
          </div>
          <div>
            <p className='text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500'>
              Financial Calendar
            </p>
            <h2 className='text-base font-bold text-slate-900 dark:text-slate-100'>
              {format(currentDate, 'MMMM yyyy')}
            </h2>
          </div>
        </div>

        <div className='flex items-center gap-1.5'>
          <button
            onClick={() => setCurrentDate(subMonths(currentDate, 1))}
            className='flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 active:scale-95 transition-all dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300'
            aria-label='Previous Month'
          >
            <ChevronLeft size={16} />
          </button>

          <button
            onClick={() => setCurrentDate(new Date())}
            className='px-2.5 py-1 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800'
          >
            Current
          </button>

          <button
            onClick={() => setCurrentDate(addMonths(currentDate, 1))}
            className='flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 active:scale-95 transition-all dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300'
            aria-label='Next Month'
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className='grid lg:grid-cols-[1.5fr_1fr] divide-y lg:divide-y-0 lg:divide-x divide-slate-100 dark:divide-slate-800'>
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
