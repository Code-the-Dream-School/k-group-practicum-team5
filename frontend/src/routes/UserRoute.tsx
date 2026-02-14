import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const UserRoute = () => {
  const { user, isAdmin } = useAuth();
  return user && !isAdmin ? <Outlet /> : <Navigate to="/login" replace />;
};

export default UserRoute;
