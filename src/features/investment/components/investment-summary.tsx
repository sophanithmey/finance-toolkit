import { Award, Coins, Wallet } from 'lucide-react';

import { useCurrency } from '../../../hooks/use-currency';
import type { InvestmentResult } from '../types';

interface Props {
  readonly result: InvestmentResult;
}

export default function InvestmentSummary({ result }: Props) {
  const { formatAmount } = useCurrency();
  const interestRatio =
    result.finalBalance > 0
      ? ((result.totalInterest / result.finalBalance) * 100).toFixed(1)
      : '0';

  return (
    <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
      <div className='group relative overflow-hidden rounded-2xl border border-slate-900 bg-slate-900 p-5 text-white shadow-xs dark:border-slate-800 dark:bg-slate-900'>
        <p className='text-[10px] font-bold uppercase tracking-wider text-slate-400'>
          Projected Portfolio
        </p>
        <div className='mt-1.5 tabular-nums text-2xl font-black text-white'>
          {formatAmount(result.finalBalance)}
        </div>
        <p className='mt-1 text-xs text-slate-400'>
          Initial seed + regular deposits + compound interest
        </p>
      </div>

      <div className='group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700'>
        <div className='flex items-start justify-between'>
          <div>
            <p className='text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400'>
              Total Deposits
            </p>
            <div className='mt-1.5 tabular-nums text-xl font-black text-slate-900 dark:text-slate-100'>
              {formatAmount(result.totalPrincipal)}
            </div>
            <p className='mt-1 text-xs text-slate-400 dark:text-slate-500'>Direct out-of-pocket savings</p>
          </div>
          <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200'>
            <Wallet size={18} />
          </div>
        </div>
      </div>

      <div className='group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700'>
        <div className='flex items-start justify-between'>
          <div>
            <p className='text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400'>
              Compound Interest
            </p>
            <div className='mt-1.5 tabular-nums text-xl font-black text-emerald-600 dark:text-emerald-400'>
              +{formatAmount(result.totalInterest)}
            </div>
            <p className='mt-1 text-xs text-slate-400 dark:text-slate-500'>{interestRatio}% of total wealth</p>
          </div>
          <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400'>
            <Coins size={18} />
          </div>
        </div>
      </div>

      <div className='group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700'>
        <div className='flex items-start justify-between'>
          <div>
            <p className='text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400'>
              Wealth Multiplier
            </p>
            <div className='mt-1.5 tabular-nums text-xl font-black text-indigo-600 dark:text-indigo-400'>
              {result.multiplier}x
            </div>
            <p className='mt-1 text-xs text-slate-400 dark:text-slate-500'>Capital return coefficient</p>
          </div>
          <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400'>
            <Award size={18} />
          </div>
        </div>
      </div>
    </div>
  );
}
