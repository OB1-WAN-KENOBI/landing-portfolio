import styles from "./AdminSkillFormUi.module.scss";
import InputUi from "../form/InputUi";
import DropdownUi from "../dropdown/DropdownUi";
import type { ApiSkillCategory, ApiSkillLevel } from "../../api/http/types";

interface AdminSkillFormUiProps {
  name: string;
  category: ApiSkillCategory;
  level: ApiSkillLevel;
  errors?: {
    name?: string;
    category?: string;
    level?: string;
  };
  onNameChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onLevelChange: (value: string) => void;
  disabled?: boolean;
}

const AdminSkillFormUi = ({
  name,
  category,
  level,
  errors = {},
  onNameChange,
  onCategoryChange,
  onLevelChange,
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
    </div>
  );
};

export default AdminSkillFormUi;
