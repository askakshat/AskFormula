
import { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import { getChaptersBySubject } from "@/lib/formulas";
import { useQuizEngine } from "@/hooks/useQuizEngine";

export default function QuizDashboard() {
  const navigate = useNavigate();
  const { generateQuiz } = useQuizEngine();

  const [selectedClass, setSelectedClass] = useState<"11" | "12" | null>(null);
  const [subject, setSubject] = useState<string | null>(null);
  const [selectedChapters, setSelectedChapters] = useState<string[]>([]);
  const [numQuestions, setNumQuestions] = useState<number>(5);

  const chapters = useMemo(() => {
    if (!subject) return [];
    return getChaptersBySubject(subject).filter(
      (ch) => !selectedClass || ch.class === selectedClass,
    );
  }, [subject, selectedClass]);

  const toggleChapter = (chapterId: string) => {
    setSelectedChapters((prev) =>
      prev.includes(chapterId)
        ? prev.filter((id) => id !== chapterId)
        : [...prev, chapterId],
    );
  };

  const handleStartQuiz = () => {
    if (selectedChapters.length === 0 || !subject) return;
    // We pass chapters via query param or local storage, or simple sessionStorage for now
    sessionStorage.setItem("quiz-chapters", JSON.stringify(selectedChapters));
    sessionStorage.setItem("quiz-count", numQuestions.toString());
    sessionStorage.setItem("quiz-subject", subject);
    navigate("/quiz/active");
  };

  return (
    <div className="min-h-screen flex flex-col relative bg-[#537594]">
      {/* Backgrounds */}
      <div aria-hidden="true" className="zen-gradient-bg"></div>
      <div aria-hidden="true" className="zen-overlay-fog"></div>

      {/* Main content container */}
      <main className="flex-1 w-full flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 z-10">
        <div className="w-full flex justify-center mb-8">
          <img src="/assets/logo-new.png" alt="AskFormula" className="h-6 sm:h-8 opacity-80 mix-blend-overlay hover:opacity-100 hover:mix-blend-normal transition-all duration-300" />
        </div>

        <div className="max-w-4xl w-full rounded-[28px] border border-white/10 p-6 sm:p-10 md:p-12 shadow-[0_30px_80px_rgba(0,0,0,0.48),0_10px_30px_rgba(10,16,26,0.35)] text-white transition-all backdrop-blur-[24px]" style={{ background: "rgba(12, 18, 30, 0.85)" }}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-white/[0.08]">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.1] backdrop-blur-md w-fit">
              <svg className="w-3.5 h-3.5 text-[#a2d4f8]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
              <span className="text-xs font-semibold tracking-wide text-white/90 uppercase">Formula Recall Drill</span>
            </div>
            <div>
              <h1 className="text-3xl font-serif tracking-tight text-white m-0">Setup Session</h1>
              <p className="text-sm text-[#9bb8cf] mt-1 font-sans">Configure your next training drill.</p>
            </div>
          </div>

          <div className="mt-8 space-y-10">
            {/* Step 1: Syllabus Level */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/10 text-xs font-medium text-white/80 border border-white/[0.15]">1</span>
                <h2 className="text-lg font-medium text-white/95">Syllabus Level</h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {["11", "12"].map((cls) => (
                  <button
                    key={cls}
                    onClick={() => { setSelectedClass(cls as "11" | "12"); setSelectedChapters([]); }}
                    className={`relative p-5 rounded-2xl border text-left transition-all duration-300 ${
                      selectedClass === cls
                        ? "bg-[rgba(162,212,248,0.06)] border-[#a2d4f8]/50 shadow-[0_0_25px_rgba(162,212,248,0.12)]"
                        : "bg-white/[0.02] border-white/[0.08] hover:bg-white/[0.04] hover:border-white/[0.15]"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className={`text-base font-semibold ${selectedClass === cls ? "text-[#a2d4f8]" : "text-white/80"}`}>Class {cls}</span>
                      {selectedClass === cls && (
                        <svg className="w-5 h-5 text-[#a2d4f8]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      )}
                    </div>
                    <span className="text-xs text-[#9bb8cf]/70 font-sans">Core curriculum & derivations</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Subject */}
            <div className={`transition-opacity duration-300 ${!selectedClass ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}>
              <div className="flex items-center gap-3 mb-5">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/10 text-xs font-medium text-white/80 border border-white/[0.15]">2</span>
                <h2 className="text-lg font-medium text-white/95">Subject Area</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {["Physics", "Chemistry", "Mathematics", "Biology"].map((sub) => (
                  <button
                    key={sub}
                    onClick={() => { setSubject(sub); setSelectedChapters([]); }}
                    className={`py-3 px-4 rounded-xl border text-sm font-medium transition-all duration-200 ${
                      subject === sub
                        ? "bg-[#a2d4f8] text-[#0c121e] border-[#a2d4f8] shadow-[0_0_20px_rgba(162,212,248,0.28)]"
                        : "bg-white/[0.03] text-white/70 border-white/[0.08] hover:bg-white/[0.06] hover:text-white"
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Target Chapters */}
            <div className={`transition-opacity duration-300 ${!subject ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}>
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/10 text-xs font-medium text-white/80 border border-white/[0.15]">3</span>
                  <h2 className="text-lg font-medium text-white/95">Target Chapters</h2>
                </div>
                <div className="flex items-center gap-4 text-xs font-medium">
                  <button onClick={() => setSelectedChapters(chapters.map(c => c.id))} className="text-[#a2d4f8]/80 hover:text-[#a2d4f8] transition-colors">Select All</button>
                  <span className="text-white/20">|</span>
                  <button onClick={() => setSelectedChapters([])} className="text-white/50 hover:text-white/80 transition-colors">Clear</button>
                </div>
              </div>
              <div className="bg-[rgba(18,25,40,0.65)] border border-white/[0.06] rounded-2xl p-5 max-h-[280px] overflow-y-auto">
                {chapters.length === 0 ? (
                  <div className="text-center py-8 text-white/40 text-sm">Select class and subject to view chapters.</div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                    {chapters.map(chap => (
                      <label key={chap.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-white/[0.03] transition-colors cursor-pointer group">
                        <div className="pt-0.5">
                          <input
                            type="checkbox"
                            className="zen-checkbox"
                            checked={selectedChapters.includes(chap.id)}
                            onChange={() => toggleChapter(chap.id)}
                          />
                        </div>
                        <div className="flex-1">
                          <div className={`text-sm leading-snug transition-colors ${selectedChapters.includes(chap.id) ? "text-white" : "text-white/70 group-hover:text-white/90"}`}>
                            {chap.name}
                          </div>
                          <div className="text-xs text-white/30 mt-0.5">{chap.formulas.length} formulas</div>
                        </div>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Drill Configuration & Action */}
            <div className={`pt-6 border-t border-white/[0.08] flex flex-col md:flex-row md:items-center justify-between gap-6 transition-opacity duration-300 ${selectedChapters.length === 0 ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}>
              <div className="flex items-center gap-6">
                <div>
                  <label className="block text-xs font-medium text-[#9bb8cf] mb-2 uppercase tracking-wider">Session Length</label>
                  <div className="flex bg-[rgba(18,25,40,0.65)] border border-white/[0.08] rounded-xl p-1 w-fit">
                    {[5, 10, 20].map(num => (
                      <button
                        key={num}
                        onClick={() => setNumQuestions(num)}
                        className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all ${
                          numQuestions === num
                            ? "bg-white/10 text-white shadow-sm"
                            : "text-white/50 hover:text-white/80"
                        }`}
                      >
                        {num} Qs
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <button
                onClick={handleStartQuiz}
                disabled={selectedChapters.length === 0}
                className="flex items-center justify-center gap-2 bg-white text-[#0c121e] hover:bg-gray-100 px-8 py-4 rounded-xl text-sm font-semibold transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.28)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:scale-[1.02] disabled:opacity-50 disabled:pointer-events-none w-full md:w-auto"
              >
                <span>Enter Focus Mode</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
