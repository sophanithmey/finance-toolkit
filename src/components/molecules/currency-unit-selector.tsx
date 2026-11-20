import { Layers } from 'lucide-react';
import type { DisplayUnit } from '../../types/fuel';
import { getDisplayUnitLabel } from '../../utils/units';

interface Props {
  readonly displayUnit: DisplayUnit;
  readonly onChange: (unit: DisplayUnit) => void;
}

export default function CurrencyUnitSelector({ displayUnit, onChange }: Props) {
  const units: DisplayUnit[] = [
    'usd_per_liter',
    'usd_per_gallon',
    'usd_per_imp_gallon',
    'local_per_unit',
  ];

  return (
    <div className='relative flex items-center'>
      <div className='pointer-events-none absolute left-2.5 text-slate-400'>
        <Layers size={13} />
      </div>
      <select
        value={displayUnit}
        onChange={(e) => onChange(e.target.value as DisplayUnit)}
        className='appearance-none rounded-xl border border-slate-200 bg-white py-1.5 pl-7 pr-7 text-xs font-bold text-slate-700 shadow-2xs hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200'
        aria-label='Select measurement unit'
      >
        {units.map((unit) => (
          <option key={unit} value={unit}>
            {getDisplayUnitLabel(unit)}
          </option>
        ))}
      </select>
      <span className='pointer-events-none absolute right-2 text-[9px] text-slate-400'>
        ▼
      </span>
    </div>
  );
}
