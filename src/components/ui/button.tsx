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
      'bg-linear-to-r from-blue-600 via-indigo-600 to-indigo-700 text-white shadow-md shadow-indigo-500/20 hover:shadow-lg hover:shadow-indigo-500/30 hover:brightness-105 active:scale-[0.98]',
    secondary:
      'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 active:scale-[0.98]',
    outline:
      'border border-slate-200/90 bg-white/80 text-slate-700 hover:bg-slate-50 hover:border-slate-300 active:scale-[0.98] shadow-xs',
    danger:
      'bg-linear-to-r from-rose-500 to-red-600 text-white shadow-md shadow-red-500/20 hover:brightness-105 active:scale-[0.98]',
    ghost:
      'text-slate-600 hover:bg-slate-100 hover:text-slate-900 active:scale-[0.98]',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs font-semibold rounded-xl',
    md: 'px-5 py-2.5 text-sm font-semibold rounded-2xl',
    lg: 'px-6 py-3 text-base font-semibold rounded-2xl',
  };

  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2
        cursor-pointer select-none font-medium
        transition-all duration-200 ease-out
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2
        disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none
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
