import { Wallet } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Logo() {
  return (
    <Link
      to='/'
      className='flex items-center gap-3 transition-opacity hover:opacity-80'
    >
      <div className='rounded-2xl bg-linear-to-r from-blue-400 to-green-400 p-3 text-white shadow-lg'>
        <Wallet size={24} />
      </div>

      <div>
        <h1 className='text-lg font-bold text-slate-900'>Finance Toolkit</h1>

        <p className='text-xs text-slate-500'>Smart Money Manager</p>
      </div>
    </Link>
  );
}
