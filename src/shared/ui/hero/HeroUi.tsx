import styles from "./HeroUi.module.scss";
import { HeroParticles } from "../../../widgets/hero-background";

interface HeroUiProps {
  name: string;
  role: string;
  description: string;
  status?: {
    status: "Available" | "Busy" | "Not taking projects";
    message?: string;
  };
}

const HeroUi = ({ name, role, description, status }: HeroUiProps) => {
  const getStatusColor = () => {
    if (!status) return "var(--color-text-secondary)";
    switch (status.status) {
      case "Available":
        return "var(--color-success)";
      case "Busy":
        return "var(--color-error)";
      case "Not taking projects":
        return "var(--color-text-secondary)";
      default:
        return "var(--color-text-secondary)";
    }
  };

  return (
    <section className={styles.hero}>
      <HeroParticles />
      <div className={styles.content}>
        <div className={styles.hero__container}>
          <h1
            className={`${styles.hero__title} ${styles["hero__title--glow"]}`}
          >
            {name}
          </h1>
          <p className={styles.hero__subtitle}>{role}</p>
          {status && (
            <div
              className={styles.hero__status}
              style={{ color: getStatusColor() }}
            >
              {status.status}
              {status.message && ` - ${status.message}`}
            </div>
          )}
          <p className={styles.hero__description}>{description}</p>
        </div>
      </div>
    </section>
  );
};

export default HeroUi;
