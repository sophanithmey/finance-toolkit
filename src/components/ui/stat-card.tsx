import type { ReactNode } from 'react';

interface Props {
  readonly title: string;
  readonly value: string;
  readonly icon: ReactNode;
  readonly subtitle?: string;
  readonly trend?: string;
  readonly color?: string;
}

export default function StatCard({
  title,
  value,
  icon,
  subtitle,
  trend,
  color = 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400',
}: Props) {
  return (
    <div className='group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md dark:border-slate-800/80 dark:bg-slate-900 dark:hover:border-slate-700'>
      <div className='flex items-start justify-between gap-3'>
        <div className='min-w-0 space-y-1'>
          <p className='text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400'>
            {title}
          </p>
          <div className='tabular-nums text-2xl font-black tracking-tight text-slate-900 dark:text-slate-100'>
            {value}
          </div>
          {subtitle && (
            <p className='text-xs text-slate-400 dark:text-slate-500 truncate'>{subtitle}</p>
          )}
          {trend && (
            <span className='inline-flex items-center text-xs font-semibold text-emerald-600 dark:text-emerald-400'>
              {trend}
            </span>
          )}
        </div>

        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-105 ${color}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}
