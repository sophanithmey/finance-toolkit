import type { ReactNode } from 'react';

interface BadgeProps {
  readonly children: ReactNode;
  readonly variant?: 'default' | 'emerald' | 'amber' | 'rose' | 'indigo' | 'blue' | 'outline' | 'neutral';
  readonly size?: 'sm' | 'md';
  readonly dot?: boolean;
  readonly className?: string;
}

export default function Badge({
  children,
  variant = 'default',
  size = 'md',
  dot = false,
  className = '',
}: BadgeProps) {
  const variantStyles = {
    default:
      'bg-slate-100 text-slate-700 border-slate-200/80 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700',
    indigo:
      'bg-indigo-50 text-indigo-700 border-indigo-200/60 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800/60',
    emerald:
      'bg-emerald-50 text-emerald-700 border-emerald-200/60 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800/60',
    amber:
      'bg-amber-50 text-amber-800 border-amber-200/70 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800/60',
    rose:
      'bg-rose-50 text-rose-700 border-rose-200/60 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800/60',
    blue:
      'bg-blue-50 text-blue-700 border-blue-200/60 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800/60',
    outline:
      'bg-transparent text-slate-600 border-slate-300 dark:text-slate-400 dark:border-slate-700',
    neutral:
      'bg-slate-900 text-white border-slate-800 dark:bg-white dark:text-slate-900 dark:border-slate-200',
  };

  const dotColors = {
    default: 'bg-slate-500',
    indigo: 'bg-indigo-500',
    emerald: 'bg-emerald-500',
    amber: 'bg-amber-500',
    rose: 'bg-rose-500',
    blue: 'bg-blue-500',
    outline: 'bg-slate-400',
    neutral: 'bg-emerald-400',
  };

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-2.5 py-1 text-xs',
  };

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 font-bold tracking-tight
        rounded-full border select-none transition-colors
        ${sizeStyles[size]}
        ${variantStyles[variant]}
        ${className}
      `}
    >
      {dot && (
        <span className='relative flex h-1.5 w-1.5'>
          <span className={`inline-flex h-full w-full rounded-full ${dotColors[variant]}`} />
        </span>
      )}
      {children}
    </span>
  );
}
