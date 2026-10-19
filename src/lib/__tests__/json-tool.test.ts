import { describe, it, expect } from "vitest";
import { formatJson, minifyJson, SAMPLE_JSON } from "../json-tool";

describe("json-tool", () => {
  it("formats valid JSON with 2 or 4 spaces and computes key stats", () => {
    const res2 = formatJson('{"b":1,"a":{"c":2}}', 2);
    expect(res2.ok).toBe(true);
    if (res2.ok) {
      expect(res2.output).toContain('  "b": 1');
      expect(res2.stats.keysCount).toBe(3);
    }

    const res4 = formatJson('{"a":1}', 4);
    expect(res4.ok && res4.output).toContain('    "a": 1');
  });

  it("minifies valid JSON into a single compact line", () => {
    const res = minifyJson('{\n  "name": "OrizzDev",\n  "active": true\n}');
    expect(res).toEqual({
      ok: true,
      output: '{"name":"OrizzDev","active":true}',
      stats: { keysCount: 2, sizeBytes: 33 },
    });
  });

  it("rejects empty or whitespace-only input with a clear Indonesian message", () => {
    expect(formatJson("   ")).toEqual({
      ok: false,
      error: "Input JSON tidak boleh kosong.",
    });
    expect(minifyJson("")).toEqual({
      ok: false,
      error: "Input JSON tidak boleh kosong.",
    });
  });

  it("returns ok: false with syntax error details on malformed JSON", () => {
    const res = formatJson('{"unclosed": 123');
    expect(res.ok).toBe(false);
    if (!res.ok) {
      expect(res.error.length).toBeGreaterThan(0);
    }
  });

  it("provides a valid SAMPLE_JSON constant", () => {
    expect(formatJson(SAMPLE_JSON).ok).toBe(true);
  });
});
