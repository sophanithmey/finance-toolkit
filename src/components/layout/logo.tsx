import { Sparkles, Wallet } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Logo() {
  return (
    <Link
      to='/'
      className='group flex items-center gap-3 transition-transform duration-200 active:scale-95'
    >
      <div className='relative flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-tr from-blue-600 via-indigo-600 to-emerald-400 p-2 text-white shadow-lg shadow-indigo-500/25 transition-all duration-300 group-hover:shadow-indigo-500/40 group-hover:scale-105'>
        <Wallet size={22} className='transition-transform group-hover:rotate-6' />
        <span className='absolute -top-1 -right-1 flex h-3 w-3'>
          <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75' />
          <span className='relative inline-flex h-3 w-3 rounded-full bg-emerald-500' />
        </span>
      </div>

      <div>
        <div className='flex items-center gap-1.5'>
          <h1 className='text-base font-extrabold tracking-tight text-slate-900'>
            Finance<span className='bg-linear-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent'>Toolkit</span>
          </h1>
          <Sparkles size={12} className='text-indigo-500' />
        </div>
        <p className='text-[11px] font-medium tracking-wider text-slate-400 uppercase'>
          Smart Financial Suite
        </p>
      </div>
    </Link>
  );
}
