export default function TaskStats({ tasks }) {
  const completed = tasks.filter((task) => task.completed).length;
  const active = tasks.length - completed;
  const progress = tasks.length
    ? Math.round((completed / tasks.length) * 100)
    : 0;
  return (
    <div className="grid grid-cols-3 gap-3">
      {[
        ["Active", active],
        ["Completed", completed],
        ["Progress", `${progress}%`],
      ].map(([label, value]) => (
        <div
          key={label}
          className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900/80"
        >
          <strong className="block text-2xl font-black text-indigo-600 dark:text-indigo-300">
            {value}
          </strong>
          <span className="mt-1 block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
