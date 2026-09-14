import re

with open('src/pages/QuizResults.tsx', 'r') as f:
    content = f.read()

# Let's completely rewrite the render method in QuizResults to be clean.
start_idx = content.find('return (')
top_part = content[:start_idx]

render_method = """
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Backgrounds */}
      <div aria-hidden="true" className="zen-gradient-bg"></div>
      <div aria-hidden="true" className="zen-overlay-fog"></div>

      {/* Top Navigation */}
      <header className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between" data-purpose="global-header">
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate("/")}>
          <img src="/assets/logo-new.png" alt="AskFormula" className="h-6 sm:h-7 opacity-80 mix-blend-overlay hover:opacity-100 hover:mix-blend-normal transition-all" />
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-4xl mx-auto px-4 py-4 md:py-8 flex-grow flex items-center justify-center">
        <div className="w-full rounded-[28px] p-7 md:p-10 relative overflow-hidden transition-all bg-[rgba(12,18,30,0.85)] backdrop-blur-xl border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.48),0_10px_30px_rgba(10,16,26,0.35)]">

          {/* Top Meta Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-6 border-b border-white/5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Zen Drill Complete · Mindful Retention</span>
            </div>
            <div className="text-xs text-slate-400 font-light flex items-center gap-2">
              <span>Session: {sessionName}</span>
              <span className="text-slate-600">•</span>
              <span>{totalQuestions} Questions Analyzed</span>
            </div>
          </div>

          {/* Headline Section */}
          <div className="mt-7 mb-8">
            <h1 className="font-serif text-3xl md:text-4xl text-white tracking-wide font-normal">Recall clarity achieved.</h1>
            <p className="mt-2 text-sm text-slate-400 max-w-2xl font-light leading-relaxed">
              {message} Review the conceptual focus points below, or reinforce boundary cases with tailored formula sheets.
            </p>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {/* Accuracy */}
            <div className="bg-white/[0.03] border border-white/5 hover:border-white/10 hover:bg-white/[0.05] transition-all rounded-2xl p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-slate-400 font-medium">Retention Score</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-sky-950/70 border border-sky-500/30 text-sky-300">{accuracy}% Accuracy</span>
              </div>
              <div className="mt-4 flex flex-col gap-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-light text-white">{score}</span>
                  <span className="text-emerald-400 text-sm">correct</span>
                </div>
                {wrongAnswersCount > 0 && (
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-light text-white/70">{wrongAnswersCount}</span>
                    <span className="text-rose-400 text-sm">incorrect</span>
                  </div>
                )}
              </div>
            </div>

            {/* Total Time */}
            <div className="bg-white/[0.03] border border-white/5 hover:border-white/10 hover:bg-white/[0.05] transition-all rounded-2xl p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-slate-400 font-medium">Time Elapsed</span>
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl font-light text-white">{formatTime(totalTime)}</span>
                <span className="text-slate-400 text-sm">total</span>
              </div>
            </div>

            {/* Average Time */}
            <div className="bg-white/[0.03] border border-white/5 hover:border-white/10 hover:bg-white/[0.05] transition-all rounded-2xl p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-slate-400 font-medium">Speed</span>
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl font-light text-white">{avgTimePerQuestion}</span>
                <span className="text-slate-400 text-sm">/ question</span>
              </div>
            </div>
          </div>

          {/* Detailed Breakdown */}
          <div className="mb-8">
            <h3 className="text-xl font-serif text-white mb-4">Question Breakdown</h3>
            <div className="space-y-4">
              {detailedResults.map((result, idx) => (
                <div key={idx} className={`p-4 rounded-xl border ${result.isCorrect ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-rose-500/5 border-rose-500/20'}`}>
                  <div className="flex gap-3">
                    <div className="shrink-0 mt-0.5">
                      {result.isCorrect ? (
                        <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                      ) : (
                        <svg className="w-5 h-5 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white/90 mb-2">{result.questionText}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        <div className="bg-white/5 p-2 rounded-lg border border-white/5">
                          <span className="text-white/40 block mb-1">Your Answer:</span>
                          <span className={result.isCorrect ? "text-emerald-300" : "text-rose-300"}>{result.userAnswerText}</span>
                        </div>
                        {!result.isCorrect && (
                          <div className="bg-white/5 p-2 rounded-lg border border-emerald-500/10">
                            <span className="text-white/40 block mb-1">Correct Answer:</span>
                            <span className="text-emerald-300">{result.correctAnswerText}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={handleRetake}
              className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-white/10 text-slate-300 hover:text-white hover:bg-white/5 text-sm font-medium transition-all"
            >
              Start New Drill
            </button>
            <button
              onClick={handleCreateSheet}
              className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-sky-500 hover:bg-sky-400 text-sky-950 text-sm font-semibold shadow-[0_0_15px_rgba(14,165,233,0.3)] transition-all flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
              <span>Build Review Sheet</span>
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}
"""

with open('src/pages/QuizResults.tsx', 'w') as f:
    f.write(top_part + render_method.strip() + "\n")
