import { useState } from "react";
import styles from "./Filters.module.css";

const Filters = ({ 
  filter, 
  onFilterChange, 
  searchTerm, 
  onSearchChange,
  sortBy,
  onSortByChange,
  sortOrder,
  onSortOrderChange,
  todos 
}) => {
  const [showSortOptions, setShowSortOptions] = useState(false);
  const filters = ["All", "Active", "Completed", "Low", "Medium", "High"];
  
  const getFilterCount = (filterType) => {
    if (filterType === "All") return todos.length;
    if (filterType === "Active") return todos.filter(t => !t.completed).length;
    if (filterType === "Completed") return todos.filter(t => t.completed).length;
    return todos.filter(t => t.priority === filterType && !t.completed).length;
  };

  return (
    <div className={styles.filtersContainer}>
      <div className={styles.searchSection}>
        <div className={styles.searchBox}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            type="text"
            placeholder="Search tasks by title, description, or tags..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className={styles.searchInput}
          />
          {searchTerm && (
            <button 
              onClick={() => onSearchChange("")} 
              className={styles.clearSearch}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <div className={styles.filterSection}>
        <div className={styles.filterButtons}>
          {filters.map(filterType => (
            <button
              key={filterType}
              onClick={() => onFilterChange(filterType)}
              className={`${styles.filterBtn} ${filter === filterType ? styles.activeFilter : ""}`}
            >
              {filterType}
              <span className={styles.filterCount}>
                {getFilterCount(filterType)}
              </span>
            </button>
          ))}
        </div>

        <div className={styles.sortSection}>
          <button 
            className={styles.sortBtn}
            onClick={() => setShowSortOptions(!showSortOptions)}
          >
            Sort by: {sortBy === "date" ? "Date" : sortBy === "priority" ? "Priority" : "Title"} 
            ({sortOrder === "asc" ? "↑" : "↓"})
          </button>
          
          {showSortOptions && (
            <div className={styles.sortDropdown}>
              <button onClick={() => { onSortByChange("date"); setShowSortOptions(false); }}>
                Date {sortBy === "date" && (sortOrder === "asc" ? "↑" : "↓")}
              </button>
              <button onClick={() => { onSortByChange("priority"); setShowSortOptions(false); }}>
                Priority {sortBy === "priority" && (sortOrder === "asc" ? "↑" : "↓")}
              </button>
              <button onClick={() => { onSortByChange("title"); setShowSortOptions(false); }}>
                Title {sortBy === "title" && (sortOrder === "asc" ? "↑" : "↓")}
              </button>
              <hr />
              <button onClick={() => { onSortOrderChange(sortOrder === "asc" ? "desc" : "asc"); setShowSortOptions(false); }}>
                Toggle Order ({sortOrder === "asc" ? "Ascending" : "Descending"})
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Filters;