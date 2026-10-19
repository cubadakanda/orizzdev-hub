"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/", label: "Beranda" },
  { href: "/tools/json-formatter", label: "JSON Formatter" },
  { href: "/workspace/focus", label: "Pomodoro & Tugas" },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Top Navbar Sederhana */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="font-bold text-lg text-teal-700 tracking-tight hover:text-teal-800"
          >
            OrizzDev<span className="text-slate-400 font-normal text-sm ml-1.5">/ tools</span>
          </Link>

          <nav className="flex items-center gap-1 sm:gap-2">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${
                    active
                      ? "bg-teal-50 text-teal-700 border border-teal-200"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Konten Utama */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8">
        {children}
      </main>

      {/* Footer Sederhana */}
      <footer className="border-t border-slate-200 bg-white py-4 mt-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <span>Dibuat oleh Parisan Apro (Orizzdev)</span>
          <a
            href="https://github.com/cubadakanda"
            target="_blank"
            rel="noreferrer"
            className="text-teal-700 hover:underline font-medium"
          >
            github.com/cubadakanda
          </a>
        </div>
      </footer>
    </div>
  );
}
