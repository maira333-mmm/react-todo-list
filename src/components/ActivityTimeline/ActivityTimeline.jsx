import styles from "./ActivityTimeline.module.css";

const ActivityTimeline = ({ activities = [] }) => {
  if (activities.length === 0) {
    return (
      <div className={styles.timeline}>
        <h3>Activity Timeline</h3>
        <p className={styles.empty}>No activities yet</p>
      </div>
    );
  }

  return (
    <div className={styles.timeline}>
      <h3>Activity Timeline</h3>
      <div className={styles.timelineList}>
        {activities.map((activity) => (
          <div key={activity.id} className={styles.timelineItem}>
            <div className={styles.timelineDot}></div>
            <div className={styles.timelineContent}>
              <div className={styles.timelineAction}>{activity.action}</div>
              <div className={styles.timelineDetails}>
                {JSON.stringify(activity.details)}
              </div>
              <div className={styles.timelineTime}>
                {new Date(activity.timestamp).toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityTimeline;