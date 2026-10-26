import { FileQuestion, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className='flex min-h-[65vh] flex-col items-center justify-center text-center p-6'>
      <div className='flex h-20 w-20 items-center justify-center rounded-3xl bg-indigo-50 text-indigo-600 shadow-inner mb-6'>
        <FileQuestion size={40} />
      </div>

      <h1 className='text-6xl font-black text-slate-900 tracking-tight'>404</h1>

      <h2 className='mt-2 text-xl font-bold text-slate-800'>Page Not Found</h2>

      <p className='mt-1 text-sm text-slate-400 max-w-sm'>
        The financial tool or schedule you were looking for doesn't exist or has moved.
      </p>

      <Link
        to='/'
        className='mt-6 inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 hover:bg-indigo-700 transition-all active:scale-95'
      >
        <Home size={16} />
        Return to Dashboard
      </Link>
    </div>
  );
}
