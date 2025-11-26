import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "./SkillsPage.module.scss";
import SkillsListWidget from "../../widgets/skills-list/SkillsListWidget";
import { useHead } from "../../app/providers/head/HeadManager";
import { useSkills } from "../../shared/lib/hooks/useSkills";
import { getPageUrl } from "../../shared/lib/constants";

const SkillsPage = () => {
  const { setTitle, setDescription, setOpenGraph } = useHead();
  const location = useLocation();
  const { skills, isLoading } = useSkills();

  useEffect(() => {
    const url = getPageUrl(location.pathname);
    setTitle("Skills | Portfolio");
    setDescription("My technical skills and expertise in web development");
    setOpenGraph({
      title: "Skills | Portfolio",
      description: "My technical skills and expertise in web development",
      url: url,
    });
  }, [location.pathname, setTitle, setDescription, setOpenGraph]);

  if (isLoading) {
    return (
      <div className={styles.skillsPage}>
        <div className={styles.skillsPage__container}>
          <h1 className={styles.skillsPage__title}>Skills</h1>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.skillsPage}>
      <div className={styles.skillsPage__container}>
        <h1 className={styles.skillsPage__title}>Skills</h1>
        <SkillsListWidget skills={skills} />
      </div>
    </div>
  );
};

export default SkillsPage;
