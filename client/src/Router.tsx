import { createBrowserRouter } from "react-router-dom";
import { NotFound } from "./pages/NotFound";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Admin } from "./pages/Admin";
import { MyPage } from "./pages/MyPage";
import { MySubscriptions } from "./pages/MySubscriptions";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
        index: true,
      },
      {
        path: "/admin",
        element: <Admin />,
      },
      {
        path: "/MyPage",
        element: <MyPage />,
      },
      {
        path: "/MySubscriptions",
        element: <MySubscriptions />,
      },
    ],
  },
]);
