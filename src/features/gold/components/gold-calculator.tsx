import { useState } from 'react';
import { Calculator } from 'lucide-react';

import Card from '../../../components/ui/card';
import Input from '../../../components/ui/input';
import { formatCurrency, formatNumber } from '../../../utils/helper';

interface Props {
  sellPrice: number;
  usdRate: number;
}

const units = [
  { label: 'Tael (Lượng / Cây)', value: 1 },
  { label: 'Chi (Chỉ - 0.1 Tael)', value: 0.1 },
  { label: 'Gram (1/37.5 Tael)', value: 1 / 37.5 },
];

export default function GoldCalculator({ sellPrice, usdRate }: Props) {
  const [weight, setWeight] = useState(1);
  const [unit, setUnit] = useState(units[0]);

  const totalVnd = weight * unit.value * sellPrice;
  const totalUsd = totalVnd / usdRate;

  return (
    <Card>
      <div className='flex items-center gap-3 mb-6'>
        <div className='flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 text-amber-600'>
          <Calculator size={22} />
        </div>
        <div>
          <h2 className='text-xl font-extrabold text-slate-900'>Gold Weight Estimator</h2>
          <p className='text-xs text-slate-400'>
            Calculate real-time market value for any quantity
          </p>
        </div>
      </div>

      <div className='grid gap-4 md:grid-cols-2'>
        <Input
          label='Weight / Quantity'
          type='number'
          step='0.1'
          value={weight}
          onChange={(e) => setWeight(Math.max(Number(e.target.value), 0))}
        />

        <div className='space-y-1.5'>
          <label className='block text-xs font-semibold uppercase tracking-wider text-slate-500'>
            Unit of Measurement
          </label>
          <select
            className='w-full rounded-2xl border border-slate-200/90 bg-slate-50/70 px-4 py-3 text-sm font-bold text-slate-800 transition-all duration-200 hover:border-slate-300 focus:bg-white focus:border-amber-500 focus:outline-none focus:ring-4 focus:ring-amber-500/15 cursor-pointer shadow-2xs'
            value={unit.label}
            onChange={(e) =>
              setUnit(units.find((u) => u.label === e.target.value) || units[0])
            }
          >
            {units.map((u) => (
              <option key={u.label} value={u.label}>
                {u.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className='mt-6 rounded-2xl border border-amber-200/70 bg-linear-to-br from-amber-50/80 via-yellow-50/50 to-orange-50/80 p-5'>
        <p className='text-xs font-bold uppercase tracking-wider text-amber-800'>
          Estimated Holding Value
        </p>

        <h3 className='mt-1.5 tabular-nums text-3xl font-black text-amber-900'>
          {formatCurrency(totalUsd)}
        </h3>

        <p className='mt-1 text-sm font-semibold text-amber-800/80'>
          ≈ {formatNumber(Math.round(totalVnd))} ₫
        </p>
      </div>
    </Card>
  );
}
