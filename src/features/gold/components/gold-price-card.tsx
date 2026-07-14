import {
  ArrowUpRight,
  Coins,
} from "lucide-react";

import Card from "../../../components/ui/card";

import {
  convertCurrency,
  formatCurrency,
  formatNumber,
} from "../../../utils/helper";

interface Props {
  name: string;
  buy: number;
  sell: number;
  updatedAt: string;
  usdRate: number;
}

export default function GoldPriceCard({
  name,
  buy,
  sell,
  updatedAt,
  usdRate,
}: Props) {
  const buyUsd = convertCurrency(
    buy,
    usdRate
  );

  const sellUsd = convertCurrency(
    sell,
    usdRate
  );

  return (
    <Card className="bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 text-white">
      <div className="flex justify-between">
        <div>
          <p className="opacity-80">
            Today's Gold Price
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            {name}
          </h1>

          <div className="mt-8 grid grid-cols-2 gap-8">
            <div>
              <p className="opacity-70">
                BUY
              </p>

              <h2 className="text-3xl font-bold">
                {formatCurrency(buyUsd)}
              </h2>

              <p className="text-sm opacity-80">
                ≈ {formatNumber(buy)} ₫
              </p>
            </div>

            <div>
              <p className="opacity-70">
                SELL
              </p>

              <h2 className="text-3xl font-bold">
                {formatCurrency(sellUsd)}
              </h2>

              <p className="text-sm opacity-80">
                ≈ {formatNumber(sell)} ₫
              </p>
            </div>
          </div>

          <div className="mt-8 flex gap-6 text-sm">
            <span>
              USD/VND
              <strong className="ml-2">
                {formatNumber(usdRate)}
              </strong>
            </span>

            <span>
              Updated
              <strong className="ml-2">
                {updatedAt}
              </strong>
            </span>
          </div>
        </div>

        <div className="flex flex-col justify-between">
          <Coins size={48} />

          <ArrowUpRight size={36} />
        </div>
      </div>
    </Card>
  );
}