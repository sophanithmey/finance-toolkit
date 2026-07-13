import * as yup from 'yup';

export const emiSchema = yup.object({
  productPrice: yup
    .number()
    .transform((v, o) => (o === '' ? undefined : v))
    .required('Product price is required')
    .positive(),

  downPayment: yup
    .number()
    .transform((v, o) => (o === '' ? 0 : v))
    .min(0)
    .default(0),

  annualInterest: yup
    .number()
    .transform((v, o) => (o === '' ? 0 : v))
    .min(0)
    .default(0),

  months: yup
    .number()
    .transform((v, o) => (o === '' ? undefined : v))
    .required('Installment months is required')
    .integer()
    .min(1),

  processingFee: yup
    .number()
    .transform((v, o) => (o === '' ? 0 : v))
    .min(0)
    .default(0),
});

export type EMIForm = yup.InferType<typeof emiSchema>;
