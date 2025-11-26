import { memo } from "react";
import styles from "./ButtonUi.module.scss";

interface ButtonUiProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const ButtonUi = memo(
  ({ children, onClick, disabled = false, type = "button" }: ButtonUiProps) => {
    return (
      <button
        type={type}
        className={styles.button}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }
);

ButtonUi.displayName = "ButtonUi";

export default ButtonUi;
