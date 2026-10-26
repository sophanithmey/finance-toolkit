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
      <div className='flex items-center gap-3 mb-6'>
        <div className='flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 text-amber-600'>
          <Zap size={22} />
        </div>
        <div>
          <h2 className='text-xl font-extrabold text-slate-900'>Quick Tael Valuation</h2>
          <p className='text-xs text-slate-400'>
            Pre-computed market prices for standard gold denominations
          </p>
        </div>
      </div>

      <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
        {weights.map((weight) => {
          const vnd = weight * sellPrice;
          const usd = vnd / usdRate;

          return (
            <div
              key={weight}
              className='group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-50/60 p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-amber-300 hover:bg-white hover:shadow-lg'
            >
              <div className='inline-flex items-center justify-center rounded-full bg-amber-100/70 px-2.5 py-0.5 text-xs font-bold text-amber-800'>
                {weight} {weight === 1 ? 'Tael' : 'Taels'}
              </div>

              <h3 className='mt-3 tabular-nums text-xl font-black text-slate-900 group-hover:text-amber-700 transition-colors'>
                {formatCurrency(usd)}
              </h3>

              <p className='mt-1 text-xs font-medium text-slate-400'>
                ≈ {formatNumber(vnd)} ₫
              </p>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
