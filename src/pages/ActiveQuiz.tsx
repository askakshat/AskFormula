import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useQuizEngine, QuizQuestion } from "@/hooks/useQuizEngine";
import { useLocalStorage } from "@/lib/local-storage";
import QuizCard from "@/components/askformula/QuizCard";

export default function ActiveQuiz() {
  const navigate = useNavigate();
  const [selectedChapters] = useLocalStorage<string[]>(
    "askformula-quiz-chapters",
    [],
  );
  const { generateQuiz } = useQuizEngine(selectedChapters);

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string | null>>(
    {},
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  console.log(userAnswers, setUserAnswers); // temporary hack, should be used properly in the active quiz
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Generate 10 questions on mount
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setQuestions(generateQuiz(10));
  }, [generateQuiz]);

  const currentQuestion = questions[currentIndex];

  const handleSelect = (id: string) => {
    if (showFeedback) return;
    if (id === "submit" && selectedOptionId) {
      setShowFeedback(true);
      if (selectedOptionId === currentQuestion.correctOptionId) {
        setScore((prev) => prev + 1);
      }
    } else {
      setSelectedOptionId(id);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOptionId(null);
      setShowFeedback(false);
    } else {
      setIsFinished(true);
    }
  };

  const exitQuiz = () => {
    navigate("/dashboard"); // or wherever dashboard is
  };

  if (isFinished) {
    // Basic results view, can be expanded to a full route later
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-slate-200 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-lg bg-[#11131a] rounded-xl border border-slate-800 p-8 text-center shadow-2xl">
          <h1 className="text-3xl font-bold text-white mb-2">Quiz Complete!</h1>
          <p className="text-slate-400 mb-8">
            You answered {score} out of {questions.length} correctly.
          </p>
          <div className="text-6xl font-bold text-[#61dcb0] mb-8">
            {Math.round((score / questions.length) * 100)}%
          </div>
          <button
            onClick={exitQuiz}
            className="bg-[#d8e2ff] text-[#003122] font-semibold px-6 py-3 rounded-lg hover:bg-white w-full"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-slate-200 font-sans flex flex-col">
      {/* Header */}
      <header className="w-full max-w-[1200px] mx-auto p-4 md:p-8 flex justify-between items-center z-10 relative">
        <button
          onClick={exitQuiz}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors px-3 py-1.5 rounded border border-slate-800 hover:bg-slate-800/50 text-sm"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          Exit Practice
        </button>
        <div className="flex items-center gap-3 text-slate-400">
          <span className="text-sm font-medium">
            Question {currentIndex + 1} of {questions.length}
          </span>
          <div className="w-32 h-2 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#61dcb0]"
              style={{ width: `${(currentIndex / questions.length) * 100}%` }}
            />
          </div>
        </div>
      </header>

      {/* Main Canvas */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 w-full max-w-[1200px] mx-auto z-10 relative mb-20">
        <QuizCard
          question={currentQuestion}
          selectedOptionId={selectedOptionId}
          onSelectOption={handleSelect}
          showFeedback={showFeedback}
          onNext={handleNext}
        />
      </main>

      {/* Background decoration */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/40 via-[#0a0a0a] to-[#0a0a0a]"></div>
    </div>
  );
}
