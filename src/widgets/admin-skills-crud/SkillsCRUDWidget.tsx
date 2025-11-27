import { useState, useMemo, useEffect } from "react";
import styles from "./SkillsCRUDWidget.module.scss";
import AdminSkillFormUi from "../../shared/ui/admin-skill-form/AdminSkillFormUi";
import ButtonUi from "../../shared/ui/form/ButtonUi";
import { skillsApi } from "../../shared/api/http/skillsApi";
import { useToast } from "../../app/providers/toast/ToastProvider";
import type { ApiSkill } from "../../shared/api/http/types";
import type {
  ApiSkillCategory,
  ApiSkillLevel,
} from "../../shared/api/http/types";

interface SkillsCRUDWidgetProps {
  skills: ApiSkill[];
  onSkillsChange: (skills: ApiSkill[]) => void;
  editingId: string | null;
  onEditCancel: () => void;
}

const SkillsCRUDWidget = ({
  skills,
  onSkillsChange,
  editingId,
  onEditCancel,
}: SkillsCRUDWidgetProps) => {
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const isAdding = editingId === "new";
  const editingSkill = useMemo(
    () =>
      editingId && editingId !== "new"
        ? skills.find((s) => s.id === editingId)
        : null,
    [skills, editingId]
  );

  const [name, setName] = useState(editingSkill?.name || "");
  const [category, setCategory] = useState<ApiSkillCategory>(
    editingSkill?.category || "frontend"
  );
  const [level, setLevel] = useState<ApiSkillLevel>(
    editingSkill?.level || "middle"
  );
  const [errors, setErrors] = useState<{
    name?: string;
    category?: string;
    level?: string;
  }>({});

  useEffect(() => {
    if (editingSkill) {
      setName(editingSkill.name);
      setCategory(editingSkill.category);
      setLevel(editingSkill.level);
    } else if (isAdding) {
      setName("");
      setCategory("frontend");
      setLevel("middle");
    }
  }, [editingSkill, isAdding]);

  const handleSave = async () => {
    const newErrors: typeof errors = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      if (isAdding) {
        const newSkill = await skillsApi.create({
          name: name.trim(),
          category: category,
          level: level,
        });
        onSkillsChange([...skills, newSkill]);
        showToast("success", "Skill created successfully");
        handleCancel();
      } else if (editingId && editingId !== "new") {
        const updatedSkill = await skillsApi.update(editingId, {
          name: name.trim(),
          category: category,
          level: level,
        });
        const updatedSkills = skills.map((s) =>
          s.id === editingId ? updatedSkill : s
        );
        onSkillsChange(updatedSkills);
        showToast("success", "Skill updated successfully");
        handleCancel();
      }
    } catch (error) {
      showToast(
        "error",
        error instanceof Error ? error.message : "Operation failed"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setName("");
    setCategory("frontend");
    setLevel("middle");
    setErrors({});
    onEditCancel();
  };

  if (!editingId) {
    return null;
  }

  return (
    <div className={styles.skillsCRUD}>
      <AdminSkillFormUi
        name={name}
        category={category}
        level={level}
        errors={errors}
        onNameChange={setName}
        onCategoryChange={(value) => setCategory(value as ApiSkillCategory)}
        onLevelChange={(value) => setLevel(value as ApiSkillLevel)}
        disabled={isLoading}
      />
      <div className={styles.skillsCRUD__actions}>
        <ButtonUi onClick={handleSave} disabled={isLoading}>
          {isLoading ? "Saving..." : "Save"}
        </ButtonUi>
        <ButtonUi onClick={handleCancel} disabled={isLoading}>
          Cancel
        </ButtonUi>
      </div>
    </div>
  );
};

export default SkillsCRUDWidget;
