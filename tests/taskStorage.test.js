import test from "node:test";
import assert from "node:assert/strict";
import {
  createTask,
  readTasks,
  TASKS_KEY,
  writeTasks,
} from "../src/utils/taskStorage.js";

function installStorage(initial = {}) {
  const values = new Map(Object.entries(initial));
  globalThis.localStorage = {
    getItem: (key) => (values.has(key) ? values.get(key) : null),
    setItem: (key, value) => values.set(key, String(value)),
    removeItem: (key) => values.delete(key),
    clear: () => values.clear(),
  };
}

test("createTask trims text and sets safe defaults", () => {
  const task = createTask({
    title: "  Finish release  ",
    note: "  Check the build  ",
    priority: "high",
    dueDate: "2026-09-20",
  });
  assert.equal(task.title, "Finish release");
  assert.equal(task.note, "Check the build");
  assert.equal(task.priority, "high");
  assert.equal(task.dueDate, "2026-09-20");
  assert.equal(task.completed, false);
  assert.ok(task.id);
  assert.ok(task.createdAt);
  assert.equal(task.createdAt, task.updatedAt);
});

test("readTasks returns an empty array for corrupted storage", () => {
  installStorage({ [TASKS_KEY]: "not-json" });
  assert.deepEqual(readTasks(), []);
});

test("writeTasks and readTasks preserve task data", () => {
  installStorage();
  const tasks = [{ id: "one", title: "Stored task" }];
  writeTasks(tasks);
  assert.deepEqual(readTasks(), tasks);
});
