import { useMemo } from 'react';

import { useForm, useWatch } from 'react-hook-form';

import EMIForm from '../features/emi/components/emi-form';
import EMISummary from '../features/emi/components/emi-summary';
import EMIResult from '../features/emi/components/emi-result';

import { calculateEMI } from '../features/emi/utils';

import {
  type EMIForm as EMIFormValues,
  emiSchema,
} from '../features/emi/schema';

import { yupResolver } from '@hookform/resolvers/yup';

export default function EMIPage() {
  const { control } = useForm<EMIFormValues>({
    resolver: yupResolver(emiSchema),

    defaultValues: {
      productPrice: 1200,
      downPayment: 200,
      annualInterest: 6,
      months: 12,
      processingFee: 0,
    },
  });

  const values = useWatch({
    control,
  });

  const result = useMemo(() => {
    return calculateEMI(
      Number(values.productPrice ?? 0),
      Number(values.downPayment ?? 0),
      Number(values.annualInterest ?? 0),
      Number(values.months ?? 1),
      Number(values.processingFee ?? 0),
    );
  }, [values]);

  return (
    <div className='space-y-6'>
      <EMIForm control={control} />

      <EMISummary result={result} />

      <EMIResult result={result} />
    </div>
  );
}
