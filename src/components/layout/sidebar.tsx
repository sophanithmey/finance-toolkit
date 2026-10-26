import {
  Coins,
  CreditCard,
  DollarSign,
  Gauge,
  HandCoins,
  Percent,
  Receipt,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

import Logo from './logo';

const menus = [
  { icon: Gauge, label: 'Dashboard', to: '/' },
  { icon: TrendingUp, label: 'Compound Interest', to: '/investment' },
  { icon: Coins, label: 'Gold Price', to: '/gold' },
  { icon: DollarSign, label: 'Exchange Rate', to: '/exchange' },
  { icon: HandCoins, label: 'Loan Calculator', to: '/loan' },
  { icon: CreditCard, label: 'EMI Calculator', to: '/emi' },
  { icon: Receipt, label: 'Expense Split', to: '/expense-split' },
  { icon: Percent, label: 'Discount & Tax', to: '/discount' },
];

export default function Sidebar() {
  return (
    <aside className='sticky top-0 hidden h-screen w-72 shrink-0 border-r border-slate-200/80 bg-white/80 backdrop-blur-xl lg:flex lg:flex-col dark:border-slate-800/80 dark:bg-slate-950/80'>
      <div className='p-6 border-b border-slate-100 dark:border-slate-800/80'>
        <Logo />
      </div>

      <div className='flex-1 overflow-y-auto px-4 py-5'>
        <p className='px-3 mb-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500'>
          Calculators & Utilities
        </p>

        <nav className='space-y-1.5'>
          {menus.map((menu) => {
            const Icon = menu.icon;

            return (
              <NavLink
                key={menu.to}
                to={menu.to}
                className={({ isActive }) =>
                  `group relative flex items-center gap-3.5 rounded-2xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-linear-to-r from-indigo-600 via-indigo-600 to-blue-600 text-white shadow-md shadow-indigo-500/25'
                      : 'text-slate-600 hover:bg-slate-100/80 hover:text-indigo-600 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-indigo-300'
                  }`
                }
              >
                <Icon
                  size={19}
                  className='transition-transform duration-300 group-hover:scale-110'
                />
                <span className='flex-1'>{menu.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className='p-4 border-t border-slate-100 dark:border-slate-800/80'>
        <div className='relative overflow-hidden rounded-2xl bg-linear-to-br from-indigo-600 via-indigo-700 to-blue-700 p-4 text-white shadow-lg shadow-indigo-500/20'>
          <div className='absolute -right-4 -bottom-4 h-20 w-20 rounded-full bg-white/10 blur-xl pointer-events-none' />
          <div className='flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-200'>
            <Sparkles size={14} className='text-amber-300' />
            All-In-One Toolkit
          </div>
          <p className='mt-1.5 text-xs text-indigo-100/90 leading-relaxed'>
            Real-time calculations, schedules & currency conversion.
          </p>
        </div>
      </div>
    </aside>
  );
}
