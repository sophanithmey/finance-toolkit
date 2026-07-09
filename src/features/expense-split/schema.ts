import * as yup from "yup";

export const friendSchema = yup.object({
  name: yup
    .string()
    .trim()
    .required("Friend name is required")
    .max(30)
});

export const expenseSchema = yup.object({
  title: yup
    .string()
    .trim()
    .required("Description is required"),

  amount: yup
    .number()
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : value
    )
    .typeError("Amount is required")
    .required()
    .positive("Amount must be greater than 0"),

  paidBy: yup
    .string()
    .required("Please select who paid"),

  date: yup
    .string()
    .required(),
});

export type ExpenseForm = yup.InferType<typeof expenseSchema>;
export type FriendForm = yup.InferType<typeof friendSchema>;