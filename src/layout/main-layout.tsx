import { Outlet, Link } from 'react-router-dom';
import { ArrowLeft, Wallet } from 'lucide-react';

export default function MainLayout() {
  return (
    <div className='relative min-h-screen bg-slate-50 text-slate-800 antialiased'>
      {/* Background Decorative Ambient Glows */}
      <div className='pointer-events-none fixed inset-0 z-0 overflow-hidden'>
        <div className='absolute -left-20 -top-20 h-96 w-96 rounded-full bg-blue-400/10 blur-3xl' />
        <div className='absolute right-0 top-1/4 h-[30rem] w-[30rem] rounded-full bg-indigo-400/8 blur-3xl' />
        <div className='absolute bottom-0 right-1/3 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl' />
      </div>

      <header className='sticky top-0 z-40 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl'>
        <div className='mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6'>
          <Link to='/' className='flex items-center gap-3 group'>
            <div className='flex h-10 w-10 items-center justify-center rounded-2xl bg-linear-to-tr from-blue-600 to-indigo-600 text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform'>
              <Wallet size={20} />
            </div>
            <span className='text-lg font-bold tracking-tight text-slate-900'>
              Finance<span className='text-indigo-600'>Toolkit</span>
            </span>
          </Link>

          <Link
            to='/'
            className='flex items-center gap-2 rounded-xl border border-slate-200/90 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-xs hover:border-indigo-300 hover:text-indigo-600 transition-all'
          >
            <ArrowLeft size={14} />
            <span>Dashboard</span>
          </Link>
        </div>
      </header>

      <div className='relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
        <Outlet />
      </div>
    </div>
  );
}
