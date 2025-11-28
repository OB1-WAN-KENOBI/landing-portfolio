import { useEffect, useState } from "react";
import styles from "./AdminProfileFormUi.module.scss";
import InputUi from "../form/InputUi";
import TextareaUi from "../form/TextareaUi";

interface AdminProfileFormUiProps {
  name: string;
  role: string;
  description: string;
  photoUrl?: string;
  photoPreview?: string;
  github?: string;
  linkedin?: string;
  telegram?: string;
  errors?: {
    name?: string;
    role?: string;
    description?: string;
  };
  onNameChange: (value: string) => void;
  onRoleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onPhotoUrlChange: (value: string) => void;
  onPhotoFileSelect: (file: File | null) => void;
  onGithubChange: (value: string) => void;
  onLinkedinChange: (value: string) => void;
  onTelegramChange: (value: string) => void;
  disabled?: boolean;
}

const AdminProfileFormUi = ({
  name,
  role,
  description,
  photoUrl,
  photoPreview,
  github,
  linkedin,
  telegram,
  errors = {},
  onNameChange,
  onRoleChange,
  onDescriptionChange,
  onPhotoUrlChange,
  onPhotoFileSelect,
  onGithubChange,
  onLinkedinChange,
  onTelegramChange,
  disabled = false,
}: AdminProfileFormUiProps) => {
  const [isPreviewError, setIsPreviewError] = useState(false);

  useEffect(() => {
    setIsPreviewError(false);
  }, [photoPreview, photoUrl]);

  const previewSrc = photoPreview || photoUrl;
  const hasPhoto = Boolean(previewSrc && !isPreviewError);

  return (
    <div className={styles.profileForm}>
      <div className={styles.profileForm__fields}>
        <InputUi
          label="Name"
          type="text"
          placeholder="Your name"
          value={name}
          error={errors.name}
          onChange={onNameChange}
          disabled={disabled}
        />
        <InputUi
          label="Role"
          type="text"
          placeholder="Your role"
          value={role}
          error={errors.role}
          onChange={onRoleChange}
          disabled={disabled}
        />
        <TextareaUi
          label="Description"
          placeholder="Your description"
          value={description}
          error={errors.description}
          onChange={onDescriptionChange}
          rows={4}
          disabled={disabled}
        />
        <div className={styles.profileForm__photoRow}>
          <div className={styles.profileForm__photoInput}>
            <InputUi
              label="Photo URL"
              type="text"
              placeholder="https://..."
              value={photoUrl || ""}
              onChange={onPhotoUrlChange}
              disabled={disabled}
            />
            <label
              className={`${styles.profileForm__fileButton} ${
                disabled ? styles.profileForm__fileButtonDisabled : ""
              }`}
            >
              <input
                type="file"
                accept="image/*"
                disabled={disabled}
                onChange={(event) =>
                  onPhotoFileSelect(event.target.files?.[0] || null)
                }
              />
              Upload photo
            </label>
            <p className={styles.profileForm__photoNote}>
              PNG/JPEG/WEBP, до 5MB. Можно загрузить файл или вставить ссылку.
            </p>
          </div>
          <div className={styles.profileForm__photoPreview}>
            {hasPhoto ? (
              <img
                src={previewSrc}
                alt="Profile preview"
                className={styles.profileForm__photoImage}
                onError={() => setIsPreviewError(true)}
              />
            ) : (
              <div className={styles.profileForm__photoPlaceholder}>
                No photo
              </div>
            )}
          </div>
        </div>
        <div className={styles.profileForm__section}>
          <h3 className={styles.profileForm__sectionTitle}>Social Links</h3>
          <InputUi
            label="GitHub"
            type="text"
            placeholder="https://github.com/username"
            value={github || ""}
            onChange={onGithubChange}
            disabled={disabled}
          />
          <InputUi
            label="LinkedIn"
            type="text"
            placeholder="https://linkedin.com/in/username"
            value={linkedin || ""}
            onChange={onLinkedinChange}
            disabled={disabled}
          />
          <InputUi
            label="Telegram"
            type="text"
            placeholder="@username"
            value={telegram || ""}
            onChange={onTelegramChange}
            disabled={disabled}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminProfileFormUi;
