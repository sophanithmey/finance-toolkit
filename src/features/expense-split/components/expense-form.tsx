import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { PlusCircle } from 'lucide-react';

import Button from '../../../components/ui/button';
import Input from '../../../components/ui/input';

import type { Friend } from '../types';
import { expenseSchema, type ExpenseForm as ExpenseFormValues } from '../schema';

interface Props {
  readonly friends: Friend[];
  readonly onAddExpense: (expense: ExpenseFormValues) => void;
}

export default function ExpenseForm({ friends, onAddExpense }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExpenseFormValues>({
    resolver: yupResolver(expenseSchema),
    defaultValues: {
      title: '',
      amount: 0,
      paidBy: '',
      date: new Date().toISOString().split('T')[0],
    },
  });

  const onSubmit = (data: ExpenseFormValues) => {
    onAddExpense(data);
    reset({
      title: '',
      amount: 0,
      paidBy: '',
      date: new Date().toISOString().split('T')[0],
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      <div className='grid gap-4 sm:grid-cols-2'>
        <Input
          label='Expense Title'
          placeholder='e.g. Dinner, Airbnb, Taxi...'
          {...register('title')}
          error={errors.title?.message}
        />

        <Input
          label='Amount ($)'
          type='number'
          step='0.01'
          placeholder='0.00'
          {...register('amount', { valueAsNumber: true })}
          error={errors.amount?.message}
        />

        <div className='space-y-1.5'>
          <label className='block text-xs font-semibold uppercase tracking-wider text-slate-500'>
            Who Paid?
          </label>
          <select
            {...register('paidBy')}
            className={`w-full rounded-2xl border px-4 py-3 text-sm font-semibold text-slate-800 transition-all duration-200 hover:border-slate-300 focus:bg-white focus:outline-none focus:ring-4 cursor-pointer shadow-2xs ${
              errors.paidBy
                ? 'border-rose-400 bg-rose-50/50 focus:border-rose-500 focus:ring-rose-500/15'
                : 'border-slate-200/90 bg-slate-50/70 focus:border-indigo-500 focus:ring-indigo-500/15'
            }`}
          >
            <option value=''>Select payer...</option>
            {friends.map((friend) => (
              <option key={friend.id} value={friend.id}>
                {friend.name}
              </option>
            ))}
          </select>
          {errors.paidBy && (
            <p className='text-xs font-medium text-rose-500'>{errors.paidBy.message}</p>
          )}
        </div>

        <Input
          label='Payment Date'
          type='date'
          {...register('date')}
          error={errors.date?.message}
        />
      </div>

      <Button
        type='submit'
        className='w-full sm:w-auto'
        disabled={friends.length === 0}
      >
        <PlusCircle size={17} />
        <span>Log Expense</span>
      </Button>
    </form>
  );
}
