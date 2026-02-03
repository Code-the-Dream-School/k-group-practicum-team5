import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const ProtectedRoute = () => {
  const { isAdmin } = useAuth();
  return isAdmin ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
