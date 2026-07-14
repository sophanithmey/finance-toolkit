import { Outlet } from 'react-router-dom';

import MobileBottomNav from '../components/layout/mobile-bottom-nav';
import Navbar from '../components/layout/navbar';
import Sidebar from '../components/layout/sidebar';

export default function AppLayout() {
  return (
    <div className='flex min-h-screen bg-slate-100'>
      <Sidebar />

      <div className='flex flex-1 flex-col'>
        <Navbar />

        <main className='flex-1 overflow-y-auto p-4 pb-24 lg:p-8'>
          <Outlet />
        </main>

        <MobileBottomNav />
      </div>
    </div>
  );
}
