import { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Calculator,
  Coins,
  CreditCard,
  DollarSign,
  Gauge,
  HandCoins,
  Moon,
  Percent,
  Receipt,
  Search,
  Sun,
  TrendingUp,
  X,
} from 'lucide-react';
import { useTheme } from '../../hooks/use-theme';
import { useCurrency } from '../../hooks/use-currency';

interface CommandPaletteProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();
  const { setCurrencyCode } = useCurrency();

  const items = useMemo(() => [
    { id: 'dash', label: 'Financial Dashboard', category: 'Navigation', icon: Gauge, action: () => navigate('/') },
    { id: 'inv', label: 'Compound Interest & Growth', category: 'Calculators', icon: TrendingUp, action: () => navigate('/investment') },
    { id: 'gold', label: 'Live Gold Price Benchmark', category: 'Markets', icon: Coins, action: () => navigate('/gold') },
    { id: 'fx', label: 'Foreign Exchange Rates', category: 'Markets', icon: DollarSign, action: () => navigate('/exchange') },
    { id: 'loan', label: 'Loan Amortization Schedule', category: 'Calculators', icon: HandCoins, action: () => navigate('/loan') },
    { id: 'emi', label: 'EMI Loan Installment', category: 'Calculators', icon: CreditCard, action: () => navigate('/emi') },
    { id: 'split', label: 'Group Expense Splitter', category: 'Tools', icon: Receipt, action: () => navigate('/expense-split') },
    { id: 'disc', label: 'Discount & Sales Tax', category: 'Tools', icon: Percent, action: () => navigate('/discount') },
    { id: 'theme', label: `Switch to ${isDark ? 'Light' : 'Dark'} Mode`, category: 'Preferences', icon: isDark ? Sun : Moon, action: toggleTheme },
    { id: 'cur-usd', label: 'Set Currency to USD ($)', category: 'Currency', icon: DollarSign, action: () => setCurrencyCode('USD') },
    { id: 'cur-khr', label: 'Set Currency to KHR (៛)', category: 'Currency', icon: Calculator, action: () => setCurrencyCode('KHR') },
  ], [isDark, navigate, setCurrencyCode, toggleTheme]);

  const filtered = useMemo(() => {
    if (!query.trim()) return items;
    const lower = query.toLowerCase();
    return items.filter(
      (item) => item.label.toLowerCase().includes(lower) || item.category.toLowerCase().includes(lower)
    );
  }, [items, query]);

  const executeItem = useCallback((item: typeof items[0]) => {
    item.action();
    onClose();
    setQuery('');
  }, [onClose]);

  const handleQueryChange = (val: string) => {
    setQuery(val);
    setSelectedIndex(0);
  };

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
      <div
        className='fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity'
        onClick={onClose}
      />
      <div className='relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900'>
        <div className='flex items-center border-b border-slate-100 px-4 py-3 dark:border-slate-800'>
          <Search size={18} className='text-slate-400' />
          <input
            autoFocus
            type='text'
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            placeholder='Type a command or search...'
            className='flex-1 bg-transparent px-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none dark:text-slate-100'
          />
          <button
            onClick={onClose}
            className='rounded-lg p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          >
            <X size={16} />
          </button>
        </div>

        <div className='max-h-72 overflow-y-auto p-2'>
          {filtered.length === 0 ? (
            <div className='py-8 text-center text-xs text-slate-400'>No commands found.</div>
          ) : (
            filtered.map((item, index) => {
              const Icon = item.icon;
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
                  <div className='flex items-center gap-2.5'>
                    <Icon size={16} className='text-slate-400' />
                    <span>{item.label}</span>
                  </div>
                  <span className='rounded-md bg-slate-200/60 px-1.5 py-0.5 text-[10px] uppercase font-bold text-slate-500 dark:bg-slate-800 dark:text-slate-400'>
                    {item.category}
                  </span>
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
