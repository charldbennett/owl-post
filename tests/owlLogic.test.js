import test from "node:test";
import assert from "node:assert/strict";

import {
  EVENT_DEFINITIONS,
  OBSTACLE_DEFINITIONS,
  READY_THRESHOLD,
  TASK_DEFINITIONS,
  canCompleteTask,
  createTaskState,
  formatTime,
  getDifficultyLevel,
  getSpawnDelay,
  getSpeed,
  getTaskCompletionScore,
  getTaskStatus,
  rectsOverlap,
  updateTaskProgress,
} from "../src/owlLogic.js";

test("defines the four Owl Post station tasks in keyboard order", () => {
  assert.deepEqual(
    TASK_DEFINITIONS.map((task) => [task.key, task.name]),
    [
      ["1", "Accept New Mail"],
      ["2", "Sort Parcels"],
      ["3", "Dispatch Owls"],
      ["4", "Clear Sorting Desk"],
    ],
  );
});

test("all sanctuary events affect known station ids", () => {
  const taskIds = new Set(TASK_DEFINITIONS.map((task) => task.id));

  EVENT_DEFINITIONS.forEach((event) => {
    Object.keys(event.effects).forEach((taskId) => {
      assert.equal(taskIds.has(taskId), true, `${event.name} targets ${taskId}`);
    });

    event.nudges.forEach((nudge) => {
      assert.equal(taskIds.has(nudge.taskId), true, `${event.name} nudges ${nudge.taskId}`);
    });
  });
});

test("difficulty increases speed while keeping early spacing gentle", () => {
  assert.equal(getDifficultyLevel(0), 1);
  assert.equal(getDifficultyLevel(20000), 2);
  assert.ok(getSpeed(90000) > getSpeed(0));

  const earlyDelay = getSpawnDelay(0, () => 0.5);
  const lateDelay = getSpawnDelay(120000, () => 0.5);
  assert.ok(earlyDelay > lateDelay);
});

test("tasks become completable only after the ready threshold", () => {
  const task = createTaskState(TASK_DEFINITIONS[0], () => 1);
  const almostReady = { ...task, progress: READY_THRESHOLD - 0.01 };
  const ready = { ...task, progress: READY_THRESHOLD };

  assert.equal(canCompleteTask(almostReady), false);
  assert.equal(canCompleteTask(ready), true);
  assert.equal(getTaskStatus(ready.progress), "ready");
});

test("event multipliers accelerate task progress", () => {
  const task = createTaskState(TASK_DEFINITIONS[0], () => 1);
  const normal = updateTaskProgress(task, 1000, 0, {});
  const boosted = updateTaskProgress(task, 1000, 0, { [task.id]: 2 });

  assert.ok(boosted.progress > normal.progress);
});

test("completion score rewards earlier attention", () => {
  const task = createTaskState(TASK_DEFINITIONS[0], () => 1);

  assert.equal(getTaskCompletionScore({ ...task, progress: 0.4 }), 74);
  assert.equal(getTaskCompletionScore({ ...task, progress: 0.8 }), 50);
  assert.equal(getTaskCompletionScore({ ...task, progress: 0.95 }), 24);
});

test("obstacle set includes ground and duck-under obstacles", () => {
  assert.ok(OBSTACLE_DEFINITIONS.some((obstacle) => obstacle.kind === "ground"));
  assert.ok(OBSTACLE_DEFINITIONS.some((obstacle) => obstacle.kind === "air"));
});

test("formats time and detects rectangle overlap", () => {
  assert.equal(formatTime(65000), "1:05");
  assert.equal(
    rectsOverlap(
      { x: 0, y: 0, width: 20, height: 20 },
      { x: 12, y: 12, width: 20, height: 20 },
    ),
    true,
  );
  assert.equal(
    rectsOverlap(
      { x: 0, y: 0, width: 10, height: 10 },
      { x: 20, y: 20, width: 10, height: 10 },
    ),
    false,
  );
});
