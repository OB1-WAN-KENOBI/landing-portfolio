import { useState, useEffect } from "react";
import styles from "./AdminProfilePage.module.scss";
import TitleUi from "../../../shared/ui/title/TitleUi";
import ButtonUi from "../../../shared/ui/form/ButtonUi";
import AdminProfileFormUi from "../../../shared/ui/admin-profile-form/AdminProfileFormUi";
import { mockProfile } from "../../../shared/api/mocks/mockProfile";
import { useToast } from "../../../app/providers/toast/ToastProvider";
import { useLanguage } from "../../../app/providers/language/useLanguage";
import { useTranslation } from "../../../shared/lib/i18n/useTranslation";

const AdminProfilePage = () => {
  const { showToast } = useToast();
  const { language } = useLanguage();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [description, setDescription] = useState("");
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [telegram, setTelegram] = useState("");
  const [errors, setErrors] = useState<{
    name?: string;
    role?: string;
    description?: string;
  }>({});

  useEffect(() => {
    setIsLoading(true);
    mockProfile
      .get()
      .then((data) => {
        setName(data.name);
        const roleValue =
          typeof data.role === "object" ? data.role[language] : data.role;
        const descriptionValue =
          typeof data.description === "object"
            ? data.description[language]
            : data.description;
        setRole(roleValue);
        setDescription(descriptionValue);
        setGithub(data.socials?.github || "");
        setLinkedin(data.socials?.linkedin || "");
        setTelegram(data.socials?.telegram || "");
        setIsLoading(false);
      })
      .catch((error) => {
        showToast(
          "error",
          error instanceof Error ? error.message : "Failed to load profile"
        );
        setIsLoading(false);
      });
  }, [showToast, language]);

  const handleSave = async () => {
    const newErrors: typeof errors = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!role.trim()) {
      newErrors.role = "Role is required";
    }
    if (!description.trim()) {
      newErrors.description = "Description is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSaving(true);
    try {
      await mockProfile.update({
        name: name.trim(),
        role: {
          ru: role.trim(),
          en: role.trim(),
        },
        description: {
          ru: description.trim(),
          en: description.trim(),
        },
        socials: {
          github: github.trim() || undefined,
          linkedin: linkedin.trim() || undefined,
          telegram: telegram.trim() || undefined,
        },
      });
      showToast("success", t("toast.profile.updated"));
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
      <div className={styles.adminProfilePage}>
        <TitleUi variant="h1">{t("page.about")}</TitleUi>
        <p>{t("common.loading")}</p>
      </div>
    );
  }

  return (
    <div className={styles.adminProfilePage}>
      <div className={styles.adminProfilePage__header}>
        <TitleUi variant="h1">{t("page.about")}</TitleUi>
        <ButtonUi onClick={handleSave} disabled={isSaving}>
          {isSaving ? t("form.saving") : t("form.save")}
        </ButtonUi>
      </div>
      <AdminProfileFormUi
        name={name}
        role={role}
        description={description}
        github={github}
        linkedin={linkedin}
        telegram={telegram}
        errors={errors}
        onNameChange={setName}
        onRoleChange={setRole}
        onDescriptionChange={setDescription}
        onGithubChange={setGithub}
        onLinkedinChange={setLinkedin}
        onTelegramChange={setTelegram}
        disabled={isSaving}
      />
    </div>
  );
};

export default AdminProfilePage;
