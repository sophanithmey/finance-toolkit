import { useOutletContext, Link } from 'react-router-dom';
import { ArrowRight, Globe2, RefreshCw } from 'lucide-react';
import { useFuelPrices } from '../hooks/use-fuel-prices';
import GlobalOverview from '../features/dashboard/components/global-overview';
import QuickRankingsPreview from '../features/dashboard/components/quick-rankings-preview';
import RegionBreakdown from '../features/dashboard/components/region-breakdown';
import WorldMap from '../features/global-map/components/world-map';
import PriceDistributionChart from '../components/organisms/price-distribution-chart';
import AttributionBanner from '../components/molecules/attribution-banner';
import QuickCalculatorsGrid from '../features/dashboard/components/quick-calculators-grid';
import type { DisplayUnit } from '../types/fuel';

interface ContextType {
  displayUnit: DisplayUnit;
}

export default function DashboardPage() {
  const { displayUnit } = useOutletContext<ContextType>();
  const { countries, stats, meta, isLoading, isError, error, refetch } = useFuelPrices();

  if (isLoading) {
    return (
      <div className='space-y-6'>
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          {[...Array(4)].map((_, i) => (
            <div key={i} className='h-28 animate-pulse rounded-2xl bg-slate-200/60 dark:bg-slate-800/60' />
          ))}
        </div>
        <div className='h-96 animate-pulse rounded-3xl bg-slate-200/60 dark:bg-slate-800/60' />
        <div className='grid gap-6 md:grid-cols-2'>
          <div className='h-64 animate-pulse rounded-2xl bg-slate-200/60 dark:bg-slate-800/60' />
          <div className='h-64 animate-pulse rounded-2xl bg-slate-200/60 dark:bg-slate-800/60' />
        </div>
      </div>
    );
  }

  if (isError || !stats) {
    return (
      <div className='flex flex-col items-center justify-center rounded-3xl border border-rose-200 bg-rose-50/50 p-12 text-center dark:border-rose-900/50 dark:bg-rose-950/20'>
        <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-rose-100 text-rose-600 dark:bg-rose-900/50 dark:text-rose-400'>
          <RefreshCw size={22} />
        </div>
        <h3 className='mt-3 text-base font-bold text-slate-900 dark:text-slate-100'>
          Failed to load fuel intelligence feed
        </h3>
        <p className='mt-1 text-xs text-slate-500 max-w-sm dark:text-slate-400'>
          {(error as Error)?.message || 'The upstream OpenVan API service is currently unreachable.'}
        </p>
        <button
          onClick={() => refetch()}
          className='mt-4 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 transition dark:bg-white dark:text-slate-900'
        >
          <RefreshCw size={14} />
          Retry Request
        </button>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      {/* Switcher Banner to ASEAN */}
      <div className='flex items-center justify-between rounded-2xl border border-indigo-200/80 bg-indigo-50/70 px-4 py-2.5 text-xs dark:border-indigo-900/40 dark:bg-indigo-950/30'>
        <span className='font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2'>
          <span>🌏</span>
          <span>Global Fuel Price Telemetry (175 Countries)</span>
        </span>
        <Link
          to='/asean'
          className='inline-flex items-center gap-1 font-bold text-indigo-700 hover:underline dark:text-indigo-400'
        >
          <span>Explore ASEAN Edition (🇰🇭 Cambodia Featured)</span>
          <ArrowRight size={13} />
        </Link>
      </div>

      {/* Overview Metric Cards */}
      <GlobalOverview stats={stats} displayUnit={displayUnit} />

      {/* Attribution & Feed Status */}
      <AttributionBanner updatedAt={meta?.updated_at} />

      {/* Interactive World Map Section */}
      <section className='space-y-3'>
        <div className='flex items-center justify-between'>
          <div>
            <h2 className='text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2'>
              <Globe2 size={16} className='text-indigo-600 dark:text-indigo-400' />
              <span>Interactive Global Price Map</span>
            </h2>
            <p className='text-xs text-slate-400'>
              Hover country for pump prices; click any territory for deep-dive analytics
            </p>
          </div>
          <Link
            to='/map'
            className='inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline'
          >
            <span>Full Map View</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        <WorldMap countries={countries} fuelType='gasoline' />
      </section>

      {/* Distribution & Quick Rankings */}
      <div className='grid gap-6 lg:grid-cols-12 items-start'>
        <div className='lg:col-span-5 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900'>
          <PriceDistributionChart countries={countries} />
        </div>

        <div className='lg:col-span-7'>
          <QuickRankingsPreview countries={countries} displayUnit={displayUnit} />
        </div>
      </div>

      {/* Financial & Utilities Suite */}
      <QuickCalculatorsGrid />

      {/* Regional Averages */}
      <RegionBreakdown countries={countries} displayUnit={displayUnit} />
    </div>
  );
}
