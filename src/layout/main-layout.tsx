import { Outlet, Link } from 'react-router-dom';
import { Wallet } from 'lucide-react';

export default function MainLayout() {
  return (
    <div className='min-h-screen bg-slate-100'>
      <header className=' bg-white shadow-sm '>
        <div className='mx-auto flex h-16 max-w-7xl items-center justify-between px-6'>
          <Link to='/' className='flex items-center gap-2'>
            <Wallet className='text-blue-600' />
            <span className='text-xl font-bold'>Finance Toolkit</span>
          </Link>
        </div>
      </header>

      <div className='pointer-events-none fixed inset-0 overflow-hidden'>
        <div className='absolute -top-20 -left-20 h-72 w-72 rounded-full bg-blue-300/20 blur-3xl' />

        <div className='absolute bottom-0 right-0 h-96 w-96 rounded-full bg-emerald-300/20 blur-3xl' />
      </div>

      <div className='bg-linear-to-br from-slate-100 via-blue-50 to-indigo-100'>
        <div className='mx-auto min-h-screen max-w-7xl px-2 py-12 sm:px-0 md:px-4'>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
