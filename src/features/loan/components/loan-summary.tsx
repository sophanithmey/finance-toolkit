import { Calendar, DollarSign, Coins, Wallet } from 'lucide-react';

import StatCard from '../../../components/ui/stat-card';
import type { LoanPayment } from '../types';

interface Props {
  readonly schedule: LoanPayment[];
  readonly loanAmount: number;
}

export default function LoanSummary({ schedule, loanAmount }: Props) {
  if (!schedule.length) return null;

  const totalInterest = schedule.reduce((sum, row) => sum + row.interest, 0);

  const totalPaid = schedule.reduce((sum, row) => sum + row.payment, 0);

  return (
    <div className='grid gap-5 md:grid-cols-4'>
      <StatCard
        title='Loan'
        value={`$${loanAmount.toFixed(2)}`}
        icon={<Wallet size={24} />}
      />

      <StatCard
        title='Total Paid'
        value={`$${totalPaid.toFixed(2)}`}
        icon={<DollarSign size={24} />}
      />

      <StatCard
        title='Interest'
        value={`$${totalInterest.toFixed(2)}`}
        icon={<Coins size={24} />}
      />

      <StatCard
        title='Months'
        value={String(schedule.length)}
        icon={<Calendar size={24} />}
      />
    </div>
  );
}
