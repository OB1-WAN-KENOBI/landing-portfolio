import { useState, useEffect } from "react";
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
  images?: string[];
  imagePreviews?: string[];
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
  onImagesFileSelect: (files: File[]) => void;
  onImageRemove: (index: number) => void;
  disabled?: boolean;
}

const AdminProjectFormUi = ({
  title,
  description,
  techStack,
  year,
  status,
  images = [],
  imagePreviews = [],
  errors = {},
  onTitleChange,
  onDescriptionChange,
  onTechStackChange,
  onYearChange,
  onStatusChange,
  onImagesFileSelect,
  onImageRemove,
  disabled = false,
}: AdminProjectFormUiProps) => {
  const statusOptions = ["Completed", "In Progress", "Planned"];
  const [previewErrors, setPreviewErrors] = useState<Record<number, boolean>>(
    {}
  );

  useEffect(() => {
    setPreviewErrors({});
  }, [imagePreviews]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    const validFiles = files.filter((file) => {
      if (!file.type.startsWith("image/")) {
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        return false;
      }
      return true;
    });

    onImagesFileSelect(validFiles);
    event.target.value = "";
  };

  const allImages = [
    ...imagePreviews.map((preview, index) => ({
      type: "preview" as const,
      url: preview,
      index,
    })),
    ...images.map((url, index) => ({
      type: "url" as const,
      url,
      index: imagePreviews.length + index,
    })),
  ];

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
        <div className={styles.projectForm__imagesSection}>
          <div className={styles.projectForm__imagesHeader}>
            <label className={styles.projectForm__imagesLabel}>Images</label>
            <label
              className={`${styles.projectForm__fileButton} ${
                disabled ? styles.projectForm__fileButtonDisabled : ""
              }`}
            >
              <input
                type="file"
                accept="image/*"
                multiple
                disabled={disabled}
                onChange={handleFileSelect}
              />
              Add Images
            </label>
          </div>
          <p className={styles.projectForm__imagesNote}>
            PNG/JPEG/WEBP, до 5MB каждая. Можно загрузить несколько файлов.
          </p>
          {allImages.length > 0 && (
            <div className={styles.projectForm__imagesList}>
              {allImages.map((item, index) => (
                <div key={index} className={styles.projectForm__imageItem}>
                  <div className={styles.projectForm__imagePreview}>
                    {!previewErrors[index] ? (
                      <img
                        src={item.url}
                        alt={`Project image ${index + 1}`}
                        className={styles.projectForm__imageImg}
                        onError={() =>
                          setPreviewErrors((prev) => ({
                            ...prev,
                            [index]: true,
                          }))
                        }
                      />
                    ) : (
                      <div className={styles.projectForm__imagePlaceholder}>
                        Error loading image
                      </div>
                    )}
                  </div>
                  <button
                    type="button"
                    className={styles.projectForm__imageRemove}
                    onClick={() => onImageRemove(index)}
                    disabled={disabled}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProjectFormUi;
