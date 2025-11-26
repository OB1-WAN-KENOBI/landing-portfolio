import { useState, useEffect } from "react";
import styles from "./AdminStatusPage.module.scss";
import TitleUi from "../../../shared/ui/title/TitleUi";
import InputUi from "../../../shared/ui/form/InputUi";
import DropdownUi from "../../../shared/ui/dropdown/DropdownUi";
import ButtonUi from "../../../shared/ui/form/ButtonUi";
import { mockStatus } from "../../../shared/api/mocks/mockStatus";
import { useToast } from "../../../app/providers/toast/ToastProvider";
import type { ApiStatus } from "../../../shared/api/http/types";
import { useTranslation } from "../../../shared/lib/i18n/useTranslation";

const AdminStatusPage = () => {
  const { showToast } = useToast();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [status, setStatus] = useState<ApiStatus["status"]>("Available");
  const [message, setMessage] = useState("");

  const statusOptions: ApiStatus["status"][] = [
    "Available",
    "Busy",
    "Not taking projects",
  ];

  useEffect(() => {
    setIsLoading(true);
    mockStatus
      .get()
      .then((data) => {
        setStatus(data.status);
        const messageValue =
          typeof data.message === "object"
            ? data.message?.ru || data.message?.en || ""
            : data.message || "";
        setMessage(messageValue);
        setIsLoading(false);
      })
      .catch((error) => {
        showToast(
          "error",
          error instanceof Error ? error.message : "Failed to load status"
        );
        setIsLoading(false);
      });
  }, [showToast]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await mockStatus.update({
        status,
        message: message.trim()
          ? {
              ru: message.trim(),
              en: message.trim(),
            }
          : undefined,
      });
      showToast("success", t("toast.status.updated"));
    } catch (error) {
      showToast(
        "error",
        error instanceof Error ? error.message : t("error.failedToUpdate")
      );
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className={styles.adminStatusPage}>
        <TitleUi variant="h1">{t("project.status")}</TitleUi>
        <p>{t("common.loading")}</p>
      </div>
    );
  }

  return (
    <div className={styles.adminStatusPage}>
      <div className={styles.adminStatusPage__header}>
        <TitleUi variant="h1">{t("project.status")}</TitleUi>
        <ButtonUi onClick={handleSave} disabled={isSaving}>
          {isSaving ? t("form.saving") : t("form.save")}
        </ButtonUi>
      </div>
      <div className={styles.adminStatusPage__content}>
        <DropdownUi
          label="Status"
          value={status}
          options={statusOptions}
          onChange={(value) => setStatus(value as ApiStatus["status"])}
          placeholder="Select status"
          disabled={isSaving}
        />
        <InputUi
          label="Custom Message (optional)"
          type="text"
          placeholder="e.g., Available for new projects"
          value={message}
          onChange={setMessage}
          disabled={isSaving}
        />
      </div>
    </div>
  );
};

export default AdminStatusPage;
