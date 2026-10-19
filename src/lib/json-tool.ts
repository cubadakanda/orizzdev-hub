export type JsonProcessResult =
  | { ok: true; output: string; stats: { keysCount: number; sizeBytes: number } }
  | { ok: false; error: string };

export const SAMPLE_JSON = JSON.stringify(
  {
    nama: "Parisan Apro",
    username: "cubadakanda",
    fokus: "Web Development",
    semester: 5,
    matkulFavorit: ["Pemrograman Web", "Struktur Data", "Basis Data"],
    sedangBelajar: {
      frontend: "Next.js & Tailwind CSS",
      git: true,
    },
  },
  null,
  2
);

function countKeysRecursive(value: unknown): number {
  if (value === null || typeof value !== "object") {
    return 0;
  }
  if (Array.isArray(value)) {
    return value.reduce((sum: number, item) => sum + countKeysRecursive(item), 0);
  }
  const keys = Object.keys(value as Record<string, unknown>);
  return keys.reduce(
    (sum, key) => sum + 1 + countKeysRecursive((value as Record<string, unknown>)[key]),
    0
  );
}

function processJson(raw: string, indent?: number): JsonProcessResult {
  if (!raw || raw.trim().length === 0) {
    return {
      ok: false,
      error: "Input JSON tidak boleh kosong.",
    };
  }

  try {
    const parsed = JSON.parse(raw);
    const output = indent !== undefined ? JSON.stringify(parsed, null, indent) : JSON.stringify(parsed);
    const sizeBytes = new TextEncoder().encode(output).length;
    const keysCount = countKeysRecursive(parsed);

    return {
      ok: true,
      output,
      stats: {
        keysCount,
        sizeBytes,
      },
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Format JSON tidak valid.";
    return {
      ok: false,
      error: message,
    };
  }
}

export function formatJson(raw: string, indentSpaces: 2 | 4 = 2): JsonProcessResult {
  return processJson(raw, indentSpaces);
}

export function minifyJson(raw: string): JsonProcessResult {
  return processJson(raw, undefined);
}
