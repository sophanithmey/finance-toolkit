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
      <div className='py-6 text-center text-xs font-medium text-slate-400'>
        No expenses recorded yet. Use the form above to add your first bill.
      </div>
    );
  }

  return (
    <div className='overflow-x-auto rounded-2xl border border-slate-200/80 bg-white'>
      <table className='w-full text-left text-sm'>
        <thead className='border-b border-slate-100 bg-slate-50/75 text-[11px] font-bold uppercase tracking-wider text-slate-400'>
          <tr>
            <th className='py-3.5 px-4'>Description</th>
            <th className='py-3.5 px-4'>Amount</th>
            <th className='py-3.5 px-4'>Paid By</th>
            <th className='py-3.5 px-4'>Date</th>
            <th className='py-3.5 px-4 text-right'>Action</th>
          </tr>
        </thead>

        <tbody className='divide-y divide-slate-100 font-medium text-slate-700'>
          {expenses.map((expense) => (
            <tr
              key={expense.id}
              className='hover:bg-slate-50/60 transition-colors'
            >
              <td className='py-3 px-4 font-semibold text-slate-900'>{expense.title}</td>

              <td className='py-3 px-4 tabular-nums font-bold text-slate-900'>
                {formatCurrency(expense.amount)}
              </td>

              <td className='py-3 px-4'>
                <span className='inline-flex items-center rounded-xl bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700'>
                  {getFriendName(expense.paidBy)}
                </span>
              </td>

              <td className='py-3 px-4 text-xs text-slate-400'>{expense.date}</td>

              <td className='py-3 px-4 text-right'>
                <button
                  type='button'
                  onClick={() => onDelete(expense.id)}
                  className='inline-flex h-8 w-8 items-center justify-center rounded-xl text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-colors'
                  aria-label={`Delete ${expense.title}`}
                >
                  <Trash2 size={15} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
