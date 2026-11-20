import { useOutletContext, Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useFuelPrices } from '../hooks/use-fuel-prices';
import { calculateAseanFuelStats } from '../features/asean/utils';
import CambodiaHeroCard from '../features/asean/components/cambodia-hero-card';
import AseanKpiGrid from '../features/asean/components/asean-kpi-grid';
import AseanMap from '../features/asean/components/asean-map';
import AseanPriceTable from '../features/asean/components/asean-price-table';
import CambodiaNeighborComparison from '../features/asean/components/cambodia-neighbor-comparison';
import AttributionBanner from '../components/molecules/attribution-banner';
import type { DisplayUnit } from '../types/fuel';

interface ContextType {
  displayUnit: DisplayUnit;
}

export default function AseanPage() {
  const { displayUnit } = useOutletContext<ContextType>();
  const { countries, meta, isLoading } = useFuelPrices();

  const aseanStats = calculateAseanFuelStats(countries, meta?.updated_at || new Date().toISOString());

  if (isLoading) {
    return (
      <div className='space-y-6'>
        <div className='h-48 animate-pulse rounded-3xl bg-slate-200/60 dark:bg-slate-800/60' />
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className='h-28 animate-pulse rounded-2xl bg-slate-200/60 dark:bg-slate-800/60' />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      {/* Switcher Banner to Global Overview */}
      <div className='flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-2.5 text-xs dark:border-slate-800 dark:bg-slate-900/60'>
        <span className='font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2'>
          <span>🌏</span>
          <span>ASEAN Edition: Southeast Asia Fuel Intelligence</span>
        </span>
        <Link
          to='/'
          className='inline-flex items-center gap-1 font-bold text-indigo-600 hover:underline dark:text-indigo-400'
        >
          <span>View Global Overview (175 Countries)</span>
          <ArrowRight size={13} />
        </Link>
      </div>

      {/* Featured Country Spotlight: Cambodia */}
      <CambodiaHeroCard
        cambodia={aseanStats.cambodia}
        aseanAvgGasUsd={aseanStats.avgGasolineUsdPerL}
        displayUnit={displayUnit}
      />

      {/* 4 ASEAN High-Level KPI Summary Cards */}
      <AseanKpiGrid stats={aseanStats} displayUnit={displayUnit} />

      {/* Interactive Southeast Asian Map */}
      <AseanMap countries={countries} displayUnit={displayUnit} />

      {/* Cross-Border Parity: Cambodia vs Mekong Neighbors */}
      <CambodiaNeighborComparison
        cambodia={aseanStats.cambodia}
        allCountries={countries}
        displayUnit={displayUnit}
      />

      {/* Complete ASEAN 11 Comparison Table */}
      <AseanPriceTable countries={countries} displayUnit={displayUnit} />

      {/* CC BY 4.0 License Attribution Banner */}
      <AttributionBanner />
    </div>
  );
}
