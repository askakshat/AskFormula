import { describe, it, expect } from "vitest";
import { filterFormulas } from "./formulas";

describe("filterFormulas", () => {
  it("should return formulas for valid subject and single matching chapter ID", () => {
    const result = filterFormulas("physics", ["ch1"]);

    expect(result.length).toBeGreaterThan(0);
    // All formulas should belong to chapter 1
    for (const formula of result) {
      // The filterFormulas function maps formulas to include a 'chapter' property
      // which corresponds to chapter.name
      expect(formula).toHaveProperty("chapter", "Units and Measurements");
    }
  });

  it("should return formulas for valid subject and multiple matching chapter IDs", () => {
    const result = filterFormulas("physics", ["ch1", "ch2"]);

    expect(result.length).toBeGreaterThan(0);

    const chapters = new Set(result.map(f => (f as any).chapter));
    expect(chapters.has("Units and Measurements")).toBe(true);
    expect(chapters.has("Motion in a Straight Line")).toBe(true);
    expect(chapters.size).toBe(2);
  });

  it("should return an empty array for a valid subject but non-matching chapter IDs", () => {
    const result = filterFormulas("physics", ["invalid-chapter-1", "invalid-chapter-2"]);
    expect(result).toEqual([]);
  });

  it("should return an empty array for an invalid subject", () => {
    const result = filterFormulas("invalid-subject", ["ch1"]);
    expect(result).toEqual([]);
  });

  it("should return an empty array when chapterIds array is empty", () => {
    const result = filterFormulas("physics", []);
    expect(result).toEqual([]);
  });

  it("should be case-insensitive for the subject parameter", () => {
    const resultLowercase = filterFormulas("physics", ["ch1"]);
    const resultUppercase = filterFormulas("PHYSICS", ["ch1"]);
    const resultMixedcase = filterFormulas("pHySiCs", ["ch1"]);

    expect(resultLowercase.length).toBeGreaterThan(0);
    expect(resultUppercase).toEqual(resultLowercase);
    expect(resultMixedcase).toEqual(resultLowercase);
  });

  it("should correctly map the chapter name onto each returned formula", () => {
    const result = filterFormulas("chemistry", ["c_ch1"]);
    expect(result.length).toBeGreaterThan(0);

    for (const formula of result) {
      expect(formula).toHaveProperty("chapter");
      expect(typeof (formula as any).chapter).toBe("string");
    }
  });
});
