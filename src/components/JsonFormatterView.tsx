"use client";

import React, { useState } from "react";
import { formatJson, minifyJson, SAMPLE_JSON, JsonProcessResult } from "@/lib/json-tool";

export function JsonFormatterView() {
  const [input, setInput] = useState<string>(SAMPLE_JSON);
  const [indent, setIndent] = useState<2 | 4>(2);
  const [result, setResult] = useState<JsonProcessResult>(() => formatJson(SAMPLE_JSON, 2));
  const [copied, setCopied] = useState(false);

  const handleFormat = (customInput = input, customIndent = indent) => {
    setResult(formatJson(customInput, customIndent));
  };

  const handleMinify = () => {
    setResult(minifyJson(input));
  };

  const handleLoadSample = () => {
    setInput(SAMPLE_JSON);
    setResult(formatJson(SAMPLE_JSON, indent));
  };

  const handleClear = () => {
    setInput("");
    setResult(formatJson("", indent));
  };

  const handleCopy = async () => {
    if (!result.ok) return;
    await navigator.clipboard.writeText(result.output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-xl font-bold text-slate-900">
            JSON Formatter & Validator
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Tempel data JSON di kolom kiri buat ngerapihin indentasi atau ngecek letak error sintaks.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleLoadSample}
            className="px-3 py-1.5 rounded-md text-xs font-medium bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 transition"
          >
            Isi Contoh Data
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="px-3 py-1.5 rounded-md text-xs font-medium bg-white hover:bg-red-50 text-red-600 border border-slate-300 transition"
          >
            Kosongkan
          </button>
        </div>
      </div>

      {/* Baris Tombol Pengaturan */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-lg bg-white border border-slate-200">
        <div className="flex flex-wrap items-center gap-2">
          <label className="text-xs text-slate-600 mr-1">Indentasi:</label>
          <button
            type="button"
            onClick={() => {
              setIndent(2);
              handleFormat(input, 2);
            }}
            className={`px-2.5 py-1 rounded text-xs font-medium border transition ${
              indent === 2
                ? "bg-teal-700 text-white border-teal-700"
                : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
            }`}
          >
            2 Spasi
          </button>
          <button
            type="button"
            onClick={() => {
              setIndent(4);
              handleFormat(input, 4);
            }}
            className={`px-2.5 py-1 rounded text-xs font-medium border transition ${
              indent === 4
                ? "bg-teal-700 text-white border-teal-700"
                : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
            }`}
          >
            4 Spasi
          </button>

          <span className="text-slate-300 mx-1">|</span>

          <button
            type="button"
            onClick={() => handleFormat(input, indent)}
            className="px-3 py-1 rounded text-xs font-medium bg-teal-700 hover:bg-teal-800 text-white transition"
          >
            Rapikan (Format)
          </button>

          <button
            type="button"
            onClick={handleMinify}
            className="px-3 py-1 rounded text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 transition"
          >
            Jadikan 1 Baris (Minify)
          </button>
        </div>

        <div className="text-xs">
          {result.ok ? (
            <div className="flex items-center gap-3 text-slate-600">
              <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium">
                JSON Valid
              </span>
              <span>{result.stats.keysCount} key</span>
              <span>{result.stats.sizeBytes} byte</span>
            </div>
          ) : (
            <span className="px-2 py-0.5 rounded bg-red-50 text-red-700 border border-red-200 font-medium">
              Format JSON Salah
            </span>
          )}
        </div>
      </div>

      {/* Kolom Input & Output */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white border border-slate-200 rounded-lg overflow-hidden flex flex-col">
          <div className="px-3.5 py-2 bg-slate-100 border-b border-slate-200 flex items-center justify-between text-xs font-medium text-slate-700">
            <span>Input JSON</span>
            <span className="text-slate-500">{input.length} karakter</span>
          </div>
          <textarea
            value={input}
            onChange={(e) => {
              const nextVal = e.target.value;
              setInput(nextVal);
              setResult(formatJson(nextVal, indent));
            }}
            placeholder='Ketik atau paste JSON di sini, misal: {"nama": "Budi"}'
            rows={15}
            spellCheck={false}
            className="w-full p-3.5 bg-white text-slate-800 font-mono text-xs leading-relaxed focus:outline-none resize-y"
          />
        </div>

        <div className="bg-white border border-slate-200 rounded-lg overflow-hidden flex flex-col">
          <div className="px-3.5 py-2 bg-slate-100 border-b border-slate-200 flex items-center justify-between text-xs font-medium text-slate-700">
            <span>Hasil Output</span>
            <button
              type="button"
              disabled={!result.ok}
              onClick={handleCopy}
              className="px-2.5 py-0.5 rounded bg-white hover:bg-slate-50 disabled:opacity-40 text-slate-700 border border-slate-300 text-xs transition"
            >
              {copied ? "Berhasil disalin!" : "Copy Hasil"}
            </button>
          </div>

          {result.ok ? (
            <pre className="w-full h-full min-h-[320px] p-3.5 bg-slate-50 text-slate-800 font-mono text-xs leading-relaxed overflow-auto">
              {result.output}
            </pre>
          ) : (
            <div className="p-4 min-h-[320px] bg-red-50/50 text-red-800 text-xs space-y-2">
              <div className="font-semibold">Pesan Error:</div>
              <div className="font-mono p-3 bg-white border border-red-200 rounded text-red-700">
                {result.error}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
