import { describe, it, expect } from "vitest";
import {
  formatTimerDisplay,
  createTaskItem,
  filterTasks,
  parseStoredTasks,
  DEFAULT_TASKS,
  TIMER_PRESETS,
} from "../focus-workspace";

describe("focus-workspace", () => {
  it("formats timer seconds into MM:SS and clamps negative values to 00:00", () => {
    expect(formatTimerDisplay(TIMER_PRESETS.work.seconds)).toBe("25:00");
    expect(formatTimerDisplay(65)).toBe("01:05");
    expect(formatTimerDisplay(-10)).toBe("00:00");
  });

  it("creates a trimmed DevTask or returns null on blank title", () => {
    expect(createTaskItem("   ", "Bug")).toBeNull();
    const task = createTaskItem("  Setup GitHub repo  ", "Feature", "t-1");
    expect(task).not.toBeNull();
    expect(task?.title).toBe("Setup GitHub repo");
    expect(task?.category).toBe("Feature");
    expect(task?.completed).toBe(false);
  });

  it("filters tasks by All, Active, and Completed", () => {
    const sample = [
      { id: "1", title: "A", category: "Bug" as const, completed: false, createdAt: "" },
      { id: "2", title: "B", category: "Study" as const, completed: true, createdAt: "" },
    ];
    expect(filterTasks(sample, "All")).toHaveLength(2);
    expect(filterTasks(sample, "Active").map((t) => t.id)).toEqual(["1"]);
    expect(filterTasks(sample, "Completed").map((t) => t.id)).toEqual(["2"]);
  });

  it("falls back to DEFAULT_TASKS when localStorage JSON is null or corrupted", () => {
    expect(parseStoredTasks(null)).toEqual(DEFAULT_TASKS);
    expect(parseStoredTasks("{broken-json")).toEqual(DEFAULT_TASKS);
    expect(parseStoredTasks('"not-an-array"')).toEqual(DEFAULT_TASKS);
  });
});
