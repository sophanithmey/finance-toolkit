import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Calculator, TrendingUp } from 'lucide-react';
import { useEffect } from 'react';

import Card from '../../../components/ui/card';
import Input from '../../../components/ui/input';
import Button from '../../../components/ui/button';

import { investmentSchema, type InvestmentSchemaType } from '../schema';
import type { CompoundingFrequency, InvestmentFormValues } from '../types';

interface Props {
  readonly onCalculate: (data: InvestmentFormValues) => void;
}

const yearPresets = [5, 10, 15, 20, 25, 30];

export default function InvestmentForm({ onCalculate }: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<InvestmentSchemaType>({
    resolver: yupResolver(investmentSchema),
    defaultValues: {
      initialAmount: 5000,
      monthlyDeposit: 300,
      annualRate: 8,
      years: 15,
      frequency: 'monthly',
    },
  });

  const selectedYears = useWatch({ control, name: 'years' });
  const allValues = useWatch({ control });

  useEffect(() => {
    if (allValues.initialAmount !== undefined && allValues.monthlyDeposit !== undefined && allValues.annualRate && allValues.years) {
      onCalculate({
        initialAmount: Number(allValues.initialAmount),
        monthlyDeposit: Number(allValues.monthlyDeposit),
        annualRate: Number(allValues.annualRate),
        years: Number(allValues.years),
        frequency: (allValues.frequency as CompoundingFrequency) || 'monthly',
      });
    }
  }, [allValues, onCalculate]);

  const onSubmit = (data: InvestmentSchemaType) => {
    onCalculate({
      initialAmount: data.initialAmount,
      monthlyDeposit: data.monthlyDeposit,
      annualRate: data.annualRate,
      years: data.years,
      frequency: (data.frequency as CompoundingFrequency) || 'monthly',
    });
  };

  return (
    <Card>
      <div className='flex items-center gap-3 mb-6'>
        <div className='flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400'>
          <TrendingUp size={22} />
        </div>
        <div>
          <h2 className='text-xl font-extrabold text-slate-900 dark:text-slate-100'>
            Investment Parameters
          </h2>
          <p className='text-xs text-slate-400'>
            Configure initial capital, monthly deposits, and expected returns
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className='grid gap-5 md:grid-cols-2'>
        <Input
          label='Initial Principal ($)'
          type='number'
          step='100'
          placeholder='5000'
          {...register('initialAmount', { valueAsNumber: true })}
          error={errors.initialAmount?.message}
        />

        <Input
          label='Monthly Addition ($)'
          type='number'
          step='50'
          placeholder='300'
          {...register('monthlyDeposit', { valueAsNumber: true })}
          error={errors.monthlyDeposit?.message}
        />

        <Input
          label='Expected Annual Return (%)'
          hint='Historical S&P 500 ~10%'
          type='number'
          step='0.1'
          placeholder='8'
          {...register('annualRate', { valueAsNumber: true })}
          error={errors.annualRate?.message}
        />

        <div className='space-y-1.5'>
          <label className='block text-xs font-semibold uppercase tracking-wider text-slate-500'>
            Compounding Frequency
          </label>
          <select
            {...register('frequency')}
            className='w-full rounded-2xl border border-slate-200/90 bg-slate-50/70 px-4 py-3 text-sm font-bold text-slate-800 transition-all hover:border-slate-300 focus:bg-white focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/15 cursor-pointer dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100'
          >
            <option value='monthly'>Compounded Monthly (Standard)</option>
            <option value='quarterly'>Compounded Quarterly</option>
            <option value='annually'>Compounded Annually</option>
          </select>
        </div>

        <div className='md:col-span-2'>
          <Input
            label='Investment Horizon (Years)'
            type='number'
            placeholder='15'
            {...register('years', { valueAsNumber: true })}
            error={errors.years?.message}
          />
          <div className='mt-2.5 flex flex-wrap gap-1.5'>
            {yearPresets.map((y) => (
              <button
                type='button'
                key={y}
                onClick={() => setValue('years', y, { shouldValidate: true })}
                className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${selectedYears === y ? 'bg-indigo-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'}`}
              >
                {y} Years
              </button>
            ))}
          </div>
        </div>

        <div className='md:col-span-2 pt-2'>
          <Button type='submit' size='lg' className='w-full'>
            <Calculator size={18} />
            Calculate Wealth Projection
          </Button>
        </div>
      </form>
    </Card>
  );
}
