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
    <div className='relative overflow-hidden rounded-3xl bg-linear-to-br from-indigo-600 via-indigo-700 to-blue-700 p-8 text-white shadow-xl border border-indigo-500/30'>
      {/* Ambient background glows */}
      <div className='pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-2xl' />
      <div className='pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-cyan-400/20 blur-2xl' />

      <div className='relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-end'>
        <div>
          <div className='inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-indigo-100 backdrop-blur-md'>
            <Sparkles size={13} className='text-amber-300' />
            <span>Converted Amount</span>
          </div>

          <div className='mt-4 flex items-baseline gap-2'>
            <h2 className='tabular-nums text-4xl sm:text-5xl font-black tracking-tight text-white'>
              {converted.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </h2>
            <span className='text-2xl sm:text-3xl font-extrabold text-indigo-200'>
              {to}
            </span>
          </div>

          <div className='mt-4 flex items-center gap-2 text-sm font-semibold text-indigo-100'>
            <span>{amount.toLocaleString()} {from}</span>
            <ArrowRight size={14} className='text-indigo-300' />
            <span>{converted.toFixed(2)} {to}</span>
          </div>
        </div>

        <div className='rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-md text-right text-xs'>
          <p className='text-indigo-200 font-medium'>Live Unit Rate</p>
          <p className='mt-1 tabular-nums text-sm font-bold text-white'>
            1 {from} = {rate ? rate.toFixed(6) : '0'} {to}
          </p>
          <p className='mt-1 text-[11px] text-indigo-300'>
            1 {to} = {rate ? (1 / rate).toFixed(6) : '0'} {from}
          </p>
        </div>
      </div>
    </div>
  );
}