import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./ProjectDetailsPage.module.scss";
import { useHead } from "../../app/providers/head/HeadManager";
import { mockProjects } from "../../shared/api/mocks/mockProjects";
import { normalizeProject } from "../../shared/lib/api/normalize";
import { useLanguage } from "../../app/providers/language/useLanguage";
import { useToast } from "../../app/providers/toast/ToastProvider";
import type { Project } from "../../shared/api/mockData";
import { getPageUrl } from "../../shared/lib/constants";

const ProjectDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const { language } = useLanguage();
  const { setTitle, setDescription, setOpenGraph } = useHead();
  const { showToast } = useToast();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    mockProjects
      .getById(id)
      .then((data) => {
        if (data) {
          setProject(normalizeProject(data, language));
        }
      })
      .catch((err) => {
        const error =
          err instanceof Error ? err : new Error("Failed to load project");
        showToast("error", error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id, language, showToast]);

  useEffect(() => {
    const url = getPageUrl(location.pathname);
    if (project) {
      setTitle(`${project.title} | Portfolio`);
      setDescription(project.description);
      setOpenGraph({
        title: project.title,
        description: project.description,
        url: url,
      });
    } else if (!isLoading) {
      setTitle("Project Not Found | Portfolio");
      setDescription("The project you're looking for doesn't exist.");
    }
  }, [
    project,
    isLoading,
    setTitle,
    setDescription,
    setOpenGraph,
    location.pathname,
  ]);

  if (isLoading) {
    return (
      <div className={styles.projectDetailsPage}>
        <div className={styles.projectDetailsPage__container}>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className={styles.projectDetailsPage}>
        <div className={styles.projectDetailsPage__container}>
          <div className={styles.projectDetailsPage__notFound}>
            <h1 className={styles.projectDetailsPage__notFoundTitle}>
              Project Not Found
            </h1>
            <p className={styles.projectDetailsPage__notFoundText}>
              The project you're looking for doesn't exist.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.projectDetailsPage}>
      <div className={styles.projectDetailsPage__container}>
        <div className={styles.projectDetailsPage__content}>
          <div className={styles.projectDetailsPage__main}>
            <h1 className={styles.projectDetailsPage__title}>
              {project.title}
            </h1>
            <div className={styles.projectDetailsPage__image}>
              <div className={styles.projectDetailsPage__placeholder}>
                Project Image
              </div>
            </div>
            <div className={styles.projectDetailsPage__description}>
              <h2 className={styles.projectDetailsPage__sectionTitle}>
                Description
              </h2>
              <p className={styles.projectDetailsPage__text}>
                {project.description}
              </p>
            </div>
            <div className={styles.projectDetailsPage__techStack}>
              <h2 className={styles.projectDetailsPage__sectionTitle}>
                Tech Stack
              </h2>
              <div className={styles.projectDetailsPage__techList}>
                {project.techStack.map((tech, index) => (
                  <span key={index} className={styles.projectDetailsPage__tech}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.projectDetailsPage__sidebar}>
            <div className={styles.projectDetailsPage__info}>
              <div className={styles.projectDetailsPage__infoItem}>
                <span className={styles.projectDetailsPage__infoLabel}>
                  Year
                </span>
                <span className={styles.projectDetailsPage__infoValue}>
                  {project.year}
                </span>
              </div>
              <div className={styles.projectDetailsPage__infoItem}>
                <span className={styles.projectDetailsPage__infoLabel}>
                  Status
                </span>
                <span className={styles.projectDetailsPage__infoValue}>
                  {project.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;
