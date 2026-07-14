import { useState } from "react";

import GoldCalculator from "../features/gold/components/gold-calculator";
import GoldForm from "../features/gold/components/gold-form";
import GoldPriceCard from "../features/gold/components/gold-price-card";
import GoldQuickPrice from "../features/gold/components/gold-quick-price";

import { useGoldPrice } from "../features/gold/hooks/use-gold-price";

export default function GoldPricePage() {
  const [goldType, setGoldType] =
    useState("SJL1L10");

  const {
    data,
    isLoading,
    error,
  } = useGoldPrice(goldType);

  if (isLoading) {
    return (
      <div className="py-20 text-center">
        Loading Gold Price...
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="py-20 text-center text-red-500">
        Failed to load gold prices.
      </div>
    );
  }

  /**
   * TODO:
   * Replace this with your Exchange Rate API
   */
  const usdVndRate = 26150;

  return (
    <div className="space-y-6">
      <GoldForm
        value={goldType}
        onChange={setGoldType}
      />

      <GoldPriceCard
        name={data.name}
        buy={data.buy}
        sell={data.sell}
        updatedAt={`${data.date} ${data.time}`}
        usdRate={usdVndRate}
      />

      <GoldCalculator
        sellPrice={data.sell}
        usdRate={usdVndRate}
      />

      <GoldQuickPrice
        sellPrice={data.sell}
        usdRate={usdVndRate}
      />
    </div>
  );
}