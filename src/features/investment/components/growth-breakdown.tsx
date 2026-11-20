import Card from '../../../components/ui/card';
import { useCurrency } from '../../../hooks/use-currency';
import type { InvestmentResult } from '../types';

interface Props {
  readonly result: InvestmentResult;
}

export default function GrowthBreakdown({ result }: Props) {
  const { formatAmount } = useCurrency();
  const total = result.finalBalance || 1;
  const principalPct = Math.min(Math.max((result.totalPrincipal / total) * 100, 0), 100);
  const interestPct = Math.max(100 - principalPct, 0);

  return (
    <Card>
      <div className='flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3 mb-4 dark:border-slate-800'>
        <div>
          <h2 className='text-sm font-bold text-slate-900 dark:text-slate-100'>
            Growth Progression & Milestones
          </h2>
          <p className='text-xs text-slate-400 dark:text-slate-500'>
            Compounding interest compounding velocity over the holding period
          </p>
        </div>
      </div>

      {/* Visual Composition Ratio */}
      <div className='mb-5 space-y-2 rounded-xl border border-slate-200 bg-slate-50/60 p-3.5 dark:border-slate-800 dark:bg-slate-900/60'>
        <div className='flex justify-between text-xs font-semibold'>
          <span className='text-slate-700 dark:text-slate-300'>
            Contributions: {principalPct.toFixed(1)}%
          </span>
          <span className='text-emerald-600 dark:text-emerald-400'>
            Compound Gains: {interestPct.toFixed(1)}%
          </span>
        </div>
        <div className='h-2.5 w-full overflow-hidden rounded-full bg-slate-200 flex dark:bg-slate-800'>
          <div
            style={{ width: `${principalPct}%` }}
            className='bg-slate-900 dark:bg-white transition-all duration-300'
          />
          <div
            style={{ width: `${interestPct}%` }}
            className='bg-emerald-500 transition-all duration-300'
          />
        </div>
      </div>

      {/* Milestone Table */}
      <div className='overflow-x-auto rounded-xl border border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900'>
        <table className='w-full text-left text-sm'>
          <thead className='border-b border-slate-100 bg-slate-50/75 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-500'>
            <tr>
              <th className='py-3 px-3.5 text-center'>Year</th>
              <th className='py-3 px-3.5 text-right'>Cumulative Deposits</th>
              <th className='py-3 px-3.5 text-right'>Interest Earned</th>
              <th className='py-3 px-3.5 text-right'>Ending Balance</th>
            </tr>
          </thead>

          <tbody className='divide-y divide-slate-100 text-xs font-semibold text-slate-700 dark:divide-slate-800 dark:text-slate-300'>
            {result.milestones.map((m) => (
              <tr
                key={m.year}
                className='hover:bg-slate-50/70 transition-colors dark:hover:bg-slate-800/40'
              >
                <td className='py-2.5 px-3.5 text-center font-bold text-slate-400 dark:text-slate-500'>
                  Yr {m.year}
                </td>
                <td className='py-2.5 px-3.5 text-right tabular-nums text-slate-600 dark:text-slate-400'>
                  {formatAmount(m.contributions)}
                </td>
                <td className='py-2.5 px-3.5 text-right tabular-nums text-emerald-600 dark:text-emerald-400'>
                  +{formatAmount(m.interestEarned)}
                </td>
                <td className='py-2.5 px-3.5 text-right tabular-nums font-bold text-slate-900 dark:text-slate-100'>
                  {formatAmount(m.balance)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
