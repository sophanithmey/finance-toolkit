import Card from '../../../components/ui/card';
import type { EMIResult } from '../types';

interface Props {
  readonly result: EMIResult;
}

export default function EMIResult({ result }: Props) {
  const rows = [
    ['Product Price', result.productPrice],
    ['Down Payment', result.downPayment],
    ['Loan Amount', result.loanAmount],
    ['Processing Fee', result.processingFee],
    ['Interest Paid', result.totalInterest],
    ['Total Payment', result.totalPayment],
    ['Monthly Payment', result.monthlyPayment],
  ];

  return (
    <Card>
      <h2 className='mb-5 text-xl font-bold'>Payment Breakdown</h2>

      <div className='divide-y'>
        {rows.map(([label, value]) => (
          <div key={label} className='flex justify-between py-3'>
            <span>{label}</span>

            <span className='font-semibold'>${Number(value).toFixed(2)}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
