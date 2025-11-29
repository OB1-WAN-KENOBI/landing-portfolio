import styles from "./AdminSkillFormUi.module.scss";
import InputUi from "../form/InputUi";
import DropdownUi from "../dropdown/DropdownUi";
import type { ApiSkillCategory, ApiSkillLevel } from "../../api/http/types";

interface AdminSkillFormUiProps {
  name: string;
  category: ApiSkillCategory;
  level: ApiSkillLevel;
  isCore: boolean;
  errors?: {
    name?: string;
    category?: string;
    level?: string;
  };
  onNameChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onLevelChange: (value: string) => void;
  onIsCoreChange: (value: boolean) => void;
  disabled?: boolean;
}

const AdminSkillFormUi = ({
  name,
  category,
  level,
  isCore,
  errors = {},
  onNameChange,
  onCategoryChange,
  onLevelChange,
  onIsCoreChange,
  disabled = false,
}: AdminSkillFormUiProps) => {
  const categoryOptions: ApiSkillCategory[] = [
    "frontend",
    "backend",
    "tooling",
    "other",
  ];
  const levelOptions: ApiSkillLevel[] = ["beginner", "middle", "advanced"];

  return (
    <div className={styles.skillForm}>
      <div className={styles.skillForm__fields}>
        <InputUi
          label="Name"
          type="text"
          placeholder="Skill name"
          value={name}
          error={errors.name}
          onChange={onNameChange}
          disabled={disabled}
        />
        <DropdownUi
          label="Category"
          value={category}
          options={categoryOptions}
          onChange={onCategoryChange}
          placeholder="Select category"
          disabled={disabled}
        />
        <DropdownUi
          label="Level"
          value={level}
          options={levelOptions}
          onChange={onLevelChange}
          placeholder="Select level"
          disabled={disabled}
        />
      </div>
      <label className={styles.skillForm__checkbox}>
        <input
          type="checkbox"
          checked={isCore}
          onChange={(event) => onIsCoreChange(event.target.checked)}
          disabled={disabled}
        />
        <div className={styles.skillForm__checkboxText}>
          <span>Show on homepage</span>
          <small>Попадает в блок &quot;Основные навыки&quot; на главной</small>
        </div>
      </label>
    </div>
  );
};

export default AdminSkillFormUi;
