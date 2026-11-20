import { ExternalLink, ShieldCheck } from 'lucide-react';

interface Props {
  readonly updatedAt?: string;
}

export default function AttributionBanner({ updatedAt }: Props) {
  return (
    <div className='flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-3.5 text-xs text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400'>
      <div className='flex items-center gap-2'>
        <ShieldCheck size={16} className='text-emerald-500' />
        <span>
          Fuel data provided by{' '}
          <a
            href='https://openvan.camp/'
            target='_blank'
            rel='noopener noreferrer'
            className='font-bold text-slate-900 underline hover:text-indigo-600 dark:text-slate-100 dark:hover:text-indigo-400'
          >
            OpenVan.camp
          </a>{' '}
          under the{' '}
          <a
            href='https://creativecommons.org/licenses/by/4.0/'
            target='_blank'
            rel='noopener noreferrer'
            className='underline'
          >
            CC BY 4.0 License
          </a>
          . Secondary feed adapter configured with FuelWide.
        </span>
      </div>

      <div className='flex items-center gap-3'>
        {updatedAt && (
          <span className='font-mono text-[11px] text-slate-400'>
            Updated: {new Date(updatedAt).toLocaleDateString()}
          </span>
        )}
        <a
          href='https://openvan.camp/en/developers'
          target='_blank'
          rel='noopener noreferrer'
          className='inline-flex items-center gap-1 font-semibold text-indigo-600 dark:text-indigo-400 hover:underline'
        >
          <span>API Docs</span>
          <ExternalLink size={12} />
        </a>
      </div>
    </div>
  );
}
