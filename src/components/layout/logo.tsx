import { Sparkles, Wallet } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Logo() {
  return (
    <Link
      to='/'
      className='group flex items-center gap-2.5 transition-opacity hover:opacity-90 active:scale-[0.98]'
    >
      <div className='relative flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white shadow-xs dark:bg-white dark:text-slate-900 transition-transform group-hover:scale-105'>
        <Wallet size={18} />
        <span className='absolute -top-0.5 -right-0.5 flex h-2 w-2'>
          <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75' />
          <span className='relative inline-flex h-2 w-2 rounded-full bg-emerald-500' />
        </span>
      </div>

      <div>
        <div className='flex items-center gap-1.5'>
          <span className='text-sm font-extrabold tracking-tight text-slate-900 dark:text-slate-100'>
            Finance<span className='text-indigo-600 dark:text-indigo-400'>Toolkit</span>
          </span>
          <Sparkles size={11} className='text-amber-500' />
        </div>
        <p className='text-[10px] font-semibold tracking-wider text-slate-400 dark:text-slate-500 uppercase'>
          Suite
        </p>
      </div>
    </Link>
  );
}
