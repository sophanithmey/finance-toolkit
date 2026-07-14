import Card from "../../../components/ui/card";

import { goldTypes } from "../constants";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function GoldForm({
  value,
  onChange,
}: Props) {
  return (
    <Card>
      <label className="mb-2 block font-semibold">
        Gold Type
      </label>

      <select
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="w-full rounded-xl border p-3"
      >
        {goldTypes.map((gold) => (
          <option
            key={gold.code}
            value={gold.code}
          >
            {gold.name}
          </option>
        ))}
      </select>
    </Card>
  );
}