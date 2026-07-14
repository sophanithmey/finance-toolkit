import axios from "axios";
import type { GoldResponse } from "./types";

const api = axios.create({
  baseURL: "https://www.vang.today/api",
});

export async function getGoldPrice(
  type: string
): Promise<GoldResponse> {
  const { data } = await api.get<GoldResponse>(
    "/prices",
    {
      params: {
        type,
      },
    }
  );

  return data;
}