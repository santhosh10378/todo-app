import { Outlet, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";

const MainLayout = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {}, [JSON.stringify(user), loading, navigate]);

  if (!loading && !user) {
    navigate("/sign-in");
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default MainLayout;
