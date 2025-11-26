import { memo } from "react";
import { Link } from "react-router-dom";
import styles from "./ProjectCardUi.module.scss";

interface ProjectCardUiProps {
  id: string;
  title: string;
  description: string;
  techStack: string[];
}

const ProjectCardUi = memo(
  ({ id, title, description, techStack }: ProjectCardUiProps) => {
    return (
      <Link to={`/projects/${id}`} className={styles.projectCard}>
        <div className={styles.projectCard__image}>
          <div className={styles.projectCard__placeholder}>Project Image</div>
        </div>
        <div className={styles.projectCard__content}>
          <h3 className={styles.projectCard__title}>{title}</h3>
          <p className={styles.projectCard__description}>{description}</p>
          <div className={styles.projectCard__techStack}>
            {techStack.map((tech, index) => (
              <span key={index} className={styles.projectCard__tech}>
                {tech}
              </span>
            ))}
          </div>
        </div>
      </Link>
    );
  }
);

ProjectCardUi.displayName = "ProjectCardUi";

export default ProjectCardUi;
