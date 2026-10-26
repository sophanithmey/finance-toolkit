export type CompoundingFrequency = 'monthly' | 'quarterly' | 'annually';

export interface InvestmentFormValues {
  initialAmount: number;
  monthlyDeposit: number;
  annualRate: number;
  years: number;
  frequency: CompoundingFrequency;
}

export interface YearlyGrowthMilestone {
  year: number;
  balance: number;
  contributions: number;
  interestEarned: number;
}

export interface InvestmentResult {
  finalBalance: number;
  totalPrincipal: number;
  totalInterest: number;
  multiplier: number;
  milestones: YearlyGrowthMilestone[];
}
