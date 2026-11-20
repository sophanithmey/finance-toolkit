import { ArrowRight, CheckCircle2, DollarSign, Users } from 'lucide-react';
import type { Friend, Expense } from '../types';
import { calculateExpenseSummary, formatCurrency } from '../../../utils/helper';
import StatCard from '../../../components/ui/stat-card';
import ShareActions from './share-actions';

interface Props {
  readonly friends: Friend[];
  readonly expenses: Expense[];
}

export default function Summary({ friends, expenses }: Props) {
  if (friends.length === 0 || expenses.length === 0) {
    return null;
  }

  const summary = calculateExpenseSummary(friends, expenses);
  const getName = (id: string) => friends.find((f) => f.id === id)?.name ?? 'Unknown';

  return (
    <div className='space-y-6'>
      {/* Header with Share & Export actions */}
      <div className='flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3 dark:border-slate-800'>
        <div>
          <h3 className='text-sm font-bold text-slate-900 dark:text-slate-100'>
            Settlement Summary
          </h3>
          <p className='text-xs text-slate-400 dark:text-slate-500'>
            Fair share breakdown and optimal peer-to-peer transfers
          </p>
        </div>

        <ShareActions friends={friends} summary={summary} />
      </div>

      {/* Top Pool Metrics */}
      <div className='grid gap-4 sm:grid-cols-2'>
        <StatCard
          title='Total Pool Spent'
          value={formatCurrency(summary.totalSpent)}
          icon={<DollarSign size={20} />}
          subtitle={`${expenses.length} expenses logged`}
        />

        <StatCard
          title='Fair Share Per Person'
          value={formatCurrency(summary.perPerson)}
          icon={<Users size={20} />}
          subtitle={`Split equally across ${friends.length} members`}
        />
      </div>

      {/* Individual Paid Amounts */}
      <div className='rounded-2xl border border-slate-200/80 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-900/50'>
        <h4 className='text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3'>
          Member Contribution Ledger
        </h4>

        <div className='grid gap-2 sm:grid-cols-2 lg:grid-cols-3'>
          {friends.map((friend) => {
            const paid = summary.paidMap[friend.id] || 0;
            const diff = paid - summary.perPerson;
            const isOwed = diff > 0.01;
            const owes = diff < -0.01;

            return (
              <div
                key={friend.id}
                className='flex items-center justify-between rounded-xl border border-slate-200 bg-white p-2.5 shadow-2xs dark:border-slate-800 dark:bg-slate-900'
              >
                <div>
                  <p className='text-xs font-bold text-slate-900 dark:text-slate-100'>{friend.name}</p>
                  <p className='text-[10px] text-slate-400 dark:text-slate-500'>Paid {formatCurrency(paid)}</p>
                </div>

                <span
                  className={`rounded-md px-2 py-0.5 text-xs font-bold ${
                    isOwed
                      ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                      : owes
                        ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300'
                        : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                  }`}
                >
                  {isOwed ? `+${formatCurrency(diff)}` : owes ? `-${formatCurrency(Math.abs(diff))}` : 'Settled'}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Settlement Transactions */}
      <div className='rounded-2xl border border-slate-200/80 bg-white p-4 dark:border-slate-800 dark:bg-slate-900'>
        <div className='flex items-center justify-between mb-3'>
          <h4 className='text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500'>
            Optimal Debt Settlements
          </h4>
          {summary.settlements.length === 0 && (
            <span className='inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'>
              <CheckCircle2 size={12} /> Even Split
            </span>
          )}
        </div>

        {summary.settlements.length === 0 ? (
          <div className='flex items-center justify-center gap-2 py-4 text-xs font-semibold text-emerald-600 dark:text-emerald-400'>
            <CheckCircle2 size={16} />
            <span>Zero pending transfers. All expenses are balanced!</span>
          </div>
        ) : (
          <div className='space-y-2'>
            {summary.settlements.map((item) => (
              <div
                key={`${item.from}-${item.to}`}
                className='flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50/60 px-3.5 py-2.5 text-xs dark:border-slate-800 dark:bg-slate-800/40'
              >
                <div className='flex items-center gap-2 font-bold text-slate-800 dark:text-slate-200'>
                  <span className='text-slate-900 dark:text-slate-100'>{getName(item.from)}</span>
                  <ArrowRight size={13} className='text-slate-400' />
                  <span className='text-emerald-600 dark:text-emerald-400'>{getName(item.to)}</span>
                </div>

                <span className='tabular-nums text-sm font-black text-slate-900 dark:text-slate-100'>
                  {formatCurrency(item.amount)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
