import { User, X } from 'lucide-react';
import type { Friend } from '../types';

interface FriendListProps {
  readonly friends: Friend[];
  readonly onRemove: (id: string) => void;
}

const avatarColors = [
  'bg-blue-500 text-white',
  'bg-indigo-500 text-white',
  'bg-emerald-500 text-white',
  'bg-amber-500 text-white',
  'bg-rose-500 text-white',
  'bg-violet-500 text-white',
  'bg-cyan-500 text-white',
];

export default function FriendList({ friends, onRemove }: FriendListProps) {
  if (friends.length === 0) {
    return (
      <div className='py-6 text-center text-xs font-medium text-slate-400'>
        No friends added yet. Add at least two people to start splitting expenses.
      </div>
    );
  }

  return (
    <div className='flex flex-wrap gap-2.5'>
      {friends.map((friend, idx) => {
        const colorClass = avatarColors[idx % avatarColors.length];
        const initial = friend.name.charAt(0).toUpperCase();

        return (
          <div
            key={friend.id}
            className='group inline-flex items-center gap-2.5 rounded-2xl border border-slate-200/90 bg-white py-1.5 pl-2 pr-3 text-xs font-bold text-slate-800 shadow-2xs transition-all duration-200 hover:border-slate-300 hover:shadow-xs'
          >
            <div
              className={`flex h-6 w-6 items-center justify-center rounded-xl text-[11px] font-black ${colorClass}`}
            >
              {initial || <User size={12} />}
            </div>

            <span>{friend.name}</span>

            <button
              type='button'
              onClick={() => onRemove(friend.id)}
              className='ml-1 flex h-4 w-4 items-center justify-center rounded-full text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-colors'
              aria-label={`Remove ${friend.name}`}
            >
              <X size={12} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
