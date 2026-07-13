export interface Currency {
  code: string;
  name: string;
}

export interface ExchangeResult {
  base: string;
  target: string;
  amount: number;
  rate: number;
  convertedAmount: number;
}