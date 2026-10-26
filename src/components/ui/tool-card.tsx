import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';

interface ToolCardProps {
  readonly title: string;
  readonly description: string;
  readonly to: string;
  readonly icon: ReactNode;
  readonly gradient: string;
}

export default function ToolCard({
  title,
  description,
  to,
  icon,
  gradient,
}: ToolCardProps) {
  return (
    <Link
      to={to}
      className={`
        group relative flex flex-col justify-between overflow-hidden rounded-3xl
        border border-slate-200/80 bg-white/95 p-7 shadow-xs backdrop-blur-md
        transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:border-slate-300
      `}
    >
      {/* Top Gradient Highlight Accent */}
      <div
        className={`absolute inset-x-0 top-0 h-1.5 transition-all duration-300 group-hover:h-2 ${gradient}`}
      />

      <div>
        <div className='flex items-center justify-between'>
          <div className='flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 border border-slate-100 shadow-inner transition-transform duration-300 group-hover:scale-110'>
            {icon}
          </div>

          <div className='flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-400 transition-all duration-300 group-hover:bg-indigo-600 group-hover:text-white group-hover:rotate-45'>
            <ArrowUpRight size={18} />
          </div>
        </div>

        <h2 className='mt-6 text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors'>
          {title}
        </h2>

        <p className='mt-2.5 text-sm leading-relaxed text-slate-500'>
          {description}
        </p>
      </div>

      <div className='mt-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-600'>
        Launch Tool
        <span className='transition-transform duration-300 group-hover:translate-x-1'>
          →
        </span>
      </div>
    </Link>
  );
}
