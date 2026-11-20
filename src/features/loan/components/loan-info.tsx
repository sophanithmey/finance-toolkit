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
          <div className='flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200'>
            <HelpCircle size={17} />
          </div>

          <div>
            <h3 className='text-sm font-bold text-slate-900 dark:text-slate-100'>
              Understanding Amortization
            </h3>
            <p className='text-xs text-slate-400 dark:text-slate-500'>
              How principal, interest compounding, and periodic balances work
            </p>
          </div>
        </div>

        <div className='flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'>
          {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </div>
      </button>

      {open && (
        <div className='mt-4 border-t border-slate-100 pt-4 dark:border-slate-800 animate-in fade-in duration-200'>
          <div className='grid gap-3 sm:grid-cols-2 text-xs'>
            <div className='rounded-xl border border-slate-200/80 bg-slate-50/60 p-3.5 dark:border-slate-800 dark:bg-slate-900/60'>
              <h4 className='font-bold text-slate-900 dark:text-slate-100'>Loan Principal</h4>
              <p className='mt-1 text-slate-500 dark:text-slate-400 leading-relaxed'>
                The original amount borrowed before any financing interest or upfront fees accrue.
              </p>
            </div>

            <div className='rounded-xl border border-slate-200/80 bg-slate-50/60 p-3.5 dark:border-slate-800 dark:bg-slate-900/60'>
              <h4 className='font-bold text-slate-900 dark:text-slate-100'>Loan Term</h4>
              <p className='mt-1 text-slate-500 dark:text-slate-400 leading-relaxed'>
                Total number of monthly installment cycles until the liability reaches zero.
              </p>
            </div>

            <div className='rounded-xl border border-slate-200/80 bg-slate-50/60 p-3.5 dark:border-slate-800 dark:bg-slate-900/60'>
              <h4 className='font-bold text-slate-900 dark:text-slate-100'>Annual Interest Rate</h4>
              <p className='mt-1 text-slate-500 dark:text-slate-400 leading-relaxed'>
                Computed monthly as Annual Rate % / 12, applied to the outstanding principal balance.
              </p>
            </div>

            <div className='rounded-xl border border-slate-200/80 bg-slate-50/60 p-3.5 dark:border-slate-800 dark:bg-slate-900/60'>
              <h4 className='font-bold text-slate-900 dark:text-slate-100'>Payment Composition</h4>
              <p className='mt-1 text-slate-500 dark:text-slate-400 leading-relaxed'>
                Each fixed installment shifts from interest-heavy in early months to principal-heavy later.
              </p>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
