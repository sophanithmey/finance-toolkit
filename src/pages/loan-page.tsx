import { useState } from 'react';

import LoanForm from '../features/loan/components/loan-form';
import LoanSummary from '../features/loan/components/loan-summary';
import LoanTable from '../features/loan/components/loan-table';
import ExportButton from '../features/loan/components/export-button';

import Card from '../components/ui/card';

import type { LoanFormType } from '../features/loan/schema';
import type { LoanPayment } from '../features/loan/types';
import { generateSchedule } from '../utils/helper';
import LoanInfo from '../features/loan/components/loan-info';

export default function LoanPage() {
  const [schedule, setSchedule] = useState<LoanPayment[]>([]);

  const [loanAmount, setLoanAmount] = useState(0);

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
      <LoanInfo />
      <LoanSummary loanAmount={loanAmount} schedule={schedule} />

      <Card>
        <div className='mb-5 flex items-center justify-between'>
          <h2 className='text-xl font-bold'>Repayment Schedule</h2>

          <ExportButton schedule={schedule} />
        </div>

        <LoanTable schedule={schedule} />
      </Card>
    </div>
  );
}
