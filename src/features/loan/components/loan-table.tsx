import type { LoanPayment } from '../types';
import { formatCurrency } from '../../../utils/helper';

interface Props {
  readonly schedule: LoanPayment[];
}

export default function LoanTable({ schedule }: Props) {
  if (!schedule.length) return null;

  return (
    <div className='overflow-x-auto rounded-xl border border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900'>
      <table className='w-full text-left text-sm'>
        <thead className='border-b border-slate-100 bg-slate-50/75 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-500'>
          <tr>
            <th className='py-3 px-3.5 text-center'>#</th>
            <th className='py-3 px-3.5'>Payment Date</th>
            <th className='py-3 px-3.5 text-right'>Payment</th>
            <th className='py-3 px-3.5 text-right'>Principal</th>
            <th className='py-3 px-3.5 text-right'>Interest</th>
            <th className='py-3 px-3.5 text-right'>Remaining Balance</th>
          </tr>
        </thead>

        <tbody className='divide-y divide-slate-100 text-xs font-semibold text-slate-700 dark:divide-slate-800 dark:text-slate-300'>
          {schedule.map((row) => (
            <tr
              key={row.month}
              className='hover:bg-slate-50/70 dark:hover:bg-slate-800/50 transition-colors'
            >
              <td className='py-2.5 px-3.5 text-center text-slate-400 font-bold dark:text-slate-500'>
                {row.month}
              </td>

              <td className='py-2.5 px-3.5 text-slate-600 font-medium dark:text-slate-400'>
                {row.paymentDate}
              </td>

              <td className='py-2.5 px-3.5 text-right tabular-nums font-bold text-slate-900 dark:text-slate-100'>
                {formatCurrency(row.payment)}
              </td>

              <td className='py-2.5 px-3.5 text-right tabular-nums text-indigo-600 dark:text-indigo-400'>
                {formatCurrency(row.principal)}
              </td>

              <td className='py-2.5 px-3.5 text-right tabular-nums text-amber-600 dark:text-amber-400'>
                {formatCurrency(row.interest)}
              </td>

              <td className='py-2.5 px-3.5 text-right tabular-nums font-bold text-slate-900 dark:text-slate-100'>
                {formatCurrency(row.remaining)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
