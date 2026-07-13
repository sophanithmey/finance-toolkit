import { useQuery } from "@tanstack/react-query";

import { getLatestRate } from "../api";

export function useExchangeRate(
  base: string
) {
  return useQuery({
    queryKey: ["exchange-rate", base],

    queryFn: () => getLatestRate(base),

    staleTime: 1000 * 60 * 60,
  });
}