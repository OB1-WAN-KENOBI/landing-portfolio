import styles from "./DropdownUi.module.scss";

interface DropdownUiProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

const DropdownUi = ({
  label,
  value,
  options,
  onChange,
  placeholder = "Select...",
  disabled = false,
}: DropdownUiProps) => {
  return (
    <div className={styles.dropdown}>
      <label className={styles.dropdown__label}>{label}</label>
      <select
        className={styles.dropdown__select}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownUi;
