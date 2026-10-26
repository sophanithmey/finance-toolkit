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
  color = 'from-blue-500/15 to-indigo-500/15 text-indigo-600',
}: Props) {
  return (
    <div className='group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/90 p-5 shadow-xs backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl'>
      <div className='flex items-start justify-between gap-4'>
        <div className='space-y-1'>
          <p className='text-xs font-semibold uppercase tracking-wider text-slate-500'>
            {title}
          </p>
          <h2 className='tabular-nums text-2xl font-black tracking-tight text-slate-900'>
            {value}
          </h2>
          {subtitle && (
            <p className='text-xs text-slate-400'>{subtitle}</p>
          )}
          {trend && (
            <span className='inline-flex items-center text-xs font-semibold text-emerald-600'>
              {trend}
            </span>
          )}
        </div>

        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br shadow-inner transition-transform duration-300 group-hover:scale-110 ${color}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}
