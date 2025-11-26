import styles from "./AdminProjectFormUi.module.scss";
import InputUi from "../form/InputUi";
import TextareaUi from "../form/TextareaUi";
import DropdownUi from "../dropdown/DropdownUi";

interface AdminProjectFormUiProps {
  title: string;
  description: string;
  techStack: string;
  year: string;
  status: string;
  errors?: {
    title?: string;
    description?: string;
    techStack?: string;
    year?: string;
    status?: string;
  };
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onTechStackChange: (value: string) => void;
  onYearChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  disabled?: boolean;
}

const AdminProjectFormUi = ({
  title,
  description,
  techStack,
  year,
  status,
  errors = {},
  onTitleChange,
  onDescriptionChange,
  onTechStackChange,
  onYearChange,
  onStatusChange,
  disabled = false,
}: AdminProjectFormUiProps) => {
  const statusOptions = ["Completed", "In Progress", "Planned"];

  return (
    <div className={styles.projectForm}>
      <div className={styles.projectForm__fields}>
        <InputUi
          label="Title"
          type="text"
          placeholder="Project title"
          value={title}
          error={errors.title}
          onChange={onTitleChange}
          disabled={disabled}
        />
        <TextareaUi
          label="Description"
          placeholder="Project description"
          value={description}
          error={errors.description}
          onChange={onDescriptionChange}
          rows={4}
          disabled={disabled}
        />
        <InputUi
          label="Tech Stack (comma-separated)"
          type="text"
          placeholder="React, TypeScript, Node.js"
          value={techStack}
          error={errors.techStack}
          onChange={onTechStackChange}
          disabled={disabled}
        />
        <InputUi
          label="Year"
          type="number"
          placeholder="2024"
          value={year}
          error={errors.year}
          onChange={onYearChange}
          disabled={disabled}
        />
        <DropdownUi
          label="Status"
          value={status}
          options={statusOptions}
          onChange={onStatusChange}
          placeholder="Select status"
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default AdminProjectFormUi;
