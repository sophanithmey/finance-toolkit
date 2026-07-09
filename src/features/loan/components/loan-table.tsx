import type { LoanPayment } from '../types';

interface Props {
  readonly schedule: LoanPayment[];
}

export default function LoanTable({ schedule }: Props) {
  if (!schedule.length) return null;

  return (
    <div className='overflow-auto rounded-2xl border bg-white'>
      <table className='min-w-full'>
        <thead className='bg-slate-100'>
          <tr>
            <th className='p-3'>Month</th>
            <th>Payment Date</th>
            <th>Payment</th>
            <th>Principal</th>
            <th>Interest</th>
            <th>Remaining</th>
          </tr>
        </thead>

        <tbody>
          {schedule.map((row) => (
            <tr
              key={row.month}
              className='border-t text-center hover:bg-slate-50'
            >
              <td className='p-3'>{row.month}</td>

              <td>{row.paymentDate}</td>

              <td>${row.payment.toFixed(2)}</td>

              <td>${row.principal.toFixed(2)}</td>

              <td>${row.interest.toFixed(2)}</td>

              <td>${row.remaining.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
