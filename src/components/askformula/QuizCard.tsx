import React from "react";
import katex from "katex";
import { QuizQuestion } from "@/hooks/useQuizEngine";

interface QuizCardProps {
  question: QuizQuestion;
  selectedOptionId: string | null;
  onSelectOption: (id: string) => void;
  showFeedback: boolean;
  onNext: () => void;
}

export default function QuizCard({
  question,
  selectedOptionId,
  onSelectOption,
  showFeedback,
  onNext,
}: QuizCardProps) {
  const renderMath = (latex: string) => {
    try {
      return katex.renderToString(latex, {
        throwOnError: false,
        displayMode: true,
      });
    } catch {
      return `<code class="text-sm font-mono">${latex}</code>`;
    }
  };

  const isCorrect = selectedOptionId === question.correctOptionId;

  return (
    <div className="w-full max-w-2xl bg-[#11131a] rounded-xl border border-slate-800 p-6 md:p-8 flex flex-col gap-6 relative overflow-hidden shadow-2xl backdrop-blur-xl">
      {/* Category Tag */}
      <div className="flex items-center gap-2">
        {question.category && (
          <span className="px-2 py-1 bg-[#343538] rounded text-slate-300 text-xs border border-slate-700">
            {question.category}
          </span>
        )}
        <span className="px-2 py-1 bg-[#343538] rounded text-slate-300 text-xs border border-slate-700 capitalize">
          {question.type.replace("_", " ")}
        </span>
      </div>

      {/* Question Text */}
      <h2 className="text-2xl md:text-3xl text-white font-semibold tracking-tight">
        {question.text}
      </h2>

      {/* Options */}
      <div className="flex flex-col gap-3 mt-4">
        {question.options.map((opt) => {
          const isSelected = selectedOptionId === opt.id;
          const isActuallyCorrect = opt.id === question.correctOptionId;

          let btnClass =
            "w-full text-left p-4 rounded-lg border transition-all duration-200 flex items-center gap-3 group ";

          if (!showFeedback) {
            btnClass += isSelected
              ? "bg-[#2d4677]/20 border-[#61dcb0] text-white"
              : "bg-[#1c1e26] border-slate-800 hover:border-slate-600 hover:bg-[#252833] text-slate-200";
          } else {
            if (isActuallyCorrect) {
              btnClass += "bg-[#15a47c]/20 border-[#15a47c] text-white"; // Green for correct
            } else if (isSelected && !isActuallyCorrect) {
              btnClass += "bg-red-500/10 border-red-500/50 text-white"; // Red for wrong selection
            } else {
              btnClass +=
                "bg-[#1c1e26] border-slate-800/50 text-slate-500 opacity-50"; // Dim others
            }
          }

          return (
            <button
              key={opt.id}
              onClick={() => !showFeedback && onSelectOption(opt.id)}
              disabled={showFeedback}
              className={btnClass}
            >
              <div
                className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                  showFeedback && isActuallyCorrect
                    ? "border-[#15a47c] bg-[#15a47c]/20"
                    : showFeedback && isSelected && !isActuallyCorrect
                      ? "border-red-500 bg-red-500/20"
                      : isSelected
                        ? "border-[#61dcb0] bg-[#61dcb0]/20"
                        : "border-slate-600 group-hover:border-slate-400"
                }`}
              >
                {isSelected && !showFeedback && (
                  <div className="w-2.5 h-2.5 rounded-full bg-[#61dcb0]" />
                )}
                {showFeedback && isActuallyCorrect && (
                  <div className="w-2.5 h-2.5 rounded-full bg-[#15a47c]" />
                )}
                {showFeedback && isSelected && !isActuallyCorrect && (
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                )}
              </div>

              <div className="flex-1 overflow-x-auto py-1">
                {opt.latex ? (
                  <div
                    className="text-[16px] [&_.katex-display]:m-0"
                    dangerouslySetInnerHTML={{ __html: renderMath(opt.latex) }}
                  />
                ) : (
                  <span className="text-lg">{opt.text}</span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Feedback Section */}
      {showFeedback && (
        <div
          className={`mt-4 p-5 rounded-lg border ${isCorrect ? "bg-[#15a47c]/10 border-[#15a47c]/30" : "bg-red-500/10 border-red-500/30"}`}
        >
          <h4
            className={`font-semibold mb-2 ${isCorrect ? "text-[#61dcb0]" : "text-red-400"}`}
          >
            {isCorrect ? "Correct!" : "Incorrect"}
          </h4>
          <p className="text-slate-300 text-sm leading-relaxed">
            <span
              dangerouslySetInnerHTML={{
                // Simple replacement for $...$ to katex, assuming explanation has inline math
                __html: question.explanation.replace(/\$(.*?)\$/g, (m, tex) => {
                  try {
                    return katex.renderToString(tex, { throwOnError: false });
                  } catch {
                    return m;
                  }
                }),
              }}
            />
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="mt-6 flex justify-end">
        {showFeedback ? (
          <button
            onClick={onNext}
            className="bg-[#d8e2ff] text-[#003122] font-semibold px-6 py-3 rounded-lg hover:bg-white transition-colors flex items-center gap-2"
          >
            Next Question
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        ) : (
          <button
            onClick={() => onSelectOption("submit")} // Or handle via parent state
            disabled={!selectedOptionId}
            className="bg-[#d8e2ff] text-[#003122] font-semibold px-6 py-3 rounded-lg hover:bg-white transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit Answer
          </button>
        )}
      </div>
    </div>
  );
}
