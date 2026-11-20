import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Calculator, Landmark } from 'lucide-react';

import Input from '../../../components/ui/input';
import Button from '../../../components/ui/button';
import Card from '../../../components/ui/card';

import { loanSchema, type LoanFormType } from '../schema';

interface Props {
  readonly onGenerate: (data: LoanFormType) => void;
}

const principalPresets = [5000, 10000, 25000, 50000];
const termPresets = [6, 12, 24, 36, 60];

export default function LoanForm({ onGenerate }: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<LoanFormType>({
    resolver: yupResolver(loanSchema),
    defaultValues: {
      loanAmount: 10000,
      loanMonths: 12,
      annualInterest: 6.5,
      startDate: new Date().toISOString().split('T')[0],
    },
  });

  const currentAmount = useWatch({ control, name: 'loanAmount' });
  const currentMonths = useWatch({ control, name: 'loanMonths' });

  return (
    <Card>
      <div className='flex items-center gap-3 mb-6'>
        <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200'>
          <Landmark size={18} />
        </div>
        <div>
          <h2 className='text-base font-bold text-slate-900 dark:text-slate-100'>
            Loan Parameters
          </h2>
          <p className='text-xs text-slate-400 dark:text-slate-500'>
            Configure principal, interest rate, and term to generate the schedule
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onGenerate)} className='grid gap-4 md:grid-cols-2'>
        <div>
          <Input
            label='Loan Principal ($)'
            type='number'
            step='100'
            placeholder='10000'
            {...register('loanAmount', { valueAsNumber: true })}
            error={errors.loanAmount?.message}
          />
          <div className='mt-2 flex flex-wrap gap-1.5'>
            {principalPresets.map((amt) => (
              <button
                type='button'
                key={amt}
                onClick={() => setValue('loanAmount', amt, { shouldValidate: true })}
                className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
                  currentAmount === amt
                    ? 'bg-slate-900 text-white shadow-xs dark:bg-white dark:text-slate-900'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                }`}
              >
                ${amt.toLocaleString()}
              </button>
            ))}
          </div>
        </div>

        <div>
          <Input
            label='Term (Months)'
            type='number'
            placeholder='12'
            {...register('loanMonths', { valueAsNumber: true })}
            error={errors.loanMonths?.message}
          />
          <div className='mt-2 flex flex-wrap gap-1.5'>
            {termPresets.map((months) => (
              <button
                type='button'
                key={months}
                onClick={() => setValue('loanMonths', months, { shouldValidate: true })}
                className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
                  currentMonths === months
                    ? 'bg-slate-900 text-white shadow-xs dark:bg-white dark:text-slate-900'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                }`}
              >
                {months} mos
              </button>
            ))}
          </div>
        </div>

        <Input
          label='Annual Interest (%)'
          hint='0% for interest-free loans'
          type='number'
          step='0.01'
          placeholder='6.5'
          {...register('annualInterest', { valueAsNumber: true })}
          error={errors.annualInterest?.message}
        />

        <Input
          label='Repayment Start Date'
          type='date'
          {...register('startDate')}
          error={errors.startDate?.message}
        />

        <div className='md:col-span-2 pt-2'>
          <Button className='w-full' type='submit' size='md'>
            <Calculator size={15} />
            Generate Amortization Schedule
          </Button>
        </div>
      </form>
    </Card>
  );
}
