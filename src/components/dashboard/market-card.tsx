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
    <div className='group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-4.5 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg'>
      <div className='flex items-center justify-between'>
        <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${color} shadow-xs transition-transform duration-300 group-hover:scale-105`}>
          <Icon size={20} />
        </div>

        {change !== undefined && (
          <div
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${
              positive
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                : 'bg-rose-50 text-rose-700 border border-rose-200/60'
            }`}
          >
            {positive ? (
              <ArrowUpRight size={13} />
            ) : (
              <ArrowDownRight size={13} />
            )}
            <span>{Math.abs(change).toFixed(2)}</span>
          </div>
        )}
      </div>

      <h3 className='mt-3.5 text-xs font-semibold uppercase tracking-wider text-slate-400'>
        {title}
      </h3>

      <div className='mt-1 tabular-nums text-2xl font-black tracking-tight text-slate-900'>
        {isExchange
          ? Number(value).toFixed(2)
          : formatCurrency(convertCurrency(Number(value), 26150))}
      </div>

      {subtitle && (
        <div className='mt-1 text-xs font-medium text-slate-400'>{subtitle}</div>
      )}
    </div>
  );
}
