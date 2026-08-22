export interface Variable {
  symbol: string;
  meaning: string;
}

export interface Formula {
  id: string; // Required non-optional string
  chapterNumber: number;
  chapterName: string;
  chapter?: string; // Chapter name alias
  topic: string;
  name: string;
  latex: string;
  description: string;
  variables: Variable[];
  tags: string[]; // Required for FormulaGrid and Landing components
  conditions?: string | null;
}

export interface Chapter {
  id: string; // Required non-optional string (fixes ChapterSelector errors)
  chapterNumber: number;
  chapterName: string;
  name: string; // Required alias for chapterName
  class?: number | string; // Fixes Landing.tsx(21,60) error
  topics: string[];
  formulas: Formula[];
}

export interface SubjectData {
  subject: string;
  audience: string[]; // Change this from 'string' to 'string[]'
  chapters: Chapter[];
}

// All subjects data
import physicsData from "@/data/ncert/physics.json";
import chemistryData from "@/data/ncert/chemistry.json";
import mathematicsData from "@/data/ncert/mathematics.json";
import biologyData from "@/data/ncert/biology.json";

export const allSubjects: SubjectData[] = [
  physicsData,
  chemistryData,
  mathematicsData,
  biologyData
];

// Get all chapters for a subject
export function getChaptersBySubject(subject: string): Chapter[] {
  const data = allSubjects.find(
    (s) => s.subject.toLowerCase() === subject.toLowerCase()
  );
  return data?.chapters ?? [];
}

// Get all formulas for a subject
export function getFormulasBySubject(subject: string): Formula[] {
  const chapters = getChaptersBySubject(subject);
  return chapters.flatMap((ch) => ch.formulas);
}

// Get formulas filtered by chapter IDs
export function filterFormulas(
  subject: string,
  chapterIds: string[]
): Formula[] {
  const chapters = getChaptersBySubject(subject);
  return chapters
    .filter((ch) => chapterIds.includes(ch.id))
    .flatMap((ch) =>
      ch.formulas.map((f) => ({
        ...f,
        chapter: ch.name || ch.chapterName,
      }))
    );
}

// Get formula count for a chapter
export function getFormulaCount(chapter: Chapter): number {
  return chapter.formulas.length;
}

// Search formulas across all subjects or a specific subject
export function searchFormulas(query: string, subject?: string): Formula[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const targetSubjects = subject
    ? allSubjects.filter((s) => s.subject.toLowerCase() === subject.toLowerCase())
    : allSubjects;

  const results: Formula[] = [];
  for (const s of targetSubjects) {
    for (const ch of s.chapters) {
      for (const f of ch.formulas) {
        if (
          f.name.toLowerCase().includes(q) ||
          f.topic.toLowerCase().includes(q) ||
          f.description.toLowerCase().includes(q) ||
          f.latex.toLowerCase().includes(q) ||
          f.chapterName.toLowerCase().includes(q)
        ) {
          results.push(f);
        }
      }
    }
  }
  return results;
}
