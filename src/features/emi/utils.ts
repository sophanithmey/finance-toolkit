export function calculateEMI(
  productPrice: number,
  downPayment: number,
  annualInterest: number,
  months: number,
  processingFee: number
) {
  const safeMonths = Math.max(1, months);

  const loanAmount = Math.max(
    productPrice - downPayment,
    0
  );

  const monthlyRate =
    annualInterest / 12 / 100;

  const monthlyPayment =
    monthlyRate === 0
      ? loanAmount / safeMonths
      : (loanAmount * monthlyRate) /
        (1 -
          Math.pow(
            1 + monthlyRate,
            -safeMonths
          ));

  const totalPayment =
    monthlyPayment * safeMonths +
    processingFee;

  const totalInterest =
    totalPayment -
    loanAmount -
    processingFee;

  return {
    productPrice,
    downPayment,
    loanAmount,
    annualInterest,
    months: safeMonths,
    processingFee,

    monthlyPayment: Number(
      monthlyPayment.toFixed(2)
    ),

    totalInterest: Number(
      totalInterest.toFixed(2)
    ),

    totalPayment: Number(
      totalPayment.toFixed(2)
    ),
  };
}