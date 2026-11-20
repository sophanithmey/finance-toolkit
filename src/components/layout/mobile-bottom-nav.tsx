import {
  Coins,
  CreditCard,
  DollarSign,
  Gauge,
  HandCoins,
  Percent,
  Receipt,
  TrendingUp,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

const menus = [
  { icon: Gauge, label: 'Home', to: '/' },
  { icon: Coins, label: 'Gold', to: '/gold' },
  { icon: DollarSign, label: 'FX', to: '/exchange' },
  { icon: HandCoins, label: 'Loan', to: '/loan' },
  { icon: CreditCard, label: 'EMI', to: '/emi' },
  { icon: TrendingUp, label: 'Growth', to: '/investment' },
  { icon: Receipt, label: 'Split', to: '/expense-split' },
  { icon: Percent, label: 'Discount', to: '/discount' },
];

export default function MobileBottomNav() {
  return (
    <nav className='fixed bottom-2 inset-x-2 z-50 rounded-2xl border border-slate-200/80 bg-white/95 p-1.5 shadow-xl backdrop-blur-md lg:hidden dark:border-slate-800 dark:bg-slate-950/95'>
      <div className='flex items-center justify-between overflow-x-auto scrollbar-none'>
        {menus.map((menu) => {
          const Icon = menu.icon;

          return (
            <NavLink
              key={menu.to}
              to={menu.to}
              className={({ isActive }) =>
                `flex min-w-[46px] flex-1 flex-col items-center justify-center rounded-xl py-1 px-1 transition-all ${
                  isActive
                    ? 'bg-slate-900 font-bold text-white dark:bg-white dark:text-slate-900 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
                }`
              }
            >
              <Icon size={16} />
              <span className='mt-1 text-[9px] font-semibold tracking-tight whitespace-nowrap'>
                {menu.label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
