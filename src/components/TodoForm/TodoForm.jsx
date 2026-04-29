import { useState, useEffect } from "react";
import styles from "./TodoForm.module.css";

const TodoForm = ({ onSubmit, initialData = null, onCancel }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Low",
    dueDate: "",
    tags: [],
  });
  const [tagInput, setTagInput] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        description: initialData.description || "",
        priority: initialData.priority,
        dueDate: initialData.dueDate || "",
        tags: initialData.tags || [],
      });
    }
  }, [initialData]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    } else if (formData.title.length > 100) {
      newErrors.title = "Title must be less than 100 characters";
    }
    
    if (formData.description && formData.description.length > 500) {
      newErrors.description = "Description must be less than 500 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      if (!initialData) {
        setFormData({ title: "", description: "", priority: "Low", dueDate: "", tags: [] });
      }
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim()) && formData.tags.length < 5) {
      setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] });
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData({ ...formData, tags: formData.tags.filter(tag => tag !== tagToRemove) });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label className={styles.label}>
          Task Title *
          <input
            type="text"
            placeholder="Enter task title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className={`${styles.formInput} ${errors.title ? styles.error : ""}`}
          />
          {errors.title && <span className={styles.errorMessage}>{errors.title}</span>}
        </label>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>
          Description
          <textarea
            placeholder="Enter task description (optional)"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className={styles.formTextarea}
            rows="3"
          />
        </label>
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label className={styles.label}>
            Priority
            <select
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              className={styles.formSelect}
            >
              <option value="Low">🟢 Low Priority</option>
              <option value="Medium">🟡 Medium Priority</option>
              <option value="High">🔴 High Priority</option>
            </select>
          </label>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            Due Date
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              className={styles.formInput}
              min={new Date().toISOString().split("T")[0]}
            />
          </label>
        </div>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>
          Tags (max 5)
          <div className={styles.tagInputContainer}>
            <input
              type="text"
              placeholder="Add tags (press Enter)"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className={styles.formInput}
            />
            <button type="button" onClick={handleAddTag} className={styles.addTagBtn}>
              Add Tag
            </button>
          </div>
          {formData.tags.length > 0 && (
            <div className={styles.tagsContainer}>
              {formData.tags.map(tag => (
                <span key={tag} className={styles.tag}>
                  #{tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className={styles.removeTag}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </label>
      </div>

      <div className={styles.formActions}>
        <button type="submit" className={styles.submitBtn}>
          {initialData ? "Update Task" : "Create Task"}
        </button>
        {initialData && (
          <button type="button" onClick={onCancel} className={styles.cancelBtn}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TodoForm;