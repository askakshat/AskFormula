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
  audience: string;
  chapters: Chapter[];
}

// All subjects data
import rawPhysicsData from "@/data/ncert/physics.json";
import rawChemistryData from "@/data/ncert/chemistry.json";
import rawMathematicsData from "@/data/ncert/mathematics.json";
import rawBiologyData from "@/data/ncert/biology.json";

/**
 * Normalizes input JSON into a valid SubjectData structure.
 * Guarantees required string IDs, tags arrays, and class properties are populated.
 */
function normalizeSubjectData(
  raw: any,
  defaultSubject: string,
  defaultAudience: string = "Class 11"
): SubjectData {
  if (!raw) {
    return { subject: defaultSubject, audience: defaultAudience, chapters: [] };
  }

  // Case 1: Data has chapters array
  if (raw.chapters && Array.isArray(raw.chapters)) {
    return {
      subject: raw.subject || defaultSubject,
      audience: raw.audience || defaultAudience,
      chapters: raw.chapters.map((ch: any, chIdx: number) => {
        const chId = ch.id ? String(ch.id) : String(ch.chapterNumber ?? chIdx + 1);
        const chName = ch.chapterName || ch.name || `Chapter ${chIdx + 1}`;

        return {
          id: chId,
          chapterNumber: ch.chapterNumber ?? chIdx + 1,
          chapterName: chName,
          name: chName,
          class: ch.class ?? ch.grade ?? 11,
          topics: Array.isArray(ch.topics) ? ch.topics : [],
          formulas: (Array.isArray(ch.formulas) ? ch.formulas : []).map(
            (f: any, fIdx: number) => ({
              id: f.id ? String(f.id) : `${chId}-${fIdx + 1}`,
              chapterNumber: f.chapterNumber ?? ch.chapterNumber ?? chIdx + 1,
              chapterName: f.chapterName || chName,
              chapter: chName,
              topic: f.topic || "General",
              name: f.name || "",
              latex: f.latex || "",
              description: f.description || "",
              variables: Array.isArray(f.variables) ? f.variables : [],
              tags: Array.isArray(f.tags) ? f.tags : [f.topic || "Formula", chName],
              conditions: f.conditions ?? null,
            })
          ),
        };
      }),
    };
  }

  // Case 2: Data is a flat array of formulas
  if (Array.isArray(raw)) {
    const chapterMap = new Map<number, Chapter>();

    raw.forEach((f: any, fIdx: number) => {
      const chNum = f.chapterNumber ?? 1;
      const chName = f.chapterName || f.chapter || `Chapter ${chNum}`;
      const chId = String(chNum);

      if (!chapterMap.has(chNum)) {
        chapterMap.set(chNum, {
          id: chId,
          chapterNumber: chNum,
          chapterName: chName,
          name: chName,
          class: f.class ?? 11,
          topics: [],
          formulas: [],
        });
      }

      const chapter = chapterMap.get(chNum)!;
      if (f.topic && !chapter.topics.includes(f.topic)) {
        chapter.topics.push(f.topic);
      }

      chapter.formulas.push({
        id: f.id ? String(f.id) : `${chId}-${fIdx + 1}`,
        chapterNumber: chNum,
        chapterName: chName,
        chapter: chName,
        topic: f.topic || "General",
        name: f.name || "",
        latex: f.latex || "",
        description: f.description || "",
        variables: Array.isArray(f.variables) ? f.variables : [],
        tags: Array.isArray(f.tags) ? f.tags : [f.topic || "Formula", chName],
        conditions: f.conditions ?? null,
      });
    });

    return {
      subject: defaultSubject,
      audience: defaultAudience,
      chapters: Array.from(chapterMap.values()).sort(
        (a, b) => a.chapterNumber - b.chapterNumber
      ),
    };
  }

  return { subject: defaultSubject, audience: defaultAudience, chapters: [] };
}

export const allSubjects: SubjectData[] = [
  normalizeSubjectData(rawPhysicsData, "Physics"),
  normalizeSubjectData(rawChemistryData, "Chemistry"),
  normalizeSubjectData(rawMathematicsData, "Mathematics"),
  normalizeSubjectData(rawBiologyData, "Biology"),
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
