import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Calculator, Tag } from 'lucide-react';

import Button from '../../../components/ui/button';
import Card from '../../../components/ui/card';
import Input from '../../../components/ui/input';
import DiscountSummary from './discount-summary';

import { discountSchema, type DiscountFormValues } from '../schema';
import { calculateDiscount } from '../../../utils/helper';

const discountPresets = [5, 10, 15, 20, 25, 30, 50];

export default function DiscountForm() {
  const [result, setResult] = useState<ReturnType<typeof calculateDiscount> | null>(() =>
    calculateDiscount(100, 20, 10, false)
  );

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<DiscountFormValues>({
    resolver: yupResolver(discountSchema),
    defaultValues: {
      amount: 100,
      discount: 20,
      tax: 10,
      taxIncluded: false,
    },
  });

  const currentDiscount = useWatch({ control, name: 'discount' });

  const onSubmit = (data: DiscountFormValues) => {
    setResult(calculateDiscount(data.amount, data.discount, data.tax, data.taxIncluded));
  };

  return (
    <div className='grid gap-6 lg:grid-cols-12 items-start'>
      {/* Left Input Form */}
      <Card className='lg:col-span-7'>
        <div className='flex items-center gap-3 mb-6'>
          <div className='flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600'>
            <Tag size={22} />
          </div>
          <div>
            <h2 className='text-xl font-extrabold text-slate-900'>Discount & Tax Calculator</h2>
            <p className='text-xs text-slate-400'>Calculate savings, discounts, and net prices</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
          <Input
            label='Product Original Price ($)'
            type='number'
            step='0.01'
            placeholder='0.00'
            {...register('amount', { valueAsNumber: true })}
            error={errors.amount?.message}
          />

          <div>
            <Input
              label='Discount Rate (%)'
              type='number'
              step='0.1'
              placeholder='0'
              {...register('discount', { valueAsNumber: true })}
              error={errors.discount?.message}
            />

            {/* Quick Discount Presets */}
            <div className='mt-2.5 flex flex-wrap gap-1.5'>
              {discountPresets.map((pct) => (
                <button
                  type='button'
                  key={pct}
                  onClick={() => setValue('discount', pct, { shouldValidate: true })}
                  className={`rounded-xl px-2.5 py-1 text-xs font-semibold transition-all ${
                    currentDiscount === pct
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {pct}%
                </button>
              ))}
            </div>
          </div>

          <Input
            label='Sales Tax Rate (%)'
            type='number'
            step='0.1'
            placeholder='0'
            {...register('tax', { valueAsNumber: true })}
            error={errors.tax?.message}
          />

          <label className='flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-slate-50/60 p-3.5 cursor-pointer hover:bg-slate-50 transition'>
            <input
              type='checkbox'
              className='h-4 w-4 rounded-md accent-emerald-600'
              {...register('taxIncluded')}
            />
            <span className='text-xs font-semibold text-slate-700'>
              Original price already includes sales tax
            </span>
          </label>

          <Button type='submit' className='w-full'>
            <Calculator size={18} />
            Calculate Final Price
          </Button>
        </form>
      </Card>

      {/* Right Result Summary Card */}
      <DiscountSummary result={result} />
    </div>
  );
}
