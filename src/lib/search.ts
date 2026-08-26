import physics from '@/data/ncert/physics.json';
import chemistry from '@/data/ncert/chemistry.json';
import mathematics from '@/data/ncert/mathematics.json';
import biology from '@/data/ncert/biology.json';
import { SubjectData } from '@/lib/formulas';

const subjects: SubjectData[] = [
  physics as SubjectData,
  chemistry as SubjectData,
  mathematics as SubjectData,
  biology as SubjectData
];
import { Formula, Chapter } from '@/lib/formulas';

export interface SearchResult {
  formula: Formula;
  chapter: Chapter;
  subjectName: string;
  className: string;
  examTypes: string[];
}

export function searchFormulas(query: string): SearchResult[] {
  if (!query || query.trim().length < 2) return [];

  const lowerQuery = query.toLowerCase().trim();
  const results: SearchResult[] = [];

  for (const subjectData of subjects) {
    for (const chapter of subjectData.chapters) {
      if (chapter.formulas) {
        for (const formula of chapter.formulas) {
          const nameMatch = formula.name.toLowerCase().includes(lowerQuery);
          const tagsMatch = formula.tags?.some((tag: string) => tag.toLowerCase().includes(lowerQuery));
          const descMatch = formula.description?.toLowerCase().includes(lowerQuery);

          if (nameMatch || tagsMatch || descMatch) {
            results.push({
              formula,
              chapter,
              subjectName: subjectData.subject,
              className: chapter.class,
              examTypes: subjectData.audience || [],
            });
          }
        }
      }
    }
  }

  return results;
}
