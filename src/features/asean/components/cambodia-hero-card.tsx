import { Link } from 'react-router-dom';
import { ArrowRight, Flame, Scale, Sparkles, TrendingDown } from 'lucide-react';
import type { NormalizedCountryFuel, DisplayUnit } from '../../../types/fuel';
import { convertUsdPerLiterToDisplay, getDisplayUnitShort } from '../../../utils/units';

interface CambodiaHeroCardProps {
  readonly cambodia: NormalizedCountryFuel | null;
  readonly aseanAvgGasUsd: number;
  readonly displayUnit: DisplayUnit;
}

export default function CambodiaHeroCard({
  cambodia,
  aseanAvgGasUsd,
  displayUnit,
}: CambodiaHeroCardProps) {
  const unitLabel = getDisplayUnitShort(displayUnit);

  if (!cambodia) {
    return <div className='h-48 animate-pulse rounded-3xl bg-slate-200/60 dark:bg-slate-800/60' />;
  }

  const gasUsd = convertUsdPerLiterToDisplay(cambodia.usdPrices.gasoline, displayUnit);
  const dieselUsd = convertUsdPerLiterToDisplay(cambodia.usdPrices.diesel, displayUnit);
  const camGasRaw = cambodia.usdPrices.gasoline || 0;
  const vsAseanPct = aseanAvgGasUsd > 0 ? ((camGasRaw - aseanAvgGasUsd) / aseanAvgGasUsd) * 100 : 0;

  return (
    <div className='relative overflow-hidden rounded-3xl border border-indigo-200/60 bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950 p-6 text-white shadow-xl dark:border-indigo-900/40'>
      {/* Decorative background glow */}
      <div className='pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-indigo-500/15 blur-3xl' />

      <div className='relative z-10 flex flex-wrap items-start justify-between gap-4'>
        {/* Country Header */}
        <div className='flex items-center gap-3.5'>
          <span className='text-4xl filter drop-shadow-md'>🇰🇭</span>
          <div>
            <div className='flex items-center gap-2'>
              <span className='inline-flex items-center gap-1 rounded-full bg-amber-400/20 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-amber-300'>
                <Sparkles size={11} /> Featured Country
              </span>
              <span className='rounded bg-white/10 px-1.5 py-0.5 font-mono text-[11px] font-semibold text-slate-300'>
                KH / KHM
              </span>
            </div>
            <h2 className='mt-1 text-2xl font-black tracking-tight text-white flex items-center gap-2'>
              <span>Cambodia</span>
              <span className='text-sm font-normal text-indigo-300'>(កម្ពុជា)</span>
            </h2>
            <p className='text-xs text-slate-300 mt-0.5'>
              National Currency: <span className='font-semibold text-white'>KHR (៛)</span> • Capital:{' '}
              <span className='font-semibold text-white'>Phnom Penh</span>
            </p>
          </div>
        </div>

        {/* Vs ASEAN Delta */}
        <div className='rounded-2xl border border-white/10 bg-white/5 p-3 text-right backdrop-blur-xs'>
          <p className='text-[10px] font-bold uppercase tracking-wider text-slate-400'>Vs ASEAN Average</p>
          <div
            className={`mt-0.5 font-mono text-base font-black ${
              vsAseanPct <= 0 ? 'text-emerald-400' : 'text-rose-400'
            }`}
          >
            {vsAseanPct > 0 ? `+${vsAseanPct.toFixed(1)}%` : `${vsAseanPct.toFixed(1)}%`}
          </div>
          <p className='text-[10px] text-slate-400'>Avg: ${aseanAvgGasUsd.toFixed(2)}/L</p>
        </div>
      </div>

      {/* Main Prices Grid */}
      <div className='mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {/* Unleaded Regular Gas */}
        <div className='rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xs'>
          <div className='flex items-center justify-between text-xs text-indigo-200'>
            <span className='flex items-center gap-1.5 font-bold'>
              <Flame size={14} className='text-amber-400' /> Regular Gasoline
            </span>
            <span className='flex items-center gap-1 text-[10px] font-semibold text-emerald-400'>
              <TrendingDown size={11} /> -33 ៛
            </span>
          </div>
          <div className='mt-2'>
            <div className='font-mono text-2xl font-black tracking-tight text-white'>
              {gasUsd !== null ? `$${gasUsd.toFixed(2)}` : '—'}{' '}
              <span className='text-xs font-semibold text-slate-400'>{unitLabel}</span>
            </div>
            <p className='mt-0.5 text-xs font-semibold text-amber-300/90 font-mono'>
              {cambodia.prices.gasoline?.toLocaleString()} KHR / Liter
            </p>
          </div>
        </div>

        {/* Regular Diesel */}
        <div className='rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xs'>
          <div className='flex items-center justify-between text-xs text-indigo-200'>
            <span className='flex items-center gap-1.5 font-bold'>
              <Flame size={14} className='text-cyan-400' /> Regular Diesel
            </span>
            <span className='flex items-center gap-1 text-[10px] font-semibold text-emerald-400'>
              <TrendingDown size={11} /> -150 ៛
            </span>
          </div>
          <div className='mt-2'>
            <div className='font-mono text-2xl font-black tracking-tight text-white'>
              {dieselUsd !== null ? `$${dieselUsd.toFixed(2)}` : '—'}{' '}
              <span className='text-xs font-semibold text-slate-400'>{unitLabel}</span>
            </div>
            <p className='mt-0.5 text-xs font-semibold text-cyan-300/90 font-mono'>
              {cambodia.prices.diesel?.toLocaleString()} KHR / Liter
            </p>
          </div>
        </div>

        {/* Quick Links */}
        <div className='flex flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xs'>
          <div>
            <span className='text-xs font-bold text-slate-300'>Deep-Dive Intelligence</span>
            <p className='mt-1 text-xs text-slate-400'>
              Inspect official retail fuel gazette and cross-border price parity.
            </p>
          </div>
          <div className='mt-3 flex items-center gap-2'>
            <Link
              to='/cambodia'
              className='inline-flex flex-1 items-center justify-center gap-1 rounded-xl bg-white px-3 py-2 text-xs font-bold text-slate-900 transition-colors hover:bg-slate-100'
            >
              <span>Cambodia Profile</span>
              <ArrowRight size={13} />
            </Link>
            <Link
              to='/compare?codes=KH,TH,VN,LA'
              aria-label='Compare Mekong Neighbors'
              className='inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-xs font-semibold text-white hover:bg-white/20 transition-colors'
            >
              <Scale size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
