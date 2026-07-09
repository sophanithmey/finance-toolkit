import * as yup from "yup";

export const loanSchema = yup.object({
  loanAmount: yup
    .number()
    .transform((v, o) => (o === "" ? undefined : v))
    .required("Loan amount is required")
    .positive(),

  loanMonths: yup
    .number()
    .transform((v, o) => (o === "" ? undefined : v))
    .required("Loan months is required")
    .integer("Must be a whole number")
    .min(1),

  annualInterest: yup
    .number()
    .transform((v, o) => (o === "" ? 0 : v))
    .default(0)
    .min(0),

  startDate: yup.string().required(),
});

export type LoanFormType = yup.InferType<typeof loanSchema>;