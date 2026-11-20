import { Zap } from 'lucide-react';
import Card from '../../../components/ui/card';
import { formatCurrency, formatNumber } from '../../../utils/helper';

interface Props {
  sellPrice: number;
  usdRate: number;
}

const weights = [1, 2, 5, 10];

export default function GoldQuickPrice({ sellPrice, usdRate }: Props) {
  return (
    <Card>
      <div className='flex items-center gap-3 mb-5'>
        <div className='flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200'>
          <Zap size={17} />
        </div>
        <div>
          <h2 className='text-sm font-bold text-slate-900 dark:text-slate-100'>
            Quick Tael Valuations
          </h2>
          <p className='text-xs text-slate-400 dark:text-slate-500'>
            Standard gold denominations at live ask price
          </p>
        </div>
      </div>

      <div className='grid grid-cols-2 gap-3 md:grid-cols-4'>
        {weights.map((weight) => {
          const vnd = weight * sellPrice;
          const usd = vnd / usdRate;

          return (
            <div
              key={weight}
              className='group relative overflow-hidden rounded-xl border border-slate-200/80 bg-slate-50/60 p-4 text-center transition-all duration-200 hover:border-slate-300 hover:bg-white dark:border-slate-800 dark:bg-slate-900/60 dark:hover:bg-slate-900 dark:hover:border-slate-700'
            >
              <div className='inline-flex items-center justify-center rounded-md bg-slate-200/60 px-2 py-0.5 text-[10px] font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-300'>
                {weight} {weight === 1 ? 'Tael' : 'Taels'}
              </div>

              <div className='mt-2.5 tabular-nums text-lg font-black text-slate-900 dark:text-slate-100 transition-colors'>
                {formatCurrency(usd)}
              </div>

              <p className='mt-0.5 text-[11px] font-medium text-slate-400 dark:text-slate-500'>
                ≈ {formatNumber(vnd)} ₫
              </p>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
