import { useState } from "react";
import styles from "./TodoItem.module.css";
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";

const TodoItem = ({ todo, onToggle, onEdit, onDelete, viewMode = "list" }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [editForm, setEditForm] = useState({
    title: todo.title,
    description: todo.description || "",
    priority: todo.priority,
    dueDate: todo.dueDate || "",
    tags: todo.tags ? todo.tags.join(", ") : "",
  });

  const priorityColors = {
    Low: styles.priorityLow,
    Medium: styles.priorityMedium,
    High: styles.priorityHigh,
  };

  const priorityIcons = {
    Low: "🟢",
    Medium: "🟡",
    High: "🔴",
  };

  const isOverdue = todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed;
  const isDueToday = todo.dueDate && new Date(todo.dueDate).toDateString() === new Date().toDateString() && !todo.completed;

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (editForm.title.trim()) {
      // Parse tags from comma-separated string to array
      const tagsArray = editForm.tags 
        ? editForm.tags.split(",").map(tag => tag.trim()).filter(tag => tag.length > 0)
        : [];
      
      onEdit(todo.id, {
        title: editForm.title,
        description: editForm.description,
        priority: editForm.priority,
        dueDate: editForm.dueDate || null,
        tags: tagsArray,
      });
      setIsEditing(false);
    }
  };

  const getTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
    };
    
    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
      const interval = Math.floor(seconds / secondsInUnit);
      if (interval >= 1) {
        return `${interval} ${unit}${interval === 1 ? "" : "s"} ago`;
      }
    }
    return "Just now";
  };

  const formatDueDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  if (isEditing) {
    return (
      <li className={`${styles.item} ${styles.editing}`}>
        <form onSubmit={handleEditSubmit} className={styles.editForm}>
          <input
            type="text"
            value={editForm.title}
            onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
            placeholder="Task title *"
            className={styles.editInput}
            autoFocus
            required
          />
          <textarea
            value={editForm.description}
            onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
            placeholder="Description (optional)"
            className={styles.editTextarea}
            rows="2"
          />
          <select
            value={editForm.priority}
            onChange={(e) => setEditForm({ ...editForm, priority: e.target.value })}
            className={styles.editSelect}
          >
            <option value="Low">🟢 Low Priority</option>
            <option value="Medium">🟡 Medium Priority</option>
            <option value="High">🔴 High Priority</option>
          </select>
          
          {/* Due Date Input */}
          <input
            type="date"
            value={editForm.dueDate}
            onChange={(e) => setEditForm({ ...editForm, dueDate: e.target.value })}
            className={styles.editInput}
          />
          
          {/* Tags Input */}
          <input
            type="text"
            value={editForm.tags}
            onChange={(e) => setEditForm({ ...editForm, tags: e.target.value })}
            placeholder="Tags (comma separated, e.g., work, urgent, personal)"
            className={styles.editInput}
          />
          
          <div className={styles.editActions}>
            <button type="submit" className={styles.saveBtn}>💾 Save Changes</button>
            <button type="button" onClick={() => setIsEditing(false)} className={styles.cancelBtn}>❌ Cancel</button>
          </div>
        </form>
      </li>
    );
  }

  return (
    <>
      <li className={`${styles.item} ${todo.completed ? styles.completed : ""}`}>
        <div className={styles.itemContent}>
          <div className={styles.itemHeader}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggle(todo.id)}
              className={styles.checkbox}
            />
            <h3 
              className={styles.itemTitle}
              onClick={() => setShowDetails(!showDetails)}
            >
              {todo.title}
            </h3>
            <span className={`${styles.priorityBadge} ${priorityColors[todo.priority]}`}>
              {priorityIcons[todo.priority]} {todo.priority}
            </span>
            {isOverdue && (
              <span className={styles.overdueBadge}>⚠️ Overdue</span>
            )}
            {isDueToday && !isOverdue && (
              <span className={styles.todayBadge}>📅 Today</span>
            )}
          </div>
          
          {(showDetails || viewMode === "grid") && (
            <>
              {todo.description && (
                <p className={styles.itemDescription}>{todo.description}</p>
              )}
              
              <div className={styles.itemMeta}>
                {todo.dueDate && (
                  <span className={`${styles.dueDate} ${isOverdue ? styles.dueDateOverdue : isDueToday ? styles.dueDateToday : styles.dueDateUpcoming}`}>
                    📅 Due: {formatDueDate(todo.dueDate)}
                    {isOverdue && " (Overdue!)"}
                    {isDueToday && !isOverdue && " (Today!)"}
                  </span>
                )}
                <span className={styles.date}>
                  🕒 Created: {getTimeAgo(todo.createdAt)}
                </span>
                {todo.tags && todo.tags.length > 0 && (
                  <div className={styles.tags}>
                    {todo.tags.map(tag => (
                      <span key={tag} className={styles.tag}>#{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
        
        <div className={styles.actions}>
          <button onClick={() => setIsEditing(true)} className={styles.editBtn}>
            ✏️ Edit
          </button>
          <button onClick={() => setShowDeleteConfirm(true)} className={styles.deleteBtn}>
            🗑️ Delete
          </button>
        </div>
      </li>

      <ConfirmDialog
        isOpen={showDeleteConfirm}
        title="Delete Task"
        message={`Are you sure you want to delete "${todo.title}"? This action cannot be undone.`}
        onConfirm={() => {
          onDelete(todo.id);
          setShowDeleteConfirm(false);
        }}
        onCancel={() => setShowDeleteConfirm(false)}
      />
    </>
  );
};

export default TodoItem;