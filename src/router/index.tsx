import { createBrowserRouter } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout/PublicLayout';
import LandingPage from '../pages/landing/LandingPage';
import MainPage from '../pages/main/MainPage';
import AccommodationDetailPage from '../pages/accommodation/AccommodationDetailPage';
import SearchPage from '../pages/search/SearchPage';
import HostingPage from '../pages/hosting/HostingPage';
import BecomeHostPage from '../pages/hosting/BecomeHostPage';
import UserPage from '../pages/user/UserPage';
import MessagePage from '../pages/chat/MessagePage';
import AccountPage from '../pages/account/AccountPage';
import ProfilePage from '../pages/profile/ProfilePage';
import ProfileEditPage from '../pages/profile/edit/ProfileEditPage';
import PaymentPage from '../pages/payment/PaymentPage';
import PaymentSuccessPage from '../pages/payment/PaymentSuccessPage';
import PaymentFailPage from '../pages/payment/PaymentFailPage';
import WishlistPage from '../pages/wishlist/WishlistPage';
import WishlistDetailPage from '../pages/wishlist/WishlistDetailPage';
import RequireAuth from '@/components/auth/RequireAuth';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <MainPage /> },
      { path: 'landing', element: <LandingPage /> },
      { path: 'accommodation/:id', element: <AccommodationDetailPage /> },
      { path: 'payment/:id', element: <PaymentPage /> },
      { path: 'payment/retry/:id', element: <PaymentPage /> },
      { path: 'payment/success', element: <PaymentSuccessPage /> },
      { path: 'payment/fail', element: <PaymentFailPage /> },
      { path: 'search', element: <SearchPage /> },
      { path: 'wishlist', element: <WishlistPage /> },
      { path: 'wishlist/:favoriteId', element: <WishlistDetailPage /> },
      { path: 'messages', element: <MessagePage /> },
      { path: 'account', element: <AccountPage /> },
      { path: 'profile', element: <ProfilePage /> },
      { path: 'profile/edit', element: <ProfileEditPage /> },
      { path: 'profile/reviews', element: <ProfilePage /> },
      { path: 'users/:id', element: <UserPage /> },
    ],
  },
  {
    path: '/hosting',
    element: (
      <RequireAuth>
        <HostingPage />
      </RequireAuth>
    ),
  },
  {
    path: '/hosting/become-a-host',
    element: (
      <RequireAuth>
        <BecomeHostPage />
      </RequireAuth>
    ),
  },
]);

export default router;
