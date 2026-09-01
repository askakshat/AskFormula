import React from "react";
import { useLocation, useNavigate } from "react-router";
import {
  CheckCircle,
  XCircle,
  TrendingUp,
  Target,
  RotateCcw,
  LayoutDashboard,
  Search,
} from "lucide-react";
import katex from "katex";
import { QuizQuestion } from "@/hooks/useQuizEngine";

export default function QuizResults() {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve state passed from ActiveQuiz
  const {
    score = 0,
    total = 0,
    questions = [],
    userAnswers = {},
  } = (location.state || {}) as {
    score: number;
    total: number;
    questions: QuizQuestion[];
    userAnswers: Record<string, string | null>;
  };

  if (total === 0) {
    // Fallback if accessed directly without state
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-white mb-4">No Quiz Data Found</h2>
          <button
            onClick={() => navigate("/quiz")}
            className="bg-[#61dcb0] text-[#003122] px-6 py-2 rounded"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const percentage = Math.round((score / total) * 100);

  // Calculate stroke dashoffset for the circular progress (circumference is roughly 282.7 for r=45)
  const dashOffset = 282.7 - 282.7 * (percentage / 100);

  const renderMath = (latex: string) => {
    try {
      return katex.renderToString(latex, {
        throwOnError: false,
        displayMode: false,
      });
    } catch {
      return `<code class="text-sm font-mono">${latex}</code>`;
    }
  };

  return (
    <div className="min-h-screen bg-[#11131a] text-[#e3e2e6] selection:bg-[#324565] selection:text-[#d8e2ff] antialiased">
      <main className="flex-grow w-full max-w-[1200px] mx-auto px-4 md:px-8 py-10 flex flex-col md:flex-row gap-8">
        {/* Left Column: Summary & Stats */}
        <div className="w-full md:w-1/3 flex flex-col gap-4">
          {/* Final Score Card */}
          <div className="bg-[#1c1e26] rounded-xl p-8 border border-[#272a31] flex flex-col items-center justify-center text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#324565]/10 to-transparent pointer-events-none"></div>

            <h1 className="text-2xl font-bold text-[#d8e2ff] mb-2 relative z-10">
              Quiz Results
            </h1>
            <p className="text-sm text-slate-400 mb-6 relative z-10">
              Practice Session
            </p>

            <div className="relative w-48 h-48 flex items-center justify-center mb-6 z-10">
              <svg
                className="w-full h-full transform -rotate-90"
                viewBox="0 0 100 100"
              >
                <circle
                  cx="50"
                  cy="50"
                  fill="none"
                  r="45"
                  stroke="#272a31"
                  strokeWidth="8"
                ></circle>
                <circle
                  className="transition-all duration-1000 ease-out"
                  cx="50"
                  cy="50"
                  fill="none"
                  r="45"
                  stroke={
                    percentage >= 70
                      ? "#61dcb0"
                      : percentage >= 40
                        ? "#facc15"
                        : "#ef4444"
                  }
                  strokeDasharray="282.7"
                  strokeDashoffset={dashOffset}
                  strokeWidth="8"
                ></circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-white">
                  {percentage}%
                </span>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider mt-1">
                  Score
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-[#61dcb0] relative z-10">
              <TrendingUp className="w-4 h-4" />
              <span>
                {score} / {total} Correct
              </span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#1c1e26] rounded-xl p-4 border border-[#272a31] flex flex-col">
              <div className="flex items-center gap-2 text-slate-400 mb-2">
                <Target className="w-4 h-4" />
                <span className="text-xs font-medium uppercase tracking-wider">
                  Accuracy
                </span>
              </div>
              <span className="text-xl font-bold text-white">
                {percentage}%
              </span>
            </div>
            <div className="bg-[#1c1e26] rounded-xl p-4 border border-[#272a31] flex flex-col">
              <div className="flex items-center gap-2 text-slate-400 mb-2">
                <Search className="w-4 h-4" />
                <span className="text-xs font-medium uppercase tracking-wider">
                  Attempted
                </span>
              </div>
              <span className="text-xl font-bold text-white">
                {Object.keys(userAnswers).length} / {total}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 mt-4">
            <button
              onClick={() => navigate("/quiz/active")}
              className="w-full bg-[#d8e2ff] text-[#003122] font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-white transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Retry / New Quiz
            </button>
            <button
              onClick={() => navigate("/quiz")}
              className="w-full bg-transparent border border-[#272a31] text-slate-300 font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-[#1c1e26] hover:text-white transition-colors"
            >
              <LayoutDashboard className="w-4 h-4" />
              Return to Dashboard
            </button>
          </div>
        </div>

        {/* Right Column: Question Review */}
        <div className="w-full md:w-2/3 flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
            Detailed Review
            <span className="bg-[#272a31] text-slate-300 text-xs px-2 py-1 rounded">
              {total} Questions
            </span>
          </h2>

          <div className="flex flex-col gap-4">
            {questions.map((q, index) => {
              const userAnswerId = userAnswers[q.id];
              const isCorrect = userAnswerId === q.correctOptionId;
              const correctOption = q.options.find(
                (o) => o.id === q.correctOptionId,
              );
              const userOption = q.options.find((o) => o.id === userAnswerId);

              return (
                <div
                  key={q.id}
                  className="bg-[#1c1e26] rounded-xl border border-[#272a31] overflow-hidden"
                >
                  <div className="p-5 border-b border-[#272a31]/50 bg-[#15171e]">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          {isCorrect ? (
                            <CheckCircle className="w-5 h-5 text-[#15a47c]" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-500" />
                          )}
                        </div>
                        <div>
                          <div className="text-xs text-slate-500 font-mono mb-1">
                            Question {index + 1}
                          </div>
                          <h3 className="text-base text-slate-200 font-medium">
                            {q.text}
                          </h3>
                        </div>
                      </div>
                      <div className="text-[10px] uppercase tracking-wider text-slate-500 bg-[#272a31] px-2 py-1 rounded whitespace-nowrap">
                        {q.type.replace("_", " ")}
                      </div>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* User Answer */}
                      <div
                        className={`p-3 rounded border ${isCorrect ? "bg-[#15a47c]/10 border-[#15a47c]/30" : "bg-red-500/10 border-red-500/30"}`}
                      >
                        <div className="text-[10px] uppercase text-slate-500 mb-2 font-semibold">
                          Your Answer
                        </div>
                        {userOption ? (
                          userOption.latex ? (
                            <div
                              className="text-sm"
                              dangerouslySetInnerHTML={{
                                __html: renderMath(userOption.latex),
                              }}
                            />
                          ) : (
                            <div className="text-sm text-slate-300">
                              {userOption.text}
                            </div>
                          )
                        ) : (
                          <div className="text-sm text-slate-500 italic">
                            Not answered
                          </div>
                        )}
                      </div>

                      {/* Correct Answer */}
                      {!isCorrect && (
                        <div className="p-3 rounded border bg-[#2d4677]/20 border-[#61dcb0]/30">
                          <div className="text-[10px] uppercase text-[#61dcb0] mb-2 font-semibold">
                            Correct Answer
                          </div>
                          {correctOption?.latex ? (
                            <div
                              className="text-sm"
                              dangerouslySetInnerHTML={{
                                __html: renderMath(correctOption.latex),
                              }}
                            />
                          ) : (
                            <div className="text-sm text-slate-300">
                              {correctOption?.text}
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="mt-2 text-sm text-slate-400 bg-[#11131a] p-3 rounded flex gap-2 items-start border border-[#272a31]">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0"></div>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: q.explanation.replace(
                            /\$(.*?)\$/g,
                            (m, tex) => {
                              try {
                                return katex.renderToString(tex, {
                                  throwOnError: false,
                                });
                              } catch {
                                return m;
                              }
                            },
                          ),
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
