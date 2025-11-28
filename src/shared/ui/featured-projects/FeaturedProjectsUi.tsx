import { Link } from "react-router-dom";
import styles from "./FeaturedProjectsUi.module.scss";
import { useTranslation } from "../../lib/i18n/useTranslation";

interface Project {
  id: string;
  title: string;
  description: string;
}

interface FeaturedProjectsUiProps {
  projects: Project[];
}

const FeaturedProjectsUi = ({ projects }: FeaturedProjectsUiProps) => {
  const { t } = useTranslation();

  return (
    <section className={styles.featuredProjects}>
      <div className={styles.featuredProjects__container}>
        <h2 className={styles.featuredProjects__title}>
          {t("section.featuredProjects")}
        </h2>
        <div className={styles.featuredProjects__grid}>
          {projects.map((project) => (
            <Link
              key={project.id}
              to={`/projects/${project.id}`}
              className={styles.featuredProjects__item}
            >
              <div className={styles.featuredProjects__itemContent}>
                <h3 className={styles.featuredProjects__itemTitle}>
                  {project.title}
                </h3>
                <p className={styles.featuredProjects__itemDescription}>
                  {project.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjectsUi;
