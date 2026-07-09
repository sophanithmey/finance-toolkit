import * as XLSX from 'xlsx';
import type { LoanPayment } from './types';

export function exportLoanSchedule(schedule: LoanPayment[]) {
  const rows = schedule.map((item) => ({
    Month: item.month,
    "Payment Date": item.paymentDate,
    Payment: item.payment,
    Principal: item.principal,
    Interest: item.interest,
    Remaining: item.remaining,
  }));

  const worksheet = XLSX.utils.json_to_sheet(rows);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Loan Schedule"
  );

  XLSX.writeFile(
    workbook,
    "loan-repayment-schedule.xlsx"
  );
}