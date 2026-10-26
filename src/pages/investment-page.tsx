import { useState, useCallback } from 'react';

import InvestmentForm from '../features/investment/components/investment-form';
import InvestmentSummary from '../features/investment/components/investment-summary';
import GrowthBreakdown from '../features/investment/components/growth-breakdown';

import { calculateInvestmentGrowth } from '../features/investment/utils';
import type { InvestmentFormValues, InvestmentResult } from '../features/investment/types';

export default function InvestmentPage() {
  const [result, setResult] = useState<InvestmentResult>(() =>
    calculateInvestmentGrowth(5000, 300, 8, 15, 'monthly'),
  );

  const handleCalculate = useCallback((data: InvestmentFormValues) => {
    setResult(
      calculateInvestmentGrowth(
        data.initialAmount,
        data.monthlyDeposit,
        data.annualRate,
        data.years,
        data.frequency,
      ),
    );
  }, []);

  return (
    <div className='space-y-6'>
      <InvestmentForm onCalculate={handleCalculate} />

      <InvestmentSummary result={result} />

      <GrowthBreakdown result={result} />
    </div>
  );
}
