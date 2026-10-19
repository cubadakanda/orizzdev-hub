export type TaskCategory = "Bug" | "Feature" | "Study" | "General";
export type TaskFilter = "All" | "Active" | "Completed";
export type TimerMode = "work" | "shortBreak" | "longBreak";

export interface DevTask {
  id: string;
  title: string;
  category: TaskCategory;
  completed: boolean;
  createdAt: string;
}

export const TIMER_PRESETS: Record<TimerMode, { label: string; seconds: number }> = {
  work: { label: "Fokus (25m)", seconds: 25 * 60 },
  shortBreak: { label: "Istirahat (5m)", seconds: 5 * 60 },
  longBreak: { label: "Istirahat Panjang (15m)", seconds: 15 * 60 },
};

export const TASKS_STORAGE_KEY = "orizzdev_hub_tasks_v1";

export const DEFAULT_TASKS: DevTask[] = [
  {
    id: "default-1",
    title: "Benerin tampilan responsive di halaman utama",
    category: "Feature",
    completed: false,
    createdAt: "2026-10-17T00:00:00.000Z",
  },
  {
    id: "default-2",
    title: "Pelajari cara bikin fitur generator password buat update minggu depan",
    category: "Study",
    completed: false,
    createdAt: "2026-10-17T00:00:00.000Z",
  },
];

export function formatTimerDisplay(totalSeconds: number): string {
  const safeSeconds = Math.max(0, Math.floor(totalSeconds));
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export function createTaskItem(
  title: string,
  category: TaskCategory,
  id?: string
): DevTask | null {
  const trimmed = title.trim();
  if (!trimmed) {
    return null;
  }

  return {
    id: id ?? `task-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    title: trimmed,
    category,
    completed: false,
    createdAt: new Date().toISOString(),
  };
}

export function filterTasks(tasks: DevTask[], filter: TaskFilter): DevTask[] {
  if (filter === "Active") {
    return tasks.filter((t) => !t.completed);
  }
  if (filter === "Completed") {
    return tasks.filter((t) => t.completed);
  }
  return tasks;
}

const VALID_CATEGORIES = new Set<string>(["Bug", "Feature", "Study", "General"]);

function isValidDevTask(item: unknown): item is DevTask {
  if (!item || typeof item !== "object") return false;
  const candidate = item as Record<string, unknown>;
  return (
    typeof candidate.id === "string" &&
    typeof candidate.title === "string" &&
    typeof candidate.category === "string" &&
    VALID_CATEGORIES.has(candidate.category) &&
    typeof candidate.completed === "boolean" &&
    typeof candidate.createdAt === "string"
  );
}

export function parseStoredTasks(raw: string | null): DevTask[] {
  if (!raw) {
    return DEFAULT_TASKS;
  }
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed) || !parsed.every(isValidDevTask)) {
      return DEFAULT_TASKS;
    }
    return parsed;
  } catch {
    return DEFAULT_TASKS;
  }
}
