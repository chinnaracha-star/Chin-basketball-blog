import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function ProtectedRoute({ children }) {
  const { isAuthLoading, isLoggedIn } = useAuth();
  const location = useLocation();

  if (isAuthLoading) {
    return <p className="auth-loading">Checking your session...</p>;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}
