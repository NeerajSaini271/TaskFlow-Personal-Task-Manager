export const TASKS_KEY = "taskflow-tasks-v1";

export function createTask(values) {
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    title: values.title.trim(),
    note: values.note.trim(),
    priority: values.priority,
    dueDate: values.dueDate,
    completed: false,
    createdAt: now,
    updatedAt: now,
  };
}

export function readTasks() {
  try {
    const value = JSON.parse(localStorage.getItem(TASKS_KEY) || "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

export function writeTasks(tasks) {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
}
