import { User, X } from 'lucide-react';
import type { Friend } from '../types';

interface FriendListProps {
  readonly friends: Friend[];
  readonly onRemove: (id: string) => void;
}

const avatarColors = [
  'bg-blue-600 text-white',
  'bg-indigo-600 text-white',
  'bg-emerald-600 text-white',
  'bg-amber-600 text-white',
  'bg-rose-600 text-white',
  'bg-violet-600 text-white',
  'bg-cyan-600 text-white',
];

export default function FriendList({ friends, onRemove }: FriendListProps) {
  if (friends.length === 0) {
    return (
      <div className='py-4 text-center text-xs text-slate-400 dark:text-slate-500'>
        No members added yet. Add at least two people to begin splitting group expenses.
      </div>
    );
  }

  return (
    <div className='flex flex-wrap gap-2'>
      {friends.map((friend, idx) => {
        const colorClass = avatarColors[idx % avatarColors.length];
        const initial = friend.name.charAt(0).toUpperCase();

        return (
          <div
            key={friend.id}
            className='group inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white py-1 pl-1.5 pr-2.5 text-xs font-semibold text-slate-800 shadow-2xs dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200'
          >
            <div
              className={`flex h-5 w-5 items-center justify-center rounded-lg text-[10px] font-bold ${colorClass}`}
            >
              {initial || <User size={10} />}
            </div>

            <span>{friend.name}</span>

            <button
              type='button'
              onClick={() => onRemove(friend.id)}
              className='ml-0.5 flex h-4 w-4 items-center justify-center rounded-md text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-colors dark:hover:bg-rose-950/40 dark:hover:text-rose-400'
              aria-label={`Remove ${friend.name}`}
            >
              <X size={11} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
