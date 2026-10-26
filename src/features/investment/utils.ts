import type {
  CompoundingFrequency,
  InvestmentResult,
  YearlyGrowthMilestone,
} from './types';

export function calculateInvestmentGrowth(
  initialAmount: number,
  monthlyDeposit: number,
  annualRate: number,
  years: number,
  frequency: CompoundingFrequency = 'monthly',
): InvestmentResult {
  const annualDecimal = annualRate / 100;
  const n = frequency === 'monthly' ? 12 : frequency === 'quarterly' ? 4 : 1;
  const periodRate = annualDecimal / n;
  const periodsPerYear = n;
  const depositsPerPeriod = 12 / n;

  let currentBalance = initialAmount;
  let totalDeposited = initialAmount;
  const milestones: YearlyGrowthMilestone[] = [];

  for (let year = 1; year <= years; year++) {
    for (let period = 1; period <= periodsPerYear; period++) {
      // Add regular monthly contributions during this period
      const periodicDeposit = monthlyDeposit * depositsPerPeriod;
      currentBalance = (currentBalance + periodicDeposit) * (1 + periodRate);
      totalDeposited += periodicDeposit;
    }

    const interestEarned = Math.max(currentBalance - totalDeposited, 0);

    milestones.push({
      year,
      balance: Number(currentBalance.toFixed(2)),
      contributions: Number(totalDeposited.toFixed(2)),
      interestEarned: Number(interestEarned.toFixed(2)),
    });
  }

  const finalBalance = Number(currentBalance.toFixed(2));
  const totalPrincipal = Number(totalDeposited.toFixed(2));
  const totalInterest = Number(Math.max(finalBalance - totalPrincipal, 0).toFixed(2));
  const multiplier = totalPrincipal > 0 ? Number((finalBalance / totalPrincipal).toFixed(2)) : 1;

  return {
    finalBalance,
    totalPrincipal,
    totalInterest,
    multiplier,
    milestones,
  };
}
