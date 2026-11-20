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
        <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200'>
          <Calculator size={18} />
        </div>
        <div>
          <h2 className='text-base font-bold text-slate-900 dark:text-slate-100'>
            EMI Financing Parameters
          </h2>
          <p className='text-xs text-slate-400 dark:text-slate-500'>
            Specify product price, down payment, interest rate, and duration
          </p>
        </div>
      </div>

      <div className='grid gap-4 md:grid-cols-2'>
        <Controller
          control={control}
          name='productPrice'
          render={({ field, fieldState }) => (
            <Input
              label='Retail Price ($)'
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
