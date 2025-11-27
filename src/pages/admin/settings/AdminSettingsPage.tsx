import { useState, useEffect } from "react";
import styles from "./AdminSettingsPage.module.scss";
import TitleUi from "../../../shared/ui/title/TitleUi";
import InputUi from "../../../shared/ui/form/InputUi";
import ButtonUi from "../../../shared/ui/form/ButtonUi";
import { useToast } from "../../../app/providers/toast/ToastProvider";
import { useTranslation } from "../../../shared/lib/i18n/useTranslation";

const AdminSettingsPage = () => {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const [token, setToken] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Загружаем сохраненный токен
    const savedToken = localStorage.getItem("admin_token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  const handleSave = () => {
    if (!token.trim()) {
      showToast("error", "Token cannot be empty");
      return;
    }

    setIsSaving(true);
    try {
      localStorage.setItem("admin_token", token.trim());
      showToast("success", "Token saved successfully");
    } catch (error) {
      showToast("error", "Failed to save token");
    } finally {
      setIsSaving(false);
    }
  };

  const handleTest = async () => {
    if (!token.trim()) {
      showToast("error", "Please enter a token first");
      return;
    }

    setIsSaving(true);
    try {
      // Тестируем токен, делая простой запрос на создание проекта
      const API_BASE_URL =
        import.meta.env.VITE_API_BASE_URL ||
        "https://server-v-2-1.onrender.com/api";

      const testProject = {
        title: { ru: "Test", en: "Test" },
        description: { ru: "Test", en: "Test" },
        techStack: ["Test"],
        year: 2024,
        status: "In Progress",
      };

      const response = await fetch(`${API_BASE_URL}/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.trim()}`,
        },
        body: JSON.stringify(testProject),
      });

      if (response.ok) {
        const data = await response.json();
        showToast("success", "Token is valid! ✅");

        // Удаляем тестовый проект
        if (data.id) {
          try {
            await fetch(`${API_BASE_URL}/projects/${data.id}`, {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${token.trim()}`,
              },
            });
          } catch (deleteError) {
            // Игнорируем ошибку удаления, главное что создание прошло
            console.warn("Failed to delete test project:", deleteError);
          }
        }
      } else {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.error || `HTTP ${response.status}`;

        if (response.status === 401 || response.status === 403) {
          showToast("error", `Token is invalid: ${errorMessage} ❌`);
        } else {
          showToast("error", `Token test failed: ${errorMessage}`);
        }
      }
    } catch (error) {
      showToast(
        "error",
        error instanceof Error ? error.message : "Failed to test token"
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={styles.adminSettingsPage}>
      <TitleUi variant="h1">API Settings</TitleUi>

      <div className={styles.adminSettingsPage__section}>
        <h2 className={styles.adminSettingsPage__sectionTitle}>
          Admin Token Configuration
        </h2>
        <p className={styles.adminSettingsPage__description}>
          Enter the admin token that you configured on the server (ADMIN_TOKEN
          environment variable). This token is required for creating, updating,
          and deleting projects, skills, and profile data.
        </p>

        <div className={styles.adminSettingsPage__form}>
          <InputUi
            label="Admin Token"
            type="password"
            placeholder="Enter your admin token"
            value={token}
            onChange={setToken}
            disabled={isSaving}
          />

          <div className={styles.adminSettingsPage__actions}>
            <ButtonUi onClick={handleSave} disabled={isSaving || !token.trim()}>
              {isSaving ? "Saving..." : "Save Token"}
            </ButtonUi>
            <ButtonUi onClick={handleTest} disabled={!token.trim()}>
              Test Token
            </ButtonUi>
          </div>
        </div>

        {token && (
          <div className={styles.adminSettingsPage__info}>
            <p>
              <strong>Status:</strong>{" "}
              {localStorage.getItem("admin_token") === token
                ? "✅ Token saved"
                : "⚠️ Token not saved"}
            </p>
            <p>
              <strong>Note:</strong> Token is stored in browser localStorage.
              Clear your browser data to remove it.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSettingsPage;
