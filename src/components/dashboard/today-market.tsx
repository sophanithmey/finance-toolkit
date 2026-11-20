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
    <div className='flex flex-col justify-between bg-slate-50/60 p-5 dark:bg-slate-900/40'>
      <div>
        <div className='mb-4 flex items-center justify-between'>
          <div>
            <h3 className='text-sm font-bold text-slate-900 dark:text-slate-100'>
              Live Market Snapshot
            </h3>
            <p className='text-xs text-slate-400 dark:text-slate-500'>Real-time rate benchmarks</p>
          </div>

          <div className='inline-flex items-center gap-1.5 rounded-full border border-emerald-200/70 bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:border-emerald-800/50 dark:bg-emerald-950/50 dark:text-emerald-300'>
            <span className='h-1.5 w-1.5 rounded-full bg-emerald-500' />
            <span>Connected</span>
          </div>
        </div>

        <div className='space-y-3'>
          <MarketCard
            title='Gold SJC (Sell)'
            value={goldPrice}
            subtitle='SJC 9999 • per Tael'
            change={Number(goldChange)}
            icon={Coins}
            color='bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400'
          />

          <MarketCard
            isExchange={true}
            title='USD → KHR Exchange'
            value={exchangeRate.toLocaleString()}
            subtitle='1 USD to Cambodian Riel'
            icon={DollarSign}
            color='bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
          />
        </div>
      </div>

      <div className='mt-5 flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3 text-xs dark:border-slate-800 dark:bg-slate-900'>
        <div className='flex items-center gap-2 text-slate-500 dark:text-slate-400'>
          <RefreshCw size={12} className='text-indigo-600 dark:text-indigo-400' />
          <span>Last updated</span>
        </div>
        <span className='font-mono font-semibold text-slate-900 dark:text-slate-100'>
          {updatedTime || 'Recently'}
        </span>
      </div>
    </div>
  );
}
