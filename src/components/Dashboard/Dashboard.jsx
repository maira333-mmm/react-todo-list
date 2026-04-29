import styles from "./Dashboard.module.css";

const Dashboard = ({ analytics, onDeleteAllCompleted, viewMode, onToggleViewMode }) => {
  return (
    <div className={styles.dashboard}>
      <div className={styles.statCard}>
        <div className={styles.statValue}>{analytics.total}</div>
        <div className={styles.statLabel}>Total Tasks</div>
        <div className={styles.statTrend}>📊 All tasks</div>
      </div>
      
      <div className={styles.statCard}>
        <div className={styles.statValue}>{analytics.active}</div>
        <div className={styles.statLabel}>Active</div>
        <div className={styles.statTrend}>⏳ In progress</div>
      </div>
      
      <div className={styles.statCard}>
        <div className={styles.statValue}>{analytics.completed}</div>
        <div className={styles.statLabel}>Completed</div>
        <div className={styles.statTrend}>✅ Done</div>
      </div>
      
      <div className={styles.statCard}>
        <div className={styles.statValue}>{analytics.completionRate}%</div>
        <div className={styles.statLabel}>Completion Rate</div>
        <div className={styles.statTrend}>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill} 
              style={{ width: `${analytics.completionRate}%` }}
            />
          </div>
        </div>
      </div>

      <div className={styles.statCard}>
        <div className={styles.statValue}>{analytics.byPriority.High}</div>
        <div className={styles.statLabel}>High Priority</div>
        <div className={styles.statTrend}>🔴 Urgent tasks</div>
      </div>

      <div className={styles.actionsCard}>
        <button onClick={onToggleViewMode} className={styles.viewToggle}>
          {viewMode === "list" ? "📱 Grid View" : "📄 List View"}
        </button>
        {analytics.completed > 0 && (
          <button onClick={onDeleteAllCompleted} className={styles.clearBtn}>
            🗑️ Clear Completed
          </button>
        )}
      </div>
    </div>
  );
};

export default Dashboard;