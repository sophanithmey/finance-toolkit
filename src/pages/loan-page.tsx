import { useState } from 'react';

import LoanForm from '../features/loan/components/loan-form';
import LoanSummary from '../features/loan/components/loan-summary';
import LoanTable from '../features/loan/components/loan-table';
import ExportButton from '../features/loan/components/export-button';
import LoanInfo from '../features/loan/components/loan-info';
import Card from '../components/ui/card';

import type { LoanFormType } from '../features/loan/schema';
import type { LoanPayment } from '../features/loan/types';
import { generateSchedule } from '../utils/helper';

export default function LoanPage() {
  const defaultAmount = 10000;
  const defaultMonths = 12;
  const defaultInterest = 6.5;
  const defaultDate = new Date().toISOString().split('T')[0];

  const [loanAmount, setLoanAmount] = useState(defaultAmount);
  const [schedule, setSchedule] = useState<LoanPayment[]>(() =>
    generateSchedule(defaultAmount, defaultMonths, defaultInterest, defaultDate)
  );

  const onGenerate = (data: LoanFormType) => {
    setLoanAmount(data.loanAmount);
    setSchedule(
      generateSchedule(
        data.loanAmount,
        data.loanMonths,
        data.annualInterest,
        data.startDate,
      ),
    );
  };

  return (
    <div className='space-y-6'>
      <LoanForm onGenerate={onGenerate} />

      <LoanSummary loanAmount={loanAmount} schedule={schedule} />

      <Card>
        <div className='mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3 dark:border-slate-800'>
          <div>
            <h2 className='text-sm font-bold text-slate-900 dark:text-slate-100'>
              Amortization Breakdown
            </h2>
            <p className='text-xs text-slate-400 dark:text-slate-500'>
              Monthly schedule with principal, interest, and residual debt
            </p>
          </div>

          <ExportButton schedule={schedule} />
        </div>

        <LoanTable schedule={schedule} />
      </Card>

      <LoanInfo />
    </div>
  );
}
