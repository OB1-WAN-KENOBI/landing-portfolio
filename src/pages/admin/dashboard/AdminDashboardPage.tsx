import { useState, useEffect, useMemo } from "react";
import styles from "./AdminDashboardPage.module.scss";
import TitleUi from "../../../shared/ui/title/TitleUi";
import StatCardUi from "../../../shared/ui/stat-card/StatCardUi";
import { mockProjects } from "../../../shared/api/mocks/mockProjects";
import { mockSkills } from "../../../shared/api/mocks/mockSkills";
import { useToast } from "../../../app/providers/toast/ToastProvider";
import type { ApiProject } from "../../../shared/api/http/types";
import type { ApiSkill } from "../../../shared/api/http/types";

const AdminDashboardPage = () => {
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState<ApiProject[]>([]);
  const [skills, setSkills] = useState<ApiSkill[]>([]);

  useEffect(() => {
    setIsLoading(true);
    Promise.all([mockProjects.getAll(), mockSkills.getAll()])
      .then(([projectsData, skillsData]) => {
        setProjects(projectsData);
        setSkills(skillsData);
        setIsLoading(false);
      })
      .catch((error) => {
        showToast(
          "error",
          error instanceof Error ? error.message : "Failed to load data"
        );
        setIsLoading(false);
      });
  }, [showToast]);

  const stats = useMemo(() => {
    const totalProjects = projects.length;
    const projectsByStatus = projects.reduce((acc, p) => {
      acc[p.status] = (acc[p.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    const totalSkills = skills.length;
    const skillsByCategory = skills.reduce((acc, s) => {
      acc[s.category] = (acc[s.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalProjects,
      projectsByStatus,
      totalSkills,
      skillsByCategory,
    };
  }, [projects, skills]);

  if (isLoading) {
    return (
      <div className={styles.adminDashboardPage}>
        <TitleUi variant="h1">Dashboard</TitleUi>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className={styles.adminDashboardPage}>
      <TitleUi variant="h1">Dashboard</TitleUi>
      <div className={styles.adminDashboardPage__stats}>
        <StatCardUi title="Total Projects" value={stats.totalProjects} />
        <StatCardUi title="Total Skills" value={stats.totalSkills} />
        {Object.entries(stats.projectsByStatus).map(([status, count]) => (
          <StatCardUi
            key={status}
            title={`Projects: ${status}`}
            value={count}
          />
        ))}
        {Object.entries(stats.skillsByCategory).map(([category, count]) => (
          <StatCardUi
            key={category}
            title={`Skills: ${category}`}
            value={count}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminDashboardPage;
