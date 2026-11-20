import {
  Coins,
  CreditCard,
  DollarSign,
  Gauge,
  HandCoins,
  Percent,
  Receipt,
  Search,
  TrendingUp,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

import Logo from './logo';
import { useCurrency } from '../../hooks/use-currency';

interface NavGroup {
  label: string;
  items: {
    icon: typeof Gauge;
    label: string;
    to: string;
    badge?: string;
  }[];
}

const navGroups: NavGroup[] = [
  {
    label: 'Overview',
    items: [{ icon: Gauge, label: 'Dashboard', to: '/' }],
  },
  {
    label: 'Markets & Rates',
    items: [
      { icon: Coins, label: 'Gold Price', to: '/gold', badge: 'Live' },
      { icon: DollarSign, label: 'Exchange Rate', to: '/exchange' },
    ],
  },
  {
    label: 'Loans & Growth',
    items: [
      { icon: HandCoins, label: 'Loan Schedule', to: '/loan' },
      { icon: CreditCard, label: 'EMI Calculator', to: '/emi' },
      { icon: TrendingUp, label: 'Compound Interest', to: '/investment' },
    ],
  },
  {
    label: 'Calculators',
    items: [
      { icon: Receipt, label: 'Expense Split', to: '/expense-split' },
      { icon: Percent, label: 'Discount & Tax', to: '/discount' },
    ],
  },
];

interface SidebarProps {
  readonly onOpenSearch?: () => void;
}

export default function Sidebar({ onOpenSearch }: SidebarProps) {
  const { currency } = useCurrency();

  return (
    <aside className='sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-slate-200/80 bg-white dark:border-slate-800/80 dark:bg-slate-950 lg:flex'>
      <div className='flex h-16 items-center px-6 border-b border-slate-100 dark:border-slate-800/80'>
        <Logo />
      </div>

      {/* Quick Search Button */}
      <div className='px-4 pt-4'>
        <button
          type='button'
          onClick={onOpenSearch}
          className='flex w-full items-center justify-between rounded-xl border border-slate-200/80 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-500 transition-colors hover:border-slate-300 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800'
        >
          <span className='flex items-center gap-2'>
            <Search size={14} />
            <span>Search utilities...</span>
          </span>
          <kbd className='rounded bg-white px-1.5 py-0.5 text-[10px] font-mono text-slate-400 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-500'>
            ⌘K
          </kbd>
        </button>
      </div>

      <div className='flex-1 overflow-y-auto px-3 py-4 space-y-5'>
        {navGroups.map((group) => (
          <div key={group.label} className='space-y-1'>
            <p className='px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500'>
              {group.label}
            </p>
            <nav className='space-y-0.5'>
              {group.items.map((menu) => {
                const Icon = menu.icon;

                return (
                  <NavLink
                    key={menu.to}
                    to={menu.to}
                    className={({ isActive }) =>
                      `group flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold transition-all ${
                        isActive
                          ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-slate-100'
                      }`
                    }
                  >
                    <div className='flex items-center gap-2.5 min-w-0'>
                      <Icon size={16} className='shrink-0' />
                      <span className='truncate'>{menu.label}</span>
                    </div>
                    {menu.badge && (
                      <span className='rounded-full bg-emerald-500/10 px-1.5 py-0.2 text-[9px] font-extrabold text-emerald-600 dark:text-emerald-400'>
                        {menu.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </nav>
          </div>
        ))}
      </div>

      {/* Footer Status */}
      <div className='border-t border-slate-100 p-3 dark:border-slate-800/80'>
        <div className='flex items-center justify-between rounded-xl bg-slate-50 p-2.5 text-xs dark:bg-slate-900'>
          <div className='flex items-center gap-2'>
            <span className='h-2 w-2 rounded-full bg-emerald-500' />
            <span className='font-semibold text-slate-700 dark:text-slate-300'>Active Currency</span>
          </div>
          <span className='rounded bg-white px-2 py-0.5 text-xs font-mono font-bold text-slate-900 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-100'>
            {currency.code} ({currency.symbol})
          </span>
        </div>
      </div>
    </aside>
  );
}
