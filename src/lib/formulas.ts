export interface Variable {
  symbol: string;
  meaning: string;
}

export interface Formula {
  id?: string;
  chapterNumber: number;
  chapterName: string;
  topic: string;
  name: string;
  latex: string;
  description: string;
  variables: Variable[];
  conditions?: string | null;
  chapter?: string; // Optional alias for compatibility
}

export interface Chapter {
  id?: string; // e.g. "1", "ch-1"
  chapterNumber: number;
  chapterName: string;
  name?: string; // Optional alias for chapterName
  topics: string[];
  formulas: Formula[];
}

export interface SubjectData {
  subject: string;
  audience: string;
  chapters: Chapter[];
}

// JSON data imports
import rawPhysicsData from "@/data/ncert/physics.json";
import rawChemistryData from "@/data/ncert/chemistry.json";
import rawMathematicsData from "@/data/ncert/mathematics.json";
import rawBiologyData from "@/data/ncert/biology.json";

/**
 * Normalizes input JSON into a valid SubjectData structure.
 * Handles both wrapped { subject, audience, chapters } objects and flat formula arrays.
 */
function normalizeSubjectData(
  raw: any,
  defaultSubject: string,
  defaultAudience: string = "Class 11"
): SubjectData {
  if (!raw) {
    return { subject: defaultSubject, audience: defaultAudience, chapters: [] };
  }

  // Case 1: Already structured with chapters array
  if (raw.chapters && Array.isArray(raw.chapters)) {
    return {
      subject: raw.subject || defaultSubject,
      audience: raw.audience || defaultAudience,
      chapters: raw.chapters.map((ch: any) => ({
        id: ch.id ?? String(ch.chapterNumber),
        chapterNumber: ch.chapterNumber ?? 0,
        chapterName: ch.chapterName || ch.name || "",
        name: ch.chapterName || ch.name || "",
        topics: ch.topics || [],
        formulas: Array.isArray(ch.formulas) ? ch.formulas : [],
      })),
    };
  }

  // Case 2: Raw flat array of formula objects
  if (Array.isArray(raw)) {
    const chapterMap = new Map<number, Chapter>();

    for (const f of raw) {
      const chNum = f.chapterNumber ?? 1;
      const chName = f.chapterName || f.chapter || `Chapter ${chNum}`;

      if (!chapterMap.has(chNum)) {
        chapterMap.set(chNum, {
          id: String(chNum),
          chapterNumber: chNum,
          chapterName: chName,
          name: chName,
          topics: [],
          formulas: [],
        });
      }

      const chapter = chapterMap.get(chNum)!;
      if (f.topic && !chapter.topics.includes(f.topic)) {
        chapter.topics.push(f.topic);
      }
      chapter.formulas.push(f);
    }

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

// All normalized subjects
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

// Get formulas filtered by chapter IDs or chapter numbers
export function filterFormulas(
  subject: string,
  chapterIds: (string | number)[]
): Formula[] {
  const chapters = getChaptersBySubject(subject);
  const normalizedIds = chapterIds.map(String);

  return chapters
    .filter((ch) => {
      const id = ch.id ? String(ch.id) : String(ch.chapterNumber);
      return normalizedIds.includes(id) || normalizedIds.includes(String(ch.chapterNumber));
    })
    .flatMap((ch) =>
      ch.formulas.map((f) => ({
        ...f,
        chapter: ch.chapterName,
        chapterName: f.chapterName || ch.chapterName,
      }))
    );
}

// Get formula count for a chapter
export function getFormulaCount(chapter: Chapter): number {
  return chapter.formulas.length;
}

// Search formulas across subjects or within a specific subject
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
