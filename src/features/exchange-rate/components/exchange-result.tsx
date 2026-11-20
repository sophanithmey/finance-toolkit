import { ArrowRight, Sparkles } from 'lucide-react';

interface Props {
  readonly amount: number;
  readonly from: string;
  readonly to: string;
  readonly rate: number;
}

export default function ExchangeResult({ amount, from, to, rate }: Props) {
  const converted = amount * rate;

  return (
    <div className='relative overflow-hidden rounded-2xl border border-slate-900 bg-slate-900 p-6 sm:p-7 text-white shadow-sm dark:border-slate-800 dark:bg-slate-900'>
      <div className='relative z-10 flex flex-col justify-between gap-5 md:flex-row md:items-end'>
        <div>
          <div className='inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-semibold text-slate-300'>
            <Sparkles size={11} className='text-amber-400' />
            <span>Converted Total</span>
          </div>

          <div className='mt-3 flex items-baseline gap-2'>
            <div className='tabular-nums text-3xl sm:text-4xl font-black tracking-tight text-white'>
              {converted.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
            <span className='text-xl sm:text-2xl font-bold text-slate-300'>
              {to}
            </span>
          </div>

          <div className='mt-3 flex items-center gap-2 text-xs font-semibold text-slate-300'>
            <span>{amount.toLocaleString()} {from}</span>
            <ArrowRight size={13} className='text-slate-400' />
            <span>{converted.toFixed(2)} {to}</span>
          </div>
        </div>

        <div className='rounded-xl border border-white/10 bg-white/5 p-3 text-right text-xs'>
          <p className='text-slate-400 font-medium'>Live Exchange Parity</p>
          <p className='mt-1 tabular-nums text-xs font-bold text-white'>
            1 {from} = {rate ? rate.toFixed(6) : '0'} {to}
          </p>
          <p className='mt-0.5 text-[10px] text-slate-400'>
            1 {to} = {rate ? (1 / rate).toFixed(6) : '0'} {from}
          </p>
        </div>
      </div>
    </div>
  );
}
