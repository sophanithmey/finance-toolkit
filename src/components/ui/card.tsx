import type { ReactNode } from 'react';

interface CardProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly hover?: boolean;
}

export default function Card({
  children,
  className = '',
  hover = false,
}: CardProps) {
  return (
    <div
      className={`
        relative overflow-hidden
        rounded-2xl sm:rounded-3xl
        border border-slate-200/80
        bg-white/95
        p-5 sm:p-6
        shadow-xs
        backdrop-blur-sm
        transition-all duration-200
        dark:border-slate-800/80
        dark:bg-slate-900/90
        dark:text-slate-100
        ${hover ? 'hover:-translate-y-0.5 hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
