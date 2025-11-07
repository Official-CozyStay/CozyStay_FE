import { createBrowserRouter } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout/PublicLayout";
import LandingPage from "../pages/landing/LandingPage";
import AccommodationDetailPage from "../pages/accommodation/AccommodationDetailPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
        { index: true, element: <LandingPage /> },
        { path : "accommodation/:id", element:<AccommodationDetailPage/>},
    ],
  },
]);

export default router;
