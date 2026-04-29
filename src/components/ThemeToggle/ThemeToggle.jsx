import styles from "./ThemeToggle.module.css";

const ThemeToggle = ({ theme, setTheme }) => {
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button className={styles.themeToggle} onClick={toggleTheme} title="Toggle Theme">
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
};

export default ThemeToggle;