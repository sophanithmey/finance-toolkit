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
      <h2 className='mb-5 text-xl font-bold'>Quick Prices</h2>

      <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
        {weights.map((weight) => {
          const vnd = weight * sellPrice;

          const usd = vnd / usdRate;

          return (
            <div
              key={weight}
              className='rounded-xl border bg-slate-50 p-4 text-center'
            >
              <p>{weight} Tael</p>

              <h3 className='mt-2 text-xl font-bold'>{formatCurrency(usd)}</h3>

              <p className='text-xs text-slate-500'>≈ {formatNumber(vnd)} ₫</p>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
