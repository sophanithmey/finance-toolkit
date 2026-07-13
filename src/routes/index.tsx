import { createBrowserRouter } from 'react-router-dom';
import DiscountPage from '../pages/discount-page';
import ExpenseSplitPage from '../pages/expense-split-page';
import MainLayout from '../layout/main-layout';
import HomePage from '../pages/home-page';
import NotFoundPage from '../pages/not-found-page';
import LoanPage from '../pages/loan-page';
import ExchangeRatePage from "../pages/exchange-rate-page";
import EMIPage from '../pages/emi-page';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'discount',
        element: <DiscountPage />,
      },
      {
        path: 'expense-split',
        element: <ExpenseSplitPage />,
      },
      {
        path: 'loan',
        element: <LoanPage />,
      },
      {
        path: "exchange-rate",
        element: <ExchangeRatePage />,
      },
      {
        path: "emi",
        element: <EMIPage />,
      },
    ],
  },

  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
