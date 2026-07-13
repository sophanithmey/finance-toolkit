import axios from "axios";

const api = axios.create({
  baseURL: "https://api.exchangerate.fun",
});

export interface LatestRateResponse {
  timestamp: number;
  base: string;
  rates: Record<string, number>;
}

export async function getLatestRate(
  base: string
): Promise<LatestRateResponse> {
  const { data } =
    await api.get<LatestRateResponse>(
      "/latest",
      {
        params: {
          base,
        },
      }
    );

  return data;
}