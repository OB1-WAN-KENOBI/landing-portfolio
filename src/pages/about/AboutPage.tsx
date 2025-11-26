import { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import styles from "./AboutPage.module.scss";
import TitleUi from "../../shared/ui/title/TitleUi";
import TextUi from "../../shared/ui/text/TextUi";
import { useHead } from "../../app/providers/head/HeadManager";
import { useProfile } from "../../shared/lib/hooks/useProfile";
import { useSkills } from "../../shared/lib/hooks/useSkills";
import { useLanguage } from "../../app/providers/language/useLanguage";
import { getPageUrl } from "../../shared/lib/constants";

const AboutPage = () => {
  const { setTitle, setDescription, setOpenGraph } = useHead();
  const { language } = useLanguage();
  const location = useLocation();
  const {
    profile,
    aboutTexts,
    isLoading: isLoadingProfile,
  } = useProfile(language);
  const { skills, isLoading: isLoadingSkills } = useSkills();

  const frontendSkills = useMemo(
    () =>
      skills
        .filter((skill) => skill.category === "frontend")
        .map((skill) => skill.name),
    [skills]
  );

  const isLoading = isLoadingProfile || isLoadingSkills;

  useEffect(() => {
    if (profile && aboutTexts.length > 0) {
      const url = getPageUrl(location.pathname);
      setTitle(`About ${profile.name} | Portfolio`);
      setDescription(
        `${profile.name} - ${profile.role}. ${aboutTexts[0] || ""}`
      );
      setOpenGraph({
        title: `About ${profile.name}`,
        description: `${profile.name} - ${profile.role}`,
        url: url,
      });
    }
  }, [
    location.pathname,
    profile,
    aboutTexts,
    setTitle,
    setDescription,
    setOpenGraph,
  ]);

  if (isLoading || !profile) {
    return (
      <div className={styles.aboutPage}>
        <div className={styles.aboutPage__container}>
          <TitleUi variant="h1">About</TitleUi>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.aboutPage}>
      <div className={styles.aboutPage__container}>
        <TitleUi variant="h1">About</TitleUi>

        <div className={styles.aboutPage__content}>
          <div className={styles.aboutPage__photo}>
            <div className={styles.aboutPage__photoPlaceholder}>
              Profile Photo
            </div>
          </div>

          <div className={styles.aboutPage__info}>
            <div className={styles.aboutPage__resume}>
              <div className={styles.aboutPage__resumeItem}>
                <span className={styles.aboutPage__resumeLabel}>Name</span>
                <span className={styles.aboutPage__resumeValue}>
                  {profile.name}
                </span>
              </div>
              <div className={styles.aboutPage__resumeItem}>
                <span className={styles.aboutPage__resumeLabel}>Role</span>
                <span className={styles.aboutPage__resumeValue}>
                  {profile.role}
                </span>
              </div>
              {frontendSkills.length > 0 && (
                <div className={styles.aboutPage__resumeItem}>
                  <span className={styles.aboutPage__resumeLabel}>
                    Tech Stack
                  </span>
                  <span className={styles.aboutPage__resumeValue}>
                    {frontendSkills.join(", ")}
                  </span>
                </div>
              )}
            </div>

            <div className={styles.aboutPage__texts}>
              {aboutTexts.map((text, index) => (
                <TextUi key={index} size="lg">
                  {text}
                </TextUi>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
