import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends Readonly<ButtonHTMLAttributes<HTMLButtonElement>> {
  readonly variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  readonly size?: 'sm' | 'md' | 'lg';
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: ButtonProps) {
  const variantStyles = {
    primary:
      'bg-slate-900 text-white hover:bg-slate-800 active:bg-slate-950 shadow-sm dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 dark:active:bg-slate-200 border border-transparent',
    secondary:
      'bg-slate-100 text-slate-800 hover:bg-slate-200/90 hover:text-slate-900 active:bg-slate-300/80 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 dark:active:bg-slate-800 border border-transparent',
    outline:
      'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 active:bg-slate-100 shadow-2xs dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:border-slate-700',
    danger:
      'bg-rose-600 text-white hover:bg-rose-700 active:bg-rose-800 shadow-sm border border-transparent',
    ghost:
      'text-slate-600 hover:bg-slate-100 hover:text-slate-900 active:bg-slate-200/60 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100 border border-transparent',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs font-semibold rounded-xl gap-1.5',
    md: 'px-4 py-2 text-sm font-semibold rounded-xl gap-2',
    lg: 'px-5 py-2.5 text-base font-semibold rounded-2xl gap-2.5',
  };

  return (
    <button
      className={`
        inline-flex items-center justify-center
        cursor-pointer select-none
        transition-all duration-150 ease-out active:scale-[0.98]
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950
        disabled:pointer-events-none disabled:opacity-40 disabled:shadow-none
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
