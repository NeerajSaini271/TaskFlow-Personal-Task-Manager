import { useEffect, useRef, useState } from "react";
import { FiPlus, FiSave, FiX } from "react-icons/fi";

const empty = { title: "", note: "", priority: "medium", dueDate: "" };

export default function TaskComposer({ editingTask, onSave, onCancel }) {
  const [form, setForm] = useState(empty);
  const formRef = useRef(null);
  const titleInputRef = useRef(null);

  useEffect(() => {
    setForm(
      editingTask
        ? {
            title: editingTask.title,
            note: editingTask.note,
            priority: editingTask.priority,
            dueDate: editingTask.dueDate,
          }
        : empty,
    );
    if (editingTask) {
      requestAnimationFrame(() => {
        titleInputRef.current?.focus();
        if (window.matchMedia("(max-width: 1023px)").matches) {
          formRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    }
  }, [editingTask]);

  const submit = (event) => {
    event.preventDefault();
    const title = form.title.trim();
    if (!title) return;
    onSave({ ...form, title, note: form.note.trim() });
    setForm(empty);
  };

  return (
    <form
      ref={formRef}
      onSubmit={submit}
      className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 dark:border-slate-700 dark:bg-slate-900/80 dark:shadow-black/20 lg:sticky lg:top-28"
    >
      <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-300">
        {editingTask ? "Editing task" : "New task"}
      </p>
      <h2 className="mt-2 text-2xl font-black">
        {editingTask ? "Refine the details" : "What needs your attention?"}
      </h2>

      <div className="mt-6 grid gap-4">
        <label className="grid gap-2 text-sm font-bold">
          Task title
          <input
            ref={titleInputRef}
            value={form.title}
            onChange={(event) =>
              setForm({ ...form, title: event.target.value })
            }
            maxLength="120"
            placeholder="Prepare project presentation"
            className="min-h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-950"
            required
          />
        </label>
        <label className="grid gap-2 text-sm font-bold">
          <span>
            Short note{" "}
            <span className="font-normal text-slate-400">(optional)</span>
          </span>
          <textarea
            value={form.note}
            onChange={(event) => setForm({ ...form, note: event.target.value })}
            maxLength="280"
            rows="3"
            placeholder="Add context, links, or a quick reminder"
            className="resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-950"
          />
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="grid gap-2 text-sm font-bold">
            Priority
            <span className="relative">
              <select
                aria-label="Priority"
                value={form.priority}
                onChange={(event) =>
                  setForm({ ...form, priority: event.target.value })
                }
                className="min-h-12 w-full appearance-none rounded-2xl border border-slate-200 bg-slate-50 px-3 pr-11 dark:border-slate-700 dark:bg-slate-950"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              <svg
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
                className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-slate-500 dark:text-slate-400"
              >
                <path
                  d="m6 8 4 4 4-4"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </label>
          <label className="grid gap-2 text-sm font-bold">
            Due date
            <input
              type="date"
              value={form.dueDate}
              onChange={(event) =>
                setForm({ ...form, dueDate: event.target.value })
              }
              className="min-h-12 min-w-0 rounded-2xl border border-slate-200 bg-slate-50 px-3 dark:border-slate-700 dark:bg-slate-950 dark:[color-scheme:dark]"
            />
          </label>
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <button
          type="submit"
          disabled={!form.title.trim()}
          className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-5 font-black text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700 disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none dark:disabled:bg-slate-800 dark:disabled:text-slate-500"
        >
          {editingTask ? <FiSave /> : <FiPlus />}
          {editingTask ? "Save changes" : "Add task"}
        </button>
        {editingTask && (
          <button
            type="button"
            onClick={onCancel}
            className="grid min-h-12 min-w-12 place-items-center rounded-2xl border border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
            aria-label="Cancel editing"
          >
            <FiX />
          </button>
        )}
      </div>
    </form>
  );
}
