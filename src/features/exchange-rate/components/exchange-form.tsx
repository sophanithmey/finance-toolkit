import { RefreshCcw } from 'lucide-react';

import Card from '../../../components/ui/card';
import Input from '../../../components/ui/input';

import CurrencySelect from './currency-select';

interface Props {
  readonly amount: number;
  readonly from: string;
  readonly to: string;
  readonly onAmountChange: (value: number) => void;
  readonly onFromChange: (value: string) => void;
  readonly onToChange: (value: string) => void;
}

export default function ExchangeForm({
  amount,
  from,
  to,
  onAmountChange,
  onFromChange,
  onToChange,
}: Props) {
  const swapCurrency = () => {
    const currentFrom = from;
    onFromChange(to);
    onToChange(currentFrom);
  };

  return (
    <Card>
      <h2 className='mb-6 text-2xl font-bold'>Currency Exchange</h2>

      <div className='space-y-6'>
        <Input
          label='Amount'
          type='number'
          value={amount}
          onChange={(e) => onAmountChange(Number(e.target.value))}
        />

        <div className='grid grid-cols-[1fr_auto_1fr] gap-4 items-end'>
          <CurrencySelect value={from} onChange={onFromChange} />

          <button
            onClick={swapCurrency}
            className='mb-1 rounded-full bg-slate-100 p-3 hover:bg-blue-100 transition'
          >
            <RefreshCcw size={20} />
          </button>

          <CurrencySelect value={to} onChange={onToChange} />
        </div>
      </div>
    </Card>
  );
}
