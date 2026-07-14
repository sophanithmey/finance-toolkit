import { useState } from 'react';

import Card from '../../../components/ui/card';
import { formatCurrency, formatNumber } from '../../../utils/helper';

interface Props {
  sellPrice: number;
  usdRate: number;
}

const units = [
  {
    label: 'Tael',
    value: 1,
  },
  {
    label: 'Chi',
    value: 0.1,
  },
  {
    label: 'Gram',
    value: 1 / 37.5,
  },
];

export default function GoldCalculator({ sellPrice, usdRate }: Props) {
  const [weight, setWeight] = useState(1);

  const [unit, setUnit] = useState(units[0]);

  const totalVnd = weight * unit.value * sellPrice;

  const totalUsd = totalVnd / usdRate;

  return (
    <Card>
      <h2 className='mb-5 text-xl font-bold'>Gold Calculator</h2>

      <div className='grid gap-4 md:grid-cols-2'>
        <div>
          <label>Weight</label>

          <input
            type='number'
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            className='mt-2 w-full rounded-lg border p-3'
          />
        </div>

        <div>
          <label>Unit</label>

          <select
            className='mt-2 w-full rounded-lg border p-3'
            value={unit.label}
            onChange={(e) =>
              setUnit(units.find((u) => u.label === e.target.value)!)
            }
          >
            {units.map((u) => (
              <option key={u.label}>{u.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className='mt-6 rounded-xl bg-yellow-50 p-5'>
        <p className='text-sm text-slate-500'>Estimated Value</p>

        <h2 className='mt-2 text-3xl font-bold text-yellow-700'>
          {formatCurrency(totalUsd)}
        </h2>

        <p className='mt-2 text-slate-500'>≈ {formatNumber(totalVnd)} ₫</p>
      </div>
    </Card>
  );
}
