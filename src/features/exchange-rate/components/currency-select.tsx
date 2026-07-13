import { currencies } from '../constants';

interface Props {
  readonly value: string;
  readonly onChange: (value: string) => void;
}

export default function CurrencySelect({ value, onChange }: Props) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className='w-full rounded-xl border bg-white p-3'
    >
      {currencies.map((currency) => (
        <option key={currency} value={currency}>
          {currency}
        </option>
      ))}
    </select>
  );
}
