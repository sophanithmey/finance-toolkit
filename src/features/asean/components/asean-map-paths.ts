import realAseanPaths from './real-asean-paths.json';
import { ASEAN_METADATA } from '../constants';
import type { AseanCountryCode } from '../types';

export interface AseanMapRegion {
  code: AseanCountryCode;
  name: string;
  flag: string;
  path: string;
  labelX: number;
  labelY: number;
}

export const ASEAN_MAP_REGIONS: readonly AseanMapRegion[] = (
  realAseanPaths as Array<{
    code: string;
    name: string;
    path: string;
    labelX: number;
    labelY: number;
  }>
).map((item) => ({
  code: item.code as AseanCountryCode,
  name: ASEAN_METADATA[item.code as AseanCountryCode]?.name || item.name,
  flag: ASEAN_METADATA[item.code as AseanCountryCode]?.flag || '🌏',
  path: item.path,
  labelX: item.labelX,
  labelY: item.labelY,
}));
