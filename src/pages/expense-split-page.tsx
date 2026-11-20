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
    if (window.confirm('Reset all members and expense records?')) {
      setFriends([]);
      setExpenses([]);
    }
  };

  return (
    <div className='space-y-6'>
      {/* Group Members Section */}
      <Card>
        <div className='flex items-center justify-between mb-4'>
          <div className='flex items-center gap-3'>
            <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200'>
              <Users size={18} />
            </div>
            <div>
              <h2 className='text-base font-bold text-slate-900 dark:text-slate-100'>
                Group Members
              </h2>
              <p className='text-xs text-slate-400 dark:text-slate-500'>Add friends sharing group expenses</p>
            </div>
          </div>

          {(friends.length > 0 || expenses.length > 0) && (
            <Button
              type='button'
              variant='outline'
              size='sm'
              onClick={handleReset}
              className='text-rose-600 hover:text-rose-700 hover:bg-rose-50 border-rose-200 dark:border-rose-900/50 dark:hover:bg-rose-950/40'
            >
              <RotateCcw size={13} />
              Reset
            </Button>
          )}
        </div>

        <FriendForm
          friends={friends.map((f) => f.name)}
          onAddFriend={addFriend}
        />

        <div className='mt-4'>
          <FriendList friends={friends} onRemove={removeFriend} />
        </div>
      </Card>

      {/* Expense Logging Section */}
      <Card>
        <div className='flex items-center gap-3 mb-4'>
          <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200'>
            <ReceiptText size={18} />
          </div>
          <div>
            <h2 className='text-base font-bold text-slate-900 dark:text-slate-100'>
              Log Group Expense
            </h2>
            <p className='text-xs text-slate-400 dark:text-slate-500'>Record itemized bills paid by group members</p>
          </div>
        </div>

        <ExpenseForm friends={friends} onAddExpense={addExpense} />

        <div className='mt-5 border-t border-slate-100 pt-5 dark:border-slate-800'>
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
