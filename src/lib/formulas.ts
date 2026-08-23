// Formula data types and helper functions
export interface Formula {
  id: string;
  name: string;
  latex: string;
  tags: string[];
}

export interface Chapter {
  id: string;
  class: string;
  name: string;
  chapterNumber?: number;
  chapterName?: string;
  topics?: string[];
  formulas: Formula[];
}

export interface SubjectData {
  subject: string;
  audience: string[];
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
    .flatMap((ch) => ch.formulas.map((f) => ({ ...f, chapter: ch.name })));
}

// Get formula count for a chapter
export function getFormulaCount(chapter: Chapter): number {
  return chapter.formulas.length;
}
