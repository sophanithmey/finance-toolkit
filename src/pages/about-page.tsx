import { BookOpen, CheckCircle2, ExternalLink, Globe2, Layers, ShieldCheck } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className='max-w-4xl space-y-6'>
      <div className='rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xs dark:border-slate-800 dark:bg-slate-900'>
        <div className='inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300 mb-3'>
          <ShieldCheck size={13} className='text-emerald-500' />
          <span>Data Governance & Integrity</span>
        </div>
        <h1 className='text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight'>
          About Global Fuel Price Explorer
        </h1>
        <p className='mt-2 text-xs sm:text-sm text-slate-500 leading-relaxed dark:text-slate-400'>
          A real-time global fuel intelligence platform monitoring retail pump prices across 175 countries, providing transparent cross-border parity and normalized currency comparisons.
        </p>
      </div>

      <div className='grid gap-6 md:grid-cols-2'>
        {/* OpenVan Primary Feed */}
        <div className='rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-3'>
          <div className='flex items-center justify-between'>
            <h2 className='text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2'>
              <Globe2 size={16} className='text-indigo-600 dark:text-indigo-400' />
              <span>Primary Data Source</span>
            </h2>
            <span className='rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'>
              CC BY 4.0
            </span>
          </div>
          <p className='text-xs text-slate-500 leading-relaxed dark:text-slate-400'>
            Fuel prices are retrieved directly from the public{' '}
            <a
              href='https://openvan.camp/'
              target='_blank'
              rel='noopener noreferrer'
              className='font-bold text-slate-900 underline hover:text-indigo-600 dark:text-slate-100'
            >
              OpenVan.camp
            </a>{' '}
            API. Data is aggregated from official ministry publications, national gazettes, and retail station networks.
          </p>
          <div className='pt-2'>
            <a
              href='https://openvan.camp/en/developers'
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline'
            >
              <span>View OpenVan API Documentation</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>

        {/* Currency & Unit Conversion */}
        <div className='rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-3'>
          <div className='flex items-center justify-between'>
            <h2 className='text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2'>
              <Layers size={16} className='text-indigo-600 dark:text-indigo-400' />
              <span>Conversion Methodology</span>
            </h2>
            <span className='rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300'>
              Live FX
            </span>
          </div>
          <p className='text-xs text-slate-500 leading-relaxed dark:text-slate-400'>
            Exchange rates are fetched daily via open exchange rate indices. Fuel volume normalization strictly obeys international standards:
          </p>
          <ul className='space-y-1 text-xs text-slate-600 dark:text-slate-300 font-mono'>
            <li>• 1 US Gallon = 3.78541 Liters</li>
            <li>• 1 Imperial Gallon = 4.54609 Liters</li>
          </ul>
        </div>
      </div>

      {/* Data Integrity Commitment */}
      <div className='rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4'>
        <h2 className='text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2'>
          <BookOpen size={16} className='text-indigo-600 dark:text-indigo-400' />
          <span>Data Integrity Principles</span>
        </h2>
        <div className='grid gap-3 sm:grid-cols-3 text-xs'>
          <div className='rounded-xl border border-slate-100 bg-slate-50/60 p-3.5 dark:border-slate-800 dark:bg-slate-800/40'>
            <div className='flex items-center gap-1.5 font-bold text-slate-900 dark:text-slate-100 mb-1'>
              <CheckCircle2 size={14} className='text-emerald-500' />
              <span>No Fabricated Data</span>
            </div>
            <p className='text-slate-500 dark:text-slate-400'>
              We never fabricate missing country prices. Missing feeds are explicitly flagged as unavailable.
            </p>
          </div>
          <div className='rounded-xl border border-slate-100 bg-slate-50/60 p-3.5 dark:border-slate-800 dark:bg-slate-800/40'>
            <div className='flex items-center gap-1.5 font-bold text-slate-900 dark:text-slate-100 mb-1'>
              <CheckCircle2 size={14} className='text-emerald-500' />
              <span>Source Separation</span>
            </div>
            <p className='text-slate-500 dark:text-slate-400'>
              Original native currency pump prices are always retained and displayed alongside converted figures.
            </p>
          </div>
          <div className='rounded-xl border border-slate-100 bg-slate-50/60 p-3.5 dark:border-slate-800 dark:bg-slate-800/40'>
            <div className='flex items-center gap-1.5 font-bold text-slate-900 dark:text-slate-100 mb-1'>
              <CheckCircle2 size={14} className='text-emerald-500' />
              <span>Full Attribution</span>
            </div>
            <p className='text-slate-500 dark:text-slate-400'>
              Upstream source licenses (CC BY 4.0) and government reporting sources are visible on every country card.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
