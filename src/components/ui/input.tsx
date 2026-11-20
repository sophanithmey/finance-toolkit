import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftAddon?: ReactNode;
  rightAddon?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, leftAddon, rightAddon, className = '', id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/[^a-z0-9]/g, '-') : undefined);

    return (
      <div className='w-full space-y-1.5'>
        {label && (
          <div className='flex items-center justify-between'>
            <label
              htmlFor={inputId}
              className='block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400'
            >
              {label}
            </label>
            {hint && (
              <span className='text-[11px] font-medium text-slate-400 dark:text-slate-500'>
                {hint}
              </span>
            )}
          </div>
        )}

        <div className='relative flex items-center'>
          {leftAddon && (
            <div className='pointer-events-none absolute left-3.5 flex items-center text-slate-400 dark:text-slate-500'>
              {leftAddon}
            </div>
          )}

          <input
            id={inputId}
            ref={ref}
            className={`
              w-full rounded-xl border px-3.5 py-2.5 text-sm font-medium
              bg-white text-slate-900 placeholder:text-slate-400
              transition-all duration-150
              focus:outline-none focus:ring-3
              dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-600
              ${leftAddon ? 'pl-9' : ''}
              ${rightAddon ? 'pr-9' : ''}
              ${
                error
                  ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/15 dark:border-rose-500/80'
                  : 'border-slate-200/90 hover:border-slate-300 focus:border-indigo-500 focus:ring-indigo-500/15 dark:border-slate-800 dark:hover:border-slate-700 dark:focus:border-indigo-400 dark:focus:ring-indigo-500/20'
              }
              ${className}
            `}
            {...props}
          />

          {rightAddon && (
            <div className='pointer-events-none absolute right-3.5 flex items-center text-slate-400 dark:text-slate-500 text-xs font-semibold'>
              {rightAddon}
            </div>
          )}
        </div>

        {error && (
          <p className='text-xs font-medium text-rose-500 dark:text-rose-400'>
            {error}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
