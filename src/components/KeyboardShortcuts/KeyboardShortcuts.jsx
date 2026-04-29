import { useEffect } from "react";
import styles from "./KeyboardShortcuts.module.css";

const KeyboardShortcuts = ({ 
  onUndo, onRedo, canUndo, canRedo,
  onNewTask, onSearch, onToggleTheme, onToggleView, onToggleAnalytics 
}) => {
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Ctrl + Z for Undo
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        if (canUndo) onUndo();
      }
      // Ctrl + Y or Ctrl + Shift + Z for Redo
      if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault();
        if (canRedo) onRedo();
      }
      // Ctrl + N for New Task
      if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        if (onNewTask) onNewTask();
      }
      // Ctrl + F for Search
      if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        if (onSearch) onSearch();
      }
      // Ctrl + D for Toggle View
      if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        if (onToggleView) onToggleView();
      }
      // Ctrl + H for Toggle Analytics
      if ((e.ctrlKey || e.metaKey) && e.key === 'h') {
        e.preventDefault();
        if (onToggleAnalytics) onToggleAnalytics();
      }
      // Ctrl + T for Toggle Theme
      if ((e.ctrlKey || e.metaKey) && e.key === 't') {
        e.preventDefault();
        if (onToggleTheme) onToggleTheme();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onUndo, onRedo, canUndo, canRedo, onNewTask, onSearch, onToggleTheme, onToggleView, onToggleAnalytics]);

  return (
    <div className={styles.shortcutsInfo}>
      <button className={styles.toggleBtn} onClick={() => {
        const info = document.querySelector(`.${styles.shortcutsPanel}`);
        info?.classList.toggle(styles.show);
      }}>
        ⌨️ Shortcuts
      </button>
      <div className={styles.shortcutsPanel}>
        <h4>Keyboard Shortcuts</h4>
        <ul>
          <li><kbd>Ctrl</kbd> + <kbd>N</kbd> - New Task</li>
          <li><kbd>Ctrl</kbd> + <kbd>F</kbd> - Search</li>
          <li><kbd>Ctrl</kbd> + <kbd>Z</kbd> - Undo</li>
          <li><kbd>Ctrl</kbd> + <kbd>Y</kbd> - Redo</li>
          <li><kbd>Ctrl</kbd> + <kbd>D</kbd> - Toggle View</li>
          <li><kbd>Ctrl</kbd> + <kbd>H</kbd> - Analytics</li>
          <li><kbd>Ctrl</kbd> + <kbd>T</kbd> - Dark/Light Mode</li>
        </ul>
      </div>
    </div>
  );
};

export default KeyboardShortcuts;