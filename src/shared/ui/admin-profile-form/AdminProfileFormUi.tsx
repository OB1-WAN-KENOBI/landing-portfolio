import styles from "./AdminProfileFormUi.module.scss";
import InputUi from "../form/InputUi";
import TextareaUi from "../form/TextareaUi";

interface AdminProfileFormUiProps {
  name: string;
  role: string;
  description: string;
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
  onGithubChange: (value: string) => void;
  onLinkedinChange: (value: string) => void;
  onTelegramChange: (value: string) => void;
  disabled?: boolean;
}

const AdminProfileFormUi = ({
  name,
  role,
  description,
  github,
  linkedin,
  telegram,
  errors = {},
  onNameChange,
  onRoleChange,
  onDescriptionChange,
  onGithubChange,
  onLinkedinChange,
  onTelegramChange,
  disabled = false,
}: AdminProfileFormUiProps) => {
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
