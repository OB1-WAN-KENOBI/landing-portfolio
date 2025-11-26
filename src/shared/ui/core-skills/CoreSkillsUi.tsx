import styles from "./CoreSkillsUi.module.scss";
import type { Skill } from "../../api/mockData";
import { useTranslation } from "../../lib/i18n/useTranslation";

interface CoreSkillsUiProps {
  skills: Skill[];
}

const CoreSkillsUi = ({ skills }: CoreSkillsUiProps) => {
  const { t } = useTranslation();

  return (
    <section className={styles.coreSkills}>
      <div className={styles.coreSkills__container}>
        <h2 className={styles.coreSkills__title}>{t("section.coreSkills")}</h2>
        <div className={styles.coreSkills__grid}>
          {skills.map((skill) => (
            <div key={skill.id} className={styles.coreSkills__item}>
              <div className={styles.coreSkills__itemContent}>
                <h3 className={styles.coreSkills__itemTitle}>{skill.name}</h3>
                <p className={styles.coreSkills__itemDescription}>
                  {skill.category} • {skill.level}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreSkillsUi;
