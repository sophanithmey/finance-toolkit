import { FileQuestion, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className='flex min-h-[60vh] flex-col items-center justify-center text-center p-6'>
      <div className='flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 shadow-xs mb-4 dark:bg-slate-800 dark:text-slate-300'>
        <FileQuestion size={26} />
      </div>

      <h1 className='text-4xl font-black text-slate-900 tracking-tight dark:text-slate-100'>404</h1>

      <h2 className='mt-1 text-base font-bold text-slate-800 dark:text-slate-200'>Page Not Found</h2>

      <p className='mt-1 text-xs text-slate-500 max-w-sm dark:text-slate-400'>
        The requested financial tool or route could not be found.
      </p>

      <Link
        to='/'
        className='mt-5 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-slate-800 transition-colors dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100'
      >
        <Home size={14} />
        <span>Return to Dashboard</span>
      </Link>
    </div>
  );
}
