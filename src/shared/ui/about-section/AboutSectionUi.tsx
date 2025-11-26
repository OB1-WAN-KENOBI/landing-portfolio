import styles from "./AboutSectionUi.module.scss";
import { useTranslation } from "../../lib/i18n/useTranslation";

interface AboutSectionUiProps {
  texts: string[];
}

const AboutSectionUi = ({ texts }: AboutSectionUiProps) => {
  const { t } = useTranslation();

  return (
    <section className={styles.aboutSection}>
      <div className={styles.aboutSection__container}>
        <h2 className={styles.aboutSection__title}>{t("section.about")}</h2>
        <div className={styles.aboutSection__content}>
          {texts.map((text, index) => (
            <p key={index} className={styles.aboutSection__text}>
              {text}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSectionUi;
