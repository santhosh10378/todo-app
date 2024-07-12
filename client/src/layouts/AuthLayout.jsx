import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";

const AuthLayout = () => {
  const { pathname } = useLocation();
  const isSignInPage = pathname === "/sign-in";
  const isSignUpPage = pathname === "/sign-up";

  console.log(pathname);

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [JSON.stringify(user)]);

  const pageTitle =
    pathname === "/sign-in"
      ? "Sign In"
      : pathname === "/sign-up"
      ? "Sign Up"
      : null;

  const pageSubtitle =
    pathname === "/sign-in"
      ? "Sign in to your account"
      : pathname === "/sign-up"
      ? "Create an account"
      : null;

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-tr from-sky-500 to-blue-600">
      <div className="bg-white rounded-lg p-5 w-full md:w-[60%] lg:w-[25%] flex flex-col gap-5">
        <div className="space-y-1">
          {pageTitle && (
            <h1 className="text-xl font-semibold text-center">{pageTitle}</h1>
          )}
          {pageSubtitle && (
            <p className="text-sm text-slate-600  text-center">
              {pageSubtitle}
            </p>
          )}
        </div>
        <Outlet />

        <div className="flex items-center justify-center gap-1 text-sm">
          {isSignUpPage
            ? `Already have an account?`
            : isSignInPage
            ? `Don't have an account?`
            : ""}
          <Link
            className="font-semibold hover:underline"
            to={isSignUpPage ? "/sign-in" : isSignInPage ? "/sign-up" : ""}
          >
            {isSignUpPage ? "Login" : isSignInPage ? "Sign Up" : ""}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
