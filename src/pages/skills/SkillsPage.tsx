import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "./SkillsPage.module.scss";
import SkillsListWidget from "../../widgets/skills-list/SkillsListWidget";
import { useHead } from "../../app/providers/head/HeadManager";
import { useSkills } from "../../shared/lib/hooks/useSkills";
import { getPageUrl } from "../../shared/lib/constants";
import { useTranslation } from "../../shared/lib/i18n/useTranslation";

const SkillsPage = () => {
  const { setTitle, setDescription, setOpenGraph } = useHead();
  const { t, language } = useTranslation();
  const location = useLocation();
  const { skills, isLoading } = useSkills();

  useEffect(() => {
    const url = getPageUrl(location.pathname);
    setTitle(t("meta.skills.title"));
    setDescription(t("meta.skills.description"));
    setOpenGraph({
      title: t("meta.skills.title"),
      description: t("meta.skills.description"),
      url: url,
    });
  }, [location.pathname, setTitle, setDescription, setOpenGraph, language]);

  if (isLoading) {
    return (
      <div className={styles.skillsPage}>
        <div className={styles.skillsPage__container}>
          <h1 className={styles.skillsPage__title}>{t("page.skills")}</h1>
          <p>{t("common.loading")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.skillsPage}>
      <div className={styles.skillsPage__container}>
        <h1 className={styles.skillsPage__title}>{t("page.skills")}</h1>
        <SkillsListWidget skills={skills} />
      </div>
    </div>
  );
};

export default SkillsPage;
