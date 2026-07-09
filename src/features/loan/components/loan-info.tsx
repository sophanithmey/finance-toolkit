import { useState } from 'react';
import { ChevronDown, ChevronUp, Info } from 'lucide-react';

import Card from '../../../components/ui/card';

export default function LoanInfo() {
  const [open, setOpen] = useState(false);

  return (
    <Card className='overflow-hidden'>
      <button
        type='button'
        onClick={() => setOpen((prev) => !prev)}
        className='flex w-full items-center justify-between'
      >
        <div className='flex items-center gap-3'>
          <div className='rounded-xl bg-blue-100 p-2'>
            <Info size={20} className='text-blue-600' />
          </div>

          <div className='text-left'>
            <h3 className='font-semibold text-slate-800'>
              How does this calculator work?
            </h3>

            <p className='text-sm text-slate-500'>
              Learn how repayments are calculated
            </p>
          </div>
        </div>

        {open ? (
          <ChevronUp className='text-slate-500' />
        ) : (
          <ChevronDown className='text-slate-500' />
        )}
      </button>

      <div
        className={`transition-all duration-300 ease-in-out ${
          open
            ? 'mt-6 max-h-[1000px] opacity-100'
            : 'max-h-0 overflow-hidden opacity-0'
        }`}
      >
        <div className='space-y-5 border-t pt-6 text-sm text-slate-600'>
          <div>
            <h4 className='font-semibold text-slate-800'>💰 Loan Amount</h4>

            <p>
              The total amount you borrow from the lender before any interest is
              added.
            </p>
          </div>

          <div>
            <h4 className='font-semibold text-slate-800'>📅 Loan Months</h4>

            <p>
              The total number of monthly payments you will make to fully repay
              the loan.
            </p>
          </div>

          <div>
            <h4 className='font-semibold text-slate-800'>
              📈 Annual Interest Rate (%)
            </h4>

            <p>This is the yearly interest rate charged by the lender.</p>

            <div className='mt-2 rounded-xl bg-blue-50 p-3'>
              <strong>Example</strong>

              <p className='mt-1'>
                Annual Interest = <b>12%</b>
              </p>

              <p>
                Monthly Interest = <b>12 ÷ 12 = 1%</b>
              </p>

              <p className='mt-2'>
                Every month, interest is calculated using the remaining loan
                balance.
              </p>
            </div>
          </div>

          <div>
            <h4 className='font-semibold text-slate-800'>🗓 Start Date</h4>

            <p>
              The date your first payment begins. Future payments are generated
              monthly from this date.
            </p>
          </div>

          <div>
            <h4 className='font-semibold text-slate-800'>🧮 Monthly Payment</h4>

            <p>
              You don't need to calculate this yourself. The calculator
              automatically determines a fixed monthly payment based on your
              loan amount, loan term, and annual interest rate.
            </p>
          </div>

          <div className='rounded-2xl border border-green-200 bg-green-50 p-4'>
            <h4 className='font-semibold text-green-700'>Example</h4>

            <div className='mt-3 space-y-1'>
              <p>Loan Amount: $12,000</p>

              <p>Loan Months: 24</p>

              <p>Annual Interest: 6%</p>
            </div>

            <p className='mt-3'>
              The calculator automatically generates a repayment schedule
              showing the payment amount, principal paid, interest paid, and
              remaining balance for every month.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
