import { ArrowRight } from 'lucide-react';
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
        group
        relative
        overflow-hidden
        rounded-3xl
        p-px
        transition
        duration-300
        hover:-translate-y-2
        hover:shadow-2xl
        ${gradient}
      `}
    >
      <div className='flex h-full flex-col rounded-3xl bg-white p-7'>
        <div className='mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100'>
          {icon}
        </div>

        <h2 className='text-2xl font-bold'>{title}</h2>

        <p className='mt-3 flex-1 text-gray-500'>{description}</p>

        <div className='mt-8 flex items-center gap-2 font-semibold text-slate-700'>
          Open
          <ArrowRight
            size={18}
            className='transition-transform group-hover:translate-x-2'
          />
        </div>
      </div>
    </Link>
  );
}
