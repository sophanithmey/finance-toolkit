import { ArrowRight, Coins, HandCoins, Sparkles, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  const now = new Date();
  const greeting =
    now.getHours() < 12
      ? 'Good morning'
      : now.getHours() < 18
        ? 'Good afternoon'
        : 'Good evening';

  const dateStr = now.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  return (
    <section className='relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xs dark:border-slate-800/80 dark:bg-slate-900'>
      <div className='relative z-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-center'>
        <div className='max-w-2xl space-y-3'>
          <div className='inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300'>
            <Sparkles size={13} className='text-amber-500' />
            <span>{greeting} • Smart Finance Toolkit</span>
          </div>

          <h1 className='text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100'>
            All-in-one financial calculation & market intelligence suite.
          </h1>

          <p className='text-xs sm:text-sm text-slate-500 leading-relaxed max-w-xl dark:text-slate-400'>
            Real-time gold benchmarks, live currency rates, loan amortization schedules, and group bill splits with zero friction.
          </p>

          <div className='flex flex-wrap items-center gap-2.5 pt-2'>
            <Link
              to='/loan'
              className='inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-slate-800 transition-colors dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100'
            >
              <HandCoins size={14} />
              <span>Loan Amortization</span>
              <ArrowRight size={13} />
            </Link>

            <Link
              to='/gold'
              className='inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors dark:border-slate-800 dark:bg-slate-800/80 dark:text-slate-300 dark:hover:bg-slate-800'
            >
              <Coins size={14} className='text-amber-500' />
              <span>Gold Price</span>
            </Link>

            <Link
              to='/exchange'
              className='inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors dark:border-slate-800 dark:bg-slate-800/80 dark:text-slate-300 dark:hover:bg-slate-800'
            >
              <TrendingUp size={14} className='text-emerald-500' />
              <span>Exchange Rates</span>
            </Link>
          </div>
        </div>

        {/* Date / Live Tag */}
        <div className='flex items-center lg:flex-col lg:items-end justify-between border-t border-slate-100 pt-4 lg:border-t-0 lg:pt-0 dark:border-slate-800'>
          <div className='text-left lg:text-right'>
            <p className='text-[10px] font-bold uppercase tracking-wider text-slate-400'>Today</p>
            <p className='text-sm font-bold text-slate-900 dark:text-slate-100'>{dateStr}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
