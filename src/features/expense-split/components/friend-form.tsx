import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { UserPlus } from 'lucide-react';

import Input from '../../../components/ui/input';
import Button from '../../../components/ui/button';

import { friendSchema, type FriendForm as FriendFormValues } from '../schema';

interface FriendFormProps {
  readonly friends: string[];
  readonly onAddFriend: (name: string) => void;
}

export default function FriendForm({ friends, onAddFriend }: FriendFormProps) {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<FriendFormValues>({
    resolver: yupResolver(friendSchema),
    defaultValues: { name: '' },
  });

  const onSubmit = (data: FriendFormValues) => {
    const exists = friends.some(
      (friend) => friend.toLowerCase() === data.name.trim().toLowerCase(),
    );

    if (exists) {
      setError('name', {
        type: 'manual',
        message: 'This person is already in your group',
      });
      return;
    }

    onAddFriend(data.name.trim());
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex items-start gap-3'>
      <div className='flex-1'>
        <Input
          placeholder='e.g. Alex, Maya, John...'
          {...register('name')}
          error={errors.name?.message}
        />
      </div>

      <Button type='submit' className='h-[46px] shrink-0'>
        <UserPlus size={16} />
        <span>Add</span>
      </Button>
    </form>
  );
}