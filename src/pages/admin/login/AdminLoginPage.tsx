import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AdminLoginPage.module.scss";
import SectionUi from "../../../shared/ui/section/SectionUi";
import TitleUi from "../../../shared/ui/title/TitleUi";
import InputUi from "../../../shared/ui/form/InputUi";
import ButtonUi from "../../../shared/ui/form/ButtonUi";
import TextUi from "../../../shared/ui/text/TextUi";
import { useAuth } from "../../../app/providers/auth/AuthProvider";
import { useToast } from "../../../app/providers/toast/ToastProvider";
import { validateEmail } from "../../../shared/lib/validation/email";
import { useTranslation } from "../../../shared/lib/i18n/useTranslation";

const AdminLoginPage = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});
  const { login, loading, error: authError } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = t("validation.email.required");
    } else if (!validateEmail(email)) {
      newErrors.email = t("validation.email.invalid");
    }

    if (password.length < 4) {
      newErrors.password = t("validation.password.minLength");
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    try {
      await login(email, password);
      showToast("success", t("toast.login.success"));
      navigate("/admin/dashboard");
    } catch (err) {
      showToast("error", authError || t("toast.login.failed"));
    }
  };

  return (
    <div className={styles.adminLoginPage}>
      <SectionUi>
        <div className={styles.adminLoginPage__container}>
          <TitleUi variant="h1">{t("admin.login.title")}</TitleUi>
          <form
            className={styles.adminLoginPage__form}
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            {authError && (
              <div className={styles.adminLoginPage__error}>
                <TextUi size="sm" color="secondary">
                  {authError}
                </TextUi>
              </div>
            )}
            <InputUi
              label={t("form.email")}
              type="email"
              placeholder={t("admin.login.placeholder.email")}
              value={email}
              error={errors.email}
              onChange={setEmail}
              disabled={loading}
            />
            <InputUi
              label={t("form.password")}
              type="password"
              placeholder={t("admin.login.placeholder.password")}
              value={password}
              error={errors.password}
              onChange={setPassword}
              disabled={loading}
            />
            <ButtonUi type="submit" disabled={loading}>
              {loading ? t("form.loggingIn") : t("form.login")}
            </ButtonUi>
          </form>
        </div>
      </SectionUi>
    </div>
  );
};

export default AdminLoginPage;
