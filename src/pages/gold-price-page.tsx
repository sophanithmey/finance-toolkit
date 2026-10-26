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
        <div className='h-24 animate-pulse rounded-3xl bg-slate-200/80' />
        <div className='h-64 animate-pulse rounded-3xl bg-slate-200/80' />
        <div className='grid gap-6 md:grid-cols-2'>
          <div className='h-52 animate-pulse rounded-3xl bg-slate-200/80' />
          <div className='h-52 animate-pulse rounded-3xl bg-slate-200/80' />
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className='flex flex-col items-center justify-center rounded-3xl border border-rose-200 bg-rose-50/50 p-12 text-center'>
        <div className='flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-100 text-rose-600'>
          <AlertCircle size={28} />
        </div>
        <h3 className='mt-4 text-lg font-bold text-slate-900'>Failed to load gold pricing</h3>
        <p className='mt-1 text-sm text-slate-500'>The upstream pricing API is currently unreachable.</p>
        <button
          onClick={() => refetch()}
          className='mt-5 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 transition'
        >
          <RefreshCw size={14} />
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