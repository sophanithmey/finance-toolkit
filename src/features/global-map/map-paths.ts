import realWorldPaths from './real-world-paths.json';

export interface MapPathItem {
  id: string; // ISO 2-letter
  name: string;
  path: string;
}

// 235 genuine Natural Earth projected geographic vector SVG paths for the interactive global map
export const WORLD_MAP_PATHS: readonly MapPathItem[] = realWorldPaths as readonly MapPathItem[];
