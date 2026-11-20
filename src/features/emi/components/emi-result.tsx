import Card from '../../../components/ui/card';
import { formatCurrency } from '../../../utils/helper';
import type { EMIResult as EMIResultType } from '../types';

interface Props {
  readonly result: EMIResultType;
}

export default function EMIResult({ result }: Props) {
  const total = result.totalPayment || 1;
  const principalPercent = Math.min(Math.max((result.loanAmount / total) * 100, 0), 100);
  const interestPercent = Math.max(100 - principalPercent, 0);

  const rows = [
    { label: 'Original Product Price', value: result.productPrice, highlight: false },
    { label: 'Down Payment Paid', value: result.downPayment, highlight: false },
    { label: 'Financed Loan Amount', value: result.loanAmount, highlight: false },
    { label: 'Processing Fee', value: result.processingFee, highlight: false },
    { label: 'Total Interest Charge', value: result.totalInterest, highlight: false },
    { label: 'Total Repayment (Principal + Interest)', value: result.totalPayment, highlight: true },
    { label: 'Monthly Payment (EMI)', value: result.monthlyPayment, highlight: true },
  ];

  return (
    <Card>
      <div className='flex items-center justify-between border-b border-slate-100 pb-3 mb-4 dark:border-slate-800'>
        <div>
          <h2 className='text-sm font-bold text-slate-900 dark:text-slate-100'>
            Payment Breakdown & Ratio
          </h2>
          <p className='text-xs text-slate-400 dark:text-slate-500'>
            Principal capital vs accrued borrowing interest proportion
          </p>
        </div>
      </div>

      {/* Visual Ratio Bar */}
      <div className='mb-5 space-y-2 rounded-xl border border-slate-200 bg-slate-50/60 p-3.5 dark:border-slate-800 dark:bg-slate-900/60'>
        <div className='flex justify-between text-xs font-semibold'>
          <span className='text-slate-700 dark:text-slate-300'>Principal ({principalPercent.toFixed(1)}%)</span>
          <span className='text-amber-600 dark:text-amber-400'>Interest ({interestPercent.toFixed(1)}%)</span>
        </div>
        <div className='h-2.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800 flex'>
          <div
            style={{ width: `${principalPercent}%` }}
            className='bg-slate-900 dark:bg-white transition-all duration-300'
          />
          <div
            style={{ width: `${interestPercent}%` }}
            className='bg-amber-500 transition-all duration-300'
          />
        </div>
      </div>

      <div className='divide-y divide-slate-100 rounded-xl border border-slate-200/80 overflow-hidden bg-white dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-900'>
        {rows.map(({ label, value, highlight }) => (
          <div
            key={label}
            className={`flex items-center justify-between px-4 py-3 text-xs transition-colors ${
              highlight
                ? 'bg-slate-50 dark:bg-slate-800/60 font-bold'
                : 'text-slate-700 hover:bg-slate-50/50 dark:text-slate-300 dark:hover:bg-slate-800/40'
            }`}
          >
            <span className={highlight ? 'font-bold text-slate-900 dark:text-slate-100' : 'font-medium text-slate-600 dark:text-slate-400'}>
              {label}
            </span>
            <span className='tabular-nums font-bold text-slate-900 dark:text-slate-100'>
              {formatCurrency(Number(value))}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
