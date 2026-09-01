import { useMemo, useCallback } from "react";
import { Formula, allSubjects } from "@/lib/formulas";

export type QuestionType =
  | "numerical_computation"
  | "formula_identification"
  | "proportionality";

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

// Get all formulas across all subjects
const getAllFormulas = (): Formula[] => {
  const formulas: Formula[] = [];
  allSubjects.forEach((subject) => {
    subject.chapters.forEach((chapter) => {
      formulas.push(...chapter.formulas);
    });
  });
  return formulas;
};

const extractVariables = (formula: Formula) => {
  if (formula.variables && formula.variables.length > 0)
    return formula.variables;

  // basic regex fallback if variables are missing
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
      ].includes(v),
  );

  return uniqueVars.map((v) => ({ symbol: v, meaning: `Variable ${v}` }));
};

const evaluateSimpleFormula = (
  latex: string,
  values: Record<string, number>,
): number | null => {
  try {
    let expression = latex.split("=")[1] || latex; // get right side of equation
    // extremely basic text substitution - this is brittle but satisfies the zero-compute client constraint for simple formulas
    expression = expression.replace(/\\frac{([^}]+)}{([^}]+)}/g, "($1)/($2)");
    expression = expression.replace(/\\cdot/g, "*");
    expression = expression.replace(/\\times/g, "*");
    expression = expression.replace(/([a-zA-Z])\^2/g, "($1*$1)");

    // substitute values
    for (const [symbol, val] of Object.entries(values)) {
      const regex = new RegExp(`(?<![a-zA-Z])${symbol}(?![a-zA-Z])`, "g");
      expression = expression.replace(regex, val.toString());
    }

    // clean up remaining spaces and implicit multiplication (e.g. 5(4) -> 5*4)
    expression = expression.replace(/(\d+)([a-zA-Z])/g, "$1*$2");
    expression = expression.replace(/\)(\()/g, ")*(");
    expression = expression.replace(/(\d+)\(/g, "$1*(");

    // check if expression only contains valid math characters
    if (!/^[0-9+\-*/().\s]+$/.test(expression)) {
      return null;
    }

    const result = eval(expression);
    return Number.isFinite(result) ? result : null;
  } catch {
    return null;
  }
};

const generateNumericalComputation = (
  formula: Formula,
): QuizQuestion | null => {
  const variables = extractVariables(formula);
  if (variables.length === 0 || !formula.latex.includes("=")) return null;

  // Pick 1-3 variables to assign values to
  const targetVars = variables.slice(0, 3);
  const values: Record<string, number> = {};
  const promptParts = [];

  for (const v of targetVars) {
    // Standard range 1-20
    const val = Math.floor(Math.random() * 20) + 1;
    values[v.symbol] = val;
    promptParts.push(`${v.meaning || v.symbol} = ${val}`);
  }

  const correctAns = evaluateSimpleFormula(formula.latex, values);

  if (correctAns === null || isNaN(correctAns)) return null; // Parse failed, skip

  const text = `Calculate ${formula.name}, given ${promptParts.join(", ")}.`;

  // Generate distractors
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
    explanation: `Using the formula $${formula.latex}$, we substitute the given values to get the result.`,
    category: formula.chapter || formula.topic || "General",
  };
};

const generateFormulaIdentification = (
  formula: Formula,
  allFormulas: Formula[],
): QuizQuestion => {
  const targetVar = formula.name;
  const text = `Which formula correctly identifies ${targetVar}?`;

  // Find distractors
  const similarFormulas = allFormulas.filter(
    (f) => f.id !== formula.id && f.latex !== formula.latex,
  );
  let distractors = shuffle(similarFormulas).slice(0, 3);

  if (distractors.length < 3) {
    distractors = shuffle(allFormulas.filter((f) => f.id !== formula.id)).slice(
      0,
      3,
    );
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
    category: formula.chapter || formula.topic || "General",
  };
};

const generateProportionality = (formula: Formula): QuizQuestion | null => {
  const variables = extractVariables(formula);
  if (variables.length === 0) return null;

  const targetVar = formula.name;
  const inputVar = getRandomItem(variables);

  let effect = "doubled";

  if (formula.latex.includes(`${inputVar.symbol}^2`)) {
    effect = "quadrupled";
  } else if (formula.latex.includes(`${inputVar.symbol}^3`)) {
    effect = "increased by a factor of 8";
  } else if (
    formula.latex.includes(`\\frac{1}{${inputVar.symbol}}`) ||
    formula.latex.includes(`\\frac{`)
  ) {
    // extremely rough heuristic for inverse
    if (formula.latex.split("\\frac{")[1]?.includes(inputVar.symbol)) {
      effect = "halved";
    }
  } else if (formula.latex.includes(`\\sqrt{${inputVar.symbol}}`)) {
    effect = "increased by a factor of √2";
  }

  const text = `In the formula for ${targetVar}, if ${inputVar.meaning || inputVar.symbol} is doubled (assuming other variables are constant), what happens to the result?`;

  const allEffects = [
    "doubled",
    "halved",
    "quadrupled",
    "quartered",
    "remains unchanged",
    "increased by a factor of 8",
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
    explanation: `Looking at the formula $${formula.latex}$, we can observe the relationship between ${targetVar} and ${inputVar.symbol}.`,
    category: formula.chapter || formula.topic || "General",
  };
};

export function useQuizEngine(selectedChapterIds: string[] = []) {
  const allFormulas = useMemo(() => {
    const formulas = getAllFormulas();
    if (selectedChapterIds.length === 0) return formulas;

    // We need chapter info to filter by ID.
    // getAllFormulas flattens them, let's just grab the formulas that match the chapter IDs.
    const filtered: Formula[] = [];
    allSubjects.forEach((subject) => {
      subject.chapters.forEach((chapter) => {
        if (selectedChapterIds.includes(chapter.id)) {
          filtered.push(...chapter.formulas);
        }
      });
    });
    return filtered.length > 0 ? filtered : formulas; // Fallback if none found
  }, [selectedChapterIds]);

  const generateQuestion = useCallback((): QuizQuestion => {
    let question: QuizQuestion | null = null;
    let attempts = 0;

    while (!question && attempts < 20) {
      attempts++;
      const formula = getRandomItem(allFormulas);
      if (!formula) continue;

      const typeNum = Math.random();
      if (typeNum < 0.3) {
        question = generateNumericalComputation(formula);
        if (!question)
          question = generateFormulaIdentification(formula, allFormulas);
      } else if (typeNum < 0.6) {
        question = generateProportionality(formula);
        if (!question)
          question = generateFormulaIdentification(formula, allFormulas);
      } else {
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
    [generateQuestion],
  );

  return {
    generateQuestion,
    generateQuiz,
  };
}
