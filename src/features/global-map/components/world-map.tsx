import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { WORLD_MAP_PATHS } from '../map-paths';
import { getPriceTier, TIER_COLORS, type MapCountryHover } from '../map-types';
import MapLegend from './map-legend';
import MapTooltip from './map-tooltip';
import type { NormalizedCountryFuel, FuelType } from '../../../types/fuel';

interface Props {
  readonly countries: NormalizedCountryFuel[];
  readonly fuelType?: FuelType;
}

export default function WorldMap({ countries, fuelType = 'gasoline' }: Props) {
  const navigate = useNavigate();
  const [hover, setHover] = useState<MapCountryHover | null>(null);

  const countryMap = useMemo(() => {
    const map = new Map<string, NormalizedCountryFuel>();
    countries.forEach((c) => map.set(c.code.toUpperCase(), c));
    return map;
  }, [countries]);

  return (
    <div className='relative w-full space-y-4'>
      <div className='relative overflow-hidden rounded-3xl border border-slate-200/80 bg-slate-900 p-4 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950'>
        <svg
          viewBox='0 0 1000 500'
          className='w-full h-auto max-h-[600px] select-none'
          onMouseLeave={() => setHover(null)}
        >
          {/* Subtle Lat/Long Grid Lines */}
          <g className='stroke-slate-800/40' strokeWidth='0.5' strokeDasharray='4 4'>
            <line x1='0' y1='140' x2='1000' y2='140' />
            <line x1='0' y1='280' x2='1000' y2='280' />
            <line x1='0' y1='420' x2='1000' y2='420' />
            <line x1='250' y1='0' x2='250' y2='560' />
            <line x1='500' y1='0' x2='500' y2='560' />
            <line x1='750' y1='0' x2='750' y2='560' />
          </g>

          {/* Render Countries */}
          {WORLD_MAP_PATHS.map((item) => {
            const country = countryMap.get(item.id);
            const price =
              fuelType === 'diesel'
                ? country?.usdPrices.diesel ?? null
                : country?.usdPrices.gasoline ?? null;

            const tier = getPriceTier(price);
            const config = TIER_COLORS[tier];
            const isHovered = hover?.code === item.id;

            return (
              <path
                key={item.id}
                d={item.path}
                fill={config.fill}
                stroke={isHovered ? '#ffffff' : config.stroke}
                strokeWidth={isHovered ? 2.5 : 1}
                className='cursor-pointer transition-all duration-150 hover:opacity-90'
                onMouseMove={(e) => {
                  setHover({
                    code: item.id,
                    country: country || null,
                    x: e.clientX,
                    y: e.clientY,
                  });
                }}
                onClick={() => {
                  if (country) {
                    navigate(`/country/${country.code.toLowerCase()}`);
                  }
                }}
              />
            );
          })}
        </svg>

        {hover && <MapTooltip hover={hover} />}
      </div>

      <MapLegend />
    </div>
  );
}
