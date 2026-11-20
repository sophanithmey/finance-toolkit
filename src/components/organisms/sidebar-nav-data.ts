import type { LucideIcon } from 'lucide-react';
import {
  BarChart3,
  Calculator,
  Coins,
  Compass,
  CreditCard,
  DollarSign,
  Fuel,
  Globe2,
  HandCoins,
  Info,
  Percent,
  Receipt,
  Scale,
  Sparkles,
  TrendingUp,
} from 'lucide-react';

export interface NavItem {
  icon: LucideIcon;
  label: string;
  to: string;
  badge?: string;
}

export interface NavSection {
  label: string;
  items: NavItem[];
}

export const SIDEBAR_NAV_SECTIONS: readonly NavSection[] = [
  {
    label: 'Global & Regional',
    items: [
      { icon: BarChart3, label: 'Overview', to: '/' },
      { icon: Sparkles, label: 'ASEAN Explorer', to: '/asean', badge: '🇰🇭 KH' },
      { icon: Globe2, label: 'World Map', to: '/global' },
      { icon: Compass, label: 'Country Explorer', to: '/countries' },
    ],
  },
  {
    label: 'Calculators & Tools',
    items: [
      { icon: Receipt, label: 'Expense Calculator', to: '/expense-split', badge: 'Split' },
      { icon: Calculator, label: 'Fuel Calculator', to: '/calculator', badge: 'Trip' },
      { icon: HandCoins, label: 'Loan Schedule', to: '/loan', badge: 'Excel' },
      { icon: CreditCard, label: 'EMI Calculator', to: '/emi' },
      { icon: Percent, label: 'Discount & Tax', to: '/discount' },
      { icon: TrendingUp, label: 'Compound Interest', to: '/investment' },
      { icon: DollarSign, label: 'Exchange Rate', to: '/exchange' },
      { icon: Coins, label: 'Gold Price', to: '/gold', badge: 'Live' },
    ],
  },
  {
    label: 'Market Intelligence',
    items: [
      { icon: Scale, label: 'Compare Prices', to: '/compare' },
      { icon: Fuel, label: 'Price Rankings', to: '/rankings' },
      { icon: TrendingUp, label: 'Historical Trends', to: '/trends' },
    ],
  },
  {
    label: 'Information',
    items: [{ icon: Info, label: 'About & Sources', to: '/about' }],
  },
];
