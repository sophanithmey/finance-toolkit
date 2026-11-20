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
        <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200'>
          <Calculator size={18} />
        </div>
        <div>
          <h2 className='text-base font-bold text-slate-900 dark:text-slate-100'>
            Gold Weight Value Estimator
          </h2>
          <p className='text-xs text-slate-400 dark:text-slate-500'>
            Calculate estimated market value for any holding weight
          </p>
        </div>
      </div>

      <div className='grid gap-4 md:grid-cols-2'>
        <Input
          label='Quantity / Weight'
          type='number'
          step='0.1'
          value={weight}
          onChange={(e) => setWeight(Math.max(Number(e.target.value), 0))}
        />

        <div className='space-y-1.5'>
          <label className='block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400'>
            Unit of Measurement
          </label>
          <select
            className='w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-semibold text-slate-800 transition-all hover:border-slate-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/15 cursor-pointer dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100'
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

      <div className='mt-5 rounded-2xl border border-amber-200/80 bg-amber-50/60 p-4 dark:border-amber-800/60 dark:bg-amber-950/40'>
        <p className='text-[10px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300'>
          Estimated Holding Value
        </p>

        <div className='mt-1 tabular-nums text-2xl font-black text-amber-900 dark:text-amber-200'>
          {formatCurrency(totalUsd)}
        </div>

        <p className='mt-0.5 text-xs font-semibold text-amber-700 dark:text-amber-400'>
          ≈ {formatNumber(Math.round(totalVnd))} ₫
        </p>
      </div>
    </Card>
  );
}
