import { forwardRef, type InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className = '', id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className='w-full space-y-1.5'>
        {label && (
          <div className='flex items-center justify-between'>
            <label
              htmlFor={inputId}
              className='block text-xs font-semibold uppercase tracking-wider text-slate-600'
            >
              {label}
            </label>
            {hint && <span className='text-xs text-slate-400'>{hint}</span>}
          </div>
        )}

        <div className='relative'>
          <input
            id={inputId}
            ref={ref}
            className={`
              w-full rounded-2xl border px-4 py-3 text-sm
              bg-slate-50/70 text-slate-800 placeholder:text-slate-400
              transition-all duration-200
              focus:bg-white focus:outline-none focus:ring-4
              ${
                error
                  ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/15'
                  : 'border-slate-200/90 hover:border-slate-300 focus:border-indigo-500 focus:ring-indigo-500/15'
              }
              ${className}
            `}
            {...props}
          />
        </div>

        {error && (
          <p className='text-xs font-medium text-rose-500 animate-in fade-in'>
            {error}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;