import { FiCalendar, FiEdit3, FiTrash2 } from "react-icons/fi";

const priorityStyle = {
  high: "border border-red-200 bg-red-50 text-red-700 dark:border-red-800/70 dark:bg-red-950/70 dark:text-red-200",
  medium:
    "border border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-700/70 dark:bg-amber-950/70 dark:text-amber-200",
  low: "border border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800/70 dark:bg-emerald-950/70 dark:text-emerald-200",
};

function getDueState(dueDate) {
  if (!dueDate) return { label: "No due date", className: "" };
  const today = new Date();
  const todayValue = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  if (dueDate === todayValue) {
    return {
      label: "Due today",
      className: "font-bold text-amber-700 dark:text-amber-300",
    };
  }
  if (dueDate < todayValue) {
    return {
      label: `Overdue · ${formatDueDate(dueDate)}`,
      className: "font-bold text-red-700 dark:text-red-300",
    };
  }
  return { label: `Due ${formatDueDate(dueDate)}`, className: "" };
}

function formatDueDate(value) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}

export default function TaskItem({ task, onToggle, onEdit, onDelete }) {
  const dueState = getDueState(task.dueDate);
  const dueClassName = task.completed ? "" : dueState.className;

  return (
    <article className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900/80">
      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => onToggle(task.id)}
          className={`mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border-2 transition ${
            task.completed
              ? "border-indigo-600 bg-indigo-600 text-white"
              : "border-slate-300 hover:border-indigo-500 dark:border-slate-600"
          }`}
          aria-label={
            task.completed ? "Mark task active" : "Mark task completed"
          }
          aria-pressed={task.completed}
        >
          {task.completed && (
            <svg
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
              className="block size-3.5"
            >
              <path
                d="m2.5 7 3 3 6-7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>

        <div className="min-w-0 flex-1">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
            <div className="min-w-0">
              <h3
                className={`break-words text-lg font-black ${
                  task.completed
                    ? "text-slate-400 opacity-75 line-through decoration-1"
                    : ""
                }`}
              >
                {task.title}
              </h3>
              {task.note && (
                <p className="mt-2 break-words leading-6 text-slate-600 dark:text-slate-300">
                  {task.note}
                </p>
              )}
            </div>
            <span
              className={`shrink-0 self-start rounded-full px-3 py-1 text-xs font-black capitalize ${priorityStyle[task.priority]}`}
            >
              {task.priority}
            </span>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
            <div
              className={`flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 ${dueClassName}`}
            >
              <FiCalendar aria-hidden="true" />
              {dueState.label}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => onEdit(task)}
                className="grid size-10 place-items-center rounded-xl border border-slate-200 text-slate-600 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-indigo-950/30"
                aria-label={`Edit ${task.title}`}
              >
                <FiEdit3 />
              </button>
              <button
                type="button"
                onClick={() => {
                  if (window.confirm(`Delete “${task.title}”?`))
                    onDelete(task.id);
                }}
                className="grid size-10 place-items-center rounded-xl border border-slate-200 text-slate-600 transition hover:border-red-300 hover:bg-red-50 hover:text-red-700 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-red-950/30 dark:hover:text-red-200"
                aria-label={`Delete ${task.title}`}
              >
                <FiTrash2 />
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
