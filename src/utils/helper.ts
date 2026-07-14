import type {
  Expense,
  Friend,
  Settlement,
} from '../features/expense-split/types';
import type { LoanPayment } from '../features/loan/types';

export function calculateDiscount(
  amount: number,
  discount: number,
  tax: number,
  taxIncluded: boolean,
) {
  let baseAmount = amount;

  if (taxIncluded) {
    baseAmount = amount / (1 + tax / 100);
  }

  const discountAmount = baseAmount * (discount / 100);
  const subtotal = baseAmount - discountAmount;

  const taxAmount = subtotal * (tax / 100);
  const finalAmount = subtotal + taxAmount;

  return {
    originalAmount: amount,
    baseAmount,
    discountAmount,
    subtotal,
    taxAmount,
    finalAmount,
  };
}

export function calculateTotal(expenses: Expense[]) {
  return expenses.reduce((total, expense) => total + expense.amount, 0);
}

export function calculatePerPerson(total: number, people: number) {
  if (!people) return 0;

  return total / people;
}

export interface ExpenseSummary {
  totalSpent: number;
  perPerson: number;
  paidMap: Record<string, number>;
  settlements: Settlement[];
}

export function calculateExpenseSummary(
  friends: Friend[],
  expenses: Expense[],
): ExpenseSummary {
  const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  const perPerson = friends.length > 0 ? totalSpent / friends.length : 0;

  const paidMap: Record<string, number> = {};

  friends.forEach((friend) => {
    paidMap[friend.id] = 0;
  });

  expenses.forEach((expense) => {
    paidMap[expense.paidBy] += expense.amount;
  });

  const debtors: { id: string; amount: number }[] = [];
  const creditors: { id: string; amount: number }[] = [];

  friends.forEach((friend) => {
    const balance = paidMap[friend.id] - perPerson;

    if (balance > 0.01) {
      creditors.push({
        id: friend.id,
        amount: balance,
      });
    } else if (balance < -0.01) {
      debtors.push({
        id: friend.id,
        amount: Math.abs(balance),
      });
    }
  });

  const settlements: Settlement[] = [];

  let debtorIndex = 0;
  let creditorIndex = 0;

  while (debtorIndex < debtors.length && creditorIndex < creditors.length) {
    const debtor = debtors[debtorIndex];
    const creditor = creditors[creditorIndex];

    const payment = Math.min(debtor.amount, creditor.amount);

    settlements.push({
      from: debtor.id,
      to: creditor.id,
      amount: Number(payment.toFixed(2)),
    });

    debtor.amount -= payment;
    creditor.amount -= payment;

    if (debtor.amount < 0.01) debtorIndex++;
    if (creditor.amount < 0.01) creditorIndex++;
  }

  return {
    totalSpent,
    perPerson,
    paidMap,
    settlements,
  };
}

export function generateSchedule(
  loanAmount: number,
  loanMonths: number,
  annualInterest: number,
  startDate: string
): LoanPayment[] {
  const schedule: LoanPayment[] = [];

  const monthlyRate = annualInterest / 12 / 100;

  // Calculate monthly payment
  const monthlyPayment =
    monthlyRate === 0
      ? loanAmount / loanMonths
      : (loanAmount * monthlyRate) /
        (1 - Math.pow(1 + monthlyRate, -loanMonths));

  let balance = loanAmount;
  const paymentDate = new Date(startDate);

  for (let month = 1; month <= loanMonths; month++) {
    const interest = balance * monthlyRate;

    let principal = monthlyPayment - interest;

    // Last payment adjustment to remove rounding issues
    if (month === loanMonths || principal > balance) {
      principal = balance;
    }

    const payment = principal + interest;

    balance -= principal;

    schedule.push({
      month,

      paymentDate: paymentDate
        .toISOString()
        .split("T")[0],

      payment: Number(payment.toFixed(2)),

      principal: Number(principal.toFixed(2)),

      interest: Number(interest.toFixed(2)),

      remaining: Number(
        Math.max(balance, 0).toFixed(2)
      ),
    });

    paymentDate.setMonth(
      paymentDate.getMonth() + 1
    );
  }

  return schedule;
}

export function formatCurrency(
  amount: number,
  currency: string = "USD",
  locale = "en-US"
) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat().format(value);
}

export function convertCurrency(
  amount: number,
  rate: number
) {
  return amount / rate;
}