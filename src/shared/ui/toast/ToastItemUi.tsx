import styles from "./ToastItemUi.module.scss";
import type { Toast } from "../../../app/providers/toast/types";

interface ToastItemUiProps {
  toast: Toast;
  onClose: () => void;
}

const ToastItemUi = ({ toast, onClose }: ToastItemUiProps) => {
  return (
    <div className={`${styles.toast} ${styles[`toast--${toast.type}`]}`}>
      <div className={styles.toast__content}>
        <span className={styles.toast__message}>{toast.message}</span>
      </div>
      <button
        className={styles.toast__close}
        onClick={onClose}
        aria-label="Close"
      >
        ×
      </button>
    </div>
  );
};

export default ToastItemUi;
