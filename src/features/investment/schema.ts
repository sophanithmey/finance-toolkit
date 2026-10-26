import * as yup from 'yup';

export const investmentSchema = yup.object({
  initialAmount: yup
    .number()
    .typeError('Initial investment must be a number')
    .min(0, 'Amount must be positive')
    .required('Initial investment is required'),
  monthlyDeposit: yup
    .number()
    .typeError('Monthly deposit must be a number')
    .min(0, 'Deposit cannot be negative')
    .required('Monthly deposit is required'),
  annualRate: yup
    .number()
    .typeError('Annual return must be a number')
    .min(0.01, 'Annual rate must be at least 0.01%')
    .max(100, 'Annual rate cannot exceed 100%')
    .required('Annual return is required'),
  years: yup
    .number()
    .typeError('Investment horizon must be a number')
    .integer('Years must be an integer')
    .min(1, 'Minimum horizon is 1 year')
    .max(50, 'Maximum horizon is 50 years')
    .required('Years are required'),
  frequency: yup
    .string()
    .oneOf(['monthly', 'quarterly', 'annually'])
    .default('monthly'),
});

export type InvestmentSchemaType = yup.InferType<typeof investmentSchema>;
