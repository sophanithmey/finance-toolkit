import { Calendar, DollarSign, Coins, Wallet } from 'lucide-react';

import StatCard from '../../../components/ui/stat-card';
import { formatCurrency } from '../../../utils/helper';
import type { LoanPayment } from '../types';

interface Props {
  readonly schedule: LoanPayment[];
  readonly loanAmount: number;
}

export default function LoanSummary({ schedule, loanAmount }: Props) {
  if (!schedule.length) return null;

  const totalInterest = schedule.reduce((sum, row) => sum + row.interest, 0);
  const totalPaid = schedule.reduce((sum, row) => sum + row.payment, 0);
  const monthlyPayment = schedule[0]?.payment || 0;

  return (
    <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
      <StatCard
        title='Loan Principal'
        value={formatCurrency(loanAmount)}
        icon={<Wallet size={24} />}
        color='from-blue-500/15 to-indigo-500/15 text-blue-600'
        subtitle='Total borrowed amount'
      />

      <StatCard
        title='Total Repayment'
        value={formatCurrency(totalPaid)}
        icon={<DollarSign size={24} />}
        color='from-purple-500/15 to-indigo-500/15 text-purple-600'
        subtitle='Principal + Interest'
      />

      <StatCard
        title='Total Interest'
        value={formatCurrency(totalInterest)}
        icon={<Coins size={24} />}
        color='from-amber-500/15 to-orange-500/15 text-amber-600'
        subtitle='Total finance charge'
      />

      <StatCard
        title='Monthly Installment'
        value={formatCurrency(monthlyPayment)}
        icon={<Calendar size={24} />}
        color='from-emerald-500/15 to-teal-500/15 text-emerald-600'
        subtitle={`Over ${schedule.length} months`}
        trend='Fixed'
      />
    </div>
  );
}
