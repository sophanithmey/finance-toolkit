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
      <div className='group relative overflow-hidden rounded-3xl border border-indigo-200/80 bg-linear-to-br from-indigo-900 to-slate-900 p-6 text-white shadow-xl dark:border-indigo-800/80'>
        <div className='pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-indigo-500/20 blur-xl' />
        <p className='text-xs font-bold uppercase tracking-wider text-indigo-300'>
          Projected Final Balance
        </p>
        <h3 className='mt-2 tabular-nums text-3xl font-black text-white'>
          {formatAmount(result.finalBalance)}
        </h3>
        <p className='mt-1 text-xs text-indigo-200/80'>
          Initial capital + regular deposits + compound interest
        </p>
      </div>

      <div className='group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-xs backdrop-blur-md transition-all hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/90'>
        <div className='flex items-start justify-between'>
          <div>
            <p className='text-xs font-semibold uppercase tracking-wider text-slate-400'>
              Total Out-of-Pocket
            </p>
            <h3 className='mt-2 tabular-nums text-2xl font-black text-slate-900 dark:text-slate-100'>
              {formatAmount(result.totalPrincipal)}
            </h3>
            <p className='mt-1 text-xs text-slate-400'>Total money deposited by you</p>
          </div>
          <div className='flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400'>
            <Wallet size={20} />
          </div>
        </div>
      </div>

      <div className='group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-xs backdrop-blur-md transition-all hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/90'>
        <div className='flex items-start justify-between'>
          <div>
            <p className='text-xs font-semibold uppercase tracking-wider text-slate-400'>
              Compound Interest Earned
            </p>
            <h3 className='mt-2 tabular-nums text-2xl font-black text-emerald-600 dark:text-emerald-400'>
              +{formatAmount(result.totalInterest)}
            </h3>
            <p className='mt-1 text-xs text-slate-400'>{interestRatio}% of total wealth</p>
          </div>
          <div className='flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400'>
            <Coins size={20} />
          </div>
        </div>
      </div>

      <div className='group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-xs backdrop-blur-md transition-all hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/90'>
        <div className='flex items-start justify-between'>
          <div>
            <p className='text-xs font-semibold uppercase tracking-wider text-slate-400'>
              Wealth Multiplier
            </p>
            <h3 className='mt-2 tabular-nums text-2xl font-black text-indigo-600 dark:text-indigo-400'>
              {result.multiplier}x
            </h3>
            <p className='mt-1 text-xs text-slate-400'>Return on invested capital</p>
          </div>
          <div className='flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400'>
            <Award size={20} />
          </div>
        </div>
      </div>
    </div>
  );
}
