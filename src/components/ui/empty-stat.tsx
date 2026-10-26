import { FolderOpen } from 'lucide-react';
import type { ReactNode } from 'react';

interface EmptyStateProps {
  readonly title?: string;
  readonly description?: string;
  readonly icon?: ReactNode;
}

export default function EmptyState({
  title = 'No data available',
  description = 'Get started by creating or adding new items.',
  icon,
}: EmptyStateProps) {
  return (
    <div className='flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200/90 bg-slate-50/50 p-10 text-center backdrop-blur-xs'>
      <div className='flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-xs border border-slate-100 text-slate-400'>
        {icon ?? <FolderOpen size={30} />}
      </div>

      <h3 className='mt-4 text-base font-semibold text-slate-800'>{title}</h3>

      <p className='mt-1 max-w-sm text-sm text-slate-400'>{description}</p>
    </div>
  );
}
