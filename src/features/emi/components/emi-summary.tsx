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
        icon={<Wallet size={24} />}
        color='from-blue-500/15 to-indigo-500/15 text-blue-600'
        subtitle='Loan after down payment'
      />

      <StatCard
        title='Monthly Installment'
        value={formatCurrency(result.monthlyPayment)}
        icon={<CreditCard size={24} />}
        color='from-emerald-500/15 to-teal-500/15 text-emerald-600'
        subtitle='Due each month'
        trend='Fixed EMI'
      />

      <StatCard
        title='Total Interest'
        value={formatCurrency(result.totalInterest)}
        icon={<Percent size={24} />}
        color='from-amber-500/15 to-orange-500/15 text-amber-600'
        subtitle='Cost of borrowing'
      />

      <StatCard
        title='Total Outlay'
        value={formatCurrency(result.totalPayment)}
        icon={<DollarSign size={24} />}
        color='from-purple-500/15 to-fuchsia-500/15 text-purple-600'
        subtitle='Principal + interest'
      />
    </div>
  );
}
