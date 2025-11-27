import { memo } from "react";
import styles from "./SkillCardUi.module.scss";
import type { SkillLevel } from "../../api/domainTypes";

interface SkillCardUiProps {
  name: string;
  level: SkillLevel;
}

const SkillCardUi = memo(({ name, level }: SkillCardUiProps) => {
  return (
    <div className={styles.skillCard}>
      <div className={styles.skillCard__content}>
        <h3 className={styles.skillCard__name}>{name}</h3>
        <div className={styles.skillCard__level}>
          <span
            className={`${styles.skillCard__levelBadge} ${
              styles[`skillCard__levelBadge--${level}`]
            }`}
          >
            {level}
          </span>
        </div>
      </div>
    </div>
  );
});

SkillCardUi.displayName = "SkillCardUi";

export default SkillCardUi;
