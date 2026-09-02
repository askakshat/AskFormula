import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import { CheckCircle, XCircle, TrendingUp, Timer, Target, RotateCcw, LayoutDashboard, Lightbulb, Info } from 'lucide-react';
import katex from 'katex';
import { QuizQuestion } from '@/hooks/useQuizEngine';

export default function QuizResults() {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve state passed from ActiveQuiz
  const { score = 0, total = 0, questions = [], userAnswers = {} } = (location.state || {}) as {
      score: number,
      total: number,
      questions: QuizQuestion[],
      userAnswers: Record<string, string | null>
  };

  if (total === 0) {
      return (
          <div className="min-h-screen bg-[#11131a] flex items-center justify-center">
              <div className="text-center">
                  <h2 className="text-2xl text-white mb-4">No Quiz Data Found</h2>
                  <button onClick={() => navigate('/quiz')} className="bg-[#61dcb0] text-[#003122] px-6 py-2 rounded">
                      Go to Dashboard
                  </button>
              </div>
          </div>
      );
  }

  const percentage = Math.round((score / total) * 100);
  const dashOffset = 282.7 - (282.7 * (percentage / 100));

  // Dummy data for visual matching
  const timeSpent = "12:45";
  const avgTime = "1m 16s / q";

  const renderMath = (latex: string) => {
    try {
      return katex.renderToString(latex, { throwOnError: false, displayMode: true });
    } catch {
      return `<code class="text-sm font-mono">${latex}</code>`;
    }
  };

  return (
    <div className="min-h-screen bg-[#11131a] text-[#e3e2e6] font-sans antialiased selection:bg-[#324565] selection:text-[#d8e2ff] flex flex-col">
      <main className="flex-grow w-full max-w-[1200px] mx-auto px-4 md:px-8 py-10 flex flex-col md:flex-row gap-8">

        {/* Left Column: Summary & Stats */}
        <div className="w-full md:w-1/3 flex flex-col gap-4">

          {/* Final Score Card */}
          <div className="bg-[#15171e] rounded-xl p-8 border border-[#272a31] flex flex-col items-center justify-center text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#324565]/5 to-transparent pointer-events-none"></div>

            <h1 className="text-xl font-semibold text-[#d8e2ff] mb-1 relative z-10">Quiz Results</h1>
            <p className="text-sm text-slate-400 mb-8 relative z-10">Practice Session</p>

            <div className="relative w-48 h-48 flex items-center justify-center mb-6 z-10">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" fill="none" r="45" stroke="#272a31" strokeWidth="8"></circle>
                <circle
                  className="transition-all duration-1000 ease-out"
                  cx="50" cy="50" fill="none" r="45"
                  stroke="#61dcb0"
                  strokeDasharray="282.7"
                  strokeDashoffset={dashOffset}
                  strokeWidth="8"
                ></circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-[#61dcb0]">{percentage}%</span>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider mt-1">Score</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-[#61dcb0] relative z-10">
              <TrendingUp className="w-4 h-4" />
              <span>{score} / {total} Correct</span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
             <div className="bg-[#15171e] rounded-xl p-4 border border-[#272a31] flex flex-col">
                <div className="flex items-center gap-2 text-slate-400 mb-3">
                   <Timer className="w-4 h-4" />
                   <span className="text-xs font-medium">Time Spent</span>
                </div>
                <span className="text-xl font-semibold text-white">{timeSpent}</span>
                <span className="text-xs text-slate-400 mt-1">Avg {avgTime}</span>
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

          {/* Mastery Graph Simulation */}
          <div className="bg-[#15171e] rounded-xl p-4 border border-[#272a31] flex flex-col">
            <div className="flex items-center justify-between mb-4">
               <h3 className="text-xs text-slate-400 uppercase tracking-wider font-medium">Mastery Over Time</h3>
               <Info className="w-4 h-4 text-slate-400 cursor-help" />
            </div>

            {/* Simulated Chart */}
            <div className="h-32 w-full relative flex items-end justify-between px-2 pb-2 border-b border-l border-[#272a31] pt-4">
              <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
                 <polyline fill="none" points="0,90 25,75 50,85 75,40 100,20" stroke="#aec6ff" strokeWidth="2"></polyline>
                 <polygon fill="url(#chartGradient)" opacity="0.2" points="0,128 0,90 25,75 50,85 75,40 100,20 100,128"></polygon>
                 <defs>
                   <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                     <stop offset="0%" stopColor="#aec6ff" stopOpacity="0.8"></stop>
                     <stop offset="100%" stopColor="#aec6ff" stopOpacity="0"></stop>
                   </linearGradient>
                 </defs>
              </svg>
            </div>
            <div className="flex justify-between mt-2 text-xs text-slate-400 px-2">
               <span>Q1</span>
               <span>Q2</span>
               <span>Q3</span>
               <span>Q4</span>
               <span className="text-[#61dcb0]">Now</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 mt-auto pt-4">
             <button
                onClick={() => navigate('/quiz/setup')}
                className="w-full bg-[#d8e2ff] text-[#003122] font-semibold py-3 px-6 rounded-lg hover:bg-[#b5caff] transition-colors flex items-center justify-center gap-2 text-sm"
             >
                <RotateCcw className="w-4 h-4" />
                Practice Again
             </button>
             <button
                onClick={() => navigate('/quiz')}
                className="w-full bg-[#1c1e26] border border-[#272a31] text-[#e3e2e6] font-semibold py-3 px-6 rounded-lg hover:bg-[#272a31] transition-colors flex items-center justify-center gap-2 text-sm"
             >
                <LayoutDashboard className="w-4 h-4" />
                Back to Dashboard
             </button>
          </div>
        </div>

        {/* Right Column: Question Review */}
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
                 const correctOption = q.options.find(o => o.id === q.correctOptionId);
                 const userOption = q.options.find(o => o.id === userAnswerId);

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
                                        __html: q.explanation.replace(/\$(.*?)\$/g, (m, tex) => {
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
