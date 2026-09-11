import { useEffect, useState } from "react";
import {
  createTask,
  readTasks,
  TASKS_KEY,
  writeTasks,
} from "../utils/taskStorage";

export function useTasks() {
  const [tasks, setTasks] = useState(readTasks);

  useEffect(() => {
    writeTasks(tasks);
  }, [tasks]);

  useEffect(() => {
    const sync = (event) => {
      if (event.key === TASKS_KEY) setTasks(readTasks());
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  const addTask = (values) =>
    setTasks((current) => [createTask(values), ...current]);
  const updateTask = (id, values) =>
    setTasks((current) =>
      current.map((task) =>
        task.id === id
          ? { ...task, ...values, updatedAt: new Date().toISOString() }
          : task,
      ),
    );
  const toggleTask = (id) =>
    setTasks((current) =>
      current.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
              updatedAt: new Date().toISOString(),
            }
          : task,
      ),
    );
  const deleteTask = (id) =>
    setTasks((current) => current.filter((task) => task.id !== id));
  const clearCompleted = () =>
    setTasks((current) => current.filter((task) => !task.completed));

  return { tasks, addTask, updateTask, toggleTask, deleteTask, clearCompleted };
}
