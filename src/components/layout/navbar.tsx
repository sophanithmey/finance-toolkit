// import { Bell, Moon, Search } from 'lucide-react';
import Logo from './logo';

export default function Navbar() {
  return (
    <header className='sticky top-0 z-40 flex h-16 items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur lg:h-20 lg:px-8'>
      {/* Mobile Logo */}
      <div className='lg:hidden'>
        <Logo />
      </div>

      {/* Desktop Search */}
      {/* <div className='relative hidden w-96 lg:block'>
        <Search size={18} className='absolute left-4 top-3.5 text-slate-400' />

        <input
          placeholder='Search tools...'
          className='w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 outline-none'
        />
      </div> */}

      {/* <div className='flex justify-end items-center gap-3'>
        <button className='rounded-xl bg-slate-100 p-2.5 hover:bg-indigo-600 hover:text-white'>
          <Bell size={18} />
        </button>

        <button className='rounded-xl bg-slate-100 p-2.5 hover:bg-indigo-600 hover:text-white'>
          <Moon size={18} />
        </button>

        <div className='hidden lg:block'>
          <img
            src='https://ui-avatars.com/api/?name=Finance'
            className='h-10 w-10 rounded-full'
            alt='Avatar'
          />
        </div>
      </div> */}
    </header>
  );
}
