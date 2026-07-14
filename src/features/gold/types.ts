export interface GoldResponse {
  success: boolean;
  timestamp: number;
  time: string;
  date: string;

  type: string;
  name: string;

  buy: number;
  sell: number;

  change_buy: number;
  change_sell: number;
}