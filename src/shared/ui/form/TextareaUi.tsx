import { memo } from "react";
import styles from "./TextareaUi.module.scss";

interface TextareaUiProps {
  label: string;
  placeholder?: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  rows?: number;
  disabled?: boolean;
}

const TextareaUi = memo(
  ({
    label,
    placeholder,
    value,
    error,
    onChange,
    rows = 5,
    disabled = false,
  }: TextareaUiProps) => {
    return (
      <div className={styles.textarea}>
        <label className={styles.textarea__label}>{label}</label>
        <textarea
          className={`${styles.textarea__field} ${
            error ? styles.textarea__fieldError : ""
          }`}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          disabled={disabled}
        />
        {error && <span className={styles.textarea__error}>{error}</span>}
      </div>
    );
  }
);

TextareaUi.displayName = "TextareaUi";

export default TextareaUi;
