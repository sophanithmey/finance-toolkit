import { ArrowRight, CalendarDays, Coins, HandCoins, Sparkles, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  const now = new Date();
  const greeting =
    now.getHours() < 12
      ? 'Good Morning'
      : now.getHours() < 18
        ? 'Good Afternoon'
        : 'Good Evening';

  const dateStr = now.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <section className='relative overflow-hidden rounded-3xl bg-linear-to-br from-indigo-900 via-indigo-950 to-slate-950 p-6 sm:p-10 text-white shadow-2xl border border-indigo-800/40'>
      {/* Ambient background spheres & grid pattern */}
      <div className='pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl' />
      <div className='pointer-events-none absolute -bottom-16 left-1/4 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl' />
      <div className='pointer-events-none absolute right-1/4 bottom-0 h-48 w-48 rounded-full bg-emerald-500/10 blur-2xl' />

      <div className='relative z-10 flex flex-col justify-between gap-8 lg:flex-row lg:items-center'>
        <div className='max-w-2xl space-y-4'>
          <div className='inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-3.5 py-1.5 text-xs font-semibold text-indigo-300 backdrop-blur-md'>
            <Sparkles size={13} className='text-amber-400' />
            <span>{greeting} • Smart Finance Suite</span>
          </div>

          <h1 className='text-3xl sm:text-5xl font-black tracking-tight leading-tight'>
            Track. Calculate.{' '}
            <span className='bg-linear-to-r from-indigo-300 via-cyan-300 to-emerald-300 bg-clip-text text-transparent'>
              Grow Smarter.
            </span>
          </h1>

          <p className='text-sm sm:text-base text-indigo-200/90 leading-relaxed max-w-xl'>
            Real-time gold market data, live foreign exchange conversion, loan amortization schedules, EMI breakdowns, and group bill settlements in one dashboard.
          </p>

          <div className='flex flex-wrap items-center gap-3 pt-2'>
            <Link
              to='/loan'
              className='inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-xs sm:text-sm font-bold text-slate-900 shadow-lg hover:bg-indigo-50 hover:shadow-indigo-500/25 transition-all duration-200 active:scale-95'
            >
              <HandCoins size={16} className='text-indigo-600' />
              <span>Loan Schedule</span>
              <ArrowRight size={14} />
            </Link>

            <Link
              to='/gold'
              className='inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-5 py-3 text-xs sm:text-sm font-bold text-white backdrop-blur-md hover:bg-white/20 transition-all duration-200 active:scale-95'
            >
              <Coins size={16} className='text-amber-400' />
              <span>Gold Price</span>
            </Link>

            <Link
              to='/exchange'
              className='inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-5 py-3 text-xs sm:text-sm font-bold text-white backdrop-blur-md hover:bg-white/20 transition-all duration-200 active:scale-95'
            >
              <TrendingUp size={16} className='text-emerald-400' />
              <span>Exchange Rates</span>
            </Link>
          </div>
        </div>

        {/* Date & Status Chip */}
        <div className='flex flex-col gap-3 sm:items-start lg:items-end'>
          <div className='flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md'>
            <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-300'>
              <CalendarDays size={20} />
            </div>
            <div>
              <p className='text-xs font-medium text-indigo-300'>Today's Date</p>
              <p className='text-sm font-bold text-white'>{dateStr}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
