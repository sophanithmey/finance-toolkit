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
    <div className='group rounded-2xl border border-slate-100 bg-white p-4 transition-all hover:-translate-y-1 hover:shadow-lg'>
      <div className='flex items-center justify-between'>
        <div className={`rounded-xl p-3 ${color}`}>
          <Icon size={20} />
        </div>

        {change !== undefined && (
          <div
            className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${
              positive
                ? 'bg-green-100 text-green-600'
                : 'bg-red-100 text-red-600'
            }`}
          >
            {positive ? (
              <ArrowUpRight size={14} />
            ) : (
              <ArrowDownRight size={14} />
            )}

            {Math.abs(change)}
          </div>
        )}
      </div>

      <h3 className='mt-4 text-sm text-slate-500'>{title}</h3>

      <div className='mt-1 text-2xl font-bold'>
        {isExchange
          ? (Number(value)).toFixed(2)
          : formatCurrency(convertCurrency(Number(value), 26150))}
      </div>

      {subtitle && (
        <div className='mt-1 text-sm text-slate-400'>{subtitle}</div>
      )}
    </div>
  );
}
