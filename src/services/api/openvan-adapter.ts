import axios from 'axios';
import type { OpenVanResponse } from '../../types/fuel';

const OPENVAN_ENDPOINT = 'https://openvan.camp/api/fuel/prices';

export async function fetchOpenVanFuelPrices(): Promise<OpenVanResponse> {
  const response = await axios.get<OpenVanResponse>(OPENVAN_ENDPOINT, {
    params: {
      source: 'global-fuel-explorer',
    },
    headers: {
      Accept: 'application/json',
    },
    timeout: 12000,
  });

  return response.data;
}
