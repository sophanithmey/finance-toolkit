import { createBrowserRouter } from 'react-router-dom';

import AppLayout from '../layouts/app-layout';

import DashboardPage from '../pages/dashboard-page';
import AseanPage from '../pages/asean-page';
import CambodiaPage from '../pages/cambodia-page';
import MapPage from '../pages/map-page';
import CountriesPage from '../pages/countries-page';
import CountryDetailPage from '../pages/country-detail-page';
import ComparisonPage from '../pages/comparison-page';
import RankingsPage from '../pages/rankings-page';
import HistoricalPage from '../pages/historical-page';
import FuelCalculatorPage from '../pages/fuel-calculator-page';
import AboutPage from '../pages/about-page';

import DiscountPage from '../pages/discount-page';
import ExpenseSplitPage from '../pages/expense-split-page';
import LoanPage from '../pages/loan-page';
import ExchangeRatePage from '../pages/exchange-rate-page';
import EMIPage from '../pages/emi-page';
import GoldPricePage from '../pages/gold-price-page';
import InvestmentPage from '../pages/investment-page';
import ErrorPage from '../pages/error-page';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <ErrorPage />,

    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: '/asean',
        element: <AseanPage />,
      },
      {
        path: '/cambodia',
        element: <CambodiaPage />,
      },
      {
        path: '/global',
        element: <MapPage />,
      },
      {
        path: '/map',
        element: <MapPage />,
      },
      {
        path: '/countries',
        element: <CountriesPage />,
      },
      {
        path: '/country/:code',
        element: <CountryDetailPage />,
      },
      {
        path: '/compare',
        element: <ComparisonPage />,
      },
      {
        path: '/rankings',
        element: <RankingsPage />,
      },
      {
        path: '/trends',
        element: <HistoricalPage />,
      },
      {
        path: '/calculator',
        element: <FuelCalculatorPage />,
      },
      {
        path: '/about',
        element: <AboutPage />,
      },
      // Backward-compatible financial utility routes
      {
        path: '/investment',
        element: <InvestmentPage />,
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
        path: '/expense-calculator',
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
