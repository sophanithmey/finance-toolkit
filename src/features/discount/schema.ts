import * as yup from 'yup';

export const discountSchema = yup.object({
  amount: yup
    .number()
    .transform((value, originalValue) =>
      originalValue === '' ? undefined : value,
    )
    .typeError('Amount is required')
    .required('Amount is required')
    .min(0.01, 'Amount must be greater than 0'),

  discount: yup
    .number()
    .transform((value, originalValue) =>
      originalValue === '' ? undefined : value,
    )
    .typeError('Discount is required')
    .required('Discount is required')
    .min(0, 'Discount cannot be negative')
    .max(100, 'Discount cannot exceed 100%'),

  tax: yup
    .number()
    .transform((value, originalValue) => (originalValue === '' ? 0 : value))
    .typeError('Tax must be a number')
    .default(0)
    .min(0, 'Tax cannot be negative')
    .max(100, 'Tax cannot exceed 100%'),

  taxIncluded: yup.boolean().default(false),
});

export type DiscountFormValues = yup.InferType<typeof discountSchema>;
