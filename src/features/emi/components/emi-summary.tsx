import { CreditCard, DollarSign, Percent, Wallet } from 'lucide-react';

import Card from '../../../components/ui/card';

import type { EMIResult } from '../types';

interface Props {
  readonly result: EMIResult;
}

export default function EMISummary({ result }: Props) {
  const cards = [
    {
      title: 'Loan Amount',
      value: result.loanAmount,
      icon: Wallet,
      color: 'text-blue-600',
    },
    {
      title: 'Monthly Payment',
      value: result.monthlyPayment,
      icon: CreditCard,
      color: 'text-green-600',
    },
    {
      title: 'Interest',
      value: result.totalInterest,
      icon: Percent,
      color: 'text-orange-600',
    },
    {
      title: 'Total Payment',
      value: result.totalPayment,
      icon: DollarSign,
      color: 'text-purple-600',
    },
  ];

  return (
    <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-4'>
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <Card key={card.title}>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-slate-500'>{card.title}</p>

                <h3 className='mt-2 text-2xl font-bold'>
                  ${card.value.toFixed(2)}
                </h3>
              </div>

              <Icon className={card.color} size={30} />
            </div>
          </Card>
        );
      })}
    </div>
  );
}
