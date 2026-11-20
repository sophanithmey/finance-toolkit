import {
  BarChart3,
  Calculator,
  Compass,
  Coins,
  DollarSign,
  Fuel,
  HandCoins,
  Receipt,
  Sparkles,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { icon: BarChart3, label: 'Overview', to: '/' },
  { icon: Sparkles, label: 'ASEAN', to: '/asean' },
  { icon: Receipt, label: 'Split', to: '/expense-split' },
  { icon: Calculator, label: 'Fuel Calc', to: '/calculator' },
  { icon: HandCoins, label: 'Loan', to: '/loan' },
  { icon: DollarSign, label: 'FX', to: '/exchange' },
  { icon: Coins, label: 'Gold', to: '/gold' },
  { icon: Compass, label: 'Countries', to: '/countries' },
  { icon: Fuel, label: 'Rankings', to: '/rankings' },
];

export default function MobileNav() {
  return (
    <nav className='fixed bottom-2 inset-x-2 z-50 rounded-2xl border border-slate-200/80 bg-white/95 p-1.5 shadow-xl backdrop-blur-md lg:hidden dark:border-slate-800 dark:bg-slate-950/95'>
      <div className='flex items-center gap-1 overflow-x-auto scrollbar-none px-1'>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex min-w-[52px] flex-1 flex-col items-center justify-center rounded-xl py-1.5 px-2 transition-all shrink-0 ${
                  isActive
                    ? 'bg-slate-900 font-bold text-white dark:bg-white dark:text-slate-900 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
                }`
              }
            >
              <Icon size={16} />
              <span className='mt-1 text-[9px] font-semibold tracking-tight whitespace-nowrap'>
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
