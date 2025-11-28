import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { path: "/projects", label: t("nav.projects") },
    { path: "/skills", label: t("nav.skills") },
    { path: "/about", label: t("nav.about") },
  ];

  useEffect(() => {
    setIsMenuOpen(false);
  }, [activePath]);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <Link to="/" className={styles.logoLink}>
          <LogoUi />
        </Link>

        <nav className={styles.nav}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`${styles.link} ${
                activePath === item.path ? styles.linkActive : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className={styles.right}>
        {languageToggle}
        {themeToggle}
        <Link to="/contact" className={styles.button}>
          {t("nav.contact")}
        </Link>
        <button
          type="button"
          className={`${styles.menuButton} ${
            isMenuOpen ? styles.menuButtonActive : ""
          }`}
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label={
            isMenuOpen ? t("nav.closeMenu") : t("nav.openMenu")
          }
          aria-expanded={isMenuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div
        className={`${styles.mobileMenu} ${
          isMenuOpen ? styles.mobileMenuOpen : ""
        }`}
      >
        <nav className={styles.mobileNav}>
          {navItems.map((item) => (
            <Link
              key={`mobile-${item.path}`}
              to={item.path}
              onClick={handleLinkClick}
              className={`${styles.mobileLink} ${
                activePath === item.path ? styles.mobileLinkActive : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          to="/contact"
          className={styles.mobileButton}
          onClick={handleLinkClick}
        >
          {t("nav.contact")}
        </Link>
      </div>
    </header>
  );
};

export default HeaderUi;
