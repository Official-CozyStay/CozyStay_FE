import { createBrowserRouter } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout/PublicLayout';
import LandingPage from '../pages/landing/LandingPage';
import SearchPage from '../pages/search/SearchPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: 'search', element: <SearchPage /> },
    ],
  },
]);

export default router;
