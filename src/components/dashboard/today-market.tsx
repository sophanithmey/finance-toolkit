import { Coins, DollarSign, RefreshCw } from 'lucide-react';

import MarketCard from './market-card';

interface Props {
  goldPrice: string;
  goldChange: string;
  exchangeRate: string;
  updatedTime: string;
}

export default function TodayMarket({
  goldPrice,
  goldChange,
  exchangeRate,
  updatedTime,
}: Props) {
  return (
    <div className='rounded-r-3xl bg-slate-50 p-6'>
      <div className='mb-6 flex items-center justify-between'>
        <div>
          <h2 className='text-xl font-bold'>Today's Market</h2>

          <p className='text-sm text-slate-500'>Live Financial Snapshot</p>
        </div>

        <div className='flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-600'>
          <span className='h-2 w-2 rounded-full bg-green-500' /> Live
        </div>
      </div>

      <div className='space-y-4'>
        <MarketCard
          title='Gold Price (Sell)'
          value={goldPrice}
          subtitle='SJC 9999'
          change={Number(goldChange)}
          icon={Coins}
          color='bg-yellow-100 text-yellow-600'
        />

        <MarketCard
          isExchange={true}
          title='USD → KHR'
          value={exchangeRate.toLocaleString()}
          subtitle='1 USD'
          icon={DollarSign}
          color='bg-green-100 text-green-600'
        />
      </div>

      <div className='mt-6 rounded-2xl bg-linear-to-r from-indigo-600 to-purple-600 p-4 text-white'>
        <div className='flex items-center gap-2'>
          <RefreshCw size={16} />
          Updated
        </div>

        <div className='mt-2 text-lg font-bold'>{updatedTime}</div>

        <div className='text-sm text-indigo-100'>Auto refreshed from API</div>
      </div>
    </div>
  );
}
