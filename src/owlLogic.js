export const READY_THRESHOLD = 0.35;
export const URGENT_THRESHOLD = 0.7;
export const CRITICAL_THRESHOLD = 0.9;

export const TASK_DEFINITIONS = [
  {
    id: "mail",
    key: "1",
    icon: "\u{1F4EC}",
    figure: "mailbox",
    name: "Accept New Mail",
    shortName: "Mail",
    baseDuration: 15000,
    color: "#c86f3d",
    warning: "New letters are waiting at the hatch",
    states: {
      calm: "Quiet letter hatch",
      ready: "Mail to stamp",
      urgent: "Letters piling up",
      critical: "Mailbox overflowing",
    },
  },
  {
    id: "parcels",
    key: "2",
    icon: "\u{1F4E6}",
    figure: "parcels",
    name: "Sort Parcels",
    shortName: "Parcels",
    baseDuration: 13600,
    color: "#8a9a62",
    warning: "Parcels need route sorting",
    states: {
      calm: "Shelves tidy",
      ready: "Parcels to route",
      urgent: "Stacks wobbling",
      critical: "Packages everywhere",
    },
  },
  {
    id: "dispatch",
    key: "3",
    icon: "\u{1F989}",
    figure: "perch",
    name: "Dispatch Owls",
    shortName: "Owls",
    baseDuration: 16200,
    color: "#6f8fa6",
    warning: "Carrier owls are waiting",
    states: {
      calm: "Perches peaceful",
      ready: "Owls ready",
      urgent: "Owls hopping",
      critical: "Perches crowded",
    },
  },
  {
    id: "desk",
    key: "4",
    icon: "\u{1F9F9}",
    figure: "desk",
    name: "Clear Sorting Desk",
    shortName: "Desk",
    baseDuration: 14800,
    color: "#995466",
    warning: "The sorting desk is cluttering up",
    states: {
      calm: "Desk clear",
      ready: "Twine to tidy",
      urgent: "Clutter spreading",
      critical: "Desk buried",
    },
  },
];

export const EVENT_DEFINITIONS = [
  {
    id: "autumn-winds",
    icon: "\u{1F342}",
    name: "Autumn Winds",
    text: "Leaves skitter through the oak office and clutter the sorting desk.",
    durationRange: [6500, 9000],
    effects: { desk: 2.45, parcels: 1.12 },
    nudges: [{ taskId: "desk", progress: 0.72 }],
  },
  {
    id: "festival-deliveries",
    icon: "\u{1F381}",
    name: "Festival Deliveries",
    text: "Ribboned letters arrive together for the woodland celebration.",
    durationRange: [6800, 9200],
    effects: { mail: 2.45, parcels: 1.18 },
    nudges: [
      { taskId: "mail", progress: 0.74 },
      { taskId: "parcels", progress: 0.48 },
    ],
  },
  {
    id: "night-flight",
    icon: "\u{1F319}",
    name: "Night Flight",
    text: "The courier owls perk up and want to launch under moonlight.",
    durationRange: [6500, 8800],
    effects: { dispatch: 2.35 },
    nudges: [{ taskId: "dispatch", progress: 0.72 }],
  },
  {
    id: "shooting-star",
    icon: "\u2728",
    name: "Shooting Star",
    text: "Everyone writes enchanted letters while the sky glitters.",
    durationRange: [7000, 9400],
    effects: { mail: 1.55, parcels: 1.45, dispatch: 1.45, desk: 1.28 },
    nudges: [
      { taskId: "mail", progress: 0.52 },
      { taskId: "parcels", progress: 0.48 },
      { taskId: "dispatch", progress: 0.46 },
    ],
  },
  {
    id: "rain-shower",
    icon: "\u{1F327}\uFE0F",
    name: "Rain Shower",
    text: "Protected parcels roll in from the wet woodland paths.",
    durationRange: [7000, 9800],
    effects: { parcels: 2.38, desk: 1.16 },
    nudges: [
      { taskId: "parcels", progress: 0.74 },
      { taskId: "desk", progress: 0.42 },
    ],
  },
];

export const OBSTACLE_DEFINITIONS = [
  {
    id: "fallen-branch",
    label: "fallen branch",
    className: "obstacle-fallen-branch",
    kind: "ground",
    width: 102,
    height: 32,
    score: 13,
  },
  {
    id: "tree-root",
    label: "tree root",
    className: "obstacle-tree-root",
    kind: "ground",
    width: 82,
    height: 34,
    score: 13,
  },
  {
    id: "wheelbarrow",
    label: "wheelbarrow",
    className: "obstacle-wheelbarrow",
    kind: "ground",
    width: 92,
    height: 52,
    score: 17,
  },
  {
    id: "hedgehog",
    label: "sleeping hedgehog",
    className: "obstacle-hedgehog",
    kind: "ground",
    width: 70,
    height: 34,
    score: 14,
  },
  {
    id: "puddle",
    label: "rain puddle",
    className: "obstacle-puddle",
    kind: "ground",
    width: 96,
    height: 24,
    score: 15,
  },
  {
    id: "mushrooms",
    label: "mushroom cluster",
    className: "obstacle-mushrooms",
    kind: "ground",
    width: 68,
    height: 42,
    score: 12,
  },
  {
    id: "parcel-stack",
    label: "stack of parcels",
    className: "obstacle-parcel-stack",
    kind: "ground",
    width: 62,
    height: 58,
    score: 16,
  },
  {
    id: "tiny-bridge",
    label: "tiny bridge",
    className: "obstacle-tiny-bridge",
    kind: "ground",
    width: 108,
    height: 42,
    score: 16,
  },
  {
    id: "low-branch",
    label: "low branch",
    className: "obstacle-low-branch",
    kind: "air",
    width: 112,
    height: 34,
    score: 19,
  },
];

export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export function randomBetween(min, max, rng = Math.random) {
  return min + (max - min) * rng();
}

export function chooseRandom(items, rng = Math.random) {
  return items[Math.floor(rng() * items.length)];
}

export function formatTime(milliseconds) {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  return `${minutes}:${String(remainder).padStart(2, "0")}`;
}

export function getDifficultyLevel(elapsedMs) {
  return 1 + Math.floor(Math.max(0, elapsedMs) / 20000);
}

export function getSpeed(elapsedMs) {
  const seconds = Math.max(0, elapsedMs) / 1000;
  return clamp(255 + seconds * 6.15, 255, 585);
}

export function getSpawnDelay(elapsedMs, rng = Math.random) {
  const seconds = Math.max(0, elapsedMs) / 1000;
  const ease = clamp(seconds / 92, 0, 1);
  const min = 1.9 - ease * 1.02;
  const max = 2.82 - ease * 1.2;
  return randomBetween(min, max, rng) * 1000;
}

export function getEventDelay(elapsedMs, rng = Math.random) {
  const seconds = Math.max(0, elapsedMs) / 1000;
  const ease = clamp(seconds / 120, 0, 1);
  return randomBetween(14200 - ease * 2800, 22600 - ease * 5000, rng);
}

export function createTaskState(definition, rng = Math.random) {
  return {
    ...definition,
    progress: 0,
    neglected: 0,
    pulse: 0,
    randomFactor: randomBetween(0.86, 1.18, rng),
    afterEffectMs: 0,
    afterMultiplier: 1,
  };
}

export function getTaskStatus(progress) {
  if (progress >= CRITICAL_THRESHOLD) {
    return "critical";
  }

  if (progress >= URGENT_THRESHOLD) {
    return "urgent";
  }

  if (progress >= READY_THRESHOLD) {
    return "ready";
  }

  return "calm";
}

export function getTaskRate(task, elapsedMs, eventMultipliers = {}) {
  const level = getDifficultyLevel(elapsedMs);
  const difficultyMultiplier = 1 + Math.min(level - 1, 12) * 0.066;
  const eventMultiplier = eventMultipliers[task.id] ?? 1;
  const afterMultiplier = task.afterEffectMs > 0 ? task.afterMultiplier : 1;
  const duration = Math.max(6200, task.baseDuration * task.randomFactor);
  return (difficultyMultiplier * eventMultiplier * afterMultiplier) / duration;
}

export function updateTaskProgress(task, deltaMs, elapsedMs, eventMultipliers = {}) {
  const nextTask = { ...task };
  nextTask.progress = clamp(
    nextTask.progress + deltaMs * getTaskRate(nextTask, elapsedMs, eventMultipliers),
    0,
    1,
  );
  nextTask.pulse = Math.max(0, nextTask.pulse - deltaMs);

  if (nextTask.afterEffectMs > 0) {
    nextTask.afterEffectMs = Math.max(0, nextTask.afterEffectMs - deltaMs);
    if (nextTask.afterEffectMs === 0) {
      nextTask.afterMultiplier = 1;
    }
  }

  return nextTask;
}

export function canCompleteTask(task) {
  return task.progress >= READY_THRESHOLD;
}

export function getTaskCompletionScore(task) {
  if (!canCompleteTask(task)) {
    return 0;
  }

  if (task.progress < URGENT_THRESHOLD) {
    return 74;
  }

  if (task.progress < CRITICAL_THRESHOLD) {
    return 50;
  }

  return 24;
}

export function resetTask(task, rng = Math.random) {
  return {
    ...task,
    progress: 0,
    pulse: 500,
    randomFactor: randomBetween(0.86, 1.18, rng),
  };
}

export function neglectTask(task, rng = Math.random) {
  return {
    ...resetTask(task, rng),
    neglected: task.neglected + 1,
  };
}

export function rectsOverlap(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}
