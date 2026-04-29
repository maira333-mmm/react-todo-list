import { useState, useCallback, useMemo, useEffect } from "react";
import { Toaster, toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./App.module.css";
import TodoForm from "./components/TodoForm/TodoForm";
import TodoItem from "./components/TodoItem/TodoItem";
import Dashboard from "./components/Dashboard/Dashboard";
import Filters from "./components/Filters/Filters";
import AnalyticsDashboard from "./components/Analytics/AnalyticsDashboard";
import KeyboardShortcuts from "./components/KeyboardShortcuts/KeyboardShortcuts";
import VoiceInput from "./components/VoiceInput/VoiceInput";
import BulkActions from "./components/BulkActions/BulkActions";
import ActivityTimeline from "./components/ActivityTimeline/ActivityTimeline";
import ThemeToggle from "./components/ThemeToggle/ThemeToggle";
import OfflineStatus from "./components/OfflineStatus/OfflineStatus";
import useLocalStorage from "./hooks/useLocalStorage";
import useOfflineSync from "./hooks/useOfflineSync";
import useUndoRedo from "./hooks/useUndoRedo";
import taskAnalytics from "./hooks/taskAnalytics";
import { AIAssistant } from "./utils/aiAssistant";

function App() {
  const [todos, setTodos] = useLocalStorage("todos", []);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [editingTodo, setEditingTodo] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [viewMode, setViewMode] = useState("list");
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);
  const [activityLog, setActivityLog] = useLocalStorage("activityLog", []);
  
  const analytics = taskAnalytics(todos);
  const { undo, redo, canUndo, canRedo, pushState } = useUndoRedo(todos);
  const { isOnline, syncOfflineData } = useOfflineSync(todos, setTodos);
  const aiAssistant = useMemo(() => new AIAssistant(), []);
  
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const logActivity = useCallback((action, details) => {
    const newActivity = {
      id: Date.now(),
      action,
      details,
      timestamp: new Date().toISOString(),
    };
    setActivityLog(prev => [newActivity, ...prev].slice(0, 100));
  }, [setActivityLog]);

  const addTodo = useCallback(async (todoData) => {
    const newTodo = {
      id: Date.now(),
      title: todoData.title,
      description: todoData.description || "",
      priority: todoData.priority || "Medium",
      dueDate: todoData.dueDate || null,  // ✅ Due date field added
      tags: todoData.tags || [],
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    pushState(todos);
    setTodos(prev => [newTodo, ...prev]);
    logActivity("create", { taskId: newTodo.id, title: newTodo.title, dueDate: newTodo.dueDate });
    toast.success(`Task created: ${newTodo.title}`);
    
    // Voice feedback for due date
    if (newTodo.dueDate) {
      const formattedDate = new Date(newTodo.dueDate).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
      toast.info(`Due date: ${formattedDate}`);
    }
  }, [setTodos, pushState, logActivity, todos]);

  const updateTodo = useCallback((id, updates) => {
    pushState(todos);
    setTodos(prev => prev.map(todo => 
      todo.id === id ? { ...todo, ...updates, updatedAt: new Date().toISOString() } : todo
    ));
    logActivity("update", { taskId: id });
    toast.success("Task updated successfully!");
  }, [setTodos, pushState, logActivity, todos]);

  const deleteTodo = useCallback((id) => {
    pushState(todos);
    setTodos(prev => prev.filter(todo => todo.id !== id));
    logActivity("delete", { taskId: id });
    toast.success("Task deleted successfully!");
  }, [setTodos, pushState, logActivity, todos]);

  const bulkDelete = useCallback((ids) => {
    pushState(todos);
    setTodos(prev => prev.filter(todo => !ids.includes(todo.id)));
    logActivity("bulkDelete", { count: ids.length });
    toast.success(`${ids.length} tasks deleted!`);
    setSelectedTasks([]);
  }, [setTodos, pushState, logActivity, todos]);

  const bulkComplete = useCallback((ids) => {
    pushState(todos);
    setTodos(prev => prev.map(todo => 
      ids.includes(todo.id) ? { ...todo, completed: true, updatedAt: new Date().toISOString() } : todo
    ));
    logActivity("bulkComplete", { count: ids.length });
    toast.success(`${ids.length} tasks completed!`);
    setSelectedTasks([]);
  }, [setTodos, pushState, logActivity, todos]);

  const toggleComplete = useCallback((id) => {
    pushState(todos);
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed, updatedAt: new Date().toISOString() } : todo
    ));
    logActivity("toggleComplete", { taskId: id });
  }, [setTodos, pushState, logActivity, todos]);

  const deleteAllCompleted = useCallback(() => {
    pushState(todos);
    setTodos(prev => prev.filter(todo => !todo.completed));
    logActivity("clearCompleted", {});
    toast.success("All completed tasks cleared!");
  }, [setTodos, pushState, logActivity, todos]);

  const exportData = useCallback(() => {
    const data = JSON.stringify({ todos, analytics, exportDate: new Date().toISOString() }, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `taskflow-backup-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Tasks exported successfully!");
  }, [todos, analytics]);

  const filteredTodos = useMemo(() => {
    let result = todos.filter(todo => {
      if (filter === "Active") return !todo.completed;
      if (filter === "Completed") return todo.completed;
      if (["Low", "Medium", "High"].includes(filter)) return todo.priority === filter;
      // Due date filter
      if (filter === "Overdue") {
        return todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed;
      }
      if (filter === "Due Today") {
        const today = new Date().toISOString().split('T')[0];
        return todo.dueDate === today && !todo.completed;
      }
      if (filter === "This Week") {
        const today = new Date();
        const nextWeek = new Date(today);
        nextWeek.setDate(today.getDate() + 7);
        return todo.dueDate && new Date(todo.dueDate) <= nextWeek && new Date(todo.dueDate) >= today && !todo.completed;
      }
      return true;
    });

    if (searchTerm.trim()) {
      result = result.filter(todo =>
        todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        todo.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        todo.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    result.sort((a, b) => {
      let comparison = 0;
      if (sortBy === "date") {
        comparison = new Date(a.createdAt) - new Date(b.createdAt);
      } else if (sortBy === "dueDate") {
        // Sort by due date
        if (!a.dueDate && !b.dueDate) comparison = 0;
        else if (!a.dueDate) comparison = 1;
        else if (!b.dueDate) comparison = -1;
        else comparison = new Date(a.dueDate) - new Date(b.dueDate);
      } else if (sortBy === "priority") {
        const priorityOrder = { High: 3, Medium: 2, Low: 1 };
        comparison = priorityOrder[b.priority] - priorityOrder[a.priority];
      } else if (sortBy === "title") {
        comparison = a.title.localeCompare(b.title);
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });

    return result;
  }, [todos, filter, searchTerm, sortBy, sortOrder]);

  const handleEditSubmit = (todoData) => {
    if (editingTodo) {
      updateTodo(editingTodo.id, todoData);
      setEditingTodo(null);
    }
  };

  const toggleViewMode = () => {
    setViewMode(prev => prev === "list" ? "grid" : "list");
  };

  return (
    <div className={`${styles.app} ${styles[theme]}`}>
      <Toaster position="top-right" richColors />
      <OfflineStatus isOnline={isOnline} onSync={syncOfflineData} />
      <KeyboardShortcuts 
        onUndo={undo} onRedo={redo} canUndo={canUndo} canRedo={canRedo}
        onNewTask={() => document.querySelector('input[placeholder*="title"]')?.focus()}
        onSearch={() => document.querySelector('input[placeholder*="Search"]')?.focus()}
        onToggleTheme={() => setTheme(prev => prev === "light" ? "dark" : "light")}
        onToggleView={toggleViewMode}
        onToggleAnalytics={() => setShowAnalytics(prev => !prev)}
      />
      
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerTop}>
            <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
              <h1>TaskSwift AI <span className={styles.beta}>2026</span></h1>
              <p className={styles.subtitle}>⚡ Lightning Fast Task Management with Voice & AI</p>
            </motion.div>
            <div className={styles.headerActions}>
              <ThemeToggle theme={theme} setTheme={setTheme} />
              <VoiceInput onAddTask={addTodo} />
              <button onClick={exportData} className={styles.iconBtn} title="Export Tasks">📤</button>
              <button onClick={undo} disabled={!canUndo} className={styles.iconBtn} title="Undo (Ctrl+Z)">↩️</button>
              <button onClick={redo} disabled={!canRedo} className={styles.iconBtn} title="Redo (Ctrl+Y)">↪️</button>
              <button onClick={() => setShowAnalytics(!showAnalytics)} className={styles.iconBtn} title="Analytics Dashboard">
                📊
              </button>
              <button onClick={() => setShowTimeline(!showTimeline)} className={styles.iconBtn} title="Activity Timeline">
                📜
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <AnimatePresence>
          {showAnalytics && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <AnalyticsDashboard analytics={analytics} todos={todos} />
            </motion.div>
          )}
          {showTimeline && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ActivityTimeline activities={activityLog} />
            </motion.div>
          )}
        </AnimatePresence>

        <Dashboard 
          analytics={analytics} 
          onDeleteAllCompleted={deleteAllCompleted}
          viewMode={viewMode}
          onToggleViewMode={toggleViewMode}
          selectedCount={selectedTasks.length}
          onBulkDelete={() => bulkDelete(selectedTasks)}
          onBulkComplete={() => bulkComplete(selectedTasks)}
        />
        
        <div className={styles.container}>
          <TodoForm 
            onSubmit={editingTodo ? handleEditSubmit : addTodo}
            initialData={editingTodo}
            onCancel={() => setEditingTodo(null)}
          />

          <Filters 
            filter={filter}
            onFilterChange={setFilter}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            sortBy={sortBy}
            onSortByChange={setSortBy}
            sortOrder={sortOrder}
            onSortOrderChange={setSortOrder}
            todos={todos}
          />

          {selectedTasks.length > 0 && (
            <BulkActions 
              selectedCount={selectedTasks.length}
              onDelete={() => bulkDelete(selectedTasks)}
              onComplete={() => bulkComplete(selectedTasks)}
              onClear={() => setSelectedTasks([])}
            />
          )}

          {filteredTodos.length === 0 ? (
            <div className={styles.emptyState}>
              <svg className={styles.emptyIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <p>No tasks found</p>
              <p className={styles.emptyStateSub}>
                {searchTerm ? "Try adjusting your search" : "Create your first task above"}
              </p>
            </div>
          ) : (
            <div className={viewMode === "grid" ? styles.gridView : styles.listView}>
              {filteredTodos.map(todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={toggleComplete}
                  onEdit={updateTodo}
                  onDelete={deleteTodo}
                  viewMode={viewMode}
                  isSelected={selectedTasks.includes(todo.id)}
                  onSelect={(id) => {
                    setSelectedTasks(prev =>
                      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
                    );
                  }}
                />
              ))}
            </div>
          )}
          
          {filteredTodos.length > 0 && (
            <div className={styles.statusBar}>
              <span>Showing {filteredTodos.length} of {todos.length} tasks</span>
              <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                ↑ Back to Top
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;