import { Calendar, DollarSign, Percent, Wallet } from 'lucide-react';

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
        icon={<Wallet size={20} />}
        subtitle='Initial borrowed capital'
      />

      <StatCard
        title='Monthly Installment'
        value={formatCurrency(monthlyPayment)}
        icon={<Calendar size={20} />}
        subtitle={`Over ${schedule.length} months`}
        trend='Fixed'
      />

      <StatCard
        title='Total Interest'
        value={formatCurrency(totalInterest)}
        icon={<Percent size={20} />}
        color='bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400'
        subtitle='Cost of credit charge'
      />

      <StatCard
        title='Total Outlay'
        value={formatCurrency(totalPaid)}
        icon={<DollarSign size={20} />}
        subtitle='Principal + Interest'
      />
    </div>
  );
}
