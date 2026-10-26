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
        <div className='flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-50 text-amber-600'>
          <Award size={20} />
        </div>
        <div>
          <label htmlFor='gold-type-select' className='text-xs font-bold uppercase tracking-wider text-slate-500'>
            Selected Gold Grade / Brand
          </label>
          <p className='text-xs text-slate-400'>Choose standard bullion or jewelry grade</p>
        </div>
      </div>

      <select
        id='gold-type-select'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className='w-full rounded-2xl border border-slate-200/90 bg-slate-50/70 px-4 py-3 text-sm font-bold text-slate-800 transition-all duration-200 hover:border-slate-300 focus:bg-white focus:border-amber-500 focus:outline-none focus:ring-4 focus:ring-amber-500/15 cursor-pointer'
      >
        {goldTypes.map((gold) => (
          <option key={gold.code} value={gold.code} className='font-medium text-slate-800'>
            {gold.name} ({gold.code})
          </option>
        ))}
      </select>
    </Card>
  );
}