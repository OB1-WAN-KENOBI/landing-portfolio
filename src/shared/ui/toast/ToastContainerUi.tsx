import styles from "./ToastContainerUi.module.scss";
import ToastItemUi from "./ToastItemUi";
import type { Toast } from "../../../app/providers/toast/types";

interface ToastContainerUiProps {
  toasts: Toast[];
  onRemove: (id: string) => void;
}

const ToastContainerUi = ({ toasts, onRemove }: ToastContainerUiProps) => {
  if (toasts.length === 0) return null;

  return (
    <div className={styles.container}>
      {toasts.map((toast) => (
        <ToastItemUi
          key={toast.id}
          toast={toast}
          onClose={() => onRemove(toast.id)}
        />
      ))}
    </div>
  );
};

export default ToastContainerUi;
