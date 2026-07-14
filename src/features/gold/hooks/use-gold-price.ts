import { useQuery } from "@tanstack/react-query";

import { getGoldPrice } from "../api";

export function useGoldPrice(type: string) {
  return useQuery({
    queryKey: ["gold-price", type],
    queryFn: () => getGoldPrice(type),

    staleTime: 60_000,
    refetchInterval: 60_000,
  });
}