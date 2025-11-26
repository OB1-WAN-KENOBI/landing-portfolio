import styles from "./StatCardUi.module.scss";

interface StatCardUiProps {
  title: string;
  value: string | number;
  subtitle?: string;
}

const StatCardUi = ({ title, value, subtitle }: StatCardUiProps) => {
  return (
    <div className={styles.statCard}>
      <div className={styles.statCard__title}>{title}</div>
      <div className={styles.statCard__value}>{value}</div>
      {subtitle && <div className={styles.statCard__subtitle}>{subtitle}</div>}
    </div>
  );
};

export default StatCardUi;
