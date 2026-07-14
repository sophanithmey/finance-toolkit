import { createBrowserRouter } from 'react-router-dom';

import AppLayout from '../layout/app-layout';

import HomePage from '../pages/dashboard-page';
import DiscountPage from '../pages/discount-page';
import ExpenseSplitPage from '../pages/expense-split-page';
import LoanPage from '../pages/loan-page';
import ExchangeRatePage from '../pages/exchange-rate-page';
import EMIPage from '../pages/emi-page';
import GoldPricePage from '../pages/gold-price-page';
import ErrorPage from '../pages/error-page';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <ErrorPage />,

    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '/gold',
        element: <GoldPricePage />,
      },
      {
        path: '/exchange',
        element: <ExchangeRatePage />,
      },
      {
        path: '/loan',
        element: <LoanPage />,
      },
      {
        path: '/emi',
        element: <EMIPage />,
      },
      {
        path: '/expense-split',
        element: <ExpenseSplitPage />,
      },
      {
        path: '/discount',
        element: <DiscountPage />,
      },
      {
        path: '*',
        element: <ErrorPage />,
      },
    ],
  },
]);
