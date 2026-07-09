export interface LoanPayment {
  month: number;
  paymentDate: string;
  payment: number;
  principal: number;
  interest: number;
  remaining: number;
}

export interface LoanSummary {
  totalLoan: number;
  totalPaid: number;
  totalInterest: number;
  months: number;
}