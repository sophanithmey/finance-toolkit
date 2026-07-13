interface Props {
  readonly amount: number;
  readonly from: string;
  readonly to: string;
  readonly rate: number;
}

export default function ExchangeResult({
  amount,
  from,
  to,
  rate,
}: Props) {
  const converted = amount * rate;

  return (
    <div className="rounded-3xl bg-linear-to-r from-blue-500 to-cyan-500 p-6 text-white">
      <p className="text-sm opacity-80">
        Exchange Rate
      </p>

      <h2 className="mt-2 text-4xl font-bold">
        {converted.toLocaleString()}
        {" "}
        {to}
      </h2>

      <p className="mt-3">
        {amount} {from} ={" "}
        {converted.toFixed(2)} {to}
      </p>

      <p className="mt-1 text-sm opacity-80">
        1 {from} = {rate.toFixed(6)}{" "}
        {to}
      </p>
    </div>
  );
}