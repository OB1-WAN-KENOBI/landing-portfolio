import { useState } from "react";
import styles from "./AdminSettingsPage.module.scss";
import TitleUi from "../../../shared/ui/title/TitleUi";
import ButtonUi from "../../../shared/ui/form/ButtonUi";
import { useToast } from "../../../app/providers/toast/ToastProvider";
import { authApi } from "../../../shared/api/http/authApi";
import { useAuth } from "../../../app/providers/auth/AuthProvider";

const AdminSettingsPage = () => {
  const { showToast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const { logout, isAuthenticated } = useAuth();

  const handleLogout = async () => {
    setIsSaving(true);
    try {
      await logout();
      showToast("success", "Logged out");
    } catch (error) {
      showToast("error", "Failed to logout");
    } finally {
      setIsSaving(false);
    }
  };

  const handleTest = async () => {
    setIsSaving(true);
    try {
      // Тестируем токен без побочных эффектов
      await authApi.ping();
      showToast("success", "Session is valid! ✅");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to test session";
      showToast("error", message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={styles.adminSettingsPage}>
      <TitleUi variant="h1">API Settings</TitleUi>

      <div className={styles.adminSettingsPage__section}>
        <h2 className={styles.adminSettingsPage__sectionTitle}>
          Admin Session
        </h2>
        <p className={styles.adminSettingsPage__description}>
          Admin access now uses a secure HttpOnly cookie. Log in via the admin
          login form; the cookie will be stored by the browser and not exposed
          to scripts.
        </p>

        <div className={styles.adminSettingsPage__form}>
          <div className={styles.adminSettingsPage__actions}>
            <ButtonUi onClick={handleTest} disabled={isSaving}>
              Test Session
            </ButtonUi>
            <ButtonUi onClick={handleLogout} disabled={isSaving || !isAuthenticated}>
              Logout
            </ButtonUi>
          </div>
        </div>

        {isAuthenticated && (
          <div className={styles.adminSettingsPage__info}>
            <p>
              <strong>Status:</strong> ✅ Authenticated via secure cookie
            </p>
            <p>
              <strong>Note:</strong> Session cookie is HttpOnly and cleared on
              logout.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSettingsPage;
