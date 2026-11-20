import type { AseanCountryMeta, AseanCountryCode } from './types';

export const ASEAN_COUNTRY_CODES: readonly AseanCountryCode[] = [
  'KH', // Cambodia - Featured
  'TH', // Thailand
  'VN', // Vietnam
  'LA', // Laos
  'MY', // Malaysia
  'SG', // Singapore
  'ID', // Indonesia
  'PH', // Philippines
  'MM', // Myanmar
  'BN', // Brunei Darussalam
  'TL', // Timor-Leste
] as const;

export const ASEAN_METADATA: Record<AseanCountryCode, AseanCountryMeta> = {
  KH: {
    code: 'KH',
    name: 'Cambodia',
    nativeName: 'កម្ពុជា',
    capital: 'Phnom Penh',
    currency: 'KHR',
    currencySymbol: '៛',
    flag: '🇰🇭',
    hasDataFeed: true,
  },
  TH: {
    code: 'TH',
    name: 'Thailand',
    nativeName: 'ประเทศไทย',
    capital: 'Bangkok',
    currency: 'THB',
    currencySymbol: '฿',
    flag: '🇹🇭',
    hasDataFeed: true,
  },
  VN: {
    code: 'VN',
    name: 'Vietnam',
    nativeName: 'Việt Nam',
    capital: 'Hanoi',
    currency: 'VND',
    currencySymbol: '₫',
    flag: '🇻🇳',
    hasDataFeed: true,
  },
  LA: {
    code: 'LA',
    name: 'Laos',
    nativeName: 'ປະເທດລາວ',
    capital: 'Vientiane',
    currency: 'LAK',
    currencySymbol: '₭',
    flag: '🇱🇦',
    hasDataFeed: true,
  },
  MY: {
    code: 'MY',
    name: 'Malaysia',
    nativeName: 'Malaysia',
    capital: 'Kuala Lumpur',
    currency: 'MYR',
    currencySymbol: 'RM',
    flag: '🇲🇾',
    hasDataFeed: true,
  },
  SG: {
    code: 'SG',
    name: 'Singapore',
    nativeName: 'Singapore',
    capital: 'Singapore',
    currency: 'SGD',
    currencySymbol: 'S$',
    flag: '🇸🇬',
    hasDataFeed: true,
  },
  ID: {
    code: 'ID',
    name: 'Indonesia',
    nativeName: 'Indonesia',
    capital: 'Jakarta',
    currency: 'IDR',
    currencySymbol: 'Rp',
    flag: '🇮🇩',
    hasDataFeed: true,
  },
  PH: {
    code: 'PH',
    name: 'Philippines',
    nativeName: 'Pilipinas',
    capital: 'Manila',
    currency: 'PHP',
    currencySymbol: '₱',
    flag: '🇵🇭',
    hasDataFeed: true,
  },
  MM: {
    code: 'MM',
    name: 'Myanmar',
    nativeName: 'မြန်မာ',
    capital: 'Naypyidaw',
    currency: 'MMK',
    currencySymbol: 'K',
    flag: '🇲🇲',
    hasDataFeed: true,
  },
  BN: {
    code: 'BN',
    name: 'Brunei',
    nativeName: 'Negara Brunei Darussalam',
    capital: 'Bandar Seri Begawan',
    currency: 'BND',
    currencySymbol: 'B$',
    flag: '🇧🇳',
    hasDataFeed: false, // Transparent: OpenVan API does not report BN feed
  },
  TL: {
    code: 'TL',
    name: 'Timor-Leste',
    nativeName: 'Timór-Leste',
    capital: 'Dili',
    currency: 'USD',
    currencySymbol: '$',
    flag: '🇹🇱',
    hasDataFeed: true,
  },
};
