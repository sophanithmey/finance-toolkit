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
      <div className='flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4 mb-6 dark:border-slate-800'>
        <div>
          <h2 className='text-lg font-bold text-slate-900 dark:text-slate-100'>
            Annual Growth Progression & Milestones
          </h2>
          <p className='text-xs text-slate-400'>
            Watch how compounding interest overtakes regular contributions over time
          </p>
        </div>
      </div>

      {/* Visual Composition Ratio */}
      <div className='mb-6 space-y-2 rounded-2xl border border-slate-100 bg-slate-50/60 p-4 dark:border-slate-800 dark:bg-slate-900/60'>
        <div className='flex justify-between text-xs font-bold'>
          <span className='text-blue-600 dark:text-blue-400'>
            Contributions: {principalPct.toFixed(1)}%
          </span>
          <span className='text-emerald-600 dark:text-emerald-400'>
            Compound Gains: {interestPct.toFixed(1)}%
          </span>
        </div>
        <div className='h-3 w-full overflow-hidden rounded-full bg-slate-200 flex dark:bg-slate-800'>
          <div
            style={{ width: `${principalPct}%` }}
            className='bg-linear-to-r from-blue-500 to-indigo-600 transition-all duration-500'
          />
          <div
            style={{ width: `${interestPct}%` }}
            className='bg-linear-to-r from-emerald-400 to-teal-500 transition-all duration-500'
          />
        </div>
      </div>

      {/* Milestone Table */}
      <div className='overflow-x-auto rounded-2xl border border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900'>
        <table className='w-full text-left text-sm'>
          <thead className='border-b border-slate-100 bg-slate-50/75 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:border-slate-800 dark:bg-slate-800/50'>
            <tr>
              <th className='py-3.5 px-4 text-center'>Year</th>
              <th className='py-3.5 px-4 text-right'>Your Deposits</th>
              <th className='py-3.5 px-4 text-right'>Interest Earned</th>
              <th className='py-3.5 px-4 text-right'>Ending Portfolio</th>
            </tr>
          </thead>

          <tbody className='divide-y divide-slate-100 text-xs font-semibold text-slate-700 dark:divide-slate-800 dark:text-slate-300'>
            {result.milestones.map((m) => (
              <tr
                key={m.year}
                className='hover:bg-indigo-50/40 transition-colors dark:hover:bg-slate-800/40'
              >
                <td className='py-3 px-4 text-center font-bold text-slate-400 dark:text-slate-500'>
                  Yr {m.year}
                </td>
                <td className='py-3 px-4 text-right tabular-nums text-slate-600 dark:text-slate-400'>
                  {formatAmount(m.contributions)}
                </td>
                <td className='py-3 px-4 text-right tabular-nums text-emerald-600 dark:text-emerald-400'>
                  +{formatAmount(m.interestEarned)}
                </td>
                <td className='py-3 px-4 text-right tabular-nums font-black text-slate-900 dark:text-slate-100'>
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
