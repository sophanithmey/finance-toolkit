import { useState, useMemo } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { useFuelPrices } from '../hooks/use-fuel-prices';
import { isAseanCountry } from '../features/asean/utils';
import CountryCard from '../features/countries/components/country-card';
import CountryFilters from '../features/countries/components/country-filters';
import type { DisplayUnit } from '../types/fuel';

interface ContextType {
  displayUnit: DisplayUnit;
}

export default function CountriesPage() {
  const { displayUnit } = useOutletContext<ContextType>();
  const { countries, isLoading } = useFuelPrices();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('all');
  const [sort, setSort] = useState('cheapest_gas');
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([]);

  const filteredCountries = useMemo(() => {
    let result = [...countries];

    if (search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter(
        (c) => c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q)
      );
    }

    if (region === 'asean') {
      result = result.filter((c) => isAseanCountry(c.code));
    } else if (region !== 'all') {
      result = result.filter((c) => c.region.toLowerCase() === region.toLowerCase());
    }

    result.sort((a, b) => {
      switch (sort) {
        case 'expensive_gas':
          return (b.usdPrices.gasoline || 0) - (a.usdPrices.gasoline || 0);
        case 'cheapest_diesel':
          return (a.usdPrices.diesel || 999) - (b.usdPrices.diesel || 999);
        case 'expensive_diesel':
          return (b.usdPrices.diesel || 0) - (a.usdPrices.diesel || 0);
        case 'name_desc':
          return b.name.localeCompare(a.name);
        case 'name_asc':
          return a.name.localeCompare(b.name);
        case 'cheapest_gas':
        default:
          return (a.usdPrices.gasoline || 999) - (b.usdPrices.gasoline || 999);
      }
    });

    return result;
  }, [countries, search, region, sort]);

  const toggleCompare = (code: string) => {
    setSelectedForCompare((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : prev.length < 5 ? [...prev, code] : prev
    );
  };

  if (isLoading) {
    return (
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {[...Array(12)].map((_, i) => (
          <div key={i} className='h-40 animate-pulse rounded-2xl bg-slate-200/60 dark:bg-slate-800/60' />
        ))}
      </div>
    );
  }

  return (
    <div className='space-y-5'>
      <CountryFilters
        search={search}
        onSearchChange={setSearch}
        region={region}
        onRegionChange={setRegion}
        sort={sort}
        onSortChange={setSort}
      />

      {/* Floating Compare Action Bar if countries selected */}
      {selectedForCompare.length > 0 && (
        <div className='flex items-center justify-between rounded-xl bg-slate-900 p-3 text-xs text-white shadow-lg dark:bg-slate-800'>
          <span>{selectedForCompare.length} of 5 countries selected for comparison</span>
          <div className='flex items-center gap-2'>
            <button
              onClick={() => setSelectedForCompare([])}
              className='text-slate-400 hover:text-white'
            >
              Clear
            </button>
            <button
              onClick={() => navigate(`/compare?codes=${selectedForCompare.join(',')}`)}
              className='rounded-lg bg-indigo-600 px-3 py-1 font-bold text-white hover:bg-indigo-500'
            >
              Compare Now →
            </button>
          </div>
        </div>
      )}

      {/* Results Count */}
      <div className='flex items-center justify-between text-xs text-slate-400'>
        <span>Showing {filteredCountries.length} countries</span>
      </div>

      {filteredCountries.length === 0 ? (
        <div className='py-16 text-center text-xs text-slate-400'>
          No countries found matching your search criteria.
        </div>
      ) : (
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {filteredCountries.map((c) => (
            <CountryCard
              key={c.code}
              country={c}
              displayUnit={displayUnit}
              onCompare={toggleCompare}
              isComparing={selectedForCompare.includes(c.code)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
