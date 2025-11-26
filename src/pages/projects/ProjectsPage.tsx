import { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import styles from "./ProjectsPage.module.scss";
import SectionUi from "../../shared/ui/section/SectionUi";
import TitleUi from "../../shared/ui/title/TitleUi";
import ProjectsFiltersWidget from "../../widgets/projects-filters/ProjectsFiltersWidget";
import ProjectsListWidget from "../../widgets/projects-list/ProjectsListWidget";
import { useHead } from "../../app/providers/head/HeadManager";
import { useProjects } from "../../shared/lib/hooks/useProjects";
import { useLanguage } from "../../app/providers/language/useLanguage";
import type { Project } from "../../shared/api/mockData";
import { getPageUrl } from "../../shared/lib/constants";

const ProjectsPage = () => {
  const { setTitle, setDescription, setOpenGraph } = useHead();
  const { language } = useLanguage();
  const location = useLocation();
  const { projects, isLoading } = useProjects({ language });
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);

  const handleFilteredProjectsChange = useCallback((filtered: Project[]) => {
    setFilteredProjects(filtered);
  }, []);

  useEffect(() => {
    if (projects.length > 0) {
      setFilteredProjects(projects);
    }
  }, [projects]);

  useEffect(() => {
    const url = getPageUrl(location.pathname);
    setTitle("Projects | Portfolio");
    setDescription("Browse through my portfolio of web development projects");
    setOpenGraph({
      title: "Projects | Portfolio",
      description: "Browse through my portfolio of web development projects",
      url: url,
    });
  }, [location.pathname, setTitle, setDescription, setOpenGraph]);

  if (isLoading) {
    return (
      <div className={styles.projectsPage}>
        <SectionUi>
          <TitleUi variant="h1">Projects</TitleUi>
          <p>Loading...</p>
        </SectionUi>
      </div>
    );
  }

  return (
    <div className={styles.projectsPage}>
      <SectionUi>
        <TitleUi variant="h1">Projects</TitleUi>
        <ProjectsFiltersWidget
          projects={projects}
          onFilteredProjectsChange={handleFilteredProjectsChange}
        />
        <ProjectsListWidget projects={filteredProjects} />
      </SectionUi>
    </div>
  );
};

export default ProjectsPage;
