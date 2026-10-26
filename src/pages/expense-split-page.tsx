import { ReceiptText, RotateCcw, Users } from 'lucide-react';

import Card from '../components/ui/card';
import Button from '../components/ui/button';

import FriendForm from '../features/expense-split/components/friend-form';
import FriendList from '../features/expense-split/components/friend-list';
import ExpenseForm from '../features/expense-split/components/expense-form';
import ExpenseTable from '../features/expense-split/components/expense-table';
import Summary from '../features/expense-split/components/summary';

import type { Friend, Expense } from '../features/expense-split/types';
import type { ExpenseForm as ExpenseFormType } from '../features/expense-split/schema';
import { useLocalStorage } from '../hooks/use-local-storage';

export default function ExpenseSplitPage() {
  const [friends, setFriends] = useLocalStorage<Friend[]>('expense-friends', []);
  const [expenses, setExpenses] = useLocalStorage<Expense[]>('expense-expenses', []);

  const addFriend = (name: string) => {
    setFriends((prev) => [...prev, { id: crypto.randomUUID(), name }]);
  };

  const removeFriend = (id: string) => {
    setFriends((prev) => prev.filter((friend) => friend.id !== id));
  };

  const addExpense = (expense: ExpenseFormType) => {
    setExpenses((prev) => [...prev, { id: crypto.randomUUID(), ...expense }]);
  };

  const deleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all friends and expenses?')) {
      setFriends([]);
      setExpenses([]);
    }
  };

  return (
    <div className='space-y-6'>
      {/* Group Members Section */}
      <Card>
        <div className='flex items-center justify-between mb-6'>
          <div className='flex items-center gap-3'>
            <div className='flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600'>
              <Users size={22} />
            </div>
            <div>
              <h2 className='text-xl font-extrabold text-slate-900'>Group Members</h2>
              <p className='text-xs text-slate-400'>Add the people sharing expenses</p>
            </div>
          </div>

          {(friends.length > 0 || expenses.length > 0) && (
            <Button
              type='button'
              variant='outline'
              size='sm'
              onClick={handleReset}
              className='text-rose-600 hover:text-rose-700 hover:bg-rose-50 border-rose-200'
            >
              <RotateCcw size={14} />
              Reset All
            </Button>
          )}
        </div>

        <FriendForm
          friends={friends.map((f) => f.name)}
          onAddFriend={addFriend}
        />

        <div className='mt-5'>
          <FriendList friends={friends} onRemove={removeFriend} />
        </div>
      </Card>

      {/* Expense Logging Section */}
      <Card>
        <div className='flex items-center gap-3 mb-6'>
          <div className='flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600'>
            <ReceiptText size={22} />
          </div>
          <div>
            <h2 className='text-xl font-extrabold text-slate-900'>Log Expenses</h2>
            <p className='text-xs text-slate-400'>Record bills paid by individuals</p>
          </div>
        </div>

        <ExpenseForm friends={friends} onAddExpense={addExpense} />

        <div className='mt-6 border-t border-slate-100 pt-6'>
          <ExpenseTable
            expenses={expenses}
            friends={friends}
            onDelete={deleteExpense}
          />
        </div>
      </Card>

      {/* Summary and Settlement Section */}
      {expenses.length > 0 && (
        <Card>
          <Summary friends={friends} expenses={expenses} />
        </Card>
      )}
    </div>
  );
}
