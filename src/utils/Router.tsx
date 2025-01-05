import {
  HomePage,
  ProfilePage,
  NotFoundPage,
  ExplorePage,
  SubPage,
  PostPage,
  FillProfilePage,
} from "../Pages";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../Components/Shared/Layout";
import FillLayout from "../Pages/FillProfilePage/FillLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "explore",
        element: <ExplorePage />,
      },
      {
        path: "r/:subId",
        element: <SubPage />,
      },
      {
        path: "r/:subId/:postTitle",
        element: <PostPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
  {
    path: "/fill-profile",
    element: <FillLayout />,
    children: [
      {
        path: "",
        element: <FillProfilePage />,
      },
    ],
  },
  {
    path: "/settings",
    element: <Layout />,
  },
]);

export default router;
