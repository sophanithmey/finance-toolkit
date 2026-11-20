import { Moon, Search, Sun } from 'lucide-react';
import { useLocation } from 'react-router-dom';

import Logo from './logo';
import Badge from '../ui/badge';
import { useTheme } from '../../hooks/use-theme';
import { useCurrency } from '../../hooks/use-currency';

const routeTitles: Record<string, string> = {
  '/': 'Financial Overview',
  '/gold': 'Gold Benchmark',
  '/exchange': 'Foreign Exchange',
  '/loan': 'Loan Schedule',
  '/emi': 'EMI Calculator',
  '/expense-split': 'Group Expense Split',
  '/discount': 'Discount & Tax',
  '/investment': 'Compound Interest',
};

interface NavbarProps {
  readonly onOpenSearch?: () => void;
}

export default function Navbar({ onOpenSearch }: NavbarProps) {
  const location = useLocation();
  const currentTitle = routeTitles[location.pathname] || 'Toolkit';
  const { isDark, toggleTheme } = useTheme();
  const { currency, currencies, setCurrencyCode } = useCurrency();

  return (
    <header className='sticky top-0 z-40 flex h-16 items-center justify-between border-b border-slate-200/80 bg-white/90 px-4 backdrop-blur-md transition-colors dark:border-slate-800/80 dark:bg-slate-950/90 lg:px-8'>
      {/* Mobile Logo */}
      <div className='lg:hidden'>
        <Logo />
      </div>

      {/* Desktop Title & Breadcrumb */}
      <div className='hidden lg:flex items-center gap-3'>
        <div className='h-2 w-2 rounded-full bg-indigo-600 dark:bg-indigo-400' />
        <h1 className='text-sm font-bold text-slate-900 dark:text-slate-100'>
          {currentTitle}
        </h1>
        <Badge variant='emerald' size='sm' dot>
          Live
        </Badge>
      </div>

      {/* Right Controls */}
      <div className='flex items-center gap-2'>
        {/* Search trigger */}
        <button
          type='button'
          onClick={onOpenSearch}
          className='flex h-9 items-center gap-2 rounded-xl border border-slate-200/80 bg-slate-50 px-3 text-xs font-semibold text-slate-500 transition-colors hover:border-slate-300 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400'
          aria-label='Search'
        >
          <Search size={14} />
          <span className='hidden sm:inline'>Search</span>
          <kbd className='hidden sm:inline-block rounded bg-white px-1.5 py-0.5 text-[10px] font-mono text-slate-400 border border-slate-200 dark:bg-slate-950 dark:border-slate-800'>
            ⌘K
          </kbd>
        </button>

        {/* Currency Selector Dropdown */}
        <div className='relative'>
          <select
            value={currency.code}
            onChange={(e) => setCurrencyCode(e.target.value)}
            className='appearance-none rounded-xl border border-slate-200/80 bg-white py-1.5 pl-3 pr-7 text-xs font-bold text-slate-700 shadow-2xs hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200'
            aria-label='Select primary currency'
          >
            {currencies.map((c) => (
              <option key={c.code} value={c.code}>
                {c.symbol} {c.code}
              </option>
            ))}
          </select>
          <span className='pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[9px] text-slate-400'>
            ▼
          </span>
        </div>

        {/* Dark Mode Toggle Button */}
        <button
          type='button'
          onClick={toggleTheme}
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          className='flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200/80 bg-white text-slate-600 shadow-2xs transition-colors hover:bg-slate-100 active:scale-95 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800'
        >
          {isDark ? <Sun size={15} /> : <Moon size={15} />}
        </button>
      </div>
    </header>
  );
}
