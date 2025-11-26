import { useReveal } from "../../lib/hooks/useReveal";
import styles from "./SectionUi.module.scss";

interface SectionUiProps {
  children: React.ReactNode;
}

const SectionUi = ({ children }: SectionUiProps) => {
  const { ref, isVisible } = useReveal();

  return (
    <section className={styles.section}>
      <div
        ref={ref}
        className={`${styles.section__container} ${
          isVisible ? styles.section__containerVisible : ""
        }`}
      >
        {children}
      </div>
    </section>
  );
};

export default SectionUi;
