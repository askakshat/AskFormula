import React from 'react';
import { QuizQuestion } from '@/hooks/useQuizEngine';
import { motion, AnimatePresence } from 'framer-motion';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { CheckCircle2, XCircle, ArrowRight, Lightbulb } from 'lucide-react';

interface QuizCardProps {
    question: QuizQuestion;
    currentIndex: number;
    totalQuestions: number;
    selectedOptionId: string | null;
    onSelectOption: (id: string) => void;
    showFeedback: boolean;
    onNext: () => void;
}

const renderTextWithMath = (text: string) => {
    return {
        __html: text.replace(/\$(.*?)\$/g, (m, tex) => {
            try {
                return katex.renderToString(tex, { throwOnError: false });
            } catch {
                return m;
            }
        })
    };
};

const renderMath = (tex: string) => {
    try {
        return katex.renderToString(tex, { throwOnError: false, displayMode: true });
    } catch {
        return tex;
    }
};

export default function QuizCard({
    question,
    currentIndex,
    totalQuestions,
    selectedOptionId,
    onSelectOption,
    showFeedback,
    onNext
}: QuizCardProps) {
    const isCorrect = selectedOptionId === question.correctOptionId;

    return (
        <div className="w-full max-w-2xl bg-[#11131a] rounded-2xl border border-[#272a31] shadow-2xl overflow-hidden flex flex-col">

            <div className="p-4 md:p-6 border-b border-[#272a31] flex flex-col gap-2 bg-[#15171e]">
                <div className="flex items-center justify-between text-xs font-semibold tracking-wider text-slate-400">
                    <span className="uppercase text-[#61dcb0]">{question.category || "General"}</span>
                    <span>QUESTION {currentIndex + 1} OF {totalQuestions}</span>
                </div>

                <h3 className="text-xl md:text-2xl font-semibold text-white mt-2 leading-relaxed break-words [&_.katex-display]:overflow-x-auto [&_.katex]:whitespace-normal [&_.katex]:break-words" dangerouslySetInnerHTML={renderTextWithMath(question.text)} />
            </div>

            <div className="p-4 md:p-6 flex flex-col gap-3 flex-1 bg-[#0a0a0a]/50">
                <AnimatePresence mode="popLayout">
                    {question.options.map((option, idx) => {
                        const isSelected = selectedOptionId === option.id;
                        const isOptionCorrect = option.id === question.correctOptionId;

                        let stateClass = "bg-[#15171e] border-[#272a31] hover:bg-[#1c1e26] hover:border-[#324565]";
                        if (showFeedback) {
                            if (isOptionCorrect) {
                                stateClass = "bg-[#61dcb0]/10 border-[#61dcb0] text-white";
                            } else if (isSelected && !isOptionCorrect) {
                                stateClass = "bg-[#ef4444]/10 border-[#ef4444] text-white";
                            } else {
                                stateClass = "bg-[#15171e] border-[#272a31] opacity-50";
                            }
                        } else if (isSelected) {
                            stateClass = "bg-[#324565]/30 border-[#61dcb0] text-white";
                        }

                        const letter = String.fromCharCode(65 + idx);

                        return (
                            <motion.button
                                key={option.id}
                                layout
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                onClick={() => onSelectOption(option.id)}
                                disabled={showFeedback}
                                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-4 ${stateClass}`}
                            >
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 font-bold font-mono text-sm border
                                    ${showFeedback && isOptionCorrect ? 'bg-[#61dcb0] text-[#003122] border-[#61dcb0]' :
                                      showFeedback && isSelected ? 'bg-[#ef4444] text-white border-[#ef4444]' :
                                      isSelected ? 'bg-[#d8e2ff] text-[#003122] border-[#d8e2ff]' : 'bg-[#1c1e26] text-slate-400 border-[#272a31]'}`}
                                >
                                    {showFeedback && isOptionCorrect ? <CheckCircle2 className="w-5 h-5" /> :
                                     showFeedback && isSelected ? <XCircle className="w-5 h-5" /> : letter}
                                </div>

                                <div className="flex-1 text-slate-200 font-medium min-w-0">
                                    {option.latex ? (
                                        <div className="[&_.katex-display]:m-0 [&_.katex-display]:overflow-x-auto [&_.katex-display]:overflow-y-hidden [&_.katex-display]:py-1 scrollbar-thin overflow-x-auto" dangerouslySetInnerHTML={{ __html: renderMath(option.latex) }} />
                                    ) : (
                                        <div className="break-words whitespace-pre-wrap" dangerouslySetInnerHTML={renderTextWithMath(option.text || '')} />
                                    )}
                                </div>
                            </motion.button>
                        );
                    })}
                </AnimatePresence>
            </div>

            <div className="p-4 md:p-6 border-t border-[#272a31] bg-[#15171e] flex flex-col gap-4">
                <AnimatePresence>
                    {showFeedback && (
                        <motion.div
                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                            animate={{ opacity: 1, height: 'auto', marginTop: 8 }}
                            exit={{ opacity: 0, height: 0, marginTop: 0 }}
                            className={`p-4 rounded-xl border flex items-start gap-3 ${isCorrect ? 'bg-[#61dcb0]/10 border-[#61dcb0]/30' : 'bg-[#ef4444]/10 border-[#ef4444]/30'}`}
                        >
                            <Lightbulb className={`w-5 h-5 mt-0.5 shrink-0 ${isCorrect ? 'text-[#61dcb0]' : 'text-[#ef4444]'}`} />
                            <div className="text-sm text-slate-300 leading-relaxed break-words [&_.katex-display]:overflow-x-auto [&_.katex]:whitespace-normal [&_.katex]:break-words overflow-x-auto w-full min-w-0" dangerouslySetInnerHTML={renderTextWithMath(question.explanation || '')} />
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="flex justify-end mt-2">
                    {!showFeedback ? (
                        <button
                            onClick={() => onSelectOption('submit')}
                            disabled={!selectedOptionId}
                            className="bg-[#d8e2ff] text-[#003122] font-semibold py-3 px-8 rounded-lg hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(216,226,255,0.1)]"
                        >
                            Submit Answer
                        </button>
                    ) : (
                        <button
                            onClick={onNext}
                            className="bg-[#61dcb0] text-[#003122] font-semibold py-3 px-8 rounded-lg hover:bg-[#72edc1] transition-colors flex items-center gap-2 shadow-[0_0_20px_rgba(97,220,176,0.15)]"
                        >
                            {currentIndex < totalQuestions - 1 ? 'Next Question' : 'View Results'}
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    )}
                </div>
            </div>

        </div>
    );
}
