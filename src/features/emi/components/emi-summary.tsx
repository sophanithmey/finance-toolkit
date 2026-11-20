import { CreditCard, DollarSign, Percent, Wallet } from 'lucide-react';

import StatCard from '../../../components/ui/stat-card';
import { formatCurrency } from '../../../utils/helper';
import type { EMIResult } from '../types';

interface Props {
  readonly result: EMIResult;
}

export default function EMISummary({ result }: Props) {
  return (
    <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
      <StatCard
        title='Financed Principal'
        value={formatCurrency(result.loanAmount)}
        icon={<Wallet size={20} />}
        subtitle='Loan after down payment'
      />

      <StatCard
        title='Monthly Installment'
        value={formatCurrency(result.monthlyPayment)}
        icon={<CreditCard size={20} />}
        subtitle='Equated monthly deduction'
        trend='Fixed EMI'
      />

      <StatCard
        title='Total Interest'
        value={formatCurrency(result.totalInterest)}
        icon={<Percent size={20} />}
        color='bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400'
        subtitle='Total financing cost'
      />

      <StatCard
        title='Total Repayment'
        value={formatCurrency(result.totalPayment)}
        icon={<DollarSign size={20} />}
        subtitle='Principal + interest outlay'
      />
    </div>
  );
}
