import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "./ContactPage.module.scss";
import SectionUi from "../../shared/ui/section/SectionUi";
import TitleUi from "../../shared/ui/title/TitleUi";
import ContactFormWidget from "../../widgets/contact-form/ContactFormWidget";
import { useHead } from "../../app/providers/head/HeadManager";
import { getPageUrl } from "../../shared/lib/constants";
import { useTranslation } from "../../shared/lib/i18n/useTranslation";

const ContactPage = () => {
  const { setTitle, setDescription, setOpenGraph } = useHead();
  const { t, language } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    const url = getPageUrl(location.pathname);
    setTitle(t("meta.contact.title"));
    setDescription(t("meta.contact.description"));
    setOpenGraph({
      title: t("meta.contact.title"),
      description: t("meta.contact.description"),
      url: url,
    });
  }, [location.pathname, setTitle, setDescription, setOpenGraph, language]);

  return (
    <div className={styles.contactPage}>
      <SectionUi>
        <TitleUi variant="h1">{t("page.contact")}</TitleUi>
        <ContactFormWidget />
      </SectionUi>
    </div>
  );
};

export default ContactPage;
