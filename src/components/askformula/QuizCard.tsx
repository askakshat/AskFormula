import React from "react";
import katex from "katex";
import { QuizQuestion } from "@/hooks/useQuizEngine";

interface QuizCardProps {
  question: QuizQuestion;
  currentIndex: number;
  totalQuestions: number;
  selectedOptionId: string | null;
  onSelectOption: (id: string) => void;
  showFeedback: boolean;
  onNext: () => void;
}

export default function QuizCard({
  question,
  currentIndex,
  totalQuestions,
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
    <div className="w-full max-w-2xl bg-[#15171e] rounded-xl border border-[#272a31] p-6 md:p-8 flex flex-col gap-6 relative overflow-hidden">
      {/* Top Meta Info */}
      <div className="flex items-center gap-2">
        {question.category && (
          <span className="px-2 py-1 bg-[#1c1e26] rounded text-slate-400 text-xs border border-[#272a31]">
            {question.category}
          </span>
        )}
        <span className="px-2 py-1 bg-[#1c1e26] rounded text-slate-400 text-xs border border-[#272a31] capitalize">
          {question.type.replace("_", " ")}
        </span>
        <span className="text-slate-400 text-xs font-medium ml-auto">
           Question {currentIndex + 1} of {totalQuestions}
        </span>
      </div>

      {/* Question Text */}
      <h1 className="text-[28px] leading-[36px] font-semibold text-white tracking-tight">
        {question.text}
      </h1>

      {/* Options */}
      <div className="flex flex-col gap-3 mt-4">
        {question.options.map((opt) => {
          const isSelected = selectedOptionId === opt.id;
          const isActuallyCorrect = opt.id === question.correctOptionId;

          let btnClass =
            "w-full text-left p-4 rounded-lg border transition-all duration-200 flex items-center gap-3 group ";

          if (!showFeedback) {
            btnClass += isSelected
              ? "bg-[#324565]/30 border-[#d8e2ff]/50 text-white"
              : "bg-[#11131a] border-[#272a31] hover:border-[#324565] text-[#e3e2e6]";
          } else {
            if (isActuallyCorrect) {
              btnClass += "bg-[#15a47c]/10 border-[#15a47c]/50 text-white"; // Green for correct
            } else if (isSelected && !isActuallyCorrect) {
              btnClass += "bg-[#ef4444]/10 border-[#ef4444]/50 text-white"; // Red for wrong selection
            } else {
              btnClass += "bg-[#11131a] border-[#272a31] text-slate-500 opacity-50"; // Dim others
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
                      ? "border-[#ef4444] bg-[#ef4444]/20"
                      : isSelected
                        ? "border-[#d8e2ff] bg-[#d8e2ff]/20"
                        : "border-[#272a31] group-hover:border-[#324565]"
                }`}
              >
                {isSelected && !showFeedback && (
                  <div className="w-2.5 h-2.5 rounded-full bg-[#d8e2ff]" />
                )}
                {showFeedback && isActuallyCorrect && (
                  <div className="w-2.5 h-2.5 rounded-full bg-[#15a47c]" />
                )}
                {showFeedback && isSelected && !isActuallyCorrect && (
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
                )}
              </div>

              <div className="flex-1 overflow-x-auto py-1">
                {opt.latex ? (
                  <div
                    className="text-[18px] [&_.katex-display]:m-0"
                    dangerouslySetInnerHTML={{ __html: renderMath(opt.latex) }}
                  />
                ) : (
                  <span className="text-base">{opt.text}</span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Feedback Section */}
      {showFeedback && (
        <div
          className={`mt-4 p-4 rounded-lg border ${isCorrect ? "bg-[#15a47c]/10 border-[#15a47c]/30" : "bg-[#ef4444]/10 border-[#ef4444]/30"} flex items-start gap-3`}
        >
          <span className={`material-symbols-outlined mt-0.5 ${isCorrect ? 'text-[#15a47c]' : 'text-[#ef4444]'}`}>
             {isCorrect ? 'check_circle' : 'cancel'}
          </span>
          <div>
            <h4 className={`text-sm font-semibold mb-1 ${isCorrect ? "text-[#15a47c]" : "text-[#ef4444]"}`}>
                {isCorrect ? "Correct!" : "Incorrect"}
            </h4>
            <div className="text-[#e3e2e6] text-sm leading-relaxed"
                dangerouslySetInnerHTML={{
                    __html: question.explanation.replace(/\$(.*?)\$/g, (m, tex) => {
                    try {
                        return katex.renderToString(tex, { throwOnError: false });
                    } catch {
                        return m;
                    }
                    }),
                }}
            />
          </div>
        </div>
      )}

      {/* Actions Area */}
      <div className="mt-8 flex justify-end">
        {showFeedback ? (
          <button
            onClick={onNext}
            className="bg-[#d8e2ff] text-[#003122] text-sm font-semibold px-6 py-3 rounded-lg hover:bg-[#b5caff] transition-colors flex items-center gap-2"
          >
            Next Question
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
          </button>
        ) : (
          <button
            onClick={() => onSelectOption("submit")}
            disabled={!selectedOptionId}
            className="bg-[#d8e2ff] text-[#003122] text-sm font-semibold px-6 py-3 rounded-lg hover:bg-[#b5caff] transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit Answer
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>keyboard_return</span>
          </button>
        )}
      </div>
    </div>
  );
}
