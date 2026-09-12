
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router";
import { useQuizEngine, QuizQuestion } from "@/hooks/useQuizEngine";
import katex from "katex";
import "katex/dist/katex.min.css";

export default function ActiveQuiz() {
  const navigate = useNavigate();
  const [selectedChapters, setSelectedChapters] = useState<string[]>([]);
  const [count, setCount] = useState(5);

  useEffect(() => {
    try {
      const chaps = JSON.parse(sessionStorage.getItem("quiz-chapters") || "[]");
      setSelectedChapters(chaps);
      setCount(parseInt(sessionStorage.getItem("quiz-count") || "5", 10));
    } catch {}
  }, []);

  const { generateQuiz } = useQuizEngine(selectedChapters);

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [quizState, setQuizState] = useState<"active" | "completed">("active");

  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    if (questions.length === 0 && selectedChapters.length > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setQuestions(generateQuiz(count));
    }
  }, [selectedChapters, count, generateQuiz, questions.length]);

  useEffect(() => {
    if (quizState === "completed") {
      let correctCount = 0;
      for (let i = 0; i < questions.length; i++) {
        if (userAnswers[i] === questions[i].correctOptionId) {
          correctCount++;
        }
      }
      sessionStorage.setItem("quiz-score", correctCount.toString());
      sessionStorage.setItem("quiz-total", questions.length.toString());
      navigate("/quiz/results");
    }
  }, [quizState, navigate, questions, userAnswers]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelectedOptionId(userAnswers[currentQuestionIndex] || null);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShowExplanation(!!userAnswers[currentQuestionIndex]);
  }, [currentQuestionIndex, userAnswers]);

  const currentQuestion = questions[currentQuestionIndex];

  if (!currentQuestion || quizState === "completed") {
    return null;
  }

  const handleOptionSelect = (optionId: string) => {
    if (showExplanation) return;
    setSelectedOptionId(optionId);
    setShowExplanation(true);
    setUserAnswers(prev => ({ ...prev, [currentQuestionIndex]: optionId }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setQuizState("completed");
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const renderMath = (latex: string) => {
    try {
      return (
        <span
          dangerouslySetInnerHTML={{
            __html: katex.renderToString(latex, {
              displayMode: false,
              throwOnError: false,
            }),
          }}
        />
      );
    } catch {
      return <span>Error rendering formula</span>;
    }
  };

  const renderTextWithMath = (text: string) => {
    try {
      const parts = text.split(/(\$.*?\$)/g);
      return parts.map((part, i) => {
        if (part.startsWith("$") && part.endsWith("$")) {
          return <span key={i}>{renderMath(part.slice(1, -1))}</span>;
        }
        return <span key={i}>{part}</span>;
      });
    } catch {
      return text;
    }
  };

  const isAnswered = !!userAnswers[currentQuestionIndex];

  const alphabet = ["A", "B", "C", "D"];

  return (
    <div className="min-h-screen flex flex-col relative bg-[#537594]">
      {/* Backgrounds */}
      <div aria-hidden="true" className="zen-gradient-bg"></div>
      <div aria-hidden="true" className="zen-overlay-fog"></div>

      {/* Top Navigation */}
      <header className="w-full max-w-7xl mx-auto px-6 pt-5 pb-3 flex items-center justify-between z-10 relative">
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate("/")}>
          <img src="/assets/logo-new.png" alt="AskFormula" className="h-6 sm:h-7 opacity-80 mix-blend-overlay hover:opacity-100 hover:mix-blend-normal transition-all" />
        </div>
      </header>

      {/* Main Content Wrapper */}
      <main className="flex-1 max-w-[1360px] w-full mx-auto px-4 sm:px-6 pt-3 pb-8 z-10 flex items-center justify-center">
        <section className="w-full max-w-5xl mx-auto rounded-3xl bg-[rgba(12,18,30,0.85)] backdrop-blur-xl border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.48),0_10px_30px_rgba(10,16,26,0.35)] flex flex-col overflow-hidden text-slate-200">
          <header className="px-6 py-4 sm:px-8 sm:py-5 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/[0.02]">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-emerald-300 text-xs tracking-wide shrink-0">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="font-medium hidden sm:inline">Zen Drill · Focus Mode</span>
                <span className="font-medium sm:hidden">Focus Mode</span>
              </div>
              <span className="text-white/20 hidden sm:inline">|</span>
              <span className="text-xs text-[#9bb8cf] tracking-wider uppercase font-medium truncate">
                Mixed Drill
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs justify-between sm:justify-start w-full sm:w-auto">
              <div className="flex items-center gap-1.5 font-mono text-slate-400">
                <span className="text-white font-medium text-sm">{(currentQuestionIndex + 1).toString().padStart(2, '0')}</span>
                <span className="text-slate-600">/</span>
                <span>{questions.length.toString().padStart(2, '0')}</span>
              </div>
            </div>
          </header>

          <div className="p-6 sm:p-8 md:p-10 flex flex-col gap-8 flex-1 justify-between">
            <div className="space-y-4">
              <div className="text-xs font-mono tracking-widest text-[#a2d4f8] uppercase font-medium">Concept Drill</div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-sans text-white leading-relaxed tracking-tight break-words">
                {renderTextWithMath(currentQuestion.text)}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentQuestion.options.map((opt, idx) => {
                const isSelected = selectedOptionId === opt.id;
                const isOptionCorrect = opt.id === currentQuestion.correctOptionId;

                let containerClass = "group p-5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ";
                let letterClass = "w-8 h-8 rounded-xl flex items-center justify-center text-xs font-semibold shrink-0 ";
                let textClass = "font-serif text-[15px] sm:text-base md:text-lg overflow-hidden break-words ";

                if (isAnswered) {
                  if (isSelected && isOptionCorrect) {
                    containerClass += "border-emerald-400/80 bg-emerald-500/10 shadow-[0_0_15px_rgba(52,211,153,0.15)] ring-1 ring-emerald-400/40 pointer-events-none";
                    letterClass += "bg-emerald-400 text-emerald-950 shadow-sm shadow-emerald-400/50";
                    textClass += "text-white font-medium";
                  } else if (isSelected && !isOptionCorrect) {
                    containerClass += "border-rose-400/80 bg-rose-500/10 shadow-[0_0_15px_rgba(251,113,133,0.15)] ring-1 ring-rose-400/40 pointer-events-none";
                    letterClass += "bg-rose-400 text-rose-950 shadow-sm shadow-rose-400/50";
                    textClass += "text-white font-medium line-through decoration-rose-500/50 opacity-70";
                  } else if (isOptionCorrect) {
                    containerClass += "border-emerald-400/50 bg-white/[0.02] pointer-events-none";
                    letterClass += "bg-emerald-400/20 text-emerald-300 border border-emerald-400/30";
                    textClass += "text-emerald-300";
                  } else {
                    containerClass += "border-white/5 bg-white/[0.01] opacity-50 pointer-events-none";
                    letterClass += "bg-white/5 border border-white/5 text-white/30";
                    textClass += "text-white/40";
                  }
                } else {
                  containerClass += "border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/20";
                  letterClass += "bg-white/10 border border-white/10 text-slate-300 group-hover:text-white";
                  textClass += "text-slate-200 group-hover:text-white";
                }

                return (
                  <div
                    key={opt.id}
                    onClick={() => handleOptionSelect(opt.id)}
                    className={containerClass}
                  >
                    <div className="flex items-center gap-4 min-w-0 flex-1">
                      <span className={letterClass}>{alphabet[idx]}</span>
                      <span className={textClass}>
                        {renderTextWithMath(opt.text || "")}
                      </span>
                    </div>
                    {isAnswered && isSelected && isOptionCorrect && (
                      <div className="w-5 h-5 rounded-full bg-emerald-400 flex items-center justify-center text-emerald-950 shrink-0 ml-2">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                      </div>
                    )}
                    {isAnswered && isSelected && !isOptionCorrect && (
                      <div className="w-5 h-5 rounded-full bg-rose-400 flex items-center justify-center text-rose-950 shrink-0 ml-2">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {showExplanation && currentQuestion.explanation && (
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-start gap-3 text-sm text-slate-300 mt-2">
                <svg className="w-5 h-5 text-[#a2d4f8] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}></path></svg>
                <div className="leading-relaxed">
                  <strong className="text-white font-medium mr-2">Insight:</strong>
                  {renderTextWithMath(currentQuestion.explanation)}
                </div>
              </div>
            )}

            <footer className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-start">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10">
                  {questions.map((q, i) => {
                    let dotClass = "w-2 h-2 rounded-full transition-colors ";
                    if (i === currentQuestionIndex) {
                      dotClass += "w-4 bg-[#a2d4f8] shadow-[0_0_10px_rgba(162,212,248,0.5)]";
                    } else if (userAnswers[i]) {
                      const ansId = userAnswers[i];
                      if (ansId === q.correctOptionId) {
                        dotClass += "bg-emerald-400";
                      } else {
                        dotClass += "bg-rose-400";
                      }
                    } else {
                      dotClass += "bg-white/20";
                    }
                    return <span key={q.id} className={dotClass}></span>;
                  })}
                </div>
                <button
                  onClick={handlePrevious}
                  disabled={currentQuestionIndex === 0}
                  className="text-xs font-medium text-slate-400 hover:text-white transition-colors px-3 py-1.5 rounded-full hover:bg-white/5 disabled:opacity-30 disabled:pointer-events-none"
                  type="button"
                >
                  Previous
                </button>
              </div>

              <div className="flex items-center justify-end w-full sm:w-auto">
                <button
                  onClick={handleNext}
                  disabled={!isAnswered}
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-100 disabled:bg-white/10 disabled:text-white/40 disabled:hover:scale-100 disabled:shadow-none text-[#0c121e] text-sm font-semibold px-8 py-3 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-[1.02] transition-all w-full sm:w-auto"
                  type="button"
                >
                  <span>{currentQuestionIndex === questions.length - 1 ? "Finish Drill" : "Next Question"}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}></path></svg>
                </button>
              </div>
            </footer>
          </div>
        </section>
      </main>
    </div>
  );
}
