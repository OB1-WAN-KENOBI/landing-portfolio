import styles from "./TitleUi.module.scss";

type TitleVariant = "h1" | "h2" | "h3";

interface TitleUiProps {
  children: string;
  variant?: TitleVariant;
}

const TitleUi = ({ children, variant = "h1" }: TitleUiProps) => {
  const Tag = variant;
  return (
    <Tag className={`${styles.title} ${styles[`title--${variant}`]}`}>
      {children}
    </Tag>
  );
};

export default TitleUi;
