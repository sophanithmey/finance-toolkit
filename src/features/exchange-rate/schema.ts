import * as yup from 'yup';

export const exchangeSchema = yup.object({
  amount: yup
    .number()
    .transform((v, o) => (o === '' ? undefined : v))
    .required('Amount is required')
    .positive(),

  from: yup.string().required('Select a currency'),

  to: yup.string().required('Select a currency'),
});

export type ExchangeForm = yup.InferType<typeof exchangeSchema>;
