import { memo } from "react";
import styles from "./InputUi.module.scss";

interface InputUiProps {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const InputUi = memo(
  ({
    label,
    type = "text",
    placeholder,
    value,
    error,
    onChange,
    disabled = false,
  }: InputUiProps) => {
    return (
      <div className={styles.input}>
        <label className={styles.input__label}>{label}</label>
        <input
          type={type}
          className={`${styles.input__field} ${
            error ? styles.input__fieldError : ""
          }`}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
        />
        {error && <span className={styles.input__error}>{error}</span>}
      </div>
    );
  }
);

InputUi.displayName = "InputUi";

export default InputUi;
