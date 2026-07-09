import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

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
    formState: { errors },
  } = useForm<LoanFormType>({
    resolver: yupResolver(loanSchema),
    defaultValues: {
      loanAmount: 500,
      loanMonths: 6,
      annualInterest: 0,
      startDate: new Date().toISOString().split('T')[0],
    },
  });

  return (
    <Card>
      <h2 className='mb-6 text-2xl font-bold'>Loan Information</h2>

      <form
        onSubmit={handleSubmit(onGenerate)}
        className='grid gap-5 md:grid-cols-2'
      >
        <Input
          label='Loan Amount'
          type='number'
          step='0.01'
          {...register('loanAmount', {
            valueAsNumber: true,
          })}
          error={errors.loanAmount?.message}
        />

        <Input
          label='Loan Months'
          type='number'
          {...register('loanMonths', {
            valueAsNumber: true,
          })}
          error={errors.loanMonths?.message}
        />

        <Input
          label='Annual Interest (%)'
          aria-description="Enter 0 for an interest-free loan."
          type='number'
          step='0.01'
          {...register('annualInterest', {
            valueAsNumber: true,
          })}
          error={errors.annualInterest?.message}
        />

        <Input
          label='Start Date'
          type='date'
          {...register('startDate')}
          error={errors.startDate?.message}
        />

        <div className='md:col-span-2'>
          <Button className='w-full' type='submit'>
            Generate Schedule
          </Button>
        </div>
      </form>
    </Card>
  );
}
