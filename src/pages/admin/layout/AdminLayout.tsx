import { useLocation, useNavigate } from "react-router-dom";
import styles from "./AdminLayout.module.scss";
import AdminSidebarUi from "../../../shared/ui/admin-sidebar/AdminSidebarUi";
import ButtonUi from "../../../shared/ui/form/ButtonUi";
import { useAuth } from "../../../app/providers/auth/AuthProvider";
import { useToast } from "../../../app/providers/toast/ToastProvider";
import { adminMenuItems } from "./adminMenuItems";
import { useTranslation } from "../../../shared/lib/i18n/useTranslation";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const { showToast } = useToast();
  const { t } = useTranslation();

  const handleLogout = async () => {
    try {
      await logout();
      showToast("success", t("toast.logout.success"));
      navigate("/admin/login");
    } catch (error) {
      showToast("error", t("toast.logout.failed"));
    }
  };

  return (
    <div className={styles.adminLayout}>
      <AdminSidebarUi items={adminMenuItems} activePath={location.pathname} />
      <main className={styles.adminLayout__content}>
        <div className={styles.adminLayout__header}>
          {user && (
            <div className={styles.adminLayout__userInfo}>
              <span className={styles.adminLayout__userName}>{user.name}</span>
              <ButtonUi onClick={handleLogout}>Logout</ButtonUi>
            </div>
          )}
        </div>
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
