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
  { icon: TrendingUp, label: 'Growth', to: '/investment' },
  { icon: Coins, label: 'Gold', to: '/gold' },
  { icon: DollarSign, label: 'Exchange', to: '/exchange' },
  { icon: HandCoins, label: 'Loan', to: '/loan' },
  { icon: CreditCard, label: 'EMI', to: '/emi' },
  { icon: Percent, label: 'Discount', to: '/discount' },
  { icon: Receipt, label: 'Expense', to: '/expense-split' },
];

export default function MobileBottomNav() {
  return (
    <nav className='fixed bottom-2 inset-x-2 z-50 rounded-2xl border border-slate-200/90 bg-white/90 shadow-2xl backdrop-blur-xl lg:hidden dark:border-slate-800 dark:bg-slate-950/90'>
      <div className='flex items-center justify-between overflow-x-auto py-2 px-2 scrollbar-none'>
        {menus.map((menu) => {
          const Icon = menu.icon;

          return (
            <NavLink
              key={menu.to}
              to={menu.to}
              className={({ isActive }) =>
                `flex min-w-[56px] flex-1 flex-col items-center justify-center rounded-xl py-1.5 px-1 transition-all duration-200 ${
                  isActive
                    ? 'bg-indigo-50 font-bold text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400'
                    : 'text-slate-500 hover:text-slate-900 active:scale-95 dark:text-slate-400 dark:hover:text-slate-100'
                }`
              }
            >
              <Icon size={18} />
              <span className='mt-1 text-[10px] font-medium tracking-tight whitespace-nowrap'>
                {menu.label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
