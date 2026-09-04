import { useMemo, useCallback } from "react";
import { Formula, allSubjects } from "@/lib/formulas";

export type QuestionType =
  | "numerical_computation"
  | "formula_identification"
  | "proportionality"
  | "theory_concept";

export interface QuizOption {
  id: string;
  latex?: string;
  text?: string;
}

export interface QuizQuestion {
  id: string;
  type: QuestionType;
  text: string;
  formulaId: string;
  options: QuizOption[];
  correctOptionId: string;
  explanation: string;
  category?: string;
}

const getRandomItem = <T>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];
const shuffle = <T>(arr: T[]): T[] => [...arr].sort(() => Math.random() - 0.5);

export interface TheoryPoint {
  text: string;
  category: string;
}

type EnrichedFormula = Formula & {
  _meta?: {
    board: string;
    classLevel: string;
    subject: string;
    chapterName: string;
  };
};

const getAllTheoryPoints = (): TheoryPoint[] => {
  const points: TheoryPoint[] = [];
  allSubjects.forEach((subject) => {
    let board = "CBSE/State Board";
    if (subject.audience.includes("jee")) board = "JEE";
    else if (subject.audience.includes("neet")) board = "NEET";

    subject.chapters.forEach((chapter) => {
      if (chapter.keyPoints) {
        const category = `${board} • Class ${chapter.class || 'Unknown'} • ${subject.subject} • ${chapter.name || chapter.chapterName || "Unknown"}`;
        chapter.keyPoints.forEach(kp => {
          points.push({ text: kp, category });
        });
      }
    });
  });
  return points;
};

const getAllFormulas = (): EnrichedFormula[] => {
  const formulas: EnrichedFormula[] = [];
  allSubjects.forEach((subject) => {
    // Determine a display board/exam name from the audience array
    let board = "CBSE/State Board";
    if (subject.audience.includes("jee")) board = "JEE";
    else if (subject.audience.includes("neet")) board = "NEET";

    subject.chapters.forEach((chapter) => {
      const enrichedFormulas = chapter.formulas.map(f => ({
        ...f,
        _meta: {
          board,
          classLevel: `Class ${chapter.class || 'Unknown'}`,
          subject: subject.subject,
          chapterName: chapter.name || chapter.chapterName || "Unknown"
        }
      }));
      formulas.push(...enrichedFormulas);
    });
  });
  return formulas;
};

const extractVariables = (formula: Formula) => {
  // If variables are explicitly provided, use them
  if (formula.variables && formula.variables.length > 0)
    return formula.variables;

  const matches = formula.latex.match(/[a-zA-Z]/g);
  if (!matches) return [];

  const uniqueVars = Array.from(new Set(matches)).filter(
    (v) =>
      ![
        "f",
        "r",
        "a",
        "c",
        "s",
        "i",
        "n",
        "c",
        "o",
        "t",
        "e",
        "x",
        "p",
        "l",
        "o",
        "g",
      ].includes(v)
  );

  return uniqueVars.map((v) => ({ symbol: v, meaning: `Variable ${v}` }));
};

const evaluateSimpleFormula = (
  latex: string,
  values: Record<string, number>
): number | null => {
  try {
    let expression = latex.split("=")[1] || latex;
    // Handle nested fractions heuristically by doing a few passes
    for (let i=0; i<3; i++) {
        expression = expression.replace(/\\frac{([^{}]+)}{([^{}]+)}/g, "($1)/($2)");
    }
    expression = expression.replace(/\\cdot/g, "*");
    expression = expression.replace(/\\times/g, "*");
    expression = expression.replace(/([a-zA-Z])\^2/g, "($1*$1)");
    expression = expression.replace(/([a-zA-Z])\^3/g, "($1*$1*$1)");
    expression = expression.replace(/\\sqrt{([^}]+)}/g, "Math.sqrt($1)");
    expression = expression.replace(/\\pi/g, "Math.PI");
    // basic sine/cosine (assuming radians for simplicity of raw eval)
    expression = expression.replace(/\\sin\\theta/g, "0.5");
    expression = expression.replace(/\\cos\\theta/g, "0.866");

    for (const [symbol, val] of Object.entries(values)) {
      const regex = new RegExp(`(?<![a-zA-Z])${symbol}(?![a-zA-Z])`, "g");
      expression = expression.replace(regex, val.toString());
    }

    expression = expression.replace(/(\d+)([a-zA-Z])/g, "$1*$2");
    expression = expression.replace(/\)(\()/g, ")*(");
    expression = expression.replace(/(\d+)\(/g, "$1*(");

    if (!/^[0-9+\-*/().\s]+$/.test(expression)) {
      return null;
    }

    const result = new Function(`return ${expression}`)();
    return Number.isFinite(result) ? result : null;
  } catch {
    return null;
  }
};

const generateNumericalComputation = (
  formula: EnrichedFormula
): QuizQuestion | null => {
  const variables = extractVariables(formula);
  if (variables.length === 0 || !formula.latex.includes("=")) return null;

  const targetVars = variables.slice(0, 3);
  const values: Record<string, number> = {};
  const promptParts = [];

  for (const v of targetVars) {
    const val = Math.floor(Math.random() * 20) + 1;
    values[v.symbol] = val;
    promptParts.push(`${v.meaning || v.symbol} = ${val}`);
  }

  const correctAns = evaluateSimpleFormula(formula.latex, values);
  if (correctAns === null || isNaN(correctAns)) return null;

  const text = `Calculate ${formula.name}, given ${promptParts.join(", ")}.`;

  const options: QuizOption[] = [
    { id: "correct", text: correctAns.toFixed(2).replace(/\.00$/, "") },
  ];

  const distractorFunctions = [
    (ans: number) => ans * 10,
    (ans: number) => ans / 10,
    (ans: number) => ans * 2,
    (ans: number) => ans / 2,
    (ans: number) => ans + Math.floor(Math.random() * 10) + 1,
    (ans: number) => ans - (Math.floor(Math.random() * 10) + 1),
  ];

  const usedAnswers = new Set([options[0].text]);
  const shuffledFuncs = shuffle(distractorFunctions);

  for (const func of shuffledFuncs) {
    if (options.length >= 4) break;
    const wrongAns = func(correctAns);
    const wrongText = wrongAns.toFixed(2).replace(/\.00$/, "");
    if (!usedAnswers.has(wrongText) && wrongAns > 0) {
      usedAnswers.add(wrongText);
      options.push({ id: `distractor_${options.length}`, text: wrongText });
    }
  }

  return {
    id: `num_${formula.id}_${Date.now()}`,
    type: "numerical_computation",
    text,
    formulaId: formula.id,
    options: shuffle(options),
    correctOptionId: "correct",
    explanation: `Using the formula $${formula.latex}$, substitute the given values to calculate the result.`,
    category: formula._meta ? `${formula._meta.board} • ${formula._meta.classLevel} • ${formula._meta.subject} • ${formula._meta.chapterName}` : (formula.chapter || formula.topic || "General"),
  };
};

const generateFormulaIdentification = (
  formula: EnrichedFormula,
  allFormulas: EnrichedFormula[]
): QuizQuestion => {
  const targetVar = formula.name;
  const text = `Which formula correctly represents ${targetVar}?`;

  const similarFormulas = allFormulas.filter(
    (f) => f.id !== formula.id && f.latex !== formula.latex
  );
  let distractors = shuffle(similarFormulas).slice(0, 3);

  if (distractors.length < 3) {
    distractors = shuffle(allFormulas.filter((f) => f.id !== formula.id)).slice(0, 3);
  }

  const options: QuizOption[] = [
    { id: "correct", latex: formula.latex },
    ...distractors.map((d, i) => ({ id: `distractor_${i}`, latex: d.latex })),
  ];

  return {
    id: `ident_${formula.id}_${Date.now()}`,
    type: "formula_identification",
    text,
    formulaId: formula.id,
    options: shuffle(options),
    correctOptionId: "correct",
    explanation: `The correct formula for ${targetVar} is $${formula.latex}$.`,
    category: formula._meta ? `${formula._meta.board} • ${formula._meta.classLevel} • ${formula._meta.subject} • ${formula._meta.chapterName}` : (formula.chapter || formula.topic || "General"),
  };
};

const stripTheoryPrefix = (text: string) => text.includes(': ') ? text.split(': ').slice(1).join(': ').trim() : text;

const generateTheoryQuestion = (
  point: TheoryPoint,
  allPoints: TheoryPoint[]
): QuizQuestion | null => {
  if (!point || allPoints.length < 4) return null;

  const text = `Which of the following is a key concept regarding ${point.category.split(' • ').pop()}?`;

  // Filter distractors to be from the same subject if possible, or at least not totally random from all
  const subjectCategory = point.category.split(' • ')[2]; // Board • Class • Subject • Chapter
  let similarPoints = allPoints.filter(p => p.text !== point.text && p.category.includes(subjectCategory || ""));

  // fallback if not enough
  if (similarPoints.length < 3) {
      similarPoints = allPoints.filter(p => p.text !== point.text);
  }

  const distractors = shuffle(similarPoints).slice(0, 3);

  const options: QuizOption[] = [
    { id: "correct", text: stripTheoryPrefix(point.text) },
    ...distractors.map((d, i) => ({ id: `distractor_${i}`, text: stripTheoryPrefix(d.text) })),
  ];

  return {
    id: `theory_${Date.now()}_${Math.random().toString(36).substring(7)}`,
    type: "theory_concept",
    text,
    formulaId: "theory", // Not tied to a specific formula
    options: shuffle(options),
    correctOptionId: "correct",
    explanation: `This is a fundamental concept from ${point.category}.`,
    category: point.category,
  };
};

const generateProportionality = (formula: EnrichedFormula): QuizQuestion | null => {
  const variables = extractVariables(formula);
  if (variables.length === 0) return null;

  const targetVar = formula.name;
  // Ensure the chosen variable is actually present in the latex string
  const validVariables = variables.filter(v => formula.latex.includes(v.symbol));
  if (validVariables.length === 0) return null;
  const inputVar = getRandomItem(validVariables);

  let effect = "doubled";

  // A more robust check for whether a variable is in the denominator.
  // E.g., \frac{a}{b} -> b is in denominator.
  const fracMatches = [...formula.latex.matchAll(/\\frac\{([^}]*)\}/g)];
  let inDenominator = false;
  // This is a naive regex matching for rac{...}{...} but let's just do a simpler split approach carefully
  // If the string contains rac, check the blocks.

  const latex = formula.latex;

  // Check if it's explicitly in a denominator (like after a division slash or in the second brace of a frac)
  if (latex.includes('/' + inputVar.symbol) || latex.includes('/ ' + inputVar.symbol)) {
     inDenominator = true;
  }

  const fracParts = latex.split("\\frac{");
  for (let i = 1; i < fracParts.length; i++) {
     const part = fracParts[i];
     // Part looks like "num}{den}..."
     const braceSplit = part.split("}{");
     if (braceSplit.length > 1) {
         const denAndRest = braceSplit[1];
         // The denominator is everything up to the next closing brace
         const den = denAndRest.split("}")[0];
         if (den.includes(inputVar.symbol)) {
             inDenominator = true;
         }
     }
  }

  const isSquared = latex.includes(inputVar.symbol + "^2");
  const isCubed = latex.includes(inputVar.symbol + "^3");
  const isSqrt = latex.includes("\\sqrt{" + inputVar.symbol + "}") || latex.includes("\\sqrt {") && latex.includes(inputVar.symbol);

  if (inDenominator) {
     if (isSquared) effect = "quartered";
     else if (isCubed) effect = "decreased by a factor of 8";
     else if (isSqrt) effect = "decreased by a factor of √2";
     else effect = "halved";
  } else {
     if (isSquared) effect = "quadrupled";
     else if (isCubed) effect = "increased by a factor of 8";
     else if (isSqrt) effect = "increased by a factor of √2";
  }

  const text = `In the formula for ${targetVar}, if ${inputVar.meaning || inputVar.symbol} is doubled (assuming other variables are constant), what happens to the result?`;

  const allEffects = [
    "doubled",
    "halved",
    "quadrupled",
    "quartered",
    "remains unchanged",
    "increased by a factor of 8",
    "decreased by a factor of 8",
    "increased by a factor of √2",
    "decreased by a factor of √2",
  ];
  const wrongEffects = allEffects.filter((e) => e !== effect);
  const distractors = shuffle(wrongEffects).slice(0, 3);

  const options: QuizOption[] = [
    { id: "correct", text: `It is ${effect}` },
    ...distractors.map((d, i) => ({
      id: `distractor_${i}`,
      text: `It is ${d}`,
    })),
  ];

  return {
    id: `prop_${formula.id}_${Date.now()}`,
    type: "proportionality",
    text,
    formulaId: formula.id,
    options: shuffle(options),
    correctOptionId: "correct",
    explanation: `Looking at the formula $${formula.latex}$, observe the relationship between ${targetVar} and ${inputVar.symbol}.`,
    category: formula._meta ? `${formula._meta.board} • ${formula._meta.classLevel} • ${formula._meta.subject} • ${formula._meta.chapterName}` : (formula.chapter || formula.topic || "General"),
  };
};

export function useQuizEngine(selectedChapterIds: string[] = []) {
  const allTheoryPoints = useMemo(() => {
    const points = getAllTheoryPoints();
    if (selectedChapterIds.length === 0) return points;

    const filtered: TheoryPoint[] = [];
    allSubjects.forEach((subject) => {
      let board = "CBSE/State Board";
      if (subject.audience.includes("jee")) board = "JEE";
      else if (subject.audience.includes("neet")) board = "NEET";

      subject.chapters.forEach((chapter) => {
        if (selectedChapterIds.includes(chapter.id) && chapter.keyPoints) {
          const category = `${board} • Class ${chapter.class || 'Unknown'} • ${subject.subject} • ${chapter.name || chapter.chapterName || "Unknown"}`;
          chapter.keyPoints.forEach(kp => {
            filtered.push({ text: kp, category });
          });
        }
      });
    });
    return filtered.length > 0 ? filtered : points;
  }, [selectedChapterIds]);
  const allFormulas = useMemo(() => {
    const formulas = getAllFormulas();
    if (selectedChapterIds.length === 0) return formulas;

    const filtered: EnrichedFormula[] = [];
    allSubjects.forEach((subject) => {
      subject.chapters.forEach((chapter) => {
        if (selectedChapterIds.includes(chapter.id)) {
          let board = "CBSE/State Board";
          if (subject.audience.includes("jee")) board = "JEE";
          else if (subject.audience.includes("neet")) board = "NEET";

          filtered.push(...chapter.formulas.map(f => ({
            ...f,
            _meta: {
              board,
              classLevel: `Class ${chapter.class || 'Unknown'}`,
              subject: subject.subject,
              chapterName: chapter.name || chapter.chapterName || "Unknown"
            }
          })));
        }
      });
    });
    return filtered.length > 0 ? filtered : formulas;
  }, [selectedChapterIds]);

  const generateQuestion = useCallback((): QuizQuestion => {
    let question: QuizQuestion | null = null;
    let attempts = 0;

    while (!question && attempts < 20) {
      attempts++;
      const formula = getRandomItem(allFormulas);
      if (!formula) continue;

      const typeNum = Math.random();
      if (typeNum < 0.25) {
        question = generateNumericalComputation(formula);
      } else if (typeNum < 0.5) {
        question = generateProportionality(formula);
      } else if (typeNum < 0.75) {
        const point = getRandomItem(allTheoryPoints);
        if (point) {
           question = generateTheoryQuestion(point, allTheoryPoints);
        }
      } else {
        question = generateFormulaIdentification(formula, allFormulas);
      }

      // Fallback if the specific type generation failed
      if (!question) {
         question = generateFormulaIdentification(formula, allFormulas);
      }
    }

    if (!question) {
      const formula = allFormulas[0];
      question = generateFormulaIdentification(formula, allFormulas);
    }

    return question;
  }, [allFormulas]);

  const generateQuiz = useCallback(
    (count: number = 10): QuizQuestion[] => {
      return Array.from({ length: count }, () => generateQuestion());
    },
    [generateQuestion]
  );

  return {
    generateQuestion,
    generateQuiz,
  };
}
