import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/organisms/sidebar';
import Header from '../components/organisms/header';
import MobileNav from '../components/organisms/mobile-nav';
import CommandPalette from '../components/molecules/command-palette';
import { useFuelPrices } from '../hooks/use-fuel-prices';
import { useFuelSettings } from '../hooks/use-fuel-settings';

export default function AppLayout() {
  const [searchOpen, setSearchOpen] = useState(false);
  const { countries } = useFuelPrices();
  const { displayUnit, setDisplayUnit } = useFuelSettings();

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
    <div className='relative flex min-h-screen bg-slate-50 text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-100'>
      <Sidebar onOpenSearch={() => setSearchOpen(true)} />

      <div className='relative z-10 flex min-w-0 flex-1 flex-col'>
        <Header
          displayUnit={displayUnit}
          onUnitChange={setDisplayUnit}
          onOpenSearch={() => setSearchOpen(true)}
        />

        <main className='flex-1 overflow-y-auto p-4 pb-24 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto'>
          <Outlet context={{ displayUnit, setDisplayUnit }} />
        </main>

        <MobileNav />
      </div>

      <CommandPalette
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        countries={countries}
        onUnitChange={setDisplayUnit}
      />
    </div>
  );
}
