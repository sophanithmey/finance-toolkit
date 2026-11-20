import { Award } from 'lucide-react';
import Card from '../../../components/ui/card';
import { goldTypes } from '../constants';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function GoldForm({ value, onChange }: Props) {
  return (
    <Card>
      <div className='flex items-center gap-3 mb-4'>
        <div className='flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200'>
          <Award size={17} />
        </div>
        <div>
          <label htmlFor='gold-type-select' className='text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400'>
            Selected Gold Grade / Denomination
          </label>
          <p className='text-xs text-slate-400 dark:text-slate-500'>Choose standard bullion or jewelry grade</p>
        </div>
      </div>

      <select
        id='gold-type-select'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className='w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-semibold text-slate-800 transition-all hover:border-slate-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/15 cursor-pointer dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100'
      >
        {goldTypes.map((gold) => (
          <option key={gold.code} value={gold.code}>
            {gold.name} ({gold.code})
          </option>
        ))}
      </select>
    </Card>
  );
}
