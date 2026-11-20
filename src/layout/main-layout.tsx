import { Outlet, Link } from 'react-router-dom';
import { ArrowLeft, Wallet } from 'lucide-react';

export default function MainLayout() {
  return (
    <div className='relative min-h-screen bg-slate-50 text-slate-800 antialiased dark:bg-slate-950 dark:text-slate-100'>
      <header className='sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/90'>
        <div className='mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6'>
          <Link to='/' className='flex items-center gap-2.5 group'>
            <div className='flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white shadow-xs dark:bg-white dark:text-slate-900 group-hover:scale-105 transition-transform'>
              <Wallet size={18} />
            </div>
            <span className='text-sm font-bold tracking-tight text-slate-900 dark:text-slate-100'>
              Finance<span className='text-indigo-600 dark:text-indigo-400'>Toolkit</span>
            </span>
          </Link>

          <Link
            to='/'
            className='flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 transition-colors dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800'
          >
            <ArrowLeft size={13} />
            <span>Dashboard</span>
          </Link>
        </div>
      </header>

      <div className='relative z-10 mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
        <Outlet />
      </div>
    </div>
  );
}
