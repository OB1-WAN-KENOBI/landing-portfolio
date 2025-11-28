import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "./ProjectsPage.module.scss";
import SectionUi from "../../shared/ui/section/SectionUi";
import TitleUi from "../../shared/ui/title/TitleUi";
import ProjectsListWidget from "../../widgets/projects-list/ProjectsListWidget";
import { useHead } from "../../app/providers/head/HeadManager";
import { useProjects } from "../../shared/lib/hooks/useProjects";
import { useLanguage } from "../../app/providers/language/useLanguage";
import { getPageUrl } from "../../shared/lib/constants";
import { useTranslation } from "../../shared/lib/i18n/useTranslation";
import { usePageLoaderEffect } from "../../app/providers/page-loader/PageLoaderProvider";

const ProjectsPage = () => {
  const { setTitle, setDescription, setOpenGraph } = useHead();
  const { language } = useLanguage();
  const { t } = useTranslation();
  const location = useLocation();
  const { projects, isLoading } = useProjects({ language });
  usePageLoaderEffect(isLoading);

  useEffect(() => {
    const url = getPageUrl(location.pathname);
    setTitle(t("meta.projects.title"));
    setDescription(t("meta.projects.description"));
    setOpenGraph({
      title: t("meta.projects.title"),
      description: t("meta.projects.description"),
      url: url,
    });
  }, [location.pathname, setTitle, setDescription, setOpenGraph, language]);

  if (isLoading) {
    return (
      <div className={styles.projectsPage}>
        <SectionUi>
          <TitleUi variant="h1">{t("page.projects")}</TitleUi>
          <p>{t("common.loading")}</p>
        </SectionUi>
      </div>
    );
  }

  return (
    <div className={styles.projectsPage}>
      <SectionUi>
        <TitleUi variant="h1">{t("page.projects")}</TitleUi>
        <ProjectsListWidget projects={projects} />
      </SectionUi>
    </div>
  );
};

export default ProjectsPage;
