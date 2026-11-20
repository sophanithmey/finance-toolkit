export function getCountryFlag(countryCode: string): string {
  if (!countryCode || countryCode.length !== 2) return '🌐';
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

export const REGION_NAMES: Record<string, string> = {
  europe: 'Europe',
  north_america: 'North America',
  east_asia: 'East Asia',
  southeast_asia: 'Southeast Asia',
  south_asia: 'South Asia',
  africa: 'Africa',
  latam: 'Latin America',
  middle_east: 'Middle East',
  central_asia: 'Central Asia',
  central_america: 'Central America',
  caribbean: 'Caribbean',
  oceania: 'Oceania',
  cis: 'CIS',
};

export function formatRegionName(region: string): string {
  return REGION_NAMES[region.toLowerCase()] || region.replace(/_/g, ' ');
}
