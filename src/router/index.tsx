import { createBrowserRouter } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout/PublicLayout";
import LandingPage from "../pages/landing/LandingPage";
import MainPage from "../pages/main/MainPage";
import AccommodationDetailPage from "../pages/accommodation/AccommodationDetailPage.tsx";
import SearchPage from "../pages/search/SearchPage";
import HostingPage from "../pages/hosting/HostingPage";
import BecomeHostPage from "../pages/hosting/BecomeHostPage";
import MyPage from "../pages/mypage/MyPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { index: true, element: <MainPage /> },
      { path: "landing", element: <LandingPage /> },
      { path: "accommodation/:id", element: <AccommodationDetailPage /> },
      { path: "search", element: <SearchPage /> },
    ],
  },
  {
    path: "/hosting",
    element: <HostingPage />,
  },
  {
    path: "/hosting/become-a-host",
    element: <BecomeHostPage />,
  },
  {
    path: "/mypage",
    element: <MyPage />,
  },
]);

export default router;
