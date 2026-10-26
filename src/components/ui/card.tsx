import type { ReactNode } from 'react';

interface CardProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly hover?: boolean;
  readonly glow?: boolean;
}

export default function Card({
  children,
  className = '',
  hover = true,
  glow = true,
}: CardProps) {
  return (
    <div
      className={`
        relative
        overflow-hidden
        rounded-3xl
        border
        border-slate-200/70
        bg-white/85
        p-6
        shadow-sm
        backdrop-blur-md
        transition-all
        duration-300
        dark:border-slate-800/80
        dark:bg-slate-900/85
        dark:text-slate-100
        ${hover ? 'hover:-translate-y-0.5 hover:shadow-xl hover:border-slate-300/80 dark:hover:border-slate-700 dark:hover:shadow-indigo-500/5' : ''}
        ${className}
      `}
    >
      {glow && (
        <>
          <div className='pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-linear-to-br from-indigo-500/10 to-blue-500/0 blur-2xl dark:from-indigo-500/20' />
          <div className='pointer-events-none absolute -bottom-12 -left-12 h-32 w-32 rounded-full bg-linear-to-tr from-cyan-500/10 to-emerald-500/0 blur-xl dark:from-cyan-500/20' />
          <div className='absolute inset-x-0 top-0 h-1 bg-linear-to-r from-blue-500 via-indigo-500 to-emerald-400 opacity-80' />
        </>
      )}

      <div className='relative z-10'>{children}</div>
    </div>
  );
}
