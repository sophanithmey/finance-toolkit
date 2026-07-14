import {
  Coins,
  CreditCard,
  DollarSign,
  Gauge,
  HandCoins,
  Percent,
  Receipt,
//   Settings,
} from 'lucide-react';

import { NavLink } from 'react-router-dom';

import Logo from './logo';

const menus = [
  {
    icon: Gauge,
    label: 'Dashboard',
    to: '/',
  },
  {
    icon: Coins,
    label: 'Gold Price',
    to: '/gold',
  },
  {
    icon: DollarSign,
    label: 'Exchange Rate',
    to: '/exchange',
  },
  {
    icon: HandCoins,
    label: 'Loan Calculator',
    to: '/loan',
  },
  {
    icon: CreditCard,
    label: 'EMI Calculator',
    to: '/emi',
  },
  {
    icon: Receipt,
    label: 'Expense Split',
    to: '/expense-split',
  },
  {
    icon: Percent,
    label: 'Discount Calculator',
    to: '/discount',
  },
//   {
//     icon: Settings,
//     label: 'Settings',
//     to: '/settings',
//   },
];

export default function Sidebar() {
  return (
    <aside className='hidden h-100% w-72 border-r border-slate-200 bg-white lg:flex lg:flex-col'>
      <div className='p-6'>
        <Logo />
      </div>

      <div className='flex-1 px-4'>
        <div className='space-y-2'>
          {menus.map((menu) => {
            const Icon = menu.icon;

            return (
              <NavLink
                key={menu.to}
                to={menu.to}
                className={({ isActive }) =>
                  `group flex items-center gap-4 rounded-2xl px-4 py-3 transition-all duration-300 ${
                    isActive
                      ? 'bg-linear-to-r from-blue-400 to-green-400 text-white shadow-lg'
                      : 'text-slate-600 hover:bg-indigo-50 hover:text-indigo-600'
                  }`
                }
              >
                <Icon
                  size={20}
                  className='transition-transform group-hover:rotate-12'
                />

                <span className='font-medium'>{menu.label}</span>
              </NavLink>
            );
          })}
        </div>
      </div>

      <div className='m-4 rounded-3xl bg-linear-to-r from-blue-400 to-green-400 p-4 text-white bottom-5 sticky'>
        <p className='text-lg font-bold'>Finance Toolkit</p>

        <p className='mt-2 text-sm text-indigo-100'>
          Track everything in one place.
        </p>
      </div>
    </aside>
  );
}
