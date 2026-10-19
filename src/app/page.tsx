"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ROADMAP_ITEMS } from "@/lib/roadmap";
import {
  TASKS_STORAGE_KEY,
  DEFAULT_TASKS,
  parseStoredTasks,
} from "@/lib/focus-workspace";

export default function DashboardPage() {
  const [activeTaskCount, setActiveTaskCount] = useState<number>(
    DEFAULT_TASKS.filter((t) => !t.completed).length
  );

  useEffect(() => {
    const raw = window.localStorage.getItem(TASKS_STORAGE_KEY);
    const parsed = parseStoredTasks(raw);
    setActiveTaskCount(parsed.filter((t) => !t.completed).length);
  }, []);

  const activeModules = ROADMAP_ITEMS.filter((i) => i.status === "Active");
  const upcomingModules = ROADMAP_ITEMS.filter((i) => i.status === "Coming Soon");

  return (
    <div className="space-y-8">
      {/* Header Pengantar */}
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
          OrizzDev — Web Tools & Catatan Harian
        </h1>
        <p className="text-sm text-slate-600 mt-1.5 leading-relaxed max-w-2xl">
          Project pribadi berisi kumpulan tools sederhana yang sering kepakai waktu lagi nugas kuliah atau ngoding. Dibuat bertahap sambil latihan Next.js dan TypeScript.
        </p>

        <div className="flex flex-wrap gap-4 mt-5 pt-4 border-t border-slate-100 text-xs text-slate-600">
          <div>
            Tool siap pakai: <strong className="text-slate-900">{activeModules.length} fitur</strong>
          </div>
          <div>•</div>
          <div>
            Tugas belum selesai: <strong className="text-teal-700">{activeTaskCount} tugas</strong>
          </div>
          <div>•</div>
          <div>
            Rencana fitur berikutnya: <strong className="text-slate-900">{upcomingModules.length} fitur</strong>
          </div>
        </div>
      </div>

      {/* Daftar Fitur yang Sudah Jalan */}
      <div className="space-y-3">
        <h2 className="text-base font-bold text-slate-800">
          Fitur yang Sudah Bisa Dipakai
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeModules.map((mod) => (
            <div
              key={mod.id}
              className="bg-white border border-slate-200 rounded-lg p-5 flex flex-col justify-between gap-4 hover:border-teal-600 transition"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="font-bold text-base text-slate-900">
                    {mod.title}
                  </h3>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-teal-50 text-teal-700 border border-teal-200 font-medium">
                    {mod.category}
                  </span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {mod.description}
                </p>
              </div>

              <div>
                <Link
                  href={mod.href ?? "/"}
                  className="inline-block px-3.5 py-1.5 rounded-md bg-teal-700 hover:bg-teal-800 text-white text-xs font-medium transition"
                >
                  Buka {mod.title} &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Catatan Rencana Update Berikutnya */}
      <div className="space-y-3">
        <div>
          <h2 className="text-base font-bold text-slate-800">
            Catatan Rencana Update (To-Do Project)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Daftar fitur yang rencananya mau ditambahin satu-satu ke depannya.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg divide-y divide-slate-200">
          {ROADMAP_ITEMS.map((item) => {
            const done = item.status === "Active";
            return (
              <div
                key={item.id}
                className="p-3.5 flex items-start sm:items-center justify-between gap-3 text-sm"
              >
                <div className="flex items-start gap-2.5">
                  <input
                    type="checkbox"
                    checked={done}
                    readOnly
                    className="mt-1 sm:mt-0 accent-teal-700 rounded"
                  />
                  <div>
                    <span
                      className={`font-medium ${
                        done ? "text-slate-900" : "text-slate-700"
                      }`}
                    >
                      {item.title}
                    </span>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {item.description}
                    </p>
                  </div>
                </div>

                <span
                  className={`text-xs px-2 py-0.5 rounded shrink-0 ${
                    done
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {done ? "Sudah jalan" : "Belum dibuat"}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
