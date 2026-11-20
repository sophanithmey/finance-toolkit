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
        <label className='block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400'>
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className='w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-semibold text-slate-800 transition-all hover:border-slate-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/15 cursor-pointer dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100'
      >
        {currencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
}
