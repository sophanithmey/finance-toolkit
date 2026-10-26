import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

import Card from '../../../components/ui/card';

export default function LoanInfo() {
  const [open, setOpen] = useState(false);

  return (
    <Card className='overflow-hidden'>
      <button
        type='button'
        onClick={() => setOpen((prev) => !prev)}
        className='flex w-full items-center justify-between text-left cursor-pointer'
      >
        <div className='flex items-center gap-3'>
          <div className='flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600'>
            <HelpCircle size={20} />
          </div>

          <div>
            <h3 className='text-sm sm:text-base font-bold text-slate-900'>
              How Does Loan Amortization Work?
            </h3>
            <p className='text-xs text-slate-400'>
              Learn about principal reduction, compounding interest, and monthly installments
            </p>
          </div>
        </div>

        <div className='flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500'>
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </button>

      <div
        className={`transition-all duration-300 ease-in-out ${
          open
            ? 'mt-5 max-h-[800px] border-t border-slate-100 pt-5 opacity-100'
            : 'max-h-0 overflow-hidden opacity-0'
        }`}
      >
        <div className='grid gap-4 sm:grid-cols-2 text-xs text-slate-600'>
          <div className='rounded-2xl border border-slate-100 bg-slate-50/60 p-4'>
            <h4 className='font-bold text-slate-900'>💰 Loan Principal</h4>
            <p className='mt-1 text-slate-500 leading-relaxed'>
              The base sum borrowed from the creditor before interest accrues.
            </p>
          </div>

          <div className='rounded-2xl border border-slate-100 bg-slate-50/60 p-4'>
            <h4 className='font-bold text-slate-900'>📅 Loan Term (Months)</h4>
            <p className='mt-1 text-slate-500 leading-relaxed'>
              Total count of monthly periods until the debt is extinguished.
            </p>
          </div>

          <div className='rounded-2xl border border-slate-100 bg-slate-50/60 p-4'>
            <h4 className='font-bold text-slate-900'>📈 Annual Interest Rate</h4>
            <p className='mt-1 text-slate-500 leading-relaxed'>
              Monthly interest = Annual % ÷ 12. Applied to current unpaid balance.
            </p>
          </div>

          <div className='rounded-2xl border border-slate-100 bg-slate-50/60 p-4'>
            <h4 className='font-bold text-slate-900'>🧮 Fixed Equal Payment</h4>
            <p className='mt-1 text-slate-500 leading-relaxed'>
              Each payment blends shrinking interest and growing principal repayment.
            </p>
          </div>
        </div>

        <div className='mt-4 rounded-2xl border border-indigo-100 bg-linear-to-r from-indigo-50/80 to-blue-50/80 p-4 text-xs'>
          <h5 className='font-bold text-indigo-950'>Amortization Principle</h5>
          <p className='mt-1 text-slate-600 leading-relaxed'>
            In early months, a larger share of each installment goes to interest. As the balance diminishes, greater portions extinguish the principal directly.
          </p>
        </div>
      </div>
    </Card>
  );
}
