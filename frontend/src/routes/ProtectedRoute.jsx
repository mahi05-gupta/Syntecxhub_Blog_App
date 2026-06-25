import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = () => {
  const { user } = useAuth();

  // 🔥 IMPORTANT: wait for auth to initialize
  const token = localStorage.getItem("token");

  // optional safety loading state
  if (user === undefined) {
    return null; // or loading spinner
  }

  if (!token && !user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;