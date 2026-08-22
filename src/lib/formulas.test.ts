import { describe, it, expect } from 'vitest';
import { getChaptersBySubject } from './formulas';

describe('getChaptersBySubject', () => {
  it('should return chapters for a valid subject (exact match)', () => {
    const chapters = getChaptersBySubject('Physics');
    expect(Array.isArray(chapters)).toBe(true);
    expect(chapters.length).toBeGreaterThan(0);
    expect(chapters[0]).toHaveProperty('id');
    expect(chapters[0]).toHaveProperty('name');
    expect(chapters[0]).toHaveProperty('formulas');
  });

  it('should be case-insensitive when matching subjects', () => {
    const lowerCaseResult = getChaptersBySubject('physics');
    const upperCaseResult = getChaptersBySubject('PHYSICS');
    const exactMatchResult = getChaptersBySubject('Physics');

    expect(lowerCaseResult.length).toBeGreaterThan(0);
    expect(lowerCaseResult).toEqual(upperCaseResult);
    expect(lowerCaseResult).toEqual(exactMatchResult);
  });

  it('should return an empty array for an invalid subject', () => {
    const chapters = getChaptersBySubject('History');
    expect(chapters).toEqual([]);
  });

  it('should return an empty array for an empty string', () => {
    const chapters = getChaptersBySubject('');
    expect(chapters).toEqual([]);
  });
});
