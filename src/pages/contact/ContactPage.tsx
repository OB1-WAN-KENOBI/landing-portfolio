import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "./ContactPage.module.scss";
import SectionUi from "../../shared/ui/section/SectionUi";
import TitleUi from "../../shared/ui/title/TitleUi";
import ContactFormWidget from "../../widgets/contact-form/ContactFormWidget";
import { useHead } from "../../app/providers/head/HeadManager";
import { getPageUrl } from "../../shared/lib/constants";

const ContactPage = () => {
  const { setTitle, setDescription, setOpenGraph } = useHead();
  const location = useLocation();

  useEffect(() => {
    const url = getPageUrl(location.pathname);
    setTitle("Contact | Portfolio");
    setDescription("Get in touch with me for collaboration or inquiries");
    setOpenGraph({
      title: "Contact | Portfolio",
      description: "Get in touch with me for collaboration or inquiries",
      url: url,
    });
  }, [location.pathname, setTitle, setDescription, setOpenGraph]);

  return (
    <div className={styles.contactPage}>
      <SectionUi>
        <TitleUi variant="h1">Contact</TitleUi>
        <ContactFormWidget />
      </SectionUi>
    </div>
  );
};

export default ContactPage;
