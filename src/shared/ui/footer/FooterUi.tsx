import styles from "./FooterUi.module.scss";
import { useTranslation } from "../../lib/i18n/useTranslation";

interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactNode;
}

interface FooterUiProps {
  name: string;
  role: string;
  socialLinks: SocialLink[];
  copyrightYear: number;
}

const FooterUi = ({
  name,
  role,
  socialLinks,
  copyrightYear,
}: FooterUiProps) => {
  const { t } = useTranslation();

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <div className={styles.footer__content}>
          <div className={styles.footer__info}>
            <h3 className={styles.footer__name}>{name}</h3>
            <p className={styles.footer__role}>{role}</p>
          </div>

          <div className={styles.footer__social}>
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.footer__socialLink}
                aria-label={link.name}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>

        <div className={styles.footer__copyright}>
          © {copyrightYear} {name}. {t("footer.rights")}
        </div>
      </div>
    </footer>
  );
};

export default FooterUi;
