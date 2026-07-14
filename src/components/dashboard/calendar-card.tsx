import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

import Card from "../../components/ui/card";

export default function CalendarCard() {
  const [selected, setSelected] = useState<Date>();

  return (
    <Card className="rounded-3xl">
      <h2 className="mb-4 text-xl font-bold">
        Calendar
      </h2>

      <DayPicker
        mode="single"
        selected={selected}
        onSelect={setSelected}
        showOutsideDays
      />
    </Card>
  );
}