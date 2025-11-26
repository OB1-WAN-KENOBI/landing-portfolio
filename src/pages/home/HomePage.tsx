import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import HeroWidget from "../../widgets/hero/HeroWidget";
import FeaturedProjectsUi from "../../shared/ui/featured-projects/FeaturedProjectsUi";
import CoreSkillsUi from "../../shared/ui/core-skills/CoreSkillsUi";
import AboutSectionUi from "../../shared/ui/about-section/AboutSectionUi";
import SectionUi from "../../shared/ui/section/SectionUi";
import ContactFormWidget from "../../widgets/contact-form/ContactFormWidget";
import { useHead } from "../../app/providers/head/HeadManager";
import { useLanguage } from "../../app/providers/language/useLanguage";
import { useProjects } from "../../shared/lib/hooks/useProjects";
import { useSkills } from "../../shared/lib/hooks/useSkills";
import { useProfile } from "../../shared/lib/hooks/useProfile";
import {
  FEATURED_PROJECTS_COUNT,
  CORE_SKILLS_COUNT,
  getPageUrl,
} from "../../shared/lib/constants";
import { useTranslation } from "../../shared/lib/i18n/useTranslation";

const HomePage = () => {
  const { setTitle, setDescription, setOpenGraph } = useHead();
  const { language } = useLanguage();
  const { t } = useTranslation();
  const location = useLocation();

  const { projects: featuredProjects, isLoading: isLoadingProjects } =
    useProjects({
      language,
      featured: true,
      limit: FEATURED_PROJECTS_COUNT,
    });

  const { skills: coreSkills, isLoading: isLoadingSkills } = useSkills({
    core: true,
    limit: CORE_SKILLS_COUNT,
  });

  const {
    profile,
    aboutTexts,
    isLoading: isLoadingProfile,
  } = useProfile(language);

  const isLoading = isLoadingProjects || isLoadingSkills || isLoadingProfile;

  useEffect(() => {
    if (profile) {
      const url = getPageUrl(location.pathname);
      setTitle(`${profile.name} - ${profile.role} | Portfolio`);
      setDescription(profile.description);
      setOpenGraph({
        title: `${profile.name} - ${profile.role}`,
        description: profile.description,
        url: url,
      });
    }
  }, [location.pathname, profile, setTitle, setDescription, setOpenGraph]);

  if (isLoading) {
    return (
      <SectionUi>
        <p>{t("common.loading")}</p>
      </SectionUi>
    );
  }

  return (
    <>
      <SectionUi>
        <HeroWidget />
      </SectionUi>
      {featuredProjects.length > 0 && (
        <SectionUi>
          <FeaturedProjectsUi projects={featuredProjects} />
        </SectionUi>
      )}
      {coreSkills.length > 0 && (
        <SectionUi>
          <CoreSkillsUi skills={coreSkills} />
        </SectionUi>
      )}
      <SectionUi>
        <ContactFormWidget />
      </SectionUi>
      {aboutTexts && aboutTexts.length > 0 && (
        <SectionUi>
          <AboutSectionUi texts={aboutTexts} />
        </SectionUi>
      )}
    </>
  );
};

export default HomePage;
