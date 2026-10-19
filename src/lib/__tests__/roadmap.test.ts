import { describe, it, expect } from "vitest";
import { ROADMAP_ITEMS } from "../roadmap";

describe("ROADMAP_ITEMS", () => {
  it("contains active v0.1.0 modules with valid hrefs and upcoming modules marked Coming Soon", () => {
    const active = ROADMAP_ITEMS.filter((item) => item.status === "Active");
    const upcoming = ROADMAP_ITEMS.filter((item) => item.status === "Coming Soon");

    expect(active.map((i) => i.id)).toEqual(["json-formatter", "focus-workspace"]);
    expect(active.every((i) => i.href && i.href.startsWith("/"))).toBe(true);
    expect(upcoming.length).toBeGreaterThanOrEqual(5);
  });
});
