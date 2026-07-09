export interface Friend {
  id: string;
  name: string;
}

export interface Expense {
  id: string;
  title: string;
  amount: number;
  paidBy: string; // Friend ID
  date: string;
}

export interface Summary {
  totalSpent: number;
  perPerson: number;
}

export interface Settlement {
  from: string;
  to: string;
  amount: number;
}