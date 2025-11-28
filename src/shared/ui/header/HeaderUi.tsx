import { Link } from "react-router-dom";
import styles from "./HeaderUi.module.scss";
import LogoUi from "../logo/LogoUi";
import { useTranslation } from "../../lib/i18n/useTranslation";

interface HeaderUiProps {
  activePath?: string;
  themeToggle?: React.ReactNode;
  languageToggle?: React.ReactNode;
}

const HeaderUi = ({
  activePath,
  themeToggle,
  languageToggle,
}: HeaderUiProps) => {
  const { t } = useTranslation();

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <Link to="/" className={styles.logoLink}>
          <LogoUi />
        </Link>

        <nav className={styles.nav}>
          <Link
            to="/projects"
            className={`${styles.link} ${
              activePath === "/projects" ? styles.linkActive : ""
            }`}
          >
            {t("nav.projects")}
          </Link>
          <Link
            to="/skills"
            className={`${styles.link} ${
              activePath === "/skills" ? styles.linkActive : ""
            }`}
          >
            {t("nav.skills")}
          </Link>
          <Link
            to="/about"
            className={`${styles.link} ${
              activePath === "/about" ? styles.linkActive : ""
            }`}
          >
            {t("nav.about")}
          </Link>
        </nav>
      </div>

      <div className={styles.right}>
        {languageToggle}
        {themeToggle}
        <Link to="/contact" className={styles.button}>
          {t("nav.contact")}
        </Link>
      </div>
    </header>
  );
};

export default HeaderUi;
