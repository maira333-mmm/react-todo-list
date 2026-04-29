import { useMemo } from 'react';

const taskAnalytics = (todos) => {
  return useMemo(() => {
    const total = todos.length;
    const completed = todos.filter(t => t.completed).length;
    const active = total - completed;
    const completionRate = total === 0 ? 0 : Math.round((completed / total) * 100);
    
    const byPriority = {
      High: todos.filter(t => t.priority === "High" && !t.completed).length,
      Medium: todos.filter(t => t.priority === "Medium" && !t.completed).length,
      Low: todos.filter(t => t.priority === "Low" && !t.completed).length,
    };
    
    const overdue = todos.filter(t => 
      t.dueDate && new Date(t.dueDate) < new Date() && !t.completed
    ).length;
    
    return { 
      total, 
      completed, 
      active, 
      completionRate,
      byPriority,
      overdue
    };
  }, [todos]);
};

export default taskAnalytics;