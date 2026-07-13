import { useMemo, useState } from "react";

import ExchangeForm from "../features/exchange-rate/components/exchange-form";
import ExchangeResult from "../features/exchange-rate/components/exchange-result";
import TodayRate from "../features/exchange-rate/components/today-rate";

import { useExchangeRate } from "../features/exchange-rate/hooks/use-exchange-rate";

export default function ExchangeRatePage() {
  const [amount, setAmount] = useState(100);

  const [from, setFrom] = useState("USD");

  const [to, setTo] = useState("KHR");

  const { data, isLoading } =
    useExchangeRate(from);

  const rate = useMemo(() => {
    if (!data) return 0;

    return data.rates[to] ?? 0;
  }, [data, to]);

  return (
    <div className="space-y-6">
      <ExchangeForm
        amount={amount}
        from={from}
        to={to}
        onAmountChange={setAmount}
        onFromChange={setFrom}
        onToChange={setTo}
      />

      <TodayRate
        from={from}
        to={to}
        rate={rate}
        timestamp={data?.timestamp}
      />

      {isLoading ? (
        <div className="rounded-3xl bg-white p-8 text-center">
          Loading latest exchange rate...
        </div>
      ) : (
        <ExchangeResult
          amount={amount}
          from={from}
          to={to}
          rate={rate}
        />
      )}
    </div>
  );
}