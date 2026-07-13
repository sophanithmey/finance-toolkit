import Card from '../components/ui/card';

import FriendForm from '../features/expense-split/components/friend-form';
import FriendList from '../features/expense-split/components/friend-list';
import Summary from '../features/expense-split/components/summary';

import type { Friend, Expense } from '../features/expense-split/types';
import ExpenseForm from '../features/expense-split/components/expense-form';
import ExpenseTable from '../features/expense-split/components/expense-table';
import type { ExpenseForm as ExpenseFormType } from '../features/expense-split/schema';
import { useLocalStorage } from '../hooks/use-local-storage';
import Button from '../components/ui/button';

export default function ExpenseSplitPage() {
  const [friends, setFriends] = useLocalStorage<Friend[]>(
    'expense-friends',
    [],
  );

  const [expenses, setExpenses] = useLocalStorage<Expense[]>(
    'expense-expenses',
    [],
  );

  const addFriend = (name: string) => {
    setFriends((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name,
      },
    ]);
  };

  const removeFriend = (id: string) => {
    setFriends((prev) => prev.filter((friend) => friend.id !== id));
  };

  const addExpense = (expense: ExpenseFormType) => {
    setExpenses((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        ...expense,
      },
    ]);
  };

  const deleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  };

  const handleReset = () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete all friends and expenses?',
    );

    if (!confirmed) return;

    setFriends([]);
    setExpenses([]);
  };

  return (
    <div className='space-y-6'>
      <Card>
        <div className='mb-6 flex items-center justify-between'>
          <h2 className='text-2xl font-bold'>Expense Split Calculator</h2>

          <Button
            type='button'
            onClick={handleReset}
            className='bg-red-500 hover:bg-red-600'
          >
            Reset All
          </Button>
        </div>
        <h2 className='mb-4 text-2xl font-bold'>Friends</h2>

        <FriendForm
          friends={friends.map((f) => f.name)}
          onAddFriend={addFriend}
        />
      </Card>

      <Card>
        <FriendList friends={friends} onRemove={removeFriend} />
      </Card>

      <Card>
        <h2 className='mb-4 text-2xl font-bold'>Expenses</h2>
        <ExpenseForm friends={friends} onAddExpense={addExpense} />
        <div className='mt-6'>
          <ExpenseTable
            expenses={expenses}
            friends={friends}
            onDelete={deleteExpense}
          />
        </div>
      </Card>

      {expenses.length > 0 ? (
        <Card>
          <Summary friends={friends} expenses={expenses} />
        </Card>
      ) : null}
    </div>
  );
}
