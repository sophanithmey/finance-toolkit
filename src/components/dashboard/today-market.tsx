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
    <div className='flex flex-col justify-between bg-slate-50/70 p-6'>
      <div>
        <div className='mb-5 flex items-center justify-between'>
          <div>
            <h2 className='text-base font-extrabold text-slate-900'>
              Live Financial Market
            </h2>
            <p className='text-xs text-slate-400'>Real-time rate snapshot</p>
          </div>

          <div className='inline-flex items-center gap-1.5 rounded-full border border-emerald-200/80 bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700'>
            <span className='relative flex h-2 w-2'>
              <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75' />
              <span className='relative inline-flex h-2 w-2 rounded-full bg-emerald-500' />
            </span>
            <span>Live Feed</span>
          </div>
        </div>

        <div className='space-y-3.5'>
          <MarketCard
            title='Gold Price (Sell)'
            value={goldPrice}
            subtitle='SJC 9999 • per Tael'
            change={Number(goldChange)}
            icon={Coins}
            color='bg-amber-100 text-amber-700'
          />

          <MarketCard
            isExchange={true}
            title='USD → KHR Exchange'
            value={exchangeRate.toLocaleString()}
            subtitle='1 USD in Riel'
            icon={DollarSign}
            color='bg-emerald-100 text-emerald-700'
          />
        </div>
      </div>

      <div className='mt-6 rounded-2xl border border-indigo-100 bg-linear-to-r from-indigo-900 to-blue-900 p-4 text-white shadow-md'>
        <div className='flex items-center justify-between text-xs font-semibold text-indigo-200'>
          <span className='inline-flex items-center gap-1.5'>
            <RefreshCw size={12} className='animate-spin' style={{ animationDuration: '6s' }} />
            Last Synced
          </span>
          <span className='text-[11px] text-indigo-300'>Auto-Refreshed</span>
        </div>

        <div className='mt-1.5 tabular-nums text-base font-black text-white'>
          {updatedTime || 'Recently'}
        </div>
      </div>
    </div>
  );
}
