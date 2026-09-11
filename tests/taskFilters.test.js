import test from "node:test";
import assert from "node:assert/strict";
import { filterAndSortTasks } from "../src/utils/taskFilters.js";

const tasks = [
  {
    id: "1",
    title: "Prepare presentation",
    note: "Review slides",
    priority: "high",
    dueDate: "2026-09-20",
    completed: false,
    createdAt: "2026-09-11T10:00:00.000Z",
  },
  {
    id: "2",
    title: "Accessibility review",
    note: "Check labels",
    priority: "low",
    dueDate: "",
    completed: true,
    createdAt: "2026-09-10T10:00:00.000Z",
  },
  {
    id: "3",
    title: "Update links",
    note: "Add the live demo",
    priority: "medium",
    dueDate: "2026-09-15",
    completed: false,
    createdAt: "2026-09-09T10:00:00.000Z",
  },
];

const defaults = { filter: "all", priority: "all", sort: "newest", search: "" };

test("filters active and completed tasks", () => {
  assert.deepEqual(
    filterAndSortTasks(tasks, { ...defaults, filter: "active" }).map(
      (task) => task.id,
    ),
    ["1", "3"],
  );
  assert.deepEqual(
    filterAndSortTasks(tasks, { ...defaults, filter: "completed" }).map(
      (task) => task.id,
    ),
    ["2"],
  );
});

test("searches titles and notes without case sensitivity", () => {
  assert.deepEqual(
    filterAndSortTasks(tasks, { ...defaults, search: "SLIDES" }).map(
      (task) => task.id,
    ),
    ["1"],
  );
  assert.deepEqual(
    filterAndSortTasks(tasks, { ...defaults, search: "live demo" }).map(
      (task) => task.id,
    ),
    ["3"],
  );
});

test("sorts by due date with undated tasks last", () => {
  assert.deepEqual(
    filterAndSortTasks(tasks, { ...defaults, sort: "due" }).map(
      (task) => task.id,
    ),
    ["3", "1", "2"],
  );
});

test("sorts by priority from high to low", () => {
  assert.deepEqual(
    filterAndSortTasks(tasks, { ...defaults, sort: "priority" }).map(
      (task) => task.id,
    ),
    ["1", "3", "2"],
  );
});
