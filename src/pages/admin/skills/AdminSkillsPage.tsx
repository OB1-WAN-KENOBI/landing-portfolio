import { useState, useMemo, useEffect } from "react";
import styles from "./AdminSkillsPage.module.scss";
import TitleUi from "../../../shared/ui/title/TitleUi";
import AdminTableUi from "../../../shared/ui/admin-table/AdminTableUi";
import ButtonUi from "../../../shared/ui/form/ButtonUi";
import DropdownUi from "../../../shared/ui/dropdown/DropdownUi";
import SkillsCRUDWidget from "../../../widgets/admin-skills-crud/SkillsCRUDWidget";
import { skillsApi } from "../../../shared/api/http/skillsApi";
import { normalizeSkill } from "../../../shared/lib/api/normalize";
import { useToast } from "../../../app/providers/toast/ToastProvider";
import type { ApiSkill } from "../../../shared/api/http/types";
import type { ApiSkillCategory } from "../../../shared/api/http/types";

const AdminSkillsPage = () => {
  const { showToast } = useToast();
  const [apiSkills, setApiSkills] = useState<ApiSkill[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState<
    ApiSkillCategory | "all"
  >("all");

  useEffect(() => {
    setIsLoading(true);
    skillsApi
      .getAll()
      .then((data) => {
        setApiSkills(data);
        setIsLoading(false);
      })
      .catch((error) => {
        showToast(
          "error",
          error instanceof Error ? error.message : "Failed to load skills"
        );
        setIsLoading(false);
      });
  }, [showToast]);

  const skills = useMemo(() => apiSkills.map(normalizeSkill), [apiSkills]);

  const filteredSkills = useMemo(() => {
    if (categoryFilter === "all") return skills;
    return skills.filter((s) => s.category === categoryFilter);
  }, [skills, categoryFilter]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddClick = () => {
    setIsAdding(true);
    setEditingId(null);
  };

  const handleEditClick = (id: string) => {
    setEditingId(id);
    setIsAdding(false);
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setIsAdding(false);
  };

  const handleDelete = async (id: string) => {
    try {
      await skillsApi.delete(id);
      const updatedSkills = apiSkills.filter((s) => s.id !== id);
      setApiSkills(updatedSkills);
      showToast("success", "Skill deleted successfully");
    } catch (error) {
      showToast(
        "error",
        error instanceof Error ? error.message : "Failed to delete skill"
      );
    }
  };

  const handleDuplicate = async (id: string) => {
    const skill = apiSkills.find((s) => s.id === id);
    if (!skill) return;

    try {
      const duplicated = await skillsApi.create({
        name: `${skill.name} (copy)`,
        category: skill.category,
        level: skill.level,
        isCore: false,
      });
      setApiSkills([...apiSkills, duplicated]);
      showToast("success", "Skill duplicated successfully");
    } catch (error) {
      showToast(
        "error",
        error instanceof Error ? error.message : "Failed to duplicate skill"
      );
    }
  };

  const handleToggleCore = async (id: string, currentValue: boolean) => {
    try {
      const updated = await skillsApi.update(id, { isCore: !currentValue });
      const updatedSkills = apiSkills.map((skill) =>
        skill.id === id ? updated : skill
      );
      setApiSkills(updatedSkills);
      showToast(
        "success",
        !currentValue
          ? "Skill will be shown on homepage"
          : "Skill removed from homepage"
      );
    } catch (error) {
      showToast(
        "error",
        error instanceof Error ? error.message : "Failed to update skill"
      );
    }
  };

  const handleSkillsChange = (updatedSkills: ApiSkill[]) => {
    setApiSkills(updatedSkills);
  };

  if (isLoading) {
    return (
      <div className={styles.adminSkillsPage}>
        <TitleUi variant="h1">Skills</TitleUi>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className={styles.adminSkillsPage}>
      <div className={styles.adminSkillsPage__header}>
        <TitleUi variant="h1">Skills</TitleUi>
        <ButtonUi onClick={handleAddClick}>Add Skill</ButtonUi>
      </div>
      <div className={styles.adminSkillsPage__filters}>
        <DropdownUi
          label="Category"
          value={categoryFilter}
          options={["all", "frontend", "backend", "tooling", "other"]}
          onChange={(value) =>
            setCategoryFilter(value as ApiSkillCategory | "all")
          }
          placeholder="All categories"
        />
      </div>
      <SkillsCRUDWidget
        skills={apiSkills}
        onSkillsChange={handleSkillsChange}
        editingId={isAdding ? "new" : editingId}
        onEditCancel={handleEditCancel}
      />
      <AdminTableUi
        headers={["Name", "Category", "Level", "Homepage", "Actions"]}
        enableAutoAnimate={true}
      >
        {filteredSkills.map((skill) => (
          <tr key={skill.id} className={styles.adminSkillsPage__row}>
            <td className={styles.adminSkillsPage__cell}>{skill.name}</td>
            <td className={styles.adminSkillsPage__cell}>{skill.category}</td>
            <td className={styles.adminSkillsPage__cell}>{skill.level}</td>
            <td className={styles.adminSkillsPage__cell}>
              {skill.isCore ? "Yes" : "No"}
            </td>
            <td className={styles.adminSkillsPage__cell}>
              <div className={styles.adminSkillsPage__actions}>
                <button
                  className={styles.adminSkillsPage__actionButton}
                  onClick={() => handleEditClick(skill.id)}
                >
                  Edit
                </button>
                <button
                  className={styles.adminSkillsPage__actionButton}
                  onClick={() => handleDuplicate(skill.id)}
                >
                  Duplicate
                </button>
                <button
                  className={styles.adminSkillsPage__actionButton}
                  onClick={() => handleToggleCore(skill.id, Boolean(skill.isCore))}
                >
                  {skill.isCore ? "Hide from homepage" : "Show on homepage"}
                </button>
                <button
                  className={`${styles.adminSkillsPage__actionButton} ${styles.adminSkillsPage__actionButtonDanger}`}
                  onClick={() => handleDelete(skill.id)}
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        ))}
      </AdminTableUi>
    </div>
  );
};

export default AdminSkillsPage;
