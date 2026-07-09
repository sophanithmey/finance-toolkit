import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Button from '../../../components/ui/button';
import Card from '../../../components/ui/card';
import Input from '../../../components/ui/input';

import { discountSchema, type DiscountFormValues } from '../schema';
import { calculateDiscount } from '../../../utils/helper';

export default function DiscountForm() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [result, setResult] = useState<any>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DiscountFormValues>({
    resolver: yupResolver(discountSchema),
    defaultValues: {
      amount: 0,
      discount: 0,
      tax: 0,
      taxIncluded: true,
    },
  });

  const onSubmit = (data: DiscountFormValues) => {
    const result = calculateDiscount(
      data.amount,
      data.discount,
      data.tax,
      data.taxIncluded,
    );

    setResult(result);
  };

  return (
    <Card>
      <h2 className='mb-6 text-2xl font-bold'>Discount Calculator</h2>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <Input
          label='Product Price'
          type='number'
          step='0.01'
          {...register('amount', { valueAsNumber: true })}
          error={errors.amount?.message}
        />

        <Input
          label='Discount (%)'
          type='number'
          step='0.01'
          {...register('discount', { valueAsNumber: true })}
          error={errors.discount?.message}
        />

        <Input
          label='Tax (%)'
          type='number'
          step='0.01'
          {...register('tax', { valueAsNumber: true })}
          error={errors.tax?.message}
        />

        <label className='flex items-center gap-2'>
          <input type='checkbox' {...register('taxIncluded')} />

          <span>Price already includes tax</span>
        </label>

        <Button type='submit' className='w-full'>
          Calculate
        </Button>
      </form>

      {result && (
        <div className='mt-6 space-y-2 rounded-lg bg-gray-100 p-4'>
          <div className='flex justify-between'>
            <span>Base Amount</span>
            <span>${result.baseAmount.toFixed(2)}</span>
          </div>

          <div className='flex justify-between'>
            <span>Discount</span>
            <span>-${result.discountAmount.toFixed(2)}</span>
          </div>

          <div className='flex justify-between'>
            <span>Subtotal</span>
            <span>${result.subtotal.toFixed(2)}</span>
          </div>

          <div className='flex justify-between'>
            <span>Tax</span>
            <span>${result.taxAmount.toFixed(2)}</span>
          </div>

          <hr />

          <div className='flex justify-between text-lg font-bold'>
            <span>Final Amount</span>
            <span>${result.finalAmount.toFixed(2)}</span>
          </div>
        </div>
      )}
    </Card>
  );
}
