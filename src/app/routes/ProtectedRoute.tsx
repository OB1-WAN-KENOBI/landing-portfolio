import { Navigate } from "react-router-dom";
import { useAuth } from "../providers/auth/AuthProvider";
import { useToast } from "../providers/toast/ToastProvider";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  const { showToast } = useToast();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  if (!isAdmin) {
    showToast("error", "Access denied");
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
