import {
  ArrowLeftRight,
  Calculator,
  Coins,
  CreditCard,
  Landmark,
  ReceiptText,
} from 'lucide-react';

import ToolCard from '../components/ui/tool-card';

export default function HomePage() {
  return (
    <>
      <div className='mb-10'>
        <h1 className='text-5xl font-bold'>💰 Finance Toolkit</h1>
        <p className='mt-3 text-lg text-gray-500'>
          Smart financial tools for everyday use.
        </p>
      </div>

      <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
        <ToolCard
          title='Discount Calculator'
          description='Calculate discount, tax and final amount.'
          to='/discount'
          icon={<Calculator size={34} className='text-emerald-600' />}
          gradient='bg-gradient-to-r from-emerald-400 to-green-600'
        />

        <ToolCard
          title='Expense Split'
          description='Split bills and calculate payback.'
          to='/expense-split'
          icon={<ReceiptText size={34} className='text-blue-600' />}
          gradient='bg-gradient-to-r from-blue-500 to-cyan-500'
        />
        <ToolCard
          title='Loan Repayment'
          description='Generate a repayment schedule and export it to Excel.'
          to='/loan'
          icon={<Landmark size={34} className='text-violet-600' />}
          gradient='bg-gradient-to-r from-violet-500 to-purple-600'
        />
        <ToolCard
          title='Exchange Rate'
          description='Convert between currencies using live exchange rates.'
          to='/exchange-rate'
          icon={<ArrowLeftRight size={34} className='text-orange-600' />}
          gradient='bg-gradient-to-r from-orange-500 to-amber-500'
        />
        <ToolCard
          title='EMI Calculator'
          description='Calculate your monthly loan payments.'
          to='/emi'
          icon={<CreditCard size={34} className='text-fuchsia-600' />}
          gradient='bg-gradient-to-r from-fuchsia-500 to-pink-600'
        />
        <ToolCard
          title='Gold Price'
          description='Live gold prices, calculator, and quick value conversion.'
          to='/gold'
          icon={<Coins size={34} className='text-yellow-700' />}
          gradient='bg-gradient-to-r from-yellow-500 to-amber-400'
        />
      </div>
    </>
  );
}
