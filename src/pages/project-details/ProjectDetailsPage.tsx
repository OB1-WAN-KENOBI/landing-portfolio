import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./ProjectDetailsPage.module.scss";
import { useHead } from "../../app/providers/head/HeadManager";
import { projectsApi } from "../../shared/api/http/projectsApi";
import { normalizeProject } from "../../shared/lib/api/normalize";
import { useLanguage } from "../../app/providers/language/useLanguage";
import { useToast } from "../../app/providers/toast/ToastProvider";
import type { Project } from "../../shared/api/domainTypes";
import { getPageUrl } from "../../shared/lib/constants";
import { useTranslation } from "../../shared/lib/i18n/useTranslation";

const ProjectDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const { language } = useLanguage();
  const { t } = useTranslation();
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
    projectsApi
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
      setTitle(t("meta.projectNotFound.title"));
      setDescription(t("meta.projectNotFound.description"));
    }
  }, [
    project,
    isLoading,
    setTitle,
    setDescription,
    setOpenGraph,
    location.pathname,
    language,
  ]);

  if (isLoading) {
    return (
      <div className={styles.projectDetailsPage}>
        <div className={styles.projectDetailsPage__container}>
          <p>{t("common.loading")}</p>
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
              {t("error.projectNotFound")}
            </h1>
            <p className={styles.projectDetailsPage__notFoundText}>
              {t("error.projectNotFoundDescription")}
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
                {t("project.image")}
              </div>
            </div>
            <div className={styles.projectDetailsPage__description}>
              <h2 className={styles.projectDetailsPage__sectionTitle}>
                {t("project.description")}
              </h2>
              <p className={styles.projectDetailsPage__text}>
                {project.description}
              </p>
            </div>
            <div className={styles.projectDetailsPage__techStack}>
              <h2 className={styles.projectDetailsPage__sectionTitle}>
                {t("project.techStack")}
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
                  {t("project.year")}
                </span>
                <span className={styles.projectDetailsPage__infoValue}>
                  {project.year}
                </span>
              </div>
              <div className={styles.projectDetailsPage__infoItem}>
                <span className={styles.projectDetailsPage__infoLabel}>
                  {t("project.status")}
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
