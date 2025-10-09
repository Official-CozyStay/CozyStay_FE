import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import HomePage from "../pages/HomePage";
import FeaturesPage from "../pages/FeaturesPage";
import GetStartedPage from "../pages/GetStartedPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "features", element: <FeaturesPage /> },
      { path: "get-started", element: <GetStartedPage /> },
    ],
  },
]);
