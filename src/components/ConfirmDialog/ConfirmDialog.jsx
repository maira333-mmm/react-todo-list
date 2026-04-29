import { useEffect } from "react";
import styles from "./ConfirmDialog.module.css";

const ConfirmDialog = ({ isOpen, title, message, onConfirm, onCancel }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        onCancel();
      }
    };
    
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onCancel}>
      <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.message}>{message}</p>
        <div className={styles.actions}>
          <button onClick={onConfirm} className={styles.confirmBtn}>
            Confirm
          </button>
          <button onClick={onCancel} className={styles.cancelBtn}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;