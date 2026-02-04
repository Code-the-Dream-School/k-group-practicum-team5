import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const ProtectedRoute = () => {
  const { user, isAdmin } = useAuth();
  return user && isAdmin ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
