import type { LoanPayment } from '../types';
import { formatCurrency } from '../../../utils/helper';

interface Props {
  readonly schedule: LoanPayment[];
}

export default function LoanTable({ schedule }: Props) {
  if (!schedule.length) return null;

  return (
    <div className='overflow-x-auto rounded-2xl border border-slate-200/80 bg-white'>
      <table className='w-full text-left text-sm'>
        <thead className='border-b border-slate-100 bg-slate-50/75 text-[11px] font-bold uppercase tracking-wider text-slate-400'>
          <tr>
            <th className='py-3.5 px-4 text-center'>#</th>
            <th className='py-3.5 px-4'>Payment Date</th>
            <th className='py-3.5 px-4 text-right'>Payment</th>
            <th className='py-3.5 px-4 text-right'>Principal</th>
            <th className='py-3.5 px-4 text-right'>Interest</th>
            <th className='py-3.5 px-4 text-right'>Remaining Balance</th>
          </tr>
        </thead>

        <tbody className='divide-y divide-slate-100 text-xs font-semibold text-slate-700'>
          {schedule.map((row) => (
            <tr
              key={row.month}
              className='hover:bg-indigo-50/40 transition-colors'
            >
              <td className='py-3 px-4 text-center text-slate-400 font-bold'>{row.month}</td>

              <td className='py-3 px-4 text-slate-600 font-medium'>{row.paymentDate}</td>

              <td className='py-3 px-4 text-right tabular-nums font-bold text-slate-900'>
                {formatCurrency(row.payment)}
              </td>

              <td className='py-3 px-4 text-right tabular-nums text-indigo-600'>
                {formatCurrency(row.principal)}
              </td>

              <td className='py-3 px-4 text-right tabular-nums text-amber-600'>
                {formatCurrency(row.interest)}
              </td>

              <td className='py-3 px-4 text-right tabular-nums font-bold text-slate-900'>
                {formatCurrency(row.remaining)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
