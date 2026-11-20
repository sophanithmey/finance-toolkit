import { useState } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

import GoldCalculator from '../features/gold/components/gold-calculator';
import GoldForm from '../features/gold/components/gold-form';
import GoldPriceCard from '../features/gold/components/gold-price-card';
import GoldQuickPrice from '../features/gold/components/gold-quick-price';

import { useGoldPrice } from '../features/gold/hooks/use-gold-price';

export default function GoldPricePage() {
  const [goldType, setGoldType] = useState('SJL1L10');
  const { data, isLoading, error, refetch } = useGoldPrice(goldType);

  const usdVndRate = 26150;

  if (isLoading) {
    return (
      <div className='space-y-6'>
        <div className='h-20 animate-pulse rounded-2xl bg-slate-200/60 dark:bg-slate-800/60' />
        <div className='h-56 animate-pulse rounded-2xl bg-slate-200/60 dark:bg-slate-800/60' />
        <div className='grid gap-6 md:grid-cols-2'>
          <div className='h-48 animate-pulse rounded-2xl bg-slate-200/60 dark:bg-slate-800/60' />
          <div className='h-48 animate-pulse rounded-2xl bg-slate-200/60 dark:bg-slate-800/60' />
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className='flex flex-col items-center justify-center rounded-2xl border border-rose-200 bg-rose-50/50 p-10 text-center dark:border-rose-900/50 dark:bg-rose-950/20'>
        <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-rose-100 text-rose-600 dark:bg-rose-900/50 dark:text-rose-400'>
          <AlertCircle size={24} />
        </div>
        <h3 className='mt-3 text-base font-bold text-slate-900 dark:text-slate-100'>Failed to load gold pricing</h3>
        <p className='mt-1 text-xs text-slate-500 dark:text-slate-400'>The upstream pricing API is currently unreachable.</p>
        <button
          onClick={() => refetch()}
          className='mt-4 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-slate-800 transition dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100'
        >
          <RefreshCw size={13} />
          Retry Request
        </button>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      <GoldForm value={goldType} onChange={setGoldType} />

      <GoldPriceCard
        name={data.name}
        buy={data.buy}
        sell={data.sell}
        updatedAt={`${data.date} ${data.time}`}
        usdRate={usdVndRate}
      />

      <GoldCalculator sellPrice={data.sell} usdRate={usdVndRate} />

      <GoldQuickPrice sellPrice={data.sell} usdRate={usdVndRate} />
    </div>
  );
}
