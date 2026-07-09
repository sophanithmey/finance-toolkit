import type { Expense, Friend } from '../types';

interface Props {
  readonly expenses: Expense[];
  readonly friends: Friend[];
  readonly onDelete: (id: string) => void;
}

export default function ExpenseTable({ expenses, friends, onDelete }: Props) {
  const getFriendName = (id: string) =>
    friends.find((f) => f.id === id)?.name ?? '—';

  if (!expenses.length) {
    return <p className='text-gray-500'>No expenses yet.</p>;
  }

  return (
    <table className='w-full border-collapse'>
      <thead>
        <tr className='border-b'>
          <th className='py-2 text-left'>Description</th>
          <th>Amount</th>
          <th>Paid By</th>
          <th>Date</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        {expenses.map((expense) => (
          <tr key={expense.id} className='border-b'>
            <td className='py-2'>{expense.title}</td>

            <td>${expense.amount.toFixed(2)}</td>

            <td>{getFriendName(expense.paidBy)}</td>

            <td>{expense.date}</td>

            <td>
              <button
                onClick={() => onDelete(expense.id)}
                className='text-red-500'
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
