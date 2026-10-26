import { ArrowLeftRight } from 'lucide-react';

import Card from '../../../components/ui/card';
import Input from '../../../components/ui/input';
import CurrencySelect from './currency-select';
import SwapButton from './swap-button';

interface Props {
  readonly amount: number;
  readonly from: string;
  readonly to: string;
  readonly onAmountChange: (value: number) => void;
  readonly onFromChange: (value: string) => void;
  readonly onToChange: (value: string) => void;
}

const presetAmounts = [10, 50, 100, 500, 1000];

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
      <div className='flex items-center gap-3 mb-6'>
        <div className='flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 text-amber-600'>
          <ArrowLeftRight size={22} />
        </div>
        <div>
          <h2 className='text-xl font-extrabold text-slate-900'>Live Currency Converter</h2>
          <p className='text-xs text-slate-400'>
            Convert between major global and regional fiat currencies
          </p>
        </div>
      </div>

      <div className='space-y-5'>
        <div>
          <Input
            label='Amount to Convert'
            type='number'
            step='0.01'
            value={amount}
            onChange={(e) => onAmountChange(Number(e.target.value))}
          />

          <div className='mt-2.5 flex flex-wrap items-center gap-1.5'>
            <span className='text-xs text-slate-400 mr-1'>Presets:</span>
            {presetAmounts.map((val) => (
              <button
                type='button'
                key={val}
                onClick={() => onAmountChange(val)}
                className={`rounded-xl px-2.5 py-1 text-xs font-semibold transition-all ${
                  amount === val
                    ? 'bg-indigo-600 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                ${val}
              </button>
            ))}
          </div>
        </div>

        <div className='flex flex-col sm:flex-row items-center gap-3'>
          <div className='w-full flex-1'>
            <CurrencySelect label='From Currency' value={from} onChange={onFromChange} />
          </div>

          <div className='sm:pt-5'>
            <SwapButton onSwap={swapCurrency} />
          </div>

          <div className='w-full flex-1'>
            <CurrencySelect label='To Currency' value={to} onChange={onToChange} />
          </div>
        </div>
      </div>
    </Card>
  );
}
