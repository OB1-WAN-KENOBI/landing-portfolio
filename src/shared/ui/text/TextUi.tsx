import styles from "./TextUi.module.scss";

type TextSize = "sm" | "md" | "lg";
type TextColor = "primary" | "secondary";

interface TextUiProps {
  children: React.ReactNode;
  size?: TextSize;
  color?: TextColor;
}

const TextUi = ({
  children,
  size = "md",
  color = "secondary",
}: TextUiProps) => {
  return (
    <p
      className={`${styles.text} ${styles[`text--${size}`]} ${
        styles[`text--${color}`]
      }`}
    >
      {children}
    </p>
  );
};

export default TextUi;
