import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import MobileBottomNav from '../components/layout/mobile-bottom-nav';
import Navbar from '../components/layout/navbar';
import Sidebar from '../components/layout/sidebar';
import CommandPalette from '../components/ui/command-palette';

export default function AppLayout() {
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className='relative flex min-h-screen bg-slate-50 text-slate-800 antialiased transition-colors dark:bg-slate-950 dark:text-slate-100'>
      <Sidebar onOpenSearch={() => setSearchOpen(true)} />

      <div className='relative z-10 flex min-w-0 flex-1 flex-col'>
        <Navbar onOpenSearch={() => setSearchOpen(true)} />

        <main className='flex-1 overflow-y-auto p-4 pb-24 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto'>
          <Outlet />
        </main>

        <MobileBottomNav />
      </div>

      <CommandPalette isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
