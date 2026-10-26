import { currencies } from '../constants';

interface Props {
  readonly value: string;
  readonly onChange: (value: string) => void;
  readonly label?: string;
}

export default function CurrencySelect({ value, onChange, label }: Props) {
  return (
    <div className='w-full space-y-1.5'>
      {label && (
        <label className='block text-xs font-semibold uppercase tracking-wider text-slate-500'>
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className='w-full rounded-2xl border border-slate-200/90 bg-slate-50/70 px-4 py-3 text-sm font-bold text-slate-800 transition-all duration-200 hover:border-slate-300 focus:bg-white focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/15 cursor-pointer shadow-2xs'
      >
        {currencies.map((currency) => (
          <option key={currency} value={currency} className='font-medium text-slate-800'>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
}
