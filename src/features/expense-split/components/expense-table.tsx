import { Trash2 } from 'lucide-react';
import type { Expense, Friend } from '../types';
import { formatCurrency } from '../../../utils/helper';

interface Props {
  readonly expenses: Expense[];
  readonly friends: Friend[];
  readonly onDelete: (id: string) => void;
}

export default function ExpenseTable({ expenses, friends, onDelete }: Props) {
  const getFriendName = (id: string) =>
    friends.find((f) => f.id === id)?.name ?? 'Unknown';

  if (!expenses.length) {
    return (
      <div className='py-6 text-center text-xs font-medium text-slate-400 dark:text-slate-500'>
        No expenses recorded yet. Use the form above to add your first bill.
      </div>
    );
  }

  return (
    <div className='overflow-x-auto rounded-xl border border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900'>
      <table className='w-full text-left text-sm'>
        <thead className='border-b border-slate-100 bg-slate-50/75 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-500'>
          <tr>
            <th className='py-3 px-3.5'>Description</th>
            <th className='py-3 px-3.5'>Amount</th>
            <th className='py-3 px-3.5'>Paid By</th>
            <th className='py-3 px-3.5'>Date</th>
            <th className='py-3 px-3.5 text-right'>Action</th>
          </tr>
        </thead>

        <tbody className='divide-y divide-slate-100 text-xs font-semibold text-slate-700 dark:divide-slate-800 dark:text-slate-300'>
          {expenses.map((expense) => (
            <tr
              key={expense.id}
              className='hover:bg-slate-50/70 transition-colors dark:hover:bg-slate-800/40'
            >
              <td className='py-2.5 px-3.5 font-bold text-slate-900 dark:text-slate-100'>
                {expense.title}
              </td>

              <td className='py-2.5 px-3.5 tabular-nums font-bold text-slate-900 dark:text-slate-100'>
                {formatCurrency(expense.amount)}
              </td>

              <td className='py-2.5 px-3.5'>
                <span className='inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300'>
                  {getFriendName(expense.paidBy)}
                </span>
              </td>

              <td className='py-2.5 px-3.5 text-xs text-slate-400 dark:text-slate-500'>
                {expense.date}
              </td>

              <td className='py-2.5 px-3.5 text-right'>
                <button
                  type='button'
                  onClick={() => onDelete(expense.id)}
                  className='inline-flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-colors dark:hover:bg-rose-950/40 dark:hover:text-rose-400'
                  aria-label={`Delete ${expense.title}`}
                >
                  <Trash2 size={13} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
