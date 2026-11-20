import {
  ArrowLeftRight,
  Calculator,
  Coins,
  CreditCard,
  Landmark,
  ReceiptText,
  Sparkles,
  TrendingUp,
} from 'lucide-react';

import ToolCard from '../components/ui/tool-card';

export default function HomePage() {
  return (
    <div className='space-y-6'>
      <div className='relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xs dark:border-slate-800/80 dark:bg-slate-900'>
        <div className='inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300 mb-2'>
          <Sparkles size={12} className='text-amber-500' />
          <span>Complete Financial Suite</span>
        </div>
        <h1 className='text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100'>
          Financial Utilities Hub
        </h1>
        <p className='mt-2 max-w-xl text-xs sm:text-sm text-slate-500 leading-relaxed dark:text-slate-400'>
          Precision financial calculators for loan amortization, retail discounts, group bills, wealth compounding, and real-time market conversions.
        </p>
      </div>

      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        <ToolCard
          title='Compound Interest'
          description='Model multi-year wealth growth, regular deposits, and compounding frequencies.'
          to='/investment'
          tag='Wealth'
          icon={<TrendingUp size={20} className='text-emerald-600 dark:text-emerald-400' />}
        />

        <ToolCard
          title='Loan Amortization'
          description='Detailed payment schedules, balance tracking, and Excel workbook export.'
          to='/loan'
          tag='Financing'
          icon={<Landmark size={20} className='text-indigo-600 dark:text-indigo-400' />}
        />

        <ToolCard
          title='EMI Calculator'
          description='Equated monthly payments with upfront down payment and fee deductions.'
          to='/emi'
          tag='Installment'
          icon={<CreditCard size={20} className='text-violet-600 dark:text-violet-400' />}
        />

        <ToolCard
          title='Discount & Tax'
          description='Instant discount calculations with pre-tax/post-tax pricing controls.'
          to='/discount'
          tag='Retail'
          icon={<Calculator size={20} className='text-teal-600 dark:text-teal-400' />}
        />

        <ToolCard
          title='Expense Splitter'
          description='Equal bill splitting, contribution ledger, and optimal settlement transactions.'
          to='/expense-split'
          tag='Social'
          icon={<ReceiptText size={20} className='text-cyan-600 dark:text-cyan-400' />}
        />

        <ToolCard
          title='Exchange Rates'
          description='Live foreign exchange conversion with instant inverse swap.'
          to='/exchange'
          tag='Forex'
          icon={<ArrowLeftRight size={20} className='text-amber-600 dark:text-amber-400' />}
        />

        <ToolCard
          title='Gold Benchmark'
          description='SJC gold prices, unit weight estimators, and denomination conversion.'
          to='/gold'
          tag='Commodities'
          icon={<Coins size={20} className='text-yellow-600 dark:text-yellow-400' />}
        />
      </div>
    </div>
  );
}
