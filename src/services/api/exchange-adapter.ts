import axios from 'axios';
import type { ExchangeRates } from '../../types/exchange';

export async function fetchGlobalExchangeRates(): Promise<ExchangeRates> {
  try {
    const res = await axios.get<ExchangeRates>('https://open.er-api.com/v6/latest/USD', {
      timeout: 8000,
    });
    return res.data;
  } catch {
    const fallback = await axios.get<{ base: string; rates: Record<string, number> }>(
      'https://api.exchangerate.fun/latest?base=USD',
      { timeout: 8000 }
    );
    return {
      base: fallback.data.base,
      rates: fallback.data.rates,
      time_last_update_utc: new Date().toUTCString(),
    };
  }
}
