import ProjectCardUi from "../../shared/ui/project-card/ProjectCardUi";
import styles from "./ProjectsListWidget.module.scss";
import type { Project } from "../../shared/api/domainTypes";

interface ProjectsListWidgetProps {
  projects: Project[];
}

const ProjectsListWidget = ({ projects }: ProjectsListWidgetProps) => {
  return (
    <div className={styles.projectsList}>
      {projects.map((project) => (
        <ProjectCardUi
          key={project.id}
          id={project.id}
          title={project.title}
          description={project.description}
          techStack={project.techStack}
          images={project.images}
        />
      ))}
    </div>
  );
};

export default ProjectsListWidget;
