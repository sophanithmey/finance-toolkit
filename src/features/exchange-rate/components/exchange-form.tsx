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
        <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200'>
          <ArrowLeftRight size={18} />
        </div>
        <div>
          <h2 className='text-base font-bold text-slate-900 dark:text-slate-100'>
            Currency Converter
          </h2>
          <p className='text-xs text-slate-400 dark:text-slate-500'>
            Convert between major global and regional fiat currencies
          </p>
        </div>
      </div>

      <div className='space-y-4'>
        <div>
          <Input
            label='Amount to Convert'
            type='number'
            step='0.01'
            value={amount}
            onChange={(e) => onAmountChange(Number(e.target.value))}
          />

          <div className='mt-2 flex flex-wrap items-center gap-1.5'>
            <span className='text-xs text-slate-400 dark:text-slate-500 mr-1'>Presets:</span>
            {presetAmounts.map((val) => (
              <button
                type='button'
                key={val}
                onClick={() => onAmountChange(val)}
                className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
                  amount === val
                    ? 'bg-slate-900 text-white shadow-xs dark:bg-white dark:text-slate-900'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
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
