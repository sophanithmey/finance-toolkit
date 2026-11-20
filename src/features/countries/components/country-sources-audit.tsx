import { Clock, ExternalLink, Info, ShieldCheck } from 'lucide-react';
import type { NormalizedCountryFuel } from '../../../types/fuel';

interface CountrySourcesAuditProps {
  readonly country: NormalizedCountryFuel;
}

export default function CountrySourcesAudit({ country }: CountrySourcesAuditProps) {
  return (
    <div className='grid gap-4 md:grid-cols-2'>
      <div className='rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900'>
        <h3 className='text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5'>
          <ShieldCheck size={14} className='text-emerald-500' />
          <span>Official Reporting Sources</span>
        </h3>
        {country.sources.length === 0 ? (
          <p className='text-xs text-slate-400'>Standard government gazette and national retail index.</p>
        ) : (
          <ul className='space-y-1.5 text-xs text-slate-600 dark:text-slate-300'>
            {country.sources.map((src: string, i: number) => (
              <li key={i} className='flex items-center gap-2'>
                <span className='h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-600' />
                <span>{src}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className='rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900'>
        <h3 className='text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5'>
          <Clock size={14} className='text-indigo-500' />
          <span>Audit & Timestamps</span>
        </h3>
        <div className='space-y-2 text-xs'>
          <div className='flex justify-between'>
            <span className='text-slate-500'>Fetched Date:</span>
            <span className='font-mono font-semibold'>{new Date(country.updatedAt).toLocaleString()}</span>
          </div>
          <div className='flex justify-between'>
            <span className='text-slate-500'>Provider Attribution:</span>
            <a
              href='https://openvan.camp/'
              target='_blank'
              rel='noopener noreferrer'
              className='font-bold text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1'
            >
              <span>OpenVan.camp</span>
              <ExternalLink size={11} />
            </a>
          </div>
          <p className='pt-1 text-[11px] text-slate-400 flex items-center gap-1'>
            <Info size={12} />
            <span>Prices represent regular retail pump averages in accordance with CC BY 4.0 guidelines.</span>
          </p>
        </div>
      </div>
    </div>
  );
}
