import { useState, useEffect } from "react";
import styles from "./OfflineStatus.module.css";

const OfflineStatus = ({ isOnline, onSync }) => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    if (!isOnline) {
      setShowBanner(true);
    } else {
      const timer = setTimeout(() => setShowBanner(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isOnline]);

  if (!showBanner && isOnline) return null;

  return (
    <div className={`${styles.banner} ${!isOnline ? styles.offline : styles.online}`}>
      <div className={styles.content}>
        {!isOnline ? (
          <>
            <span className={styles.icon}>📡</span>
            <span>You are offline. Changes will sync when connection resumes.</span>
          </>
        ) : (
          <>
            <span className={styles.icon}>✅</span>
            <span>Back online! Data synced successfully.</span>
            {onSync && <button onClick={onSync} className={styles.syncBtn}>Sync Now</button>}
          </>
        )}
      </div>
    </div>
  );
};

export default OfflineStatus;