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
    <Card className='relative overflow-hidden bg-linear-to-br from-amber-600 via-amber-500 to-yellow-600 text-white shadow-xl border-amber-400/30'>
      {/* Ambient gold glow */}
      <div className='pointer-events-none absolute -right-12 -top-12 h-56 w-56 rounded-full bg-white/20 blur-2xl' />
      <div className='pointer-events-none absolute -bottom-10 -left-10 h-44 w-44 rounded-full bg-yellow-300/20 blur-xl' />

      <div className='relative z-10 flex flex-col justify-between gap-6'>
        <div className='flex items-start justify-between'>
          <div>
            <div className='inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-amber-100 backdrop-blur-md'>
              <Sparkles size={12} className='text-yellow-200' />
              <span>Live Gold Benchmark</span>
            </div>

            <h1 className='mt-2.5 text-2xl sm:text-3xl font-black tracking-tight text-white'>
              {name}
            </h1>
          </div>

          <div className='flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-white backdrop-blur-md shadow-xs'>
            <Coins size={26} />
          </div>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-2xl bg-black/15 p-5 backdrop-blur-md border border-white/10'>
          <div className='space-y-1 border-b sm:border-b-0 sm:border-r border-white/15 pb-4 sm:pb-0 sm:pr-4'>
            <div className='flex items-center justify-between'>
              <span className='text-xs font-bold tracking-wider uppercase text-amber-200'>
                Buy Rate (Bid)
              </span>
              <span className='rounded-full bg-emerald-500/30 px-2 py-0.5 text-[10px] font-bold text-emerald-200 border border-emerald-400/30'>
                We Buy
              </span>
            </div>
            <h2 className='tabular-nums text-2xl sm:text-3xl font-black text-white'>
              {formatCurrency(buyUsd)}
            </h2>
            <p className='text-xs font-medium text-amber-100/90'>
              ≈ {formatNumber(buy)} ₫ / Tael
            </p>
          </div>

          <div className='space-y-1 sm:pl-4'>
            <div className='flex items-center justify-between'>
              <span className='text-xs font-bold tracking-wider uppercase text-amber-200'>
                Sell Rate (Ask)
              </span>
              <span className='rounded-full bg-amber-400/30 px-2 py-0.5 text-[10px] font-bold text-yellow-100 border border-amber-300/30'>
                We Sell
              </span>
            </div>
            <h2 className='tabular-nums text-2xl sm:text-3xl font-black text-white'>
              {formatCurrency(sellUsd)}
            </h2>
            <p className='text-xs font-medium text-amber-100/90'>
              ≈ {formatNumber(sell)} ₫ / Tael
            </p>
          </div>
        </div>

        <div className='flex flex-wrap items-center justify-between gap-3 text-xs text-amber-100/90 border-t border-white/15 pt-3'>
          <span>
            Ref Rate: <strong className='text-white'>{formatNumber(usdRate)} ₫/USD</strong>
          </span>

          <span className='inline-flex items-center gap-1.5'>
            <span>Updated:</span>
            <strong className='text-white'>{updatedAt}</strong>
            <ArrowUpRight size={14} className='text-yellow-200' />
          </span>
        </div>
      </div>
    </Card>
  );
}