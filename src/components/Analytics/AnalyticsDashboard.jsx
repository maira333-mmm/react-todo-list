import { useEffect, useState } from "react";
import styles from "./AnalyticsDashboard.module.css";

const AnalyticsDashboard = ({ analytics, todos }) => {
  const [weeklyData, setWeeklyData] = useState([]);

  useEffect(() => {
    // Weekly task completion data
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toDateString();
    }).reverse();
    
    const weekly = last7Days.map(day => {
      const completed = todos.filter(t => 
        t.completed && new Date(t.updatedAt).toDateString() === day
      ).length;
      const created = todos.filter(t => 
        new Date(t.createdAt).toDateString() === day
      ).length;
      return { day: day.slice(0, 3), completed, created };
    });
    setWeeklyData(weekly);
  }, [todos]);

  return (
    <div className={styles.analyticsDashboard}>
      <h3>Analytics Dashboard</h3>
      
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statValue}>{analytics.completionRate}%</div>
          <div className={styles.statLabel}>Completion Rate</div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statValue}>{analytics.byPriority.High}</div>
          <div className={styles.statLabel}>High Priority Active</div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statValue}>{analytics.overdue}</div>
          <div className={styles.statLabel}>Overdue Tasks</div>
        </div>
      </div>

      <div className={styles.chartContainer}>
        <h4>Weekly Activity</h4>
        <div className={styles.barChart}>
          {weeklyData.map((data, idx) => (
            <div key={idx} className={styles.barItem}>
              <div className={styles.barLabel}>{data.day}</div>
              <div className={styles.bars}>
                <div 
                  className={styles.barCreated} 
                  style={{ height: `${Math.min(data.created * 30, 100)}px` }}
                  title={`Created: ${data.created}`}
                />
                <div 
                  className={styles.barCompleted} 
                  style={{ height: `${Math.min(data.completed * 30, 100)}px` }}
                  title={`Completed: ${data.completed}`}
                />
              </div>
            </div>
          ))}
        </div>
        <div className={styles.chartLegend}>
          <span><span className={styles.legendCreated}></span> Created</span>
          <span><span className={styles.legendCompleted}></span> Completed</span>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;