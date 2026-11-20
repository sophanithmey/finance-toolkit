import { Link, useOutletContext } from 'react-router-dom';
import { ArrowLeft, Clock, ExternalLink, Info, Scale, ShieldCheck, Sparkles } from 'lucide-react';
import { useFuelPrices } from '../hooks/use-fuel-prices';
import CambodiaFuelMatrix from '../features/cambodia/components/cambodia-fuel-matrix';
import CambodiaBorderAnalysis from '../features/cambodia/components/cambodia-border-analysis';
import type { DisplayUnit } from '../types/fuel';

interface ContextType {
  displayUnit: DisplayUnit;
}

export default function CambodiaPage() {
  const { displayUnit } = useOutletContext<ContextType>();
  const { countries, isLoading } = useFuelPrices();

  const cambodia = countries.find((c) => c.code.toUpperCase() === 'KH');

  if (isLoading) {
    return <div className='h-96 animate-pulse rounded-3xl bg-slate-200/60 dark:bg-slate-800/60' />;
  }

  if (!cambodia) {
    return (
      <div className='py-16 text-center space-y-4'>
        <h2 className='text-xl font-bold'>Cambodia Data Feed Unavailable</h2>
        <Link to='/' className='text-indigo-600 underline text-xs font-bold'>
          Back to ASEAN Explorer
        </Link>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      {/* Navigation Breadcrumb & Quick Actions */}
      <div className='flex items-center justify-between'>
        <Link
          to='/'
          className='inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors'
        >
          <ArrowLeft size={14} />
          <span>Back to ASEAN Explorer</span>
        </Link>
        <Link
          to='/compare?codes=KH,TH,VN,LA'
          className='inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
        >
          <Scale size={13} />
          <span>Compare Mekong Neighbors</span>
        </Link>
      </div>

      {/* Hero Header */}
      <div className='rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900'>
        <div className='flex flex-wrap items-center justify-between gap-4'>
          <div className='flex items-center gap-4'>
            <span className='text-5xl'>🇰🇭</span>
            <div>
              <div className='flex items-center gap-2'>
                <h1 className='text-2xl font-black tracking-tight text-slate-900 dark:text-slate-100'>
                  Kingdom of Cambodia (ព្រះរាជាណាចក្រកម្ពុជា)
                </h1>
                <span className='inline-flex items-center gap-1 rounded-full bg-amber-400/20 px-2 py-0.5 text-[10px] font-extrabold text-amber-700 dark:text-amber-300'>
                  <Sparkles size={11} /> Featured ASEAN
                </span>
              </div>
              <p className='text-xs font-semibold text-slate-400 mt-1 uppercase tracking-wider'>
                Capital: Phnom Penh • Currency: KHR (Cambodian Riel ៛) • Pump Unit: Liter • Code: KH / KHM
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Itemized Fuel Cards */}
      <CambodiaFuelMatrix cambodia={cambodia} displayUnit={displayUnit} />

      {/* Regional Border Benchmark */}
      <CambodiaBorderAnalysis cambodia={cambodia} allCountries={countries} displayUnit={displayUnit} />

      {/* Official Data Source & Audit */}
      <div className='grid gap-4 md:grid-cols-2'>
        <div className='rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900'>
          <h3 className='text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5'>
            <ShieldCheck size={14} className='text-emerald-500' />
            <span>Retail Pricing Framework</span>
          </h3>
          <p className='text-xs text-slate-600 dark:text-slate-300 leading-relaxed'>
            Cambodia regulates pump ceilings through a bi-weekly pricing formula administered by the Ministry of
            Commerce (MoC) in coordination with major distributors (PTT, Tela, TotalEnergies, Sokimex, Caltex).
            Prices reflect Singapore Platts mean price index plus freight, insurance, and national duties.
          </p>
        </div>

        <div className='rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900'>
          <h3 className='text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5'>
            <Clock size={14} className='text-indigo-500' />
            <span>Data Freshness & Telemetry</span>
          </h3>
          <div className='space-y-2 text-xs'>
            <div className='flex justify-between'>
              <span className='text-slate-500'>Observed Date:</span>
              <span className='font-mono font-semibold'>{new Date(cambodia.updatedAt).toLocaleString()}</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-slate-500'>Feed Attribution:</span>
              <a
                href='https://openvan.camp/'
                target='_blank'
                rel='noopener noreferrer'
                className='font-bold text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1'
              >
                <span>OpenVan.camp (CC BY 4.0)</span>
                <ExternalLink size={11} />
              </a>
            </div>
            <p className='text-[11px] text-slate-400 flex items-center gap-1 pt-1'>
              <Info size={12} />
              <span>Native currency pump values verified via live exchange rates.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
