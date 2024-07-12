import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import AuthLayout from "./layouts/AuthLayout";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import useAuth from "./hooks/useAuth";
import { useEffect } from "react";

const App = () => {
  const { user, updateUser } = useAuth();

  useEffect(() => {
    updateUser();
    console.log("User Updated from App Component");
  }, []);

  useEffect(() => {
    console.log("User Updated from App Component");
  }, [JSON.stringify(user)]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
      ],
    },
    {
      path: "/",
      element: <AuthLayout />,
      children: [
        {
          path: "/sign-up",
          element: <SignUpPage />,
        },
        {
          path: "/sign-in",
          element: <SignInPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
