import {
  ArrowLeftRight,
  Calculator,
  Coins,
  CreditCard,
  Landmark,
  ReceiptText,
  TrendingUp,
} from 'lucide-react';

import Hero from '../components/dashboard/hero';
import FinancePlanner from '../components/dashboard/finance-planner';
import ToolCard from '../components/ui/tool-card';

import { useDashboard } from '../hooks/use-dashboard';
import { convertCurrency } from '../utils/helper';

export default function DashboardPage() {
  const { goldData, isLoading, exchangeData } = useDashboard();

  if (isLoading) {
    return (
      <div className='space-y-6'>
        <div className='h-64 animate-pulse rounded-3xl bg-slate-200/80' />
        <div className='grid gap-6 lg:grid-cols-2'>
          <div className='h-96 animate-pulse rounded-3xl bg-slate-200/80' />
          <div className='h-96 animate-pulse rounded-3xl bg-slate-200/80' />
        </div>
      </div>
    );
  }

  const goldChange = () => {
    const change = Number(goldData?.sell) - Number(goldData?.buy);
    return convertCurrency(change, 26150);
  };

  return (
    <div className='space-y-8'>
      <Hero />

      <FinancePlanner
        goldPrice={String(goldData?.sell) || ''}
        exchangeRate={String(exchangeData?.rates['KHR'] || 0) || ''}
        goldChange={String(goldChange().toFixed(2))}
        updatedTime={goldData?.time || ''}
      />

      {/* Featured Quick Tool Launchers */}
      <section className='space-y-4'>
        <div className='flex items-center justify-between'>
          <div>
            <h2 className='text-xl font-extrabold tracking-tight text-slate-900'>
              Financial Calculators
            </h2>
            <p className='text-xs text-slate-500'>
              Instant calculation engines for loans, splits, and purchases
            </p>
          </div>
        </div>

        <div className='grid gap-5 md:grid-cols-2 lg:grid-cols-3'>
          <ToolCard
            title='Compound Interest'
            description='Simulate long-term investment growth, monthly compounding, and wealth multipliers.'
            to='/investment'
            icon={<TrendingUp size={26} className='text-emerald-600' />}
            gradient='bg-linear-to-r from-emerald-500 to-teal-600'
          />

          <ToolCard
            title='Loan Amortization'
            description='Detailed monthly breakdown with principal, interest, and Excel export.'
            to='/loan'
            icon={<Landmark size={26} className='text-indigo-600' />}
            gradient='bg-linear-to-r from-blue-500 to-indigo-600'
          />

          <ToolCard
            title='EMI Calculator'
            description='Equated Monthly Installment with down payment and processing fees.'
            to='/emi'
            icon={<CreditCard size={26} className='text-violet-600' />}
            gradient='bg-linear-to-r from-violet-500 to-purple-600'
          />

          <ToolCard
            title='Discount & Tax'
            description='Calculate percent savings, tax-exclusive or inclusive pricing.'
            to='/discount'
            icon={<Calculator size={26} className='text-emerald-600' />}
            gradient='bg-linear-to-r from-emerald-500 to-teal-600'
          />

          <ToolCard
            title='Group Expense Split'
            description='Split group dinners, trips, and settle peer-to-peer debts effortlessly.'
            to='/expense-split'
            icon={<ReceiptText size={26} className='text-cyan-600' />}
            gradient='bg-linear-to-r from-cyan-500 to-blue-600'
          />

          <ToolCard
            title='Exchange Rate'
            description='Live currency conversion across global currencies with instant swap.'
            to='/exchange'
            icon={<ArrowLeftRight size={26} className='text-orange-600' />}
            gradient='bg-linear-to-r from-amber-500 to-orange-600'
          />

          <ToolCard
            title='Gold Market Price'
            description='Live SJC rates, unit weight calculators, and quick tael estimates.'
            to='/gold'
            icon={<Coins size={26} className='text-amber-600' />}
            gradient='bg-linear-to-r from-yellow-500 to-amber-600'
          />
        </div>
      </section>
    </div>
  );
}
