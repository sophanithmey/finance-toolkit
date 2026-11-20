import { useParams, Link, useOutletContext } from 'react-router-dom';
import { ArrowLeft, Scale } from 'lucide-react';
import { useFuelPrices } from '../hooks/use-fuel-prices';
import { getCountryFlag } from '../utils/flags';
import CountryFuelCards from '../features/countries/components/country-fuel-cards';
import CountrySourcesAudit from '../features/countries/components/country-sources-audit';
import type { DisplayUnit } from '../types/fuel';

interface ContextType {
  displayUnit: DisplayUnit;
}

export default function CountryDetailPage() {
  const { code } = useParams<{ code: string }>();
  const { displayUnit } = useOutletContext<ContextType>();
  const { countries, stats, isLoading } = useFuelPrices();

  const country = countries.find((c) => c.code.toLowerCase() === code?.toLowerCase());

  if (isLoading) {
    return <div className='h-96 animate-pulse rounded-3xl bg-slate-200/60 dark:bg-slate-800/60' />;
  }

  if (!country) {
    return (
      <div className='py-16 text-center space-y-4'>
        <h2 className='text-xl font-bold text-slate-800 dark:text-slate-200'>Country Not Found</h2>
        <p className='text-xs text-slate-400'>No fuel price data is recorded for code &ldquo;{code}&rdquo;</p>
        <Link to='/countries' className='inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 underline'>
          <ArrowLeft size={14} /> Back to Country Explorer
        </Link>
      </div>
    );
  }

  const globalAvg = stats?.avgGasolineUsdPerL || 1;
  const gasUsdL = country.usdPrices.gasoline;
  const vsGlobalPct = gasUsdL !== null ? ((gasUsdL - globalAvg) / globalAvg) * 100 : null;

  return (
    <div className='space-y-6'>
      {/* Back Button & Action */}
      <div className='flex items-center justify-between'>
        <Link
          to='/countries'
          className='inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors'
        >
          <ArrowLeft size={14} />
          <span>Back to Countries</span>
        </Link>
        <Link
          to={`/compare?codes=${country.code}`}
          className='inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
        >
          <Scale size={13} />
          <span>Compare this Country</span>
        </Link>
      </div>

      {/* Hero Header */}
      <div className='rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900'>
        <div className='flex flex-wrap items-center justify-between gap-4'>
          <div className='flex items-center gap-3.5'>
            <span className='text-4xl'>{getCountryFlag(country.code)}</span>
            <div>
              <div className='flex items-center gap-2'>
                <h1 className='text-2xl font-black tracking-tight text-slate-900 dark:text-slate-100'>
                  {country.name}
                </h1>
                <span className='rounded bg-slate-100 px-2 py-0.5 font-mono text-xs font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-300'>
                  {country.code}
                </span>
              </div>
              <p className='text-xs font-semibold uppercase text-slate-400 mt-0.5'>
                {country.region} • Official Currency: {country.currency} • Pump Unit: {country.nativeUnit}
              </p>
            </div>
          </div>

          {vsGlobalPct !== null && (
            <div className='rounded-2xl border border-slate-200 bg-slate-50/70 p-3.5 text-right dark:border-slate-800 dark:bg-slate-800/40'>
              <p className='text-[10px] font-bold uppercase text-slate-400'>Vs World Average</p>
              <div className={`mt-0.5 font-mono text-lg font-bold ${vsGlobalPct <= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                {vsGlobalPct > 0 ? `+${vsGlobalPct.toFixed(1)}%` : `${vsGlobalPct.toFixed(1)}%`}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Itemized Fuel Cards */}
      <CountryFuelCards country={country} displayUnit={displayUnit} />

      {/* Upstream Sources & License */}
      <CountrySourcesAudit country={country} />
    </div>
  );
}
