import type { Friend } from '../types';

interface FriendListProps {
  readonly friends: Friend[];
  readonly onRemove: (id: string) => void;
}

export default function FriendList({ friends, onRemove }: FriendListProps) {
  if (friends.length === 0) {
    return <p className='text-gray-500'>No friends added yet.</p>;
  }

  return (
    <div className='space-y-2'>
      {friends.map((friend) => (
        <div
          key={friend.id}
          className='flex items-center justify-between rounded-lg border p-3'
        >
          <span>{friend.name}</span>

          <button
            onClick={() => onRemove(friend.id)}
            className='text-red-500 hover:text-red-700'
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}
