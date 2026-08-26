export interface Variable {
  symbol: string;
  meaning: string;
}

export interface Formula {
  id: string; // Required non-optional string
  chapterNumber?: number;
  chapterName?: string;
  chapter?: string; // Chapter name alias
  topic?: string;
  name: string;
  latex: string;
  description?: string;
  variables?: Variable[];
  tags: string[]; // Required for FormulaGrid and Landing components
  conditions?: string | null;
}

export interface Chapter {
  id: string;
  class: string;
  name: string;
  chapterNumber?: number;
  chapterName?: string;
  topics?: string[];
  formulas: Formula[];
  keyPoints?: string[];
  keyDerivations?: string[];
}

export interface SubjectData {
  subject: string;
  audience: string[]; // Change this from 'string' to 'string[]'
  chapters: Chapter[];
}

// All subjects data
import physicsData from "@/data/ncert/physics.json";
import class12PhysicsData from "@/data/ncert/class12_physics.json";
import chemistryData from "@/data/ncert/chemistry.json";
import class12ChemistryData from "@/data/ncert/class12_chemistry.json";
import mathematicsData from "@/data/ncert/mathematics.json";
import class12MathematicsData from "@/data/ncert/class12_mathematics.json";
import biologyData from "@/data/ncert/biology.json";
import class12BiologyData from "@/data/ncert/class12_biology.json";

const mergedPhysicsData = {
  ...physicsData,
  chapters: [...physicsData.chapters, ...class12PhysicsData.chapters],
  audience: [
    ...(physicsData.audience || []),
    ...(class12PhysicsData.audience || []),
  ],
};

export const allSubjects: SubjectData[] = [
  mergedPhysicsData as SubjectData,
  {
    ...chemistryData,
    chapters: [...chemistryData.chapters, ...class12ChemistryData.chapters],
    audience: [
      ...(chemistryData.audience || []),
      ...(class12ChemistryData.audience || []),
    ],
  } as SubjectData,
  {
    ...mathematicsData,
    chapters: [...mathematicsData.chapters, ...class12MathematicsData.chapters],
    audience: [
      ...(mathematicsData.audience || []),
      ...(class12MathematicsData.audience || []),
    ],
  } as SubjectData,
  {
    ...biologyData,
    chapters: [...biologyData.chapters, ...class12BiologyData.chapters],
    audience: [
      ...(biologyData.audience || []),
      ...(class12BiologyData.audience || []),
    ],
  } as SubjectData,
];

// Get all chapters for a subject
export function getChaptersBySubject(subject: string): Chapter[] {
  const data = allSubjects.find(
    (s) => s.subject.toLowerCase() === subject.toLowerCase(),
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
  chapterIds: string[],
): Formula[] {
  const chapters = getChaptersBySubject(subject);
  return chapters
    .filter((ch) => chapterIds.includes(ch.id))
    .flatMap((ch) =>
      ch.formulas.map((f) => ({
        ...f,
        chapter: ch.name || ch.chapterName,
      })),
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
    ? allSubjects.filter(
        (s) => s.subject.toLowerCase() === subject.toLowerCase(),
      )
    : allSubjects;

  const results: Formula[] = [];
  for (const s of targetSubjects) {
    for (const ch of s.chapters) {
      for (const f of ch.formulas) {
        if (
          f.name.toLowerCase().includes(q) ||
          (f.topic && f.topic.toLowerCase().includes(q)) ||
          (f.description && f.description.toLowerCase().includes(q)) ||
          f.latex.toLowerCase().includes(q) ||
          (f.chapterName && f.chapterName.toLowerCase().includes(q))
        ) {
          results.push(f);
        }
      }
    }
  }
  return results;
}
