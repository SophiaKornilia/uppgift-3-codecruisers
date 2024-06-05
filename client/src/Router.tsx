import { createBrowserRouter } from "react-router-dom";
import { NotFound } from "./pages/NotFound";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Admin } from "./pages/Admin";
import { MyPage } from "./pages/MyPage";
import { MySubscriptions } from "./pages/MySubscriptions";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { SuccessfullyRegistered } from "./pages/SuccessfullyRegistered";
import { SuccessfullyAddedBook } from "./pages/SuccessfullyAddedBook";
import { Confirmation } from "./pages/Confirmation";

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
      {
        path: "/Login",
        element: <Login />,
      },
      {
        path: "/Register",
        element: <Register />,
      },
      {
        path: "/SuccessfullyRegistered",
        element: <SuccessfullyRegistered />,
      },
      {
        path: "/SuccessfullyAddedBook",
        element: <SuccessfullyAddedBook />,
      },
      {
        path: "/Confirmation",
        element: <Confirmation />,
      },
    ],
  },
]);
