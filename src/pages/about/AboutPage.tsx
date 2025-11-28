import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./AboutPage.module.scss";
import TitleUi from "../../shared/ui/title/TitleUi";
import TextUi from "../../shared/ui/text/TextUi";
import { useHead } from "../../app/providers/head/HeadManager";
import { useProfile } from "../../shared/lib/hooks/useProfile";
import { useSkills } from "../../shared/lib/hooks/useSkills";
import { useLanguage } from "../../app/providers/language/useLanguage";
import { getPageUrl } from "../../shared/lib/constants";
import { useTranslation } from "../../shared/lib/i18n/useTranslation";
import { usePageLoaderEffect } from "../../app/providers/page-loader/PageLoaderProvider";

const AboutPage = () => {
  const { setTitle, setDescription, setOpenGraph } = useHead();
  const { language } = useLanguage();
  const { t } = useTranslation();
  const location = useLocation();
  const {
    profile,
    aboutTexts,
    isLoading: isLoadingProfile,
  } = useProfile(language);
  const { skills, isLoading: isLoadingSkills } = useSkills();
  usePageLoaderEffect(isLoadingProfile || isLoadingSkills);

  const frontendSkills = useMemo(
    () =>
      skills
        .filter((skill) => skill.category === "frontend")
        .map((skill) => skill.name),
    [skills]
  );

  const isLoading = isLoadingProfile || isLoadingSkills;
  const [isPhotoError, setIsPhotoError] = useState(false);

  useEffect(() => {
    setIsPhotoError(false);
  }, [profile?.photoUrl]);

  useEffect(() => {
    if (profile && aboutTexts.length > 0) {
      const url = getPageUrl(location.pathname);
      setTitle(`${t("page.about")} ${profile.name} | Portfolio`);
      setDescription(
        `${profile.name} - ${profile.role}. ${aboutTexts[0] || ""}`
      );
      setOpenGraph({
        title: `${t("page.about")} ${profile.name}`,
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
    language,
  ]);

  if (isLoading || !profile) {
    return (
      <div className={styles.aboutPage}>
        <div className={styles.aboutPage__container}>
          <TitleUi variant="h1">{t("page.about")}</TitleUi>
          <p>{t("common.loading")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.aboutPage}>
      <div className={styles.aboutPage__container}>
        <TitleUi variant="h1">{t("page.about")}</TitleUi>

        <div className={styles.aboutPage__content}>
          <div className={styles.aboutPage__photo}>
            {profile.photoUrl && !isPhotoError ? (
              <img
                src={profile.photoUrl}
                alt={`${profile.name} ${t("about.profilePhoto")}`}
                className={styles.aboutPage__photoImage}
                onError={() => setIsPhotoError(true)}
              />
            ) : (
              <div className={styles.aboutPage__photoPlaceholder}>
                {t("about.profilePhoto")}
              </div>
            )}
          </div>

          <div className={styles.aboutPage__info}>
            <div className={styles.aboutPage__resume}>
              <div className={styles.aboutPage__resumeItem}>
                <span className={styles.aboutPage__resumeLabel}>
                  {t("about.name")}
                </span>
                <span className={styles.aboutPage__resumeValue}>
                  {profile.name}
                </span>
              </div>
              <div className={styles.aboutPage__resumeItem}>
                <span className={styles.aboutPage__resumeLabel}>
                  {t("about.role")}
                </span>
                <span className={styles.aboutPage__resumeValue}>
                  {profile.role}
                </span>
              </div>
              {frontendSkills.length > 0 && (
                <div className={styles.aboutPage__resumeItem}>
                  <span className={styles.aboutPage__resumeLabel}>
                    {t("about.techStack")}
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
