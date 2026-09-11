import { useMemo, useState } from "react";
import { FiCheckCircle, FiPlus, FiSearch, FiTrash2 } from "react-icons/fi";
import "./App.css";
import Navbar from "./components/Navbar";
import TaskComposer from "./components/TaskComposer";
import TaskFilters from "./components/TaskFilters";
import TaskItem from "./components/TaskItem";
import TaskStats from "./components/TaskStats";
import ThemeToggle from "./components/ThemeToggle";
import { useTasks } from "./hooks/useTasks";
import { filterAndSortTasks } from "./utils/taskFilters";

export default function App() {
  const { tasks, addTask, updateTask, toggleTask, deleteTask, clearCompleted } =
    useTasks();
  const [theme, setTheme] = useState(() =>
    localStorage.getItem("taskflow-theme") === "dark" ? "dark" : "light",
  );
  const [filter, setFilter] = useState("all");
  const [priority, setPriority] = useState("all");
  const [sort, setSort] = useState("newest");
  const [search, setSearch] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [notice, setNotice] = useState("");

  const visibleTasks = useMemo(
    () => filterAndSortTasks(tasks, { filter, priority, sort, search }),
    [tasks, filter, priority, sort, search],
  );

  const announce = (message) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2200);
  };

  const handleSave = (task) => {
    if (editingTask) {
      updateTask(editingTask.id, task);
      setEditingTask(null);
      announce("Task updated");
      return;
    }
    addTask(task);
    announce("Task added");
  };

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("taskflow-theme", next);
  };

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div className="min-h-screen bg-slate-50 text-slate-950 transition-colors dark:bg-[#07111f] dark:text-slate-100">
        <Navbar>
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </Navbar>

        <main className="mx-auto w-[min(1180px,calc(100%-2rem))] pb-16 pt-10">
          <section className="mb-8 grid gap-6 lg:grid-cols-[1.15fr_.85fr] lg:items-center">
            <div>
              <p className="mb-3 text-sm font-extrabold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-300">
                Personal productivity
              </p>
              <h1 className="max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">
                Plan clearly. Finish confidently.
              </h1>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                A focused workspace for capturing tasks, setting priorities, and
                keeping progress visible across every browser tab.
              </p>
            </div>
            <TaskStats tasks={tasks} />
          </section>

          <section className="grid gap-7 lg:grid-cols-[390px_1fr] lg:items-start">
            <TaskComposer
              editingTask={editingTask}
              onSave={handleSave}
              onCancel={() => setEditingTask(null)}
            />

            <div className="min-w-0">
              <div className="mb-5 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900/80">
                <div className="relative">
                  <FiSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    className="min-h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-4 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-950"
                    aria-label="Search tasks"
                    placeholder="Search tasks or notes"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                  />
                </div>
                <TaskFilters
                  filter={filter}
                  priority={priority}
                  sort={sort}
                  onFilterChange={setFilter}
                  onPriorityChange={setPriority}
                  onSortChange={setSort}
                />
              </div>

              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-black">Your tasks</h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {visibleTasks.length} of {tasks.length} shown
                  </p>
                </div>
                {tasks.some((task) => task.completed) && (
                  <button
                    type="button"
                    onClick={() => {
                      clearCompleted();
                      announce("Completed tasks cleared");
                    }}
                    className="inline-flex min-h-10 items-center gap-2 rounded-xl px-3 text-sm font-bold text-red-600 hover:bg-red-50 dark:text-red-300 dark:hover:bg-red-950/30"
                  >
                    <FiTrash2 /> Clear completed
                  </button>
                )}
              </div>

              {visibleTasks.length ? (
                <div className="grid gap-4">
                  {visibleTasks.map((task) => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      onToggle={toggleTask}
                      onEdit={setEditingTask}
                      onDelete={(id) => {
                        deleteTask(id);
                        if (editingTask?.id === id) setEditingTask(null);
                        announce("Task deleted");
                      }}
                    />
                  ))}
                </div>
              ) : (
                <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center dark:border-slate-700 dark:bg-slate-900/60">
                  <FiCheckCircle className="mx-auto mb-4 text-4xl text-indigo-500" />
                  <h3 className="text-xl font-black">Nothing to show</h3>
                  <p className="mt-2 text-slate-500 dark:text-slate-400">
                    Add a task or adjust the current filters.
                  </p>
                </div>
              )}
            </div>
          </section>
        </main>

        <footer className="border-t border-slate-200/80 px-4 py-6 text-center text-sm font-semibold text-slate-500 dark:border-slate-800 dark:text-slate-400">
          TaskFlow · Tasks stay in this browser
        </footer>

        <p className="sr-only" aria-live="polite">
          {notice}
        </p>
      </div>
    </div>
  );
}
