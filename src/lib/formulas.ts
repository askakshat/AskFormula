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

import jeePhysicsData from "@/data/ncert/jee_physics.json";
import jeeClass12PhysicsData from "@/data/ncert/jee_class12_physics.json";
import jeeChemistryData from "@/data/ncert/jee_chemistry.json";
import jeeClass12ChemistryData from "@/data/ncert/jee_class12_chemistry.json";
import jeeMathematicsData from "@/data/ncert/jee_mathematics.json";
import jeeClass12MathematicsData from "@/data/ncert/jee_class12_mathematics.json";

const patchChapters = (chapters: Chapter[], prefix: string): Chapter[] => chapters.map(ch => ({ ...ch, id: prefix + '_' + ch.id }));

const mergedPhysicsData = {
  ...physicsData,
  chapters: patchChapters([...physicsData.chapters, ...class12PhysicsData.chapters], 'physics'),
  audience: [
    ...(physicsData.audience || []),
    ...(class12PhysicsData.audience || []),
  ],
};

export const allSubjects: SubjectData[] = [
  mergedPhysicsData as SubjectData,
  {
    ...chemistryData,
    chapters: patchChapters([...chemistryData.chapters, ...class12ChemistryData.chapters], 'chemistry'),
    audience: [
      ...(chemistryData.audience || []),
      ...(class12ChemistryData.audience || []),
    ],
  } as SubjectData,
  {
    ...mathematicsData,
    chapters: patchChapters([...mathematicsData.chapters, ...class12MathematicsData.chapters], 'mathematics'),
    audience: [
      ...(mathematicsData.audience || []),
      ...(class12MathematicsData.audience || []),
    ],
  } as SubjectData,
  {
    ...biologyData,
    chapters: patchChapters([...biologyData.chapters, ...class12BiologyData.chapters], 'biology'),
    audience: [
      ...(biologyData.audience || []),
      ...(class12BiologyData.audience || []),
    ],
  } as SubjectData,

  {
    subject: "JEE Physics",
    audience: ["jee"],
    chapters: patchChapters([...jeePhysicsData.chapters, ...jeeClass12PhysicsData.chapters], 'jee_physics'),
  } as SubjectData,
  {
    subject: "JEE Chemistry",
    audience: ["jee"],
    chapters: [
      ...jeeChemistryData.chapters,
      ...jeeClass12ChemistryData.chapters,
    ],
  } as SubjectData,
  {
    subject: "JEE Mathematics",
    audience: ["jee"],
    chapters: [
      ...jeeMathematicsData.chapters,
      ...jeeClass12MathematicsData.chapters,
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
