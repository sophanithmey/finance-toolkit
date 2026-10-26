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
      <div className='flex items-center justify-between border-b border-slate-100 pb-4 mb-6'>
        <div>
          <h2 className='text-lg font-bold text-slate-900'>Payment Breakdown & Ratios</h2>
          <p className='text-xs text-slate-400'>Principal balance vs borrowing interest proportion</p>
        </div>
      </div>

      {/* Visual Ratio Bar */}
      <div className='mb-6 space-y-2 rounded-2xl border border-slate-100 bg-slate-50/60 p-4'>
        <div className='flex justify-between text-xs font-bold'>
          <span className='text-indigo-600'>Principal ({principalPercent.toFixed(1)}%)</span>
          <span className='text-amber-600'>Interest ({interestPercent.toFixed(1)}%)</span>
        </div>
        <div className='h-3 w-full overflow-hidden rounded-full bg-slate-200 flex'>
          <div
            style={{ width: `${principalPercent}%` }}
            className='bg-linear-to-r from-blue-500 to-indigo-600 transition-all duration-500'
          />
          <div
            style={{ width: `${interestPercent}%` }}
            className='bg-linear-to-r from-amber-400 to-orange-500 transition-all duration-500'
          />
        </div>
      </div>

      <div className='divide-y divide-slate-100 rounded-2xl border border-slate-200/80 overflow-hidden bg-white'>
        {rows.map(({ label, value, highlight }) => (
          <div
            key={label}
            className={`flex items-center justify-between px-5 py-3.5 text-sm transition-colors ${
              highlight ? 'bg-indigo-50/50 font-bold text-indigo-950' : 'text-slate-700 hover:bg-slate-50/50'
            }`}
          >
            <span className={highlight ? 'font-bold text-slate-900' : 'font-medium text-slate-600'}>
              {label}
            </span>
            <span className='tabular-nums font-bold text-slate-900'>
              {formatCurrency(Number(value))}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
