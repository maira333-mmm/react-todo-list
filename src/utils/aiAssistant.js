export class AIAssistant {
  constructor() {
    this.productivityTips = [
      '💡 Break large tasks into smaller subtasks',
      '🍅 Try Pomodoro: 25 min work, 5 min break',
      '🎯 Do priority tasks during peak energy hours'
    ];
  }

  async suggestPriority(title, description = '') {
    const text = (title + ' ' + description).toLowerCase();
    const highKeywords = ['urgent', 'asap', 'deadline', 'critical', 'important'];
    const mediumKeywords = ['soon', 'review', 'update', 'check'];
    
    if (highKeywords.some(word => text.includes(word))) {
      return { priority: 'High', confidence: 0.85, reason: 'Urgent keywords detected' };
    } else if (mediumKeywords.some(word => text.includes(word))) {
      return { priority: 'Medium', confidence: 0.75, reason: 'Time-sensitive keywords detected' };
    }
    return { priority: 'Low', confidence: 0.5, reason: 'Standard priority' };
  }

  async getProductivityTip() {
    const index = Math.floor(Math.random() * this.productivityTips.length);
    return this.productivityTips[index];
  }

  async getTaskSuggestion() {
    const suggestions = [
      'Review and prioritize pending tasks',
      'Create a weekly schedule',
      'Backup your task data',
      'Organize tasks by tags',
      'Set realistic deadlines'
    ];
    return suggestions[Math.floor(Math.random() * suggestions.length)];
  }

  async analyzeProductivity(todos) {
    const completedToday = todos.filter(t => 
      t.completed && new Date(t.updatedAt).toDateString() === new Date().toDateString()
    ).length;
    
    return {
      completedToday,
      averageCompletionHours: 24,
      productivityScore: Math.min(100, completedToday * 20),
      recommendation: 'Keep up the good work!',
      streak: 0
    };
  }
}
