import { FileSpreadsheet } from 'lucide-react';

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
      variant='outline'
      size='sm'
      onClick={() => exportLoanSchedule(schedule)}
      className='text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800 border-emerald-200/80 dark:text-emerald-400 dark:border-emerald-800 dark:hover:bg-emerald-950/40'
    >
      <FileSpreadsheet size={14} className='text-emerald-600 dark:text-emerald-400' />
      <span>Export Excel</span>
    </Button>
  );
}
