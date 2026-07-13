import type { Control } from "react-hook-form";
import { Controller } from "react-hook-form";

import Card from "../../../components/ui/card";
import Input from "../../../components/ui/input";

import type { EMIForm as EMIFormValues } from "../schema";

interface Props {
  control: Control<EMIFormValues>;
}

export default function EMIForm({
  control,
}: Props) {
  return (
    <Card>
      <h2 className="mb-6 text-2xl font-bold">
        EMI Calculator
      </h2>

      <div className="space-y-5">
        <Controller
          control={control}
          name="productPrice"
          render={({ field, fieldState }) => (
            <Input
              label="Product Price"
              type="number"
              error={fieldState.error?.message}
              {...field}
            />
          )}
        />

        <Controller
          control={control}
          name="downPayment"
          render={({ field, fieldState }) => (
            <Input
              label="Down Payment"
              type="number"
              error={fieldState.error?.message}
              {...field}
            />
          )}
        />

        <Controller
          control={control}
          name="annualInterest"
          render={({ field, fieldState }) => (
            <Input
              label="Annual Interest (%)"
              type="number"
              step="0.01"
              error={fieldState.error?.message}
              {...field}
            />
          )}
        />

        <Controller
          control={control}
          name="months"
          render={({ field, fieldState }) => (
            <Input
              label="Installment Months"
              type="number"
              error={fieldState.error?.message}
              {...field}
            />
          )}
        />

        <Controller
          control={control}
          name="processingFee"
          render={({ field, fieldState }) => (
            <Input
              label="Processing Fee"
              type="number"
              error={fieldState.error?.message}
              {...field}
            />
          )}
        />
      </div>
    </Card>
  );
}