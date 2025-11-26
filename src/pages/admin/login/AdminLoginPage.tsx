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

const AdminLoginPage = () => {
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
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Email is invalid";
    }

    if (password.length < 4) {
      newErrors.password = "Password must be at least 4 characters";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    try {
      await login(email, password);
      showToast("success", "Login successful");
      navigate("/admin/dashboard");
    } catch (err) {
      showToast("error", authError || "Login failed");
    }
  };

  return (
    <div className={styles.adminLoginPage}>
      <SectionUi>
        <div className={styles.adminLoginPage__container}>
          <TitleUi variant="h1">Admin Login</TitleUi>
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
              label="Email"
              type="email"
              placeholder="admin@example.com"
              value={email}
              error={errors.email}
              onChange={setEmail}
              disabled={loading}
            />
            <InputUi
              label="Password"
              type="password"
              placeholder="Enter password"
              value={password}
              error={errors.password}
              onChange={setPassword}
              disabled={loading}
            />
            <ButtonUi type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </ButtonUi>
          </form>
        </div>
      </SectionUi>
    </div>
  );
};

export default AdminLoginPage;
