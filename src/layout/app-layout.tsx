import { Outlet } from 'react-router-dom';

import MobileBottomNav from '../components/layout/mobile-bottom-nav';
import Navbar from '../components/layout/navbar';
import Sidebar from '../components/layout/sidebar';

export default function AppLayout() {
  return (
    <div className='relative flex min-h-screen bg-slate-50 text-slate-800 antialiased transition-colors dark:bg-slate-950 dark:text-slate-100'>
      {/* Background Decorative Ambient Glows */}
      <div className='pointer-events-none fixed inset-0 z-0 overflow-hidden'>
        <div className='absolute -left-20 -top-20 h-96 w-96 rounded-full bg-blue-400/10 blur-3xl dark:bg-blue-600/10' />
        <div className='absolute right-0 top-1/4 h-[30rem] w-[30rem] rounded-full bg-indigo-400/8 blur-3xl dark:bg-indigo-600/10' />
        <div className='absolute bottom-0 right-1/3 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl dark:bg-emerald-600/10' />
      </div>

      <Sidebar />

      <div className='relative z-10 flex min-w-0 flex-1 flex-col'>
        <Navbar />

        <main className='flex-1 overflow-y-auto p-4 pb-28 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto'>
          <Outlet />
        </main>

        <MobileBottomNav />
      </div>
    </div>
  );
}
