import { AlertTriangle, ArrowLeft, Home, RefreshCw } from 'lucide-react';
import {
  Link,
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from 'react-router-dom';

import Button from '../components/ui/button';

export default function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();

  let title = 'Something went wrong';
  let message = 'An unexpected error occurred while loading this view. Please try again.';

  if (isRouteErrorResponse(error)) {
    title = `${error.status} ${error.statusText}`;
    if (error.status === 404) {
      message = "The requested financial utility or page could not be found.";
    } else if (typeof error.data === 'string') {
      message = error.data;
    }
  }

  return (
    <div className='relative flex min-h-screen items-center justify-center bg-slate-50 p-6'>
      <div className='pointer-events-none absolute -left-20 -top-20 h-96 w-96 rounded-full bg-rose-400/10 blur-3xl' />
      <div className='pointer-events-none absolute -right-20 -bottom-20 h-96 w-96 rounded-full bg-indigo-400/10 blur-3xl' />

      <div className='relative z-10 w-full max-w-lg rounded-3xl border border-slate-200/80 bg-white/90 p-8 sm:p-10 text-center shadow-2xl backdrop-blur-xl'>
        <div className='mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-linear-to-tr from-rose-500/15 to-orange-500/15 text-rose-600 shadow-inner'>
          <AlertTriangle size={36} />
        </div>

        <h1 className='mt-6 text-2xl sm:text-3xl font-black text-slate-900 tracking-tight'>
          {title}
        </h1>

        <p className='mt-2.5 text-sm text-slate-500 leading-relaxed max-w-sm mx-auto'>
          {message}
        </p>

        <div className='mt-8 flex flex-wrap justify-center gap-3'>
          <Button
            type='button'
            variant='outline'
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={16} />
            Go Back
          </Button>

          <Button
            type='button'
            onClick={() => window.location.reload()}
          >
            <RefreshCw size={16} />
            Reload Page
          </Button>
        </div>

        <div className='mt-6 border-t border-slate-100 pt-5'>
          <Link
            to='/'
            className='inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700 transition'
          >
            <Home size={14} />
            Back to Financial Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
