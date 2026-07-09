import type { Friend, Expense } from '../types';
import { calculateExpenseSummary } from '../../../utils/helper';

interface Props {
  readonly friends: Friend[];
  readonly expenses: Expense[];
}

export default function Summary({ friends, expenses }: Props) {
  if (friends.length === 0 || expenses.length === 0) {
    return null;
  }

  const summary = calculateExpenseSummary(friends, expenses);
  const getName = (id: string) => friends.find((f) => f.id === id)?.name ?? '';

  return (
    <div className='space-y-6'>
      <div className='rounded-lg border p-4'>
        <h3 className='mb-4 text-lg font-semibold'>Summary</h3>

        <div className='flex justify-between'>
          <span>Total Spent</span>
          <span>${summary.totalSpent.toFixed(2)}</span>
        </div>

        <div className='flex justify-between'>
          <span>Per Person</span>
          <span>${summary.perPerson.toFixed(2)}</span>
        </div>
      </div>

      <div className='rounded-lg border p-4'>
        <h3 className='mb-4 text-lg font-semibold'>Paid Amount</h3>

        <div className='space-y-2'>
          {friends.map((friend) => (
            <div key={friend.id} className='flex justify-between'>
              <span>{friend.name}</span>

              <span>${summary.paidMap[friend.id].toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className='rounded-lg border p-4'>
        <h3 className='mb-4 text-lg font-semibold'>Settlement</h3>

        {summary.settlements.length === 0 ? (
          <p>Everyone is settled 🎉</p>
        ) : (
          <div className='space-y-2'>
            {summary.settlements.map((item) => (
              <div
                key={`${item.from}-${item.to}`}
                className='flex justify-between rounded bg-gray-100 p-3'
              >
                <span>
                  {getName(item.from)} ➜ {getName(item.to)}
                </span>

                <strong>${item.amount.toFixed(2)}</strong>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
