import { useState } from 'react';
import type { TrendDataPoint } from '../types';

interface TrendChartProps {
  readonly points: readonly TrendDataPoint[];
  readonly selectedCodes: readonly string[];
  readonly unitLabel: string;
}

const COUNTRY_COLORS: Record<string, string> = {
  KH: '#6366f1', // Indigo - Featured Cambodia
  TH: '#f59e0b', // Amber - Thailand
  VN: '#10b981', // Emerald - Vietnam
  SG: '#ef4444', // Rose - Singapore
  MY: '#06b6d4', // Cyan - Malaysia
  LA: '#8b5cf6', // Violet - Laos
  ID: '#ec4899', // Pink - Indonesia
  PH: '#3b82f6', // Blue - Philippines
};

export default function TrendChart({ points, selectedCodes, unitLabel }: TrendChartProps) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  if (points.length < 2) return null;

  // Find min and max price across all selected countries
  let minPrice = Infinity;
  let maxPrice = -Infinity;

  for (const p of points) {
    for (const code of selectedCodes) {
      const val = p[code];
      if (typeof val === 'number') {
        if (val < minPrice) minPrice = val;
        if (val > maxPrice) maxPrice = val;
      }
    }
  }

  if (minPrice === Infinity) minPrice = 0.5;
  if (maxPrice === -Infinity) maxPrice = 3.0;

  // Add padding to range
  const padding = (maxPrice - minPrice) * 0.1 || 0.2;
  const yMin = Math.max(0, minPrice - padding);
  const yMax = maxPrice + padding;

  const width = 800;
  const height = 300;
  const padLeft = 50;
  const padRight = 20;
  const padTop = 20;
  const padBottom = 30;

  const plotW = width - padLeft - padRight;
  const plotH = height - padTop - padBottom;

  const getX = (i: number) => padLeft + (i / (points.length - 1)) * plotW;
  const getY = (price: number) => padTop + plotH - ((price - yMin) / (yMax - yMin)) * plotH;

  // Y-axis ticks
  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((pct) => ({
    val: yMin + pct * (yMax - yMin),
    y: padTop + plotH - pct * plotH,
  }));

  const activePoint = hoverIndex !== null ? points[hoverIndex] : points[points.length - 1];

  return (
    <div className='relative w-full select-none'>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className='w-full overflow-visible'
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const relX = ((e.clientX - rect.left) / rect.width) * width;
          const idx = Math.round(((relX - padLeft) / plotW) * (points.length - 1));
          setHoverIndex(Math.max(0, Math.min(points.length - 1, idx)));
        }}
        onMouseLeave={() => setHoverIndex(null)}
      >
        {/* Horizontal grid lines */}
        {yTicks.map((t, idx) => (
          <g key={idx}>
            <line
              x1={padLeft}
              y1={t.y}
              x2={width - padRight}
              y2={t.y}
              stroke='currentColor'
              strokeDasharray='3,3'
              className='text-slate-100 dark:text-slate-800'
            />
            <text
              x={padLeft - 8}
              y={t.y + 4}
              textAnchor='end'
              className='text-[10px] font-mono font-medium fill-slate-400'
            >
              ${t.val.toFixed(2)}
            </text>
          </g>
        ))}

        {/* Draw lines for each country */}
        {selectedCodes.map((code) => {
          const color = COUNTRY_COLORS[code] || '#64748b';
          const pathD = points
            .map((p, i) => {
              const val = p[code];
              if (typeof val !== 'number') return '';
              const cmd = i === 0 ? 'M' : 'L';
              return `${cmd} ${getX(i)} ${getY(val)}`;
            })
            .filter(Boolean)
            .join(' ');

          return (
            <path
              key={code}
              d={pathD}
              fill='none'
              stroke={color}
              strokeWidth={code === 'KH' ? 3 : 2}
              strokeLinecap='round'
              strokeLinejoin='round'
              className='transition-all'
            />
          );
        })}

        {/* Hover vertical cursor indicator */}
        {activePoint && hoverIndex !== null && (
          <line
            x1={getX(hoverIndex)}
            y1={padTop}
            x2={getX(hoverIndex)}
            y2={padTop + plotH}
            stroke='currentColor'
            strokeWidth='1.5'
            strokeDasharray='4,4'
            className='text-slate-400'
          />
        )}
      </svg>

      {/* Dynamic Hover Tooltip Bar */}
      {activePoint && (
        <div className='mt-3 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-slate-50 px-3.5 py-2 text-xs border border-slate-200 dark:border-slate-800 dark:bg-slate-800/60'>
          <span className='font-mono font-bold text-slate-700 dark:text-slate-300'>
            {activePoint.displayDate} ({activePoint.date})
          </span>
          <div className='flex flex-wrap items-center gap-3'>
            {selectedCodes.map((code) => {
              const val = activePoint[code];
              const color = COUNTRY_COLORS[code] || '#64748b';
              if (typeof val !== 'number') return null;

              return (
                <div key={code} className='flex items-center gap-1.5'>
                  <span className='h-2.5 w-2.5 rounded-full' style={{ backgroundColor: color }} />
                  <span className='font-bold text-slate-800 dark:text-slate-200'>{code}:</span>
                  <span className='font-mono font-bold text-slate-900 dark:text-slate-100'>
                    ${val.toFixed(2)} {unitLabel}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
