import { HomePage, ProfilePage, NotFoundPage, ExplorePage } from "../Pages";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../Components/Shared/Layout";

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
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default router;
