import { Search } from 'lucide-react';
import { REGION_NAMES } from '../../../utils/flags';

interface Props {
  readonly search: string;
  readonly onSearchChange: (value: string) => void;
  readonly region: string;
  readonly onRegionChange: (value: string) => void;
  readonly sort: string;
  readonly onSortChange: (value: string) => void;
}

export default function CountryFilters({
  search,
  onSearchChange,
  region,
  onRegionChange,
  sort,
  onSortChange,
}: Props) {
  return (
    <div className='flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-xs dark:border-slate-800 dark:bg-slate-900'>
      {/* Search Input */}
      <div className='relative min-w-[200px] flex-1'>
        <Search size={14} className='pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400' />
        <input
          type='text'
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder='Search country name or code...'
          className='w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:focus:bg-slate-900'
        />
      </div>

      <div className='flex flex-wrap items-center gap-2'>
        {/* Region Filter */}
        <div className='relative'>
          <select
            value={region}
            onChange={(e) => onRegionChange(e.target.value)}
            className='appearance-none rounded-xl border border-slate-200 bg-white py-2 pl-3 pr-7 text-xs font-bold text-slate-700 shadow-2xs hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200'
          >
            <option value='all'>All Continents</option>
            <option value='asean'>🌏 ASEAN (Southeast Asia)</option>
            {Object.entries(REGION_NAMES).map(([key, name]) => (
              <option key={key} value={key}>
                {name}
              </option>
            ))}
          </select>
          <span className='pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[9px] text-slate-400'>
            ▼
          </span>
        </div>

        {/* Sort Order */}
        <div className='relative'>
          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value)}
            className='appearance-none rounded-xl border border-slate-200 bg-white py-2 pl-3 pr-7 text-xs font-bold text-slate-700 shadow-2xs hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200'
          >
            <option value='cheapest_gas'>Cheapest Gasoline First</option>
            <option value='expensive_gas'>Most Expensive Gasoline First</option>
            <option value='cheapest_diesel'>Cheapest Diesel First</option>
            <option value='expensive_diesel'>Most Expensive Diesel First</option>
            <option value='name_asc'>Name (A – Z)</option>
            <option value='name_desc'>Name (Z – A)</option>
          </select>
          <span className='pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[9px] text-slate-400'>
            ▼
          </span>
        </div>
      </div>
    </div>
  );
}
