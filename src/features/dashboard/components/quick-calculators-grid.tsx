import {
  Calculator,
  Coins,
  CreditCard,
  DollarSign,
  HandCoins,
  Percent,
  Receipt,
  TrendingUp,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

const CALCULATOR_CARDS = [
  {
    title: 'Expense Calculator',
    description: 'Split group bills and auto-calculate minimum settlements',
    to: '/expense-split',
    icon: Receipt,
    badge: 'Popular',
    color: 'text-violet-600 bg-violet-500/10 dark:text-violet-400',
  },
  {
    title: 'Fuel Trip Calculator',
    description: 'Calculate fuel consumption & trip costs across 175 countries',
    to: '/calculator',
    icon: Calculator,
    badge: 'Trip',
    color: 'text-indigo-600 bg-indigo-500/10 dark:text-indigo-400',
  },
  {
    title: 'Loan Amortization',
    description: 'Generate monthly repayment schedule with Excel .xlsx export',
    to: '/loan',
    icon: HandCoins,
    badge: 'Excel',
    color: 'text-emerald-600 bg-emerald-500/10 dark:text-emerald-400',
  },
  {
    title: 'EMI Calculator',
    description: 'Calculate equated monthly installments with down payment',
    to: '/emi',
    icon: CreditCard,
    badge: null,
    color: 'text-blue-600 bg-blue-500/10 dark:text-blue-400',
  },
  {
    title: 'Discount & Tax',
    description: 'Determine exact discount savings and net payable amounts',
    to: '/discount',
    icon: Percent,
    badge: null,
    color: 'text-amber-600 bg-amber-500/10 dark:text-amber-400',
  },
  {
    title: 'Compound Interest',
    description: 'Model long-term wealth accumulation and interest growth',
    to: '/investment',
    icon: TrendingUp,
    badge: 'Growth',
    color: 'text-emerald-600 bg-emerald-500/10 dark:text-emerald-400',
  },
  {
    title: 'Exchange Rates',
    description: 'Real-time multi-currency conversion with one-click swap',
    to: '/exchange',
    icon: DollarSign,
    badge: 'FX',
    color: 'text-teal-600 bg-teal-500/10 dark:text-teal-400',
  },
  {
    title: 'Gold Price Tracker',
    description: 'Live precious metal valuation with gram/tael conversions',
    to: '/gold',
    icon: Coins,
    badge: 'Live',
    color: 'text-amber-600 bg-amber-500/10 dark:text-amber-400',
  },
] as const;

export default function QuickCalculatorsGrid() {
  return (
    <section className='space-y-3'>
      <div className='flex items-center justify-between'>
        <div>
          <h2 className='text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2'>
            <span>Calculators & Financial Utilities</span>
            <span className='rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300'>
              8 Core Tools
            </span>
          </h2>
          <p className='text-xs text-slate-400'>
            Full-featured personal finance tools, expense splitters, and loan planners
          </p>
        </div>
      </div>

      <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-4'>
        {CALCULATOR_CARDS.map((card) => {
          const Icon = card.icon;
          return (
            <NavLink
              key={card.to}
              to={card.to}
              className='group flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700'
            >
              <div>
                <div className='flex items-center justify-between mb-3'>
                  <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${card.color}`}>
                    <Icon size={18} />
                  </div>
                  {card.badge && (
                    <span className='rounded-full bg-slate-100 px-2 py-0.5 text-[9px] font-extrabold text-slate-600 dark:bg-slate-800 dark:text-slate-300'>
                      {card.badge}
                    </span>
                  )}
                </div>
                <h3 className='text-xs font-bold text-slate-900 group-hover:text-indigo-600 dark:text-slate-100 dark:group-hover:text-indigo-400 transition-colors'>
                  {card.title}
                </h3>
                <p className='mt-1 text-[11px] leading-relaxed text-slate-500 dark:text-slate-400'>
                  {card.description}
                </p>
              </div>
              <div className='mt-3 flex items-center text-[10px] font-bold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-0.5 transition-transform'>
                Launch Tool →
              </div>
            </NavLink>
          );
        })}
      </div>
    </section>
  );
}
