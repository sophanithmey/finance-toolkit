import { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BarChart3,
  Calculator,
  Coins,
  Compass,
  CreditCard,
  DollarSign,
  Fuel,
  Globe2,
  HandCoins,
  Info,
  Percent,
  Receipt,
  Scale,
  Search,
  Sparkles,
  TrendingUp,
  X,
} from 'lucide-react';
import type { NormalizedCountryFuel, DisplayUnit } from '../../types/fuel';
import { getCountryFlag } from '../../utils/flags';

interface CommandPaletteProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly countries: NormalizedCountryFuel[];
  readonly onUnitChange: (unit: DisplayUnit) => void;
}

export default function CommandPalette({
  isOpen,
  onClose,
  countries,
  onUnitChange,
}: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  const pages = useMemo(
    () => [
      { id: 'p-overview', label: 'Overview Dashboard', category: 'Pages', icon: BarChart3, action: () => navigate('/') },
      { id: 'p-asean', label: 'ASEAN Explorer', category: 'Pages', icon: Sparkles, action: () => navigate('/asean') },
      { id: 'p-cambodia', label: 'Cambodia Profile (🇰🇭)', category: 'Pages', icon: Fuel, action: () => navigate('/cambodia') },
      { id: 'p-global', label: 'Global Explorer (Map)', category: 'Pages', icon: Globe2, action: () => navigate('/global') },
      { id: 'p-countries', label: 'Country Explorer', category: 'Pages', icon: Compass, action: () => navigate('/countries') },
      { id: 'p-compare', label: 'Compare Fuel Prices', category: 'Pages', icon: Scale, action: () => navigate('/compare') },
      { id: 'p-rankings', label: 'Price Rankings (ASEAN & Global)', category: 'Pages', icon: Fuel, action: () => navigate('/rankings') },
      { id: 'p-trends', label: 'Historical Price Trends', category: 'Pages', icon: TrendingUp, action: () => navigate('/trends') },
      // Calculators & Tools
      { id: 'c-expense', label: 'Expense Split & Debt Settlement Calculator', category: 'Calculators', icon: Receipt, action: () => navigate('/expense-split') },
      { id: 'c-fuel', label: 'Fuel Trip & Commute Cost Calculator', category: 'Calculators', icon: Calculator, action: () => navigate('/calculator') },
      { id: 'c-loan', label: 'Loan Repayment Schedule & Excel Export', category: 'Calculators', icon: HandCoins, action: () => navigate('/loan') },
      { id: 'c-emi', label: 'EMI (Monthly Installment) Calculator', category: 'Calculators', icon: CreditCard, action: () => navigate('/emi') },
      { id: 'c-discount', label: 'Discount & Sales Tax Calculator', category: 'Calculators', icon: Percent, action: () => navigate('/discount') },
      { id: 'c-investment', label: 'Compound Interest & Growth Calculator', category: 'Calculators', icon: TrendingUp, action: () => navigate('/investment') },
      { id: 'c-exchange', label: 'Live Currency Exchange Rate Converter', category: 'Calculators', icon: DollarSign, action: () => navigate('/exchange') },
      { id: 'c-gold', label: 'Gold Market Price & Gram Valuation', category: 'Calculators', icon: Coins, action: () => navigate('/gold') },
      { id: 'p-about', label: 'About Data & Methodology', category: 'Pages', icon: Info, action: () => navigate('/about') },
      // Units
      { id: 'u-liter', label: 'Set Unit: USD / Liter', category: 'Units', icon: Fuel, action: () => onUnitChange('usd_per_liter') },
      { id: 'u-gal', label: 'Set Unit: USD / US Gallon', category: 'Units', icon: Fuel, action: () => onUnitChange('usd_per_gallon') },
      { id: 'u-imp', label: 'Set Unit: USD / Imperial Gallon', category: 'Units', icon: Fuel, action: () => onUnitChange('usd_per_imp_gallon') },
    ],
    [navigate, onUnitChange]
  );

  const countryItems = useMemo(
    () =>
      countries.map((c) => ({
        id: `c-${c.code}`,
        label: `${getCountryFlag(c.code)} ${c.name} (${c.code})`,
        category: 'Countries',
        action: () => navigate(`/country/${c.code.toLowerCase()}`),
        extra: c.usdPrices.gasoline !== null ? `$${c.usdPrices.gasoline.toFixed(2)}/L` : 'No data',
      })),
    [countries, navigate]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [...pages, ...countryItems.slice(0, 15)];
    const matchingPages = pages.filter((p) => p.label.toLowerCase().includes(q));
    const matchingCountries = countryItems.filter(
      (c) => c.label.toLowerCase().includes(q) || c.id.toLowerCase().includes(q)
    );
    return [...matchingPages, ...matchingCountries].slice(0, 30);
  }, [pages, countryItems, query]);

  const executeItem = useCallback(
    (item: (typeof filtered)[0]) => {
      item.action();
      onClose();
      setQuery('');
    },
    [onClose]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + (filtered.length || 1)) % (filtered.length || 1));
      } else if (e.key === 'Enter' && filtered[selectedIndex]) {
        e.preventDefault();
        executeItem(filtered[selectedIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filtered, selectedIndex, executeItem, onClose]);

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-start justify-center p-4 sm:pt-20'>
      <div className='fixed inset-0 bg-slate-900/40 backdrop-blur-xs' onClick={onClose} />
      <div className='relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900'>
        <div className='flex items-center border-b border-slate-100 px-4 py-3 dark:border-slate-800'>
          <Search size={18} className='text-slate-400' />
          <input
            autoFocus
            type='text'
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder='Search tools, calculators, or countries...'
            className='flex-1 bg-transparent px-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none dark:text-slate-100'
          />
          <button onClick={onClose} className='rounded-lg p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'>
            <X size={16} />
          </button>
        </div>

        <div className='max-h-72 overflow-y-auto p-2'>
          {filtered.length === 0 ? (
            <div className='py-8 text-center text-xs text-slate-400'>No results found.</div>
          ) : (
            filtered.map((item, index) => {
              const isSelected = index === selectedIndex;
              return (
                <button
                  key={item.id}
                  onClick={() => executeItem(item)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold transition-colors ${
                    isSelected
                      ? 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100'
                      : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <span className='truncate'>{item.label}</span>
                  <div className='flex items-center gap-2 shrink-0'>
                    {'extra' in item && item.extra && (
                      <span className='font-mono text-[11px] text-slate-500'>{item.extra}</span>
                    )}
                    <span className='rounded-md bg-slate-200/60 px-1.5 py-0.5 text-[9px] uppercase font-bold text-slate-500 dark:bg-slate-800 dark:text-slate-400'>
                      {item.category}
                    </span>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
