import { memo } from "react";
import { Link } from "react-router-dom";
import styles from "./ProjectCardUi.module.scss";

interface ProjectCardUiProps {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  images?: string[];
}

const ProjectCardUi = memo(
  ({ id, title, description, techStack, images }: ProjectCardUiProps) => {
    const firstImage = images && images.length > 0 ? images[0] : null;

    // Отладка
    if (images && images.length > 0 && !firstImage) {
      console.warn(
        `Project ${id}: images array exists but firstImage is null`,
        {
          imagesLength: images.length,
          firstImageValue: images[0],
          firstImageType: typeof images[0],
        }
      );
    }

    return (
      <Link to={`/projects/${id}`} className={styles.projectCard}>
        <div className={styles.projectCard__image}>
          {firstImage ? (
            <img
              src={firstImage}
              alt={title}
              className={styles.projectCard__imageImg}
              onError={() => {
                console.error(`Failed to load image for project ${id}:`, {
                  src: firstImage?.substring(0, 100),
                  srcLength: firstImage?.length,
                });
              }}
            />
          ) : (
            <div className={styles.projectCard__placeholder}>Project Image</div>
          )}
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
