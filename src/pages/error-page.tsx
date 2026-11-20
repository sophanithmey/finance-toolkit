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
    <div className='relative flex min-h-screen items-center justify-center bg-slate-50 p-6 dark:bg-slate-950'>
      <div className='relative z-10 w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-lg dark:border-slate-800 dark:bg-slate-900'>
        <div className='mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400'>
          <AlertTriangle size={26} />
        </div>

        <h1 className='mt-4 text-xl font-black text-slate-900 tracking-tight dark:text-slate-100'>
          {title}
        </h1>

        <p className='mt-2 text-xs text-slate-500 leading-relaxed max-w-sm mx-auto dark:text-slate-400'>
          {message}
        </p>

        <div className='mt-6 flex flex-wrap justify-center gap-2'>
          <Button
            type='button'
            variant='outline'
            size='sm'
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={14} />
            Go Back
          </Button>

          <Button
            type='button'
            size='sm'
            onClick={() => window.location.reload()}
          >
            <RefreshCw size={14} />
            Reload Page
          </Button>
        </div>

        <div className='mt-6 border-t border-slate-100 pt-4 dark:border-slate-800'>
          <Link
            to='/'
            className='inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition dark:text-indigo-400'
          >
            <Home size={13} />
            Return to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
