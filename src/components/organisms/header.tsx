import { Moon, Search, Sun } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import CurrencyUnitSelector from '../molecules/currency-unit-selector';
import { useTheme } from '../../hooks/use-theme';
import type { DisplayUnit } from '../../types/fuel';

interface HeaderProps {
  readonly displayUnit: DisplayUnit;
  readonly onUnitChange: (unit: DisplayUnit) => void;
  readonly onOpenSearch?: () => void;
}

const pageTitles: Record<string, string> = {
  '/': 'Global Fuel Dashboard',
  '/asean': 'ASEAN Fuel Intelligence (🇰🇭 Cambodia Featured)',
  '/cambodia': 'Cambodia Fuel Profile & Border Parity',
  '/global': 'Interactive World Fuel Map',
  '/map': 'Interactive World Fuel Map',
  '/countries': 'Country Fuel Directory',
  '/compare': 'Cross-Country Price Comparison',
  '/rankings': 'Global Price Rankings',
  '/trends': 'Historical Price Trends',
  '/calculator': 'Trip & Commute Fuel Cost Calculator',
  '/about': 'About Data & OpenVan Methodology',
  '/expense-split': 'Expense Split & Settlement Calculator',
  '/expense-calculator': 'Expense Split & Settlement Calculator',
  '/loan': 'Loan Repayment Schedule & Amortization',
  '/emi': 'EMI (Monthly Installment) Calculator',
  '/discount': 'Discount & Tax Savings Calculator',
  '/investment': 'Compound Interest & Growth Projections',
  '/exchange': 'Currency Exchange Rates & Conversion',
  '/gold': 'Gold Market Price & Valuation',
};

export default function Header({ displayUnit, onUnitChange, onOpenSearch }: HeaderProps) {
  const location = useLocation();
  const title = pageTitles[location.pathname] || 'Finance & Fuel Toolkit';
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className='sticky top-0 z-40 flex h-16 items-center justify-between border-b border-slate-200/80 bg-white/90 px-4 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-950/90 lg:px-8'>
      <div className='flex items-center gap-3'>
        <div className='h-2 w-2 rounded-full bg-indigo-600 dark:bg-indigo-400' />
        <h1 className='text-sm font-bold text-slate-900 dark:text-slate-100'>
          {title}
        </h1>
      </div>

      <div className='flex items-center gap-2'>
        <button
          type='button'
          onClick={onOpenSearch}
          className='flex h-9 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-semibold text-slate-500 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400'
        >
          <Search size={14} />
          <span className='hidden sm:inline'>Search</span>
          <kbd className='hidden sm:inline-block rounded bg-white px-1.5 py-0.5 text-[10px] font-mono text-slate-400 border border-slate-200 dark:bg-slate-950 dark:border-slate-800'>
            ⌘K
          </kbd>
        </button>

        <CurrencyUnitSelector displayUnit={displayUnit} onChange={onUnitChange} />

        <button
          type='button'
          onClick={toggleTheme}
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          className='flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800'
        >
          {isDark ? <Sun size={15} /> : <Moon size={15} />}
        </button>
      </div>
    </header>
  );
}
