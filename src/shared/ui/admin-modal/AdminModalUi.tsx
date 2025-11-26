import { useState, useEffect } from "react";
import styles from "./AdminModalUi.module.scss";

interface AdminModalUiProps {
  isOpen: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  onConfirm?: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  showActions?: boolean;
}

const AdminModalUi = ({
  isOpen,
  title,
  children,
  onClose,
  onConfirm,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  showActions = true,
}: AdminModalUiProps) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 250);
  };

  if (!isOpen && !isClosing) return null;

  return (
    <div
      className={`${styles.modal} ${
        isOpen && !isClosing ? styles.modalOpen : ""
      } ${isClosing ? styles.modalClosing : ""}`}
      onClick={handleClose}
    >
      <div
        className={`${styles.modal__content} ${
          isOpen && !isClosing ? styles.modal__contentOpen : ""
        } ${isClosing ? styles.modal__contentClosing : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modal__header}>
          <h2 className={styles.modal__title}>{title}</h2>
          <button className={styles.modal__close} onClick={handleClose}>
            ×
          </button>
        </div>
        <div className={styles.modal__body}>{children}</div>
        {showActions && (
          <div className={styles.modal__footer}>
            <button className={styles.modal__cancel} onClick={handleClose}>
              {cancelLabel}
            </button>
            {onConfirm && (
              <button className={styles.modal__confirm} onClick={onConfirm}>
                {confirmLabel}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminModalUi;
