import { Activity, Moon, Sun } from 'lucide-react';
import { useLocation } from 'react-router-dom';

import Logo from './logo';
import { useTheme } from '../../hooks/use-theme';
import { useCurrency } from '../../hooks/use-currency';

const routeTitles: Record<string, string> = {
  '/': 'Financial Dashboard',
  '/gold': 'Live Gold Price & Conversion',
  '/exchange': 'Foreign Exchange Rates',
  '/loan': 'Loan Amortization & Repayment',
  '/emi': 'Equated Monthly Installment',
  '/expense-split': 'Group Bill & Expense Splitting',
  '/discount': 'Discount & Tax Calculator',
  '/investment': 'Compound Interest & Growth',
};

export default function Navbar() {
  const location = useLocation();
  const currentTitle = routeTitles[location.pathname] || 'Finance Toolkit';
  const { isDark, toggleTheme } = useTheme();
  const { currency, currencies, setCurrencyCode } = useCurrency();

  return (
    <header className='sticky top-0 z-40 flex h-16 items-center justify-between border-b border-slate-200/80 bg-white/75 px-4 backdrop-blur-xl lg:h-18 lg:px-8 transition-colors dark:border-slate-800/80 dark:bg-slate-950/75'>
      {/* Mobile Logo */}
      <div className='lg:hidden'>
        <Logo />
      </div>

      {/* Desktop Breadcrumb / Title */}
      <div className='hidden lg:flex items-center gap-3'>
        <div className='h-2 w-2 rounded-full bg-indigo-600 dark:bg-indigo-400' />
        <h2 className='text-base font-bold text-slate-800 dark:text-slate-100 tracking-tight'>
          {currentTitle}
        </h2>
      </div>

      {/* Right Controls */}
      <div className='flex items-center gap-2.5'>
        {/* Live Market Feeds Indicator */}
        <div className='hidden sm:flex items-center gap-2 rounded-full border border-emerald-200/70 bg-emerald-50/70 px-3 py-1 text-xs font-semibold text-emerald-700 shadow-2xs dark:border-emerald-800/50 dark:bg-emerald-950/50 dark:text-emerald-300'>
          <span className='relative flex h-2 w-2'>
            <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75' />
            <span className='relative inline-flex h-2 w-2 rounded-full bg-emerald-500' />
          </span>
          <Activity size={13} />
          <span>Live Data</span>
        </div>

        {/* Global Currency Selector Dropdown */}
        <div className='relative'>
          <select
            value={currency.code}
            onChange={(e) => setCurrencyCode(e.target.value)}
            className='appearance-none rounded-xl border border-slate-200/80 bg-white/90 py-1.5 pl-2.5 pr-6 text-xs font-bold text-slate-700 shadow-2xs hover:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200'
            aria-label='Select primary currency'
          >
            {currencies.map((c) => (
              <option key={c.code} value={c.code}>
                {c.symbol} {c.code}
              </option>
            ))}
          </select>
          <span className='pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-slate-400'>
            ▼
          </span>
        </div>

        {/* Dark Mode Toggle Button */}
        <button
          type='button'
          onClick={toggleTheme}
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          className='flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200/80 bg-white/90 text-slate-600 shadow-2xs transition-all hover:bg-slate-100 hover:text-indigo-600 active:scale-95 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-amber-400'
        >
          {isDark ? <Sun size={17} /> : <Moon size={17} />}
        </button>
      </div>
    </header>
  );
}
