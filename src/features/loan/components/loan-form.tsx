import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Calculator, Landmark } from 'lucide-react';

import Input from '../../../components/ui/input';
import Button from '../../../components/ui/button';
import Card from '../../../components/ui/card';

import { loanSchema, type LoanFormType } from '../schema';

interface Props {
  readonly onGenerate: (data: LoanFormType) => void;
}

export default function LoanForm({ onGenerate }: Props) {
  const {
    register,
    handleSubmit,
    setValue,
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

  return (
    <Card>
      <div className='flex items-center gap-3 mb-6'>
        <div className='flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600'>
          <Landmark size={22} />
        </div>
        <div>
          <h2 className='text-xl font-extrabold text-slate-900'>Loan Information</h2>
          <p className='text-xs text-slate-400'>Enter loan details to generate full amortization table</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onGenerate)} className='grid gap-5 md:grid-cols-2'>
        <div>
          <Input
            label='Loan Principal ($)'
            type='number'
            step='0.01'
            placeholder='10000'
            {...register('loanAmount', { valueAsNumber: true })}
            error={errors.loanAmount?.message}
          />
          <div className='mt-2 flex flex-wrap gap-1.5'>
            {[5000, 10000, 25000, 50000].map((amt) => (
              <button
                type='button'
                key={amt}
                onClick={() => setValue('loanAmount', amt, { shouldValidate: true })}
                className='rounded-xl bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-200 transition'
              >
                ${amt.toLocaleString()}
              </button>
            ))}
          </div>
        </div>

        <div>
          <Input
            label='Loan Term (Months)'
            type='number'
            placeholder='12'
            {...register('loanMonths', { valueAsNumber: true })}
            error={errors.loanMonths?.message}
          />
          <div className='mt-2 flex flex-wrap gap-1.5'>
            {[6, 12, 24, 36, 60].map((months) => (
              <button
                type='button'
                key={months}
                onClick={() => setValue('loanMonths', months, { shouldValidate: true })}
                className='rounded-xl bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-200 transition'
              >
                {months} mos
              </button>
            ))}
          </div>
        </div>

        <Input
          label='Annual Interest (%)'
          hint='0% for interest-free'
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
          <Button className='w-full' type='submit' size='lg'>
            <Calculator size={18} />
            Generate Amortization Schedule
          </Button>
        </div>
      </form>
    </Card>
  );
}
