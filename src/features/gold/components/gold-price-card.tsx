import { ArrowUpRight, Coins, Sparkles } from 'lucide-react';

import Card from '../../../components/ui/card';
import {
  convertCurrency,
  formatCurrency,
  formatNumber,
} from '../../../utils/helper';

interface Props {
  name: string;
  buy: number;
  sell: number;
  updatedAt: string;
  usdRate: number;
}

export default function GoldPriceCard({
  name,
  buy,
  sell,
  updatedAt,
  usdRate,
}: Props) {
  const buyUsd = convertCurrency(buy, usdRate);
  const sellUsd = convertCurrency(sell, usdRate);

  return (
    <Card className='relative overflow-hidden bg-slate-900 text-white shadow-md border-slate-800 dark:bg-slate-900'>
      <div className='relative z-10 flex flex-col justify-between gap-5'>
        <div className='flex items-start justify-between'>
          <div>
            <div className='inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-semibold text-amber-300'>
              <Sparkles size={11} className='text-amber-400' />
              <span>SJC Market Benchmark</span>
            </div>

            <h1 className='mt-2 text-xl sm:text-2xl font-black tracking-tight text-white'>
              {name}
            </h1>
          </div>

          <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-amber-400'>
            <Coins size={20} />
          </div>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-xl bg-white/5 p-4 border border-white/10'>
          <div className='space-y-1 border-b sm:border-b-0 sm:border-r border-white/10 pb-3 sm:pb-0 sm:pr-4'>
            <div className='flex items-center justify-between'>
              <span className='text-[10px] font-bold tracking-wider uppercase text-slate-400'>
                Buy Rate (Bid)
              </span>
              <span className='rounded bg-emerald-500/20 px-1.5 py-0.2 text-[9px] font-bold text-emerald-300'>
                We Buy
              </span>
            </div>
            <div className='tabular-nums text-2xl font-black text-white'>
              {formatCurrency(buyUsd)}
            </div>
            <p className='text-xs text-slate-400'>
              ≈ {formatNumber(buy)} ₫ / Tael
            </p>
          </div>

          <div className='space-y-1 sm:pl-4'>
            <div className='flex items-center justify-between'>
              <span className='text-[10px] font-bold tracking-wider uppercase text-slate-400'>
                Sell Rate (Ask)
              </span>
              <span className='rounded bg-amber-400/20 px-1.5 py-0.2 text-[9px] font-bold text-amber-300'>
                We Sell
              </span>
            </div>
            <div className='tabular-nums text-2xl font-black text-white'>
              {formatCurrency(sellUsd)}
            </div>
            <p className='text-xs text-slate-400'>
              ≈ {formatNumber(sell)} ₫ / Tael
            </p>
          </div>
        </div>

        <div className='flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 border-t border-white/10 pt-3'>
          <span>
            Ref Rate: <strong className='text-white font-mono'>{formatNumber(usdRate)} ₫/USD</strong>
          </span>

          <span className='inline-flex items-center gap-1.5'>
            <span>Updated:</span>
            <strong className='text-white font-mono'>{updatedAt}</strong>
            <ArrowUpRight size={13} className='text-amber-400' />
          </span>
        </div>
      </div>
    </Card>
  );
}
