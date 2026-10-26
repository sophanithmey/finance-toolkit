import {
  ArrowLeftRight,
  Calculator,
  Coins,
  CreditCard,
  Landmark,
  ReceiptText,
  Sparkles,
} from 'lucide-react';

import ToolCard from '../components/ui/tool-card';

export default function HomePage() {
  return (
    <div className='space-y-8'>
      <div className='relative overflow-hidden rounded-3xl bg-linear-to-br from-indigo-900 to-slate-900 p-8 sm:p-10 text-white shadow-xl'>
        <div className='inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-indigo-200 backdrop-blur-md mb-3'>
          <Sparkles size={12} className='text-amber-300' />
          <span>Complete Calculator Suite</span>
        </div>
        <h1 className='text-3xl sm:text-5xl font-black tracking-tight'>
          Financial Utilities Hub
        </h1>
        <p className='mt-2.5 max-w-xl text-sm sm:text-base text-indigo-200/90 leading-relaxed'>
          Smart calculators designed for daily budgeting, debt amortization, retail discounts, group bills, and real-time market conversions.
        </p>
      </div>

      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        <ToolCard
          title='Compound Interest'
          description='Simulate long-term investment growth, monthly compounding, and wealth multipliers.'
          to='/investment'
          icon={<Calculator size={26} className='text-indigo-600' />}
          gradient='bg-linear-to-r from-blue-500 to-indigo-600'
        />

        <ToolCard
          title='Discount & Tax'
          description='Calculate discount deductions, sales taxes, and final payable sums.'
          to='/discount'
          icon={<Calculator size={26} className='text-emerald-600' />}
          gradient='bg-linear-to-r from-emerald-500 to-teal-600'
        />

        <ToolCard
          title='Group Expense Split'
          description='Split shared bills with friends and generate debt settlement graphs.'
          to='/expense-split'
          icon={<ReceiptText size={26} className='text-cyan-600' />}
          gradient='bg-linear-to-r from-cyan-500 to-blue-600'
        />

        <ToolCard
          title='Loan Amortization'
          description='Generate monthly schedules with principal, interest, and Excel export.'
          to='/loan'
          icon={<Landmark size={26} className='text-indigo-600' />}
          gradient='bg-linear-to-r from-blue-500 to-indigo-600'
        />

        <ToolCard
          title='Foreign Exchange'
          description='Live currency conversion across global currencies with instant swap.'
          to='/exchange'
          icon={<ArrowLeftRight size={26} className='text-orange-600' />}
          gradient='bg-linear-to-r from-amber-500 to-orange-600'
        />

        <ToolCard
          title='EMI Calculator'
          description='Calculate equated monthly installments with upfront fees.'
          to='/emi'
          icon={<CreditCard size={26} className='text-violet-600' />}
          gradient='bg-linear-to-r from-violet-500 to-purple-600'
        />

        <ToolCard
          title='Gold Price Benchmark'
          description='Real-time SJC gold pricing, weight calculators, and quick conversions.'
          to='/gold'
          icon={<Coins size={26} className='text-amber-600' />}
          gradient='bg-linear-to-r from-yellow-500 to-amber-600'
        />
      </div>
    </div>
  );
}
