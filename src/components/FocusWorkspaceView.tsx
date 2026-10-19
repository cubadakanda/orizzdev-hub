"use client";

import React, { useEffect, useState } from "react";
import {
  DevTask,
  TaskCategory,
  TaskFilter,
  TimerMode,
  TIMER_PRESETS,
  TASKS_STORAGE_KEY,
  DEFAULT_TASKS,
  formatTimerDisplay,
  createTaskItem,
  filterTasks,
  parseStoredTasks,
} from "@/lib/focus-workspace";

const CATEGORY_BADGE: Record<TaskCategory, string> = {
  Bug: "bg-red-50 text-red-700 border-red-200",
  Feature: "bg-teal-50 text-teal-700 border-teal-200",
  Study: "bg-amber-50 text-amber-800 border-amber-200",
  General: "bg-slate-100 text-slate-700 border-slate-300",
};

export function FocusWorkspaceView() {
  const [mode, setMode] = useState<TimerMode>("work");
  const [secondsLeft, setSecondsLeft] = useState<number>(TIMER_PRESETS.work.seconds);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [completedSessions, setCompletedSessions] = useState<number>(0);

  const [tasks, setTasks] = useState<DevTask[]>(DEFAULT_TASKS);
  const [hydrated, setHydrated] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>("");
  const [newCategory, setNewCategory] = useState<TaskCategory>("Feature");
  const [filter, setFilter] = useState<TaskFilter>("All");

  useEffect(() => {
    const raw = window.localStorage.getItem(TASKS_STORAGE_KEY);
    setTasks(parseStoredTasks(raw));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks, hydrated]);

  useEffect(() => {
    if (!isRunning) return;
    const interval = window.setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => window.clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    if (secondsLeft === 0 && isRunning) {
      setIsRunning(false);
      if (mode === "work") {
        setCompletedSessions((s) => s + 1);
      }
    }
  }, [secondsLeft, isRunning, mode]);

  const handleModeSwitch = (nextMode: TimerMode) => {
    setIsRunning(false);
    setMode(nextMode);
    setSecondsLeft(TIMER_PRESETS[nextMode].seconds);
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    const item = createTaskItem(newTitle, newCategory);
    if (!item) return;
    setTasks((prev) => [item, ...prev]);
    setNewTitle("");
  };

  const handleToggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const visibleTasks = filterTasks(tasks, filter);
  const activeCount = tasks.filter((t) => !t.completed).length;

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-slate-900">
          Pomodoro Timer & Catatan Tugas
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
          Pengatur waktu belajar/ngoding dan daftar kerjaan yang tersimpan di browser.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Kotak Kiri: Timer Pomodoro */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-lg p-5 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-600">
              <span className="font-semibold text-slate-800">Timer Fokus</span>
              <span>Sesi selesai hari ini: <strong>{completedSessions}x</strong></span>
            </div>

            <div className="grid grid-cols-3 gap-1.5">
              {(Object.keys(TIMER_PRESETS) as TimerMode[]).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => handleModeSwitch(m)}
                  className={`py-1.5 px-2 rounded text-xs font-medium border transition ${
                    mode === m
                      ? "bg-teal-700 text-white border-teal-700"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {TIMER_PRESETS[m].label}
                </button>
              ))}
            </div>
          </div>

          <div className="my-8 text-center py-6 bg-slate-50 border border-slate-200 rounded-lg">
            <div className="text-5xl sm:text-6xl font-mono font-bold text-slate-900">
              {formatTimerDisplay(secondsLeft)}
            </div>
            <p className="text-xs text-slate-500 mt-2">
              {isRunning ? "Timer sedang berjalan..." : "Klik Mulai untuk menghitung mundur."}
            </p>
          </div>

          <div className="flex items-center justify-center gap-2.5">
            <button
              type="button"
              onClick={() => setIsRunning((r) => !r)}
              className={`px-5 py-2 rounded-md text-xs font-semibold text-white transition ${
                isRunning
                  ? "bg-amber-600 hover:bg-amber-700"
                  : "bg-teal-700 hover:bg-teal-800"
              }`}
            >
              {isRunning ? "Jeda (Pause)" : "Mulai Timer"}
            </button>
            <button
              type="button"
              onClick={() => {
                setIsRunning(false);
                setSecondsLeft(TIMER_PRESETS[mode].seconds);
              }}
              className="px-4 py-2 rounded-md text-xs font-medium bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 transition"
            >
              Ulangi (Reset)
            </button>
          </div>
        </div>

        {/* Kotak Kanan: To-Do List */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-lg p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Daftar Kerjaan / Tugas ({activeCount} belum selesai)
              </h2>
            </div>

            <div className="flex items-center gap-1">
              {(["All", "Active", "Completed"] as TaskFilter[]).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  className={`px-2.5 py-1 rounded text-xs font-medium border transition ${
                    filter === f
                      ? "bg-slate-800 text-white border-slate-800"
                      : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  {f === "All" ? "Semua" : f === "Active" ? "Belum" : "Selesai"}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleAddTask} className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Tulis tugas baru di sini..."
              className="flex-1 px-3 py-1.5 rounded-md bg-white border border-slate-300 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-600"
            />
            <div className="flex gap-2">
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as TaskCategory)}
                className="px-2.5 py-1.5 rounded-md bg-white border border-slate-300 text-xs text-slate-700 focus:outline-none focus:border-teal-600"
              >
                <option value="Feature">Feature</option>
                <option value="Bug">Bug</option>
                <option value="Study">Study</option>
                <option value="General">General</option>
              </select>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-md bg-teal-700 hover:bg-teal-800 text-white text-xs font-medium transition"
              >
                + Tambah
              </button>
            </div>
          </form>

          <div className="space-y-2 max-h-[300px] overflow-y-auto">
            {visibleTasks.length === 0 ? (
              <div className="text-center py-8 text-slate-400 text-xs border border-dashed border-slate-200 rounded-md">
                Tidak ada tugas di daftar ini.
              </div>
            ) : (
              visibleTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between gap-2 p-2.5 rounded-md bg-slate-50 border border-slate-200"
                >
                  <label className="flex items-center gap-2.5 cursor-pointer flex-1 min-w-0">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => handleToggleTask(task.id)}
                      className="accent-teal-700 rounded"
                    />
                    <span
                      className={`text-sm truncate ${
                        task.completed ? "line-through text-slate-400" : "text-slate-800"
                      }`}
                    >
                      {task.title}
                    </span>
                  </label>

                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`text-[11px] px-2 py-0.5 rounded border font-medium ${
                        CATEGORY_BADGE[task.category]
                      }`}
                    >
                      {task.category}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleDeleteTask(task.id)}
                      className="text-xs text-slate-400 hover:text-red-600 px-1.5 py-0.5"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
