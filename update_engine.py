import re

with open('src/hooks/useQuizEngine.ts', 'r') as f:
    engine = f.read()

# Update useQuizEngine to accept an optional array of selected chapter IDs
# and filter formulas accordingly.
engine = engine.replace(
    'export function useQuizEngine() {',
    'export function useQuizEngine(selectedChapterIds: string[] = []) {'
)

engine = engine.replace(
    'const [allFormulas] = useState<Formula[]>(getAllFormulas());',
    '''  const allFormulas = useMemo(() => {
    const formulas = getAllFormulas();
    if (selectedChapterIds.length === 0) return formulas;

    // We need chapter info to filter by ID.
    // getAllFormulas flattens them, let's just grab the formulas that match the chapter IDs.
    const filtered: Formula[] = [];
    allSubjects.forEach(subject => {
      subject.chapters.forEach(chapter => {
        if (selectedChapterIds.includes(chapter.id)) {
           filtered.push(...chapter.formulas);
        }
      });
    });
    return filtered.length > 0 ? filtered : formulas; // Fallback if none found
  }, [selectedChapterIds]);'''
)

engine = engine.replace(
    "import { useState, useCallback } from 'react';",
    "import { useMemo, useCallback } from 'react';"
)

with open('src/hooks/useQuizEngine.ts', 'w') as f:
    f.write(engine)
