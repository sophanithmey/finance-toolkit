import type { LucideIcon } from 'lucide-react';

interface Props {
  title: string;
  value: string;
  subtitle: string;
  icon: LucideIcon;
  gradient?: string;
}

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
}: Props) {
  return (
    <div className='group overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition duration-200 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900'>
      <div className='flex justify-between items-start'>
        <div>
          <p className='text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400'>
            {title}
          </p>

          <div className='mt-2 tabular-nums text-2xl font-black text-slate-900 dark:text-slate-100'>
            {value}
          </div>

          <p className='mt-1 text-xs text-slate-400 dark:text-slate-500'>{subtitle}</p>
        </div>

        <div className='rounded-xl bg-slate-100 p-2.5 text-slate-700 transition group-hover:scale-105 dark:bg-slate-800 dark:text-slate-200'>
          <Icon size={20} />
        </div>
      </div>
    </div>
  );
}
