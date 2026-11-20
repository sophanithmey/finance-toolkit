import axios from 'axios';

export interface FuelWidePriceRecord {
  country: string;
  diesel: number | null;
  gasoline: number | null;
  currency: string;
  lastUpdated?: string;
}

export interface FuelWideResult {
  available: boolean;
  source: string;
  error?: string;
  data: FuelWidePriceRecord[];
}

export async function fetchFuelWidePrices(): Promise<FuelWideResult> {
  try {
    const response = await axios.get('https://fuelwide.com/api/prices', {
      timeout: 5000,
      headers: {
        Accept: 'application/json',
      },
    });

    if (Array.isArray(response.data)) {
      return {
        available: true,
        source: 'FuelWide (Secondary)',
        data: response.data,
      };
    }

    return {
      available: false,
      source: 'FuelWide (Secondary)',
      error: 'Upstream schema changed',
      data: [],
    };
  } catch {
    return {
      available: false,
      source: 'FuelWide (Secondary)',
      error: 'Secondary feed currently protected or unavailable; OpenVan active',
      data: [],
    };
  }
}
