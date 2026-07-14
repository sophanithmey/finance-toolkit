import {
  Coins,
  CreditCard,
  DollarSign,
  HandCoins,
} from "lucide-react";

import StatCard from "./stat-card";

export default function StatsGrid() {
  return (
    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Gold"
        value="$5,640"
        subtitle="Live Price"
        icon={Coins}
        gradient="bg-gradient-to-br from-yellow-400 to-amber-500"
      />

      <StatCard
        title="Exchange"
        value="4112"
        subtitle="USD/KHR"
        icon={DollarSign}
        gradient="bg-gradient-to-br from-green-500 to-emerald-600"
      />

      <StatCard
        title="Loan"
        value="$12,400"
        subtitle="Remaining"
        icon={HandCoins}
        gradient="bg-gradient-to-br from-indigo-500 to-blue-600"
      />

      <StatCard
        title="Monthly EMI"
        value="$320"
        subtitle="12 Months"
        icon={CreditCard}
        gradient="bg-gradient-to-br from-cyan-500 to-blue-500"
      />
    </section>
  );
}