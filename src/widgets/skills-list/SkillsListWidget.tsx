import styles from "./SkillsListWidget.module.scss";
import SkillCardUi from "../../shared/ui/skill-card/SkillCardUi";
import type { Skill, SkillCategory } from "../../shared/api/domainTypes";

interface SkillsListWidgetProps {
  skills: Skill[];
}

const categoryLabels: Record<SkillCategory, string> = {
  frontend: "Frontend",
  backend: "Backend",
  tooling: "Tooling",
  other: "Other",
};

const SkillsListWidget = ({ skills }: SkillsListWidgetProps) => {
  const groups: Record<SkillCategory, Skill[]> = {
    frontend: [],
    backend: [],
    tooling: [],
    other: [],
  };

  skills.forEach((skill) => {
    groups[skill.category].push(skill);
  });

  const categories: SkillCategory[] = [
    "frontend",
    "backend",
    "tooling",
    "other",
  ];

  return (
    <div className={styles.skillsList}>
      {categories.map((category) => {
        const categorySkills = groups[category];
        if (categorySkills.length === 0) return null;

        return (
          <div key={category} className={styles.skillsList__category}>
            <h2 className={styles.skillsList__categoryTitle}>
              {categoryLabels[category]}
            </h2>
            <div className={styles.skillsList__grid}>
              {categorySkills.map((skill) => (
                <SkillCardUi
                  key={skill.id}
                  name={skill.name}
                  level={skill.level}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SkillsListWidget;
