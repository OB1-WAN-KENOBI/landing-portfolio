import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../providers/auth/AuthProvider";
import { useToast } from "../providers/toast/ToastProvider";
import { useTranslation } from "../../shared/lib/i18n/useTranslation";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  const { showToast } = useToast();
  const { t } = useTranslation();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      return;
    }
    if (!loading && !isAdmin) {
      showToast("error", t("error.accessDenied"));
    }
  }, [loading, isAuthenticated, isAdmin, showToast]);

  if (loading) {
    return <div>{t("common.loading")}</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
