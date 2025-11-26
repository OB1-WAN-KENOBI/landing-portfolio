import styles from "./LogoUi.module.scss";

interface LogoUiProps {
  className?: string;
}

const LogoUi = ({ className }: LogoUiProps) => {
  return (
    <svg
      className={`${styles.logo} ${className || ""}`}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="4"
        y="4"
        width="32"
        height="32"
        rx="6"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M12 12 L12 28 M12 12 L20 12 L20 20 M20 20 L28 20 L28 28"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
};

export default LogoUi;
