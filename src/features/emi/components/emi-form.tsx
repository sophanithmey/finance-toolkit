import type { Control } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { Calculator } from 'lucide-react';

import Card from '../../../components/ui/card';
import Input from '../../../components/ui/input';

import type { EMIForm as EMIFormValues } from '../schema';

interface Props {
  control: Control<EMIFormValues>;
}

export default function EMIForm({ control }: Props) {
  return (
    <Card>
      <div className='flex items-center gap-3 mb-6'>
        <div className='flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-50 text-violet-600'>
          <Calculator size={22} />
        </div>
        <div>
          <h2 className='text-xl font-extrabold text-slate-900'>EMI Loan Parameters</h2>
          <p className='text-xs text-slate-400'>
            Configure product cost, down payment, and installment tenure
          </p>
        </div>
      </div>

      <div className='grid gap-5 md:grid-cols-2'>
        <Controller
          control={control}
          name='productPrice'
          render={({ field, fieldState }) => (
            <Input
              label='Product Price ($)'
              type='number'
              step='0.01'
              error={fieldState.error?.message}
              {...field}
            />
          )}
        />

        <Controller
          control={control}
          name='downPayment'
          render={({ field, fieldState }) => (
            <Input
              label='Down Payment ($)'
              type='number'
              step='0.01'
              error={fieldState.error?.message}
              {...field}
            />
          )}
        />

        <Controller
          control={control}
          name='annualInterest'
          render={({ field, fieldState }) => (
            <Input
              label='Annual Interest (%)'
              type='number'
              step='0.01'
              error={fieldState.error?.message}
              {...field}
            />
          )}
        />

        <Controller
          control={control}
          name='months'
          render={({ field, fieldState }) => (
            <Input
              label='Tenure (Months)'
              type='number'
              error={fieldState.error?.message}
              {...field}
            />
          )}
        />

        <div className='md:col-span-2'>
          <Controller
            control={control}
            name='processingFee'
            render={({ field, fieldState }) => (
              <Input
                label='Upfront Processing Fee ($)'
                type='number'
                step='0.01'
                error={fieldState.error?.message}
                {...field}
              />
            )}
          />
        </div>
      </div>
    </Card>
  );
}