import Hero from '../components/dashboard/hero';
import FinancePlanner from '../components/dashboard/finance-planner';

import { useDashboard } from '../hooks/use-dashboard';
import { convertCurrency } from '../utils/helper';

export default function DashboardPage() {
  const { goldData, isLoading, exchangeData } = useDashboard();

  if (isLoading) {
    return (
      <div className='space-y-6'>
        <div className='h-56 animate-pulse rounded-3xl bg-slate-200' />

        <div className='grid gap-6 lg:grid-cols-2'>
          <div className='h-96 animate-pulse rounded-3xl bg-slate-200' />

          <div className='h-96 animate-pulse rounded-3xl bg-slate-200' />
        </div>
      </div>
    );
  }

  const goldChange = () => {
    const change = Number(goldData?.sell) - Number(goldData?.buy);
    return convertCurrency(change, 26150);
  };

  return (
    <div className='space-y-8'>
      <Hero />

      <FinancePlanner
        goldPrice={String(goldData?.sell) || ''}
        exchangeRate={String(exchangeData?.rates['KHR'] || 0) || ''}
        goldChange={String(goldChange().toFixed(2))}
        updatedTime={goldData?.time || ''}
      />

    </div>
  );
}
