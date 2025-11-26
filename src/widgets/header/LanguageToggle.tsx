import { useLanguage } from "../../app/providers/language/useLanguage";
import styles from "./LanguageToggle.module.scss";

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button className={styles.toggle} onClick={toggleLanguage}>
      <span className={language === "ru" ? styles.active : ""}>RU</span>
      <span className={styles.separator}>|</span>
      <span className={language === "en" ? styles.active : ""}>EN</span>
    </button>
  );
};

export default LanguageToggle;
