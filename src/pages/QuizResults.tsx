import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import { LayoutDashboard, RotateCcw, Target, XCircle, CheckCircle, Lightbulb, TrendingDown, BookOpen } from 'lucide-react';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { useLocalStorage } from '@/lib/local-storage';

export default function QuizResults() {
  const location = useLocation();
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [, setSelectedChapters] = useLocalStorage<string[]>("askformula-selected-chapters", []);

  const state = location.state as {
      score: number,
      total: number,
      questions: import('@/hooks/useQuizEngine').QuizQuestion[],
      userAnswers: Record<string, string>,
      timeElapsed?: number
  };

  if (!state) {
      return (
          <div className="min-h-screen bg-[#11131a] flex flex-col items-center justify-center text-[#e3e2e6] gap-4">
              <p>No results found.</p>
              <button onClick={() => navigate('/quiz')} className="bg-[#324565] px-4 py-2 rounded">Go to Dashboard</button>
          </div>
      );
  }

  const { score, total, questions, userAnswers, timeElapsed = 0 } = state;
  const percentage = Math.round((score / total) * 100);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const avgTimePerQuestion = total > 0 ? Math.round(timeElapsed / total) : 0;

  // Analysis for weak chapters
  const weakChaptersMap = new Map<string, number>();
  questions.forEach(q => {
      const isCorrect = userAnswers[q.id] === q.correctOptionId;
      if (!isCorrect && q.category) {
          weakChaptersMap.set(q.category, (weakChaptersMap.get(q.category) || 0) + 1);
      }
  });

  const weakChaptersList = Array.from(weakChaptersMap.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([name]) => name)
      .slice(0, 3); // Top 3 weak chapters

  const handleBuildReviewSheet = () => {
       // Since the engine doesn't export chapter IDs easily in QuizQuestion yet,
       // for this MVP integration we just redirect to the build tool.
       // Ideally we would map category strings back to chapter IDs.
       navigate('/build');
  };

  const renderMath = (tex: string) => {
      try {
          return katex.renderToString(tex, { throwOnError: false, displayMode: true });
      } catch {
          return tex;
      }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-slate-200 font-sans pb-24 selection:bg-[#324565] selection:text-[#d8e2ff]">
      <header className="w-full border-b border-[#272a31] bg-[#0a0a0a]/80 backdrop-blur-md sticky top-0 z-40">
         <div className="max-w-[1200px] mx-auto h-16 px-6 md:px-8 flex items-center justify-between">
             <div className="flex items-center gap-4">
                 <h1 className="text-xl font-bold text-[#d8e2ff] tracking-tight cursor-pointer" onClick={() => navigate('/')}>AskFormula</h1>
                 <span className="hidden md:inline-flex bg-[#324565]/30 text-[#d8e2ff] text-xs px-2 py-0.5 rounded border border-[#324565]/50">Practice Results</span>
             </div>
             <button
                onClick={() => navigate('/dashboard')}
                className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-2"
             >
                 <LayoutDashboard className="w-4 h-4" />
                 <span className="hidden sm:inline">My Dashboard</span>
             </button>
         </div>
      </header>

      <main className="w-full max-w-[1200px] mx-auto p-4 md:p-8 mt-4 flex flex-col md:flex-row gap-8 items-start">

        <div className="w-full md:w-1/3 shrink-0 flex flex-col gap-6 sticky top-24">
          <div className="bg-[#11131a] rounded-xl border border-[#272a31] p-6 flex flex-col items-center justify-center shadow-xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
                 <Target className="w-24 h-24 text-[#61dcb0]" />
             </div>
             <span className="text-slate-400 text-sm font-medium mb-2 relative z-10">Overall Score</span>
             <div className="text-6xl font-bold text-[#d8e2ff] relative z-10 mb-1">{percentage}%</div>
             <p className="text-[#61dcb0] text-sm relative z-10">{score} out of {total} correct</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="bg-[#15171e] rounded-xl p-4 border border-[#272a31] flex flex-col">
                <div className="flex items-center gap-2 text-slate-400 mb-3">
                   <RotateCcw className="w-4 h-4" />
                   <span className="text-xs font-medium">Time Taken</span>
                </div>
                <span className="text-xl font-semibold text-white">{formatTime(timeElapsed)}</span>
                <span className="text-xs text-slate-400 mt-1">Avg {avgTimePerQuestion}s/q</span>
             </div>
             <div className="bg-[#15171e] rounded-xl p-4 border border-[#272a31] flex flex-col">
                <div className="flex items-center gap-2 text-slate-400 mb-3">
                   <Target className="w-4 h-4" />
                   <span className="text-xs font-medium">Accuracy</span>
                </div>
                <span className="text-xl font-semibold text-white">{score}/{total}</span>
                <span className="text-xs text-slate-400 mt-1">Questions</span>
             </div>
          </div>

          <div className="bg-[#15171e] rounded-xl p-4 border border-[#272a31] flex flex-col gap-4">
            <div className="flex items-center justify-between">
               <h3 className="text-xs text-slate-400 uppercase tracking-wider font-medium flex items-center gap-2">
                   <TrendingDown className="w-4 h-4 text-amber-500" />
                   Areas to Review
               </h3>
            </div>

            {weakChaptersList.length > 0 ? (
                <div className="flex flex-col gap-2">
                    {weakChaptersList.map((ch, idx) => (
                        <div key={idx} className="text-sm text-slate-300 bg-[#1c1e26] p-2 rounded border border-[#272a31]">
                            {ch}
                        </div>
                    ))}
                    <button
                        onClick={handleBuildReviewSheet}
                        className="mt-2 w-full bg-[#324565]/30 border border-[#324565] text-[#d8e2ff] text-sm py-2 rounded flex items-center justify-center gap-2 hover:bg-[#324565]/50 transition-colors"
                    >
                        <BookOpen className="w-4 h-4" /> Build Custom Formula Sheet
                    </button>
                </div>
            ) : (
                <div className="text-sm text-slate-400 bg-[#1c1e26] p-3 rounded text-center">
                    Excellent work! No major weak areas detected in this session.
                </div>
            )}
          </div>

          <div className="flex flex-col gap-3 mt-auto pt-4">
             <button
                onClick={() => navigate('/quiz')}
                className="w-full bg-[#d8e2ff] text-[#003122] font-semibold py-3 px-6 rounded-lg hover:bg-[#b5caff] transition-colors flex items-center justify-center gap-2 text-sm"
             >
                <RotateCcw className="w-4 h-4" />
                Practice Again
             </button>
             <button
                onClick={() => navigate('/dashboard')}
                className="w-full bg-[#1c1e26] border border-[#272a31] text-[#e3e2e6] font-semibold py-3 px-6 rounded-lg hover:bg-[#272a31] transition-colors flex items-center justify-center gap-2 text-sm"
             >
                <LayoutDashboard className="w-4 h-4" />
                Back to Dashboard
             </button>
          </div>
        </div>

        <div className="w-full md:w-2/3 flex flex-col gap-4">
           <div className="flex items-center justify-between border-b border-[#272a31] pb-3 mb-3">
               <h2 className="text-xl font-semibold text-[#d8e2ff]">Review Answers</h2>
               <div className="flex gap-4 text-sm font-medium">
                   <span className="flex items-center gap-2 text-[#61dcb0]">
                       <span className="w-2 h-2 rounded-full bg-[#61dcb0]"></span> {score} Correct
                   </span>
                   <span className="flex items-center gap-2 text-[#ef4444]">
                       <span className="w-2 h-2 rounded-full bg-[#ef4444]"></span> {total - score} Incorrect
                   </span>
               </div>
           </div>

           <div className="flex flex-col gap-4 overflow-y-auto pr-2" style={{ maxHeight: 'calc(100vh - 200px)' }}>
              {questions.map((q, index) => {
                 const userAnswerId = userAnswers[q.id];
                 const isCorrect = userAnswerId === q.correctOptionId;
                 const correctOption = q.options.find((o: import('@/hooks/useQuizEngine').QuizOption) => o.id === q.correctOptionId);
                 const userOption = q.options.find((o: import('@/hooks/useQuizEngine').QuizOption) => o.id === userAnswerId);

                 if (!isCorrect) {
                     return (
                         <div key={q.id} className="bg-[#15171e] rounded-xl p-5 border border-[#ef4444]/50 flex flex-col gap-3 relative overflow-hidden">
                             <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#ef4444]"></div>

                             <div className="flex items-start justify-between">
                                 <div className="flex gap-3">
                                     <span className="bg-[#1c1e26] text-slate-400 font-mono text-xs px-2 py-1 rounded h-fit">Q{index + 1}</span>
                                     <p className="text-sm md:text-base text-white">{q.text}</p>
                                 </div>
                                 <XCircle className="w-5 h-5 text-[#ef4444] shrink-0" />
                             </div>

                             <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                                 <div className="flex flex-col gap-2">
                                     <span className="text-xs text-slate-400 font-medium">Your Answer</span>
                                     <div className="bg-[#11131a] border border-[#ef4444] rounded-lg p-3">
                                         {userOption ? (
                                            userOption.latex ? (
                                                <div className="text-center text-[#ef4444] [&_.katex-display]:m-0" dangerouslySetInnerHTML={{ __html: renderMath(userOption.latex) }} />
                                            ) : (
                                                <div className="text-center text-[#ef4444]">{userOption.text}</div>
                                            )
                                         ) : (
                                            <div className="text-center text-slate-500 italic">Not answered</div>
                                         )}
                                     </div>
                                 </div>

                                 <div className="flex flex-col gap-2">
                                     <span className="text-xs text-slate-400 font-medium">Correct Answer</span>
                                     <div className="bg-[#1c1e26] border border-[#272a31] rounded-lg p-3">
                                         {correctOption?.latex ? (
                                                <div className="text-center text-[#d8e2ff] [&_.katex-display]:m-0" dangerouslySetInnerHTML={{ __html: renderMath(correctOption.latex) }} />
                                            ) : (
                                                <div className="text-center text-[#d8e2ff]">{correctOption?.text}</div>
                                         )}
                                     </div>
                                 </div>
                             </div>

                             <div className="bg-[#11131a] p-3 rounded-lg mt-2 border border-[#272a31]/50 flex items-start gap-3">
                                 <Lightbulb className="w-4 h-4 text-[#d8e2ff] mt-0.5 shrink-0" />
                                 <div className="text-sm text-slate-400"
                                    dangerouslySetInnerHTML={{
                                        __html: q.explanation.replace(/\$(.*?)\$/g, (m: string, tex: string) => {
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
                     );
                 }

                 return (
                     <div key={q.id} className="bg-[#15171e] rounded-xl p-5 border border-[#61dcb0]/30 flex flex-col gap-3 relative overflow-hidden transition-colors hover:bg-[#1c1e26] cursor-pointer group">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#61dcb0] opacity-50 group-hover:opacity-100 transition-opacity"></div>
                        <div className="flex items-start justify-between">
                            <div className="flex gap-3">
                                <span className="bg-[#1c1e26] text-slate-400 font-mono text-xs px-2 py-1 rounded h-fit">Q{index + 1}</span>
                                <p className="text-sm md:text-base text-white">{q.text}</p>
                            </div>
                            <CheckCircle className="w-5 h-5 text-[#61dcb0] shrink-0" />
                        </div>
                        <div className="bg-[#11131a] border border-[#61dcb0]/20 rounded-lg p-3 mt-1">
                            {correctOption?.latex ? (
                                <div className="text-center text-white [&_.katex-display]:m-0" dangerouslySetInnerHTML={{ __html: renderMath(correctOption.latex) }} />
                            ) : (
                                <div className="text-center text-white">{correctOption?.text}</div>
                            )}
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
