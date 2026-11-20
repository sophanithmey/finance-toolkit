import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import iso from 'iso-3166-1';
import * as topojson from 'topojson-client';
import * as d3Geo from 'd3-geo';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

// 1. Generate Real World Map SVG Paths
const world110 = JSON.parse(fs.readFileSync(path.join(root, 'node_modules/world-atlas/countries-110m.json'), 'utf8'));
const world50 = JSON.parse(fs.readFileSync(path.join(root, 'node_modules/world-atlas/countries-50m.json'), 'utf8'));

const countries110 = topojson.feature(world110, world110.objects.countries);
const countries50 = topojson.feature(world50, world50.objects.countries);

// Natural Earth 1 projection for world map (viewBox 0 0 1000 500)
const worldProjection = d3Geo.geoNaturalEarth1().fitSize([1000, 500], countries110);
const worldPathGen = d3Geo.geoPath(worldProjection);

const worldMap = new Map();

for (const f of countries110.features) {
  if (!f.id) continue;
  const num = String(f.id).padStart(3, '0');
  const entry = iso.whereNumeric(num);
  if (entry) {
    const p = worldPathGen(f);
    if (p) {
      worldMap.set(entry.alpha2, {
        id: entry.alpha2,
        name: entry.country,
        path: p,
      });
    }
  }
}

// Supplement island and small city states from 50m
for (const f of countries50.features) {
  if (!f.id) continue;
  const num = String(f.id).padStart(3, '0');
  const entry = iso.whereNumeric(num);
  if (entry && !worldMap.has(entry.alpha2)) {
    const p = worldPathGen(f);
    if (p) {
      worldMap.set(entry.alpha2, {
        id: entry.alpha2,
        name: entry.country,
        path: p,
      });
    }
  }
}

const worldList = Array.from(worldMap.values()).sort((a, b) => a.id.localeCompare(b.id));
fs.writeFileSync(
  path.join(root, 'src/features/global-map/real-world-paths.json'),
  JSON.stringify(worldList),
  'utf8'
);
console.log(`Generated ${worldList.length} real world country SVG paths.`);

// 2. Generate Real Southeast Asian Map SVG Paths (viewBox 0 0 800 500)
const aseanCodes = ['KH', 'TH', 'VN', 'LA', 'MY', 'SG', 'ID', 'PH', 'MM', 'BN', 'TL'];
const aseanFeatures = countries50.features.filter((f) => {
  const num = String(f.id).padStart(3, '0');
  const entry = iso.whereNumeric(num);
  return entry && aseanCodes.includes(entry.alpha2);
});

const aseanGeoCollection = { type: 'FeatureCollection', features: aseanFeatures };
const aseanProjection = d3Geo.geoMercator().fitSize([780, 480], aseanGeoCollection);
const aseanPathGen = d3Geo.geoPath(aseanProjection);

const aseanList = aseanFeatures.map((f) => {
  const num = String(f.id).padStart(3, '0');
  const entry = iso.whereNumeric(num);
  const centroid = aseanPathGen.centroid(f);

  return {
    code: entry.alpha2,
    name: entry.country,
    path: aseanPathGen(f),
    labelX: Math.round(centroid[0]),
    labelY: Math.round(centroid[1]),
  };
});

fs.writeFileSync(
  path.join(root, 'src/features/asean/components/real-asean-paths.json'),
  JSON.stringify(aseanList),
  'utf8'
);
console.log(`Generated ${aseanList.length} real ASEAN country SVG paths.`);
