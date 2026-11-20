import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';

interface ToolCardProps {
  readonly title: string;
  readonly description: string;
  readonly to: string;
  readonly icon: ReactNode;
  readonly gradient?: string;
  readonly tag?: string;
}

export default function ToolCard({
  title,
  description,
  to,
  icon,
  tag,
}: ToolCardProps) {
  return (
    <Link
      to={to}
      className='group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md dark:border-slate-800/80 dark:bg-slate-900 dark:hover:border-slate-700'
    >
      <div>
        <div className='flex items-center justify-between'>
          <div className='flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition-transform duration-200 group-hover:scale-105 dark:bg-slate-800 dark:text-slate-200'>
            {icon}
          </div>

          <div className='flex items-center gap-2'>
            {tag && (
              <span className='rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:bg-slate-800 dark:text-slate-400'>
                {tag}
              </span>
            )}
            <div className='flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-slate-400 transition-all duration-200 group-hover:bg-indigo-600 group-hover:text-white dark:bg-slate-800 dark:text-slate-500'>
              <ArrowUpRight size={15} />
            </div>
          </div>
        </div>

        <h3 className='mt-4 text-base font-bold text-slate-900 transition-colors group-hover:text-indigo-600 dark:text-slate-100 dark:group-hover:text-indigo-400'>
          {title}
        </h3>

        <p className='mt-1.5 text-xs leading-relaxed text-slate-500 dark:text-slate-400'>
          {description}
        </p>
      </div>

      <div className='mt-4 flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400'>
        <span>Open Utility</span>
        <span className='transition-transform duration-200 group-hover:translate-x-1'>
          →
        </span>
      </div>
    </Link>
  );
}
