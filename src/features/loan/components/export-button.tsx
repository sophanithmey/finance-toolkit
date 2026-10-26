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
      className='border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-300'
    >
      <FileSpreadsheet size={16} className='text-emerald-600' />
      <span>Export Excel</span>
    </Button>
  );
}
