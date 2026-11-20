import { ArrowDownRight, ArrowUpRight, type LucideIcon } from 'lucide-react';
import { convertCurrency, formatCurrency } from '../../utils/helper';

interface Props {
  title: string;
  value: string;
  subtitle?: string;
  change?: number;
  icon: LucideIcon;
  color: string;
  isExchange?: boolean;
}

export default function MarketCard({
  title,
  value,
  subtitle,
  change,
  icon: Icon,
  color,
  isExchange = false,
}: Props) {
  const positive = (change ?? 0) >= 0;

  return (
    <div className='group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs transition-all duration-200 hover:border-slate-300 dark:border-slate-800/80 dark:bg-slate-900/90 dark:hover:border-slate-700'>
      <div className='flex items-center justify-between'>
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${color}`}>
          <Icon size={18} />
        </div>

        {change !== undefined && (
          <div
            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-bold ${
              positive
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800/60'
                : 'bg-rose-50 text-rose-700 border border-rose-200/60 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800/60'
            }`}
          >
            {positive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
            <span>{Math.abs(change).toFixed(2)}</span>
          </div>
        )}
      </div>

      <p className='mt-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400'>
        {title}
      </p>

      <div className='mt-1 tabular-nums text-xl font-black tracking-tight text-slate-900 dark:text-slate-100'>
        {isExchange
          ? Number(value).toFixed(2)
          : formatCurrency(convertCurrency(Number(value), 26150))}
      </div>

      {subtitle && (
        <div className='mt-1 text-xs font-medium text-slate-400 dark:text-slate-500'>{subtitle}</div>
      )}
    </div>
  );
}
