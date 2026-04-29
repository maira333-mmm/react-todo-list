import styles from "./BulkActions.module.css";

const BulkActions = ({ selectedCount, onDelete, onComplete, onClear }) => {
  if (selectedCount === 0) return null;

  return (
    <div className={styles.bulkActions}>
      <span className={styles.count}>{selectedCount} task(s) selected</span>
      <div className={styles.actions}>
        <button onClick={onComplete} className={styles.completeBtn}>
          ✅ Complete All
        </button>
        <button onClick={onDelete} className={styles.deleteBtn}>
          🗑️ Delete All
        </button>
        <button onClick={onClear} className={styles.clearBtn}>
          ✕ Clear Selection
        </button>
      </div>
    </div>
  );
};

export default BulkActions;