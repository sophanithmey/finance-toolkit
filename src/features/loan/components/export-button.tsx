import { Download } from 'lucide-react';

import Button from '../../../components/ui/button';

import type { LoanPayment } from '../types';
import { exportLoanSchedule } from '../export-excel';

interface Props {
  readonly schedule: LoanPayment[];
}

export default function ExportButton({ schedule }: Props) {
  if (!schedule.length) {
    return null;
  }

  return (
    <Button
      type='button'
      onClick={() => exportLoanSchedule(schedule)}
      className='flex items-center gap-2'
    >
      <Download size={18} />
      Export Excel
    </Button>
  );
}
