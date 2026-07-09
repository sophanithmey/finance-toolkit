import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Button from '../../../components/ui/button';
import Input from '../../../components/ui/input';

import type { Friend } from '../types';
import { expenseSchema, type ExpenseForm } from '../schema';

interface Props {
  readonly friends: Friend[];
  readonly onAddExpense: (expense: ExpenseForm) => void;
}

export default function ExpenseForm({ friends, onAddExpense }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExpenseForm>({
    resolver: yupResolver(expenseSchema),
    defaultValues: {
      title: '',
      amount: 0,
      paidBy: '',
      date: new Date().toISOString().split('T')[0],
    },
  });

  const onSubmit = (data: ExpenseForm) => {
    onAddExpense(data);

    reset({
      title: '',
      amount: 0,
      paidBy: '',
      date: new Date().toISOString().split('T')[0],
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='grid gap-4 md:grid-cols-2'
    >
      <Input
        label='Description'
        {...register('title')}
        error={errors.title?.message}
      />

      <Input
        label='Amount'
        type='number'
        step='0.01'
        {...register('amount', {
          valueAsNumber: true,
        })}
        error={errors.amount?.message}
      />

      <div>
        <label className='block text-sm font-medium mb-1'>Paid By</label>

        <select
          {...register('paidBy')}
          className='w-full rounded-lg border px-3 py-2'
        >
          <option value=''>Select</option>

          {friends.map((friend) => (
            <option key={friend.id} value={friend.id}>
              {friend.name}
            </option>
          ))}
        </select>

        <p className='text-red-500 text-sm'>{errors.paidBy?.message}</p>
      </div>

      <Input
        label='Date'
        type='date'
        {...register('date')}
        error={errors.date?.message}
      />

      <Button type='submit'>Add</Button>
    </form>
  );
}
