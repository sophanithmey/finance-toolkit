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
          label='Expense Description'
          placeholder='e.g. Group Dinner, Airbnb, Taxi...'
          {...register('title')}
          error={errors.title?.message}
        />

        <Input
          label='Total Amount ($)'
          type='number'
          step='0.01'
          placeholder='0.00'
          {...register('amount', { valueAsNumber: true })}
          error={errors.amount?.message}
        />

        <div className='space-y-1.5'>
          <label className='block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400'>
            Who Paid the Bill?
          </label>
          <select
            {...register('paidBy')}
            className={`w-full rounded-xl border px-3.5 py-2.5 text-sm font-semibold transition-all cursor-pointer dark:bg-slate-950 dark:text-slate-100 ${
              errors.paidBy
                ? 'border-rose-400 bg-rose-50/50 dark:border-rose-500'
                : 'border-slate-200 bg-white hover:border-slate-300 dark:border-slate-800'
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
          label='Receipt Date'
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
        <PlusCircle size={15} />
        <span>Log Expense</span>
      </Button>
    </form>
  );
}
