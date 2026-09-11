const filterOptions = ["all", "active", "completed"];

function SelectChevron() {
  return (
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
  );
}

export default function TaskFilters({
  filter,
  priority,
  sort,
  onFilterChange,
  onPriorityChange,
  onSortChange,
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(170px,auto)_minmax(170px,auto)] sm:items-center">
      <div className="flex rounded-xl bg-slate-100 p-1 dark:bg-slate-950">
        {filterOptions.map((option) => (
          <button
            type="button"
            key={option}
            onClick={() => onFilterChange(option)}
            className={`min-h-9 flex-1 rounded-lg px-3 text-sm font-bold capitalize transition ${
              filter === option
                ? "bg-white text-indigo-700 shadow-sm dark:bg-slate-800 dark:text-indigo-200"
                : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="relative min-w-0 sm:min-w-[170px]">
        <select
          aria-label="Filter by priority"
          value={priority}
          onChange={(event) => onPriorityChange(event.target.value)}
          className="min-h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white py-2 pl-3 pr-11 font-semibold dark:border-slate-700 dark:bg-slate-950"
        >
          <option value="all">All priorities</option>
          <option value="high">High priority</option>
          <option value="medium">Medium priority</option>
          <option value="low">Low priority</option>
        </select>
        <SelectChevron />
      </div>

      <div className="relative min-w-0 sm:min-w-[170px]">
        <select
          aria-label="Sort tasks"
          value={sort}
          onChange={(event) => onSortChange(event.target.value)}
          className="min-h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white py-2 pl-3 pr-11 font-semibold dark:border-slate-700 dark:bg-slate-950"
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
          <option value="due">Due date</option>
          <option value="priority">Priority</option>
        </select>
        <SelectChevron />
      </div>
    </div>
  );
}
