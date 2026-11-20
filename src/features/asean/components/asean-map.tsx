import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ASEAN_MAP_REGIONS } from './asean-map-paths';
import type { NormalizedCountryFuel, DisplayUnit } from '../../../types/fuel';
import { convertUsdPerLiterToDisplay, getDisplayUnitShort } from '../../../utils/units';

interface AseanMapProps {
  readonly countries: readonly NormalizedCountryFuel[];
  readonly displayUnit: DisplayUnit;
}

export default function AseanMap({ countries, displayUnit }: AseanMapProps) {
  const navigate = useNavigate();
  const [hoveredCode, setHoveredCode] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const countryMap = new Map(countries.map((c) => [c.code.toUpperCase(), c]));
  const unitLabel = getDisplayUnitShort(displayUnit);

  const getTierColor = (usdPrice: number | null, isKh: boolean) => {
    if (usdPrice === null) return '#94a3b8'; // Slate 400 for no data
    if (isKh) return '#6366f1'; // Indigo for featured Cambodia
    if (usdPrice < 0.9) return '#10b981'; // Emerald
    if (usdPrice < 1.25) return '#06b6d4'; // Cyan
    if (usdPrice < 1.6) return '#f59e0b'; // Amber
    if (usdPrice < 2.0) return '#f97316'; // Orange
    return '#ef4444'; // Red for Singapore etc.
  };

  const hoveredCountry = hoveredCode ? countryMap.get(hoveredCode) : null;
  const hoveredRegion = ASEAN_MAP_REGIONS.find((r) => r.code === hoveredCode);

  return (
    <div
      className='relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900'
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
    >
      {/* Header */}
      <div className='flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3 mb-3 dark:border-slate-800'>
        <div>
          <h3 className='text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2'>
            <span>Southeast Asia Fuel Intelligence Map</span>
            <span className='rounded-full bg-indigo-500/10 px-2 py-0.5 text-[10px] font-extrabold text-indigo-600 dark:text-indigo-400'>
              ASEAN 11
            </span>
          </h3>
          <p className='text-xs text-slate-400'>
            Interactive price tier choropleth • Hover to preview • Click to inspect
          </p>
        </div>

        {/* Legend */}
        <div className='flex items-center gap-2 text-[10px] font-semibold text-slate-500'>
          <span className='flex items-center gap-1'><span className='h-2.5 w-2.5 rounded-sm bg-emerald-500' /> &lt;$0.90</span>
          <span className='flex items-center gap-1'><span className='h-2.5 w-2.5 rounded-sm bg-cyan-500' /> $0.90-$1.25</span>
          <span className='flex items-center gap-1'><span className='h-2.5 w-2.5 rounded-sm bg-indigo-500' /> 🇰🇭 Cambodia</span>
          <span className='flex items-center gap-1'><span className='h-2.5 w-2.5 rounded-sm bg-amber-500' /> $1.25-$1.60</span>
          <span className='flex items-center gap-1'><span className='h-2.5 w-2.5 rounded-sm bg-rose-500' /> &gt;$2.00</span>
          <span className='flex items-center gap-1'><span className='h-2.5 w-2.5 rounded-sm bg-slate-400' /> No Feed</span>
        </div>
      </div>

      {/* SVG Canvas */}
      <div className='relative w-full aspect-[16/10] max-h-[460px]'>
        <svg viewBox='0 0 800 500' className='h-full w-full select-none'>
          {/* Subtle grid pattern */}
          <defs>
            <pattern id='asean-grid' width='40' height='40' patternUnits='userSpaceOnUse'>
              <path d='M 40 0 L 0 0 0 40' fill='none' stroke='currentColor' strokeWidth='0.5' className='text-slate-100 dark:text-slate-800/40' />
            </pattern>
          </defs>
          <rect width='100%' height='100%' fill='url(#asean-grid)' />

          {/* Render regions */}
          {ASEAN_MAP_REGIONS.map((region) => {
            const country = countryMap.get(region.code);
            const isKh = region.code === 'KH';
            const isHovered = hoveredCode === region.code;
            const gasPrice = country?.usdPrices.gasoline ?? null;
            const fill = getTierColor(gasPrice, isKh);

            return (
              <g
                key={region.code}
                className='cursor-pointer transition-all duration-150'
                onMouseEnter={() => setHoveredCode(region.code)}
                onMouseLeave={() => setHoveredCode(null)}
                onClick={() => navigate(isKh ? '/cambodia' : `/country/${region.code.toLowerCase()}`)}
              >
                <path
                  d={region.path}
                  fill={fill}
                  fillOpacity={isHovered ? 0.95 : isKh ? 0.9 : 0.75}
                  stroke={isKh ? '#4f46e5' : isHovered ? '#0f172a' : '#ffffff'}
                  strokeWidth={isKh ? 3 : isHovered ? 2 : 1}
                  className='transition-colors'
                />

                {/* Country Flag & Label */}
                <text
                  x={region.labelX}
                  y={region.labelY}
                  textAnchor='middle'
                  className={`pointer-events-none font-bold text-[11px] ${
                    isKh ? 'fill-indigo-950 font-black' : 'fill-slate-800 dark:fill-slate-200'
                  }`}
                >
                  {region.flag} {region.code}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip Card */}
        {hoveredRegion && (
          <div
            className='pointer-events-none absolute z-30 -translate-x-1/2 -translate-y-full rounded-2xl border border-slate-200/90 bg-white/95 p-3 shadow-xl backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/95 min-w-[190px]'
            style={{ left: `${mousePos.x}px`, top: `${mousePos.y - 12}px` }}
          >
            <div className='flex items-center gap-2 border-b border-slate-100 pb-1.5 dark:border-slate-800'>
              <span className='text-lg'>{hoveredRegion.flag}</span>
              <div>
                <p className='text-xs font-black text-slate-900 dark:text-slate-100 flex items-center gap-1.5'>
                  <span>{hoveredRegion.name}</span>
                  {hoveredRegion.code === 'KH' && (
                    <span className='rounded bg-amber-400/20 px-1 py-0.2 text-[9px] font-bold text-amber-600 dark:text-amber-300'>
                      Featured
                    </span>
                  )}
                </p>
                <p className='text-[10px] text-slate-400 uppercase font-mono'>ISO: {hoveredRegion.code}</p>
              </div>
            </div>

            <div className='mt-2 space-y-1 text-xs'>
              {hoveredCountry ? (
                <>
                  <div className='flex justify-between'>
                    <span className='text-slate-500'>Gasoline:</span>
                    <span className='font-mono font-bold text-emerald-600 dark:text-emerald-400'>
                      ${convertUsdPerLiterToDisplay(hoveredCountry.usdPrices.gasoline, displayUnit)?.toFixed(2) ?? '—'}{' '}
                      <span className='text-[10px] text-slate-400'>{unitLabel}</span>
                    </span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-slate-500'>Diesel:</span>
                    <span className='font-mono font-bold text-cyan-600 dark:text-cyan-400'>
                      ${convertUsdPerLiterToDisplay(hoveredCountry.usdPrices.diesel, displayUnit)?.toFixed(2) ?? '—'}{' '}
                      <span className='text-[10px] text-slate-400'>{unitLabel}</span>
                    </span>
                  </div>
                  <div className='flex justify-between text-[11px] text-slate-400 pt-0.5 border-t border-slate-100 dark:border-slate-800'>
                    <span>Native:</span>
                    <span className='font-mono'>
                      {hoveredCountry.prices.gasoline ?? '—'} {hoveredCountry.currency}/L
                    </span>
                  </div>
                </>
              ) : (
                <p className='text-[11px] font-semibold text-rose-500'>No official feed reported</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
