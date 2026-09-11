const priorityRank = { high: 0, medium: 1, low: 2 };

export function filterAndSortTasks(tasks, options) {
  const query = options.search.trim().toLowerCase();
  return tasks
    .filter((task) => {
      if (options.filter === "active" && task.completed) return false;
      if (options.filter === "completed" && !task.completed) return false;
      if (options.priority !== "all" && task.priority !== options.priority)
        return false;
      return (
        !query || `${task.title} ${task.note}`.toLowerCase().includes(query)
      );
    })
    .sort((a, b) => {
      if (options.sort === "oldest")
        return a.createdAt.localeCompare(b.createdAt);
      if (options.sort === "due") {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return a.dueDate.localeCompare(b.dueDate);
      }
      if (options.sort === "priority")
        return priorityRank[a.priority] - priorityRank[b.priority];
      return b.createdAt.localeCompare(a.createdAt);
    });
}
