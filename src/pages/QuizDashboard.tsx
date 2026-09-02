import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Target, PlayCircle, X, BookOpen, GraduationCap, TriangleAlert, TrendingUp } from 'lucide-react';
import { getChaptersBySubject, allSubjects } from '@/lib/formulas';
import { useLocalStorage } from '@/lib/local-storage';

// --- Sub-components for selections ---
const ExamSelector = ({ onSelect, selected }: { onSelect: (v: string) => void, selected: string | null }) => (
  <div className="flex flex-col gap-3">
     <label className="text-sm font-semibold text-slate-300">1. Select Target Exam</label>
     <div className="flex gap-3">
         {['school', 'jee', 'neet'].map(exam => (
             <button
                 key={exam}
                 onClick={() => onSelect(exam)}
                 className={`flex-1 py-3 px-4 rounded-lg border transition-all ${selected === exam ? 'bg-[#324565]/30 border-[#61dcb0] text-white shadow-[0_0_15px_rgba(97,220,176,0.15)]' : 'bg-[#15171e] border-[#272a31] text-slate-400 hover:border-slate-500'}`}
             >
                 <span className="capitalize font-medium">{exam === 'school' ? 'CBSE/State Board' : exam.toUpperCase()}</span>
             </button>
         ))}
     </div>
  </div>
);

const ClassSelector = ({ onSelect, selected }: { onSelect: (v: string) => void, selected: string | null }) => (
  <div className="flex flex-col gap-3">
     <label className="text-sm font-semibold text-slate-300">2. Select Class Level</label>
     <div className="flex gap-3">
         {['11', '12'].map(cls => (
             <button
                 key={cls}
                 onClick={() => onSelect(cls)}
                 className={`flex-1 py-3 px-4 rounded-lg border transition-all ${selected === cls ? 'bg-[#324565]/30 border-[#61dcb0] text-white shadow-[0_0_15px_rgba(97,220,176,0.15)]' : 'bg-[#15171e] border-[#272a31] text-slate-400 hover:border-slate-500'}`}
             >
                 <span className="font-medium">Class {cls}</span>
             </button>
         ))}
     </div>
  </div>
);

const SubjectSelector = ({ onSelect, selected, exam }: { onSelect: (v: string) => void, selected: string | null, exam: string }) => {
  const subjects = allSubjects.filter(s => s.audience.includes(exam)).map(s => s.subject);
  return (
      <div className="flex flex-col gap-3">
         <label className="text-sm font-semibold text-slate-300">3. Select Subject</label>
         <div className="flex gap-3 overflow-x-auto pb-2 custom-scrollbar">
             {subjects.map(sub => (
                 <button
                     key={sub}
                     onClick={() => onSelect(sub)}
                     className={`flex-none min-w-[120px] py-3 px-4 rounded-lg border transition-all ${selected === sub ? 'bg-[#324565]/30 border-[#61dcb0] text-white shadow-[0_0_15px_rgba(97,220,176,0.15)]' : 'bg-[#15171e] border-[#272a31] text-slate-400 hover:border-slate-500'}`}
                 >
                     <span className="font-medium truncate">{sub}</span>
                 </button>
             ))}
             {subjects.length === 0 && <span className="text-slate-500 text-sm">Please select an exam/class first.</span>}
         </div>
      </div>
  );
};

const ChapterSelector = ({ chapters, selectedIds, onSelect }: { chapters: {id: string, name?: string, chapterName?: string, formulas: unknown[]}[], selectedIds: string[], onSelect: (ids: string[]) => void }) => {
  return (
      <div className="flex flex-col gap-3">
         <div className="flex justify-between items-end">
             <label className="text-sm font-semibold text-slate-300">4. Select Chapters to Practice</label>
             <button
                 onClick={() => {
                     const allIds = chapters.map((c: {id: string}) => c.id);
                     // Add new ones without removing existing ones from other subjects
                     const newSelection = Array.from(new Set([...selectedIds, ...allIds]));
                     onSelect(newSelection);
                 }}
                 className="text-xs text-[#61dcb0] hover:underline"
             >
                 Select All
             </button>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
             {chapters.map((ch: {id: string, name?: string, chapterName?: string, formulas: unknown[]}) => {
                 const isSelected = selectedIds.includes(ch.id);
                 return (
                     <button
                         key={ch.id}
                         onClick={() => {
                             if (isSelected) onSelect(selectedIds.filter((id: string) => id !== ch.id));
                             else onSelect([...selectedIds, ch.id]);
                         }}
                         className={`text-left p-3 rounded-lg border transition-all flex items-start gap-3 ${isSelected ? 'bg-[#1c1e26] border-[#61dcb0] text-white' : 'bg-[#15171e] border-[#272a31] text-slate-400 hover:bg-[#1c1e26] hover:border-slate-500'}`}
                     >
                         <div className={`mt-0.5 shrink-0 w-4 h-4 rounded border flex items-center justify-center ${isSelected ? 'bg-[#61dcb0] border-[#61dcb0]' : 'border-slate-500'}`}>
                             {isSelected && <X className="w-3 h-3 text-[#0a0a0a]" />}
                         </div>
                         <div className="flex flex-col">
                             <span className="text-sm font-medium line-clamp-2 leading-tight">{ch.name || ch.chapterName}</span>
                             <span className="text-[10px] text-slate-500 mt-1">{ch.formulas.length} formulas</span>
                         </div>
                     </button>
                 );
             })}
         </div>
      </div>
  );
};

// --- Main Dashboard ---
export default function QuizDashboard() {
  const navigate = useNavigate();
  const [selectedChapters, setSelectedChapters] = useLocalStorage<string[]>("askformula-quiz-chapters", []);

  // Filter State
  const [exam, setExam] = useState<"school" | "jee" | "neet">("school");
  const [cls, setCls] = useState<"11" | "12">("11");
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  const availableChapters = useMemo(() => {
     if (!selectedSubject) return [];
     let chapters = getChaptersBySubject(selectedSubject);
     if (exam === "school" || exam === "neet") {
         chapters = chapters.filter(c => c.class === cls);
     }
     return chapters;
  }, [selectedSubject, exam, cls]);

  const selectedChaptersInfo = useMemo(() => {
     const infos: {id: string, name: string, subject: string}[] = [];
     allSubjects.forEach(subject => {
         subject.chapters.forEach(chapter => {
             if (selectedChapters.includes(chapter.id)) {
                 if (!infos.find(i => i.id === chapter.id)) {
                    infos.push({ id: chapter.id, name: chapter.name || chapter.chapterName || "Unknown", subject: subject.subject });
                 }
             }
         });
     });
     return infos;
  }, [selectedChapters]);

  const removeChapter = (id: string) => {
      setSelectedChapters(selectedChapters.filter(cid => cid !== id));
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-slate-200 font-sans pb-24 selection:bg-[#324565] selection:text-[#d8e2ff]">
      <header className="w-full border-b border-[#272a31] bg-[#0a0a0a]/80 backdrop-blur-md sticky top-0 z-40">
         <div className="max-w-[1200px] mx-auto h-16 px-6 md:px-8 flex items-center justify-between">
             <div className="flex items-center gap-4">
                 <h1 className="text-xl font-bold text-[#d8e2ff] tracking-tight cursor-pointer" onClick={() => navigate('/')}>AskFormula</h1>
                 <span className="hidden md:inline-flex bg-[#324565]/30 text-[#d8e2ff] text-xs px-2 py-0.5 rounded border border-[#324565]/50">Practice Setup</span>
             </div>
             <button
                onClick={() => navigate('/')}
                className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-2"
             >
                 <Home className="w-4 h-4" />
                 <span className="hidden sm:inline">Home</span>
             </button>
         </div>
      </header>

      <main className="w-full max-w-[1200px] mx-auto p-6 md:p-8 mt-4 flex flex-col md:flex-row gap-8 items-start">
        <div className="flex-1 w-full flex flex-col gap-6">
            <div>
                <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Configure Session</h2>
                <p className="text-slate-400 text-sm max-w-lg">
                    Build your custom quiz by selecting multiple chapters across different subjects, classes, or exams. Add them to your practice pool to begin.
                </p>
            </div>

            <div className="flex flex-col gap-6 p-6 rounded-xl border border-[#272a31] bg-[#11131a] shadow-xl">
                <ExamSelector onSelect={(v: string) => { setExam(v as "school" | "jee" | "neet"); setSelectedSubject(null); }} selected={exam} />
                {(exam === "school" || exam === "neet") && (
                    <ClassSelector onSelect={(v: string) => { setCls(v as "11" | "12"); setSelectedSubject(null); }} selected={cls} />
                )}
                <SubjectSelector
                    onSelect={setSelectedSubject}
                    selected={selectedSubject}
                    exam={exam}
                />

                <AnimatePresence>
                    {selectedSubject && availableChapters.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="pt-6 border-t border-[#272a31]"
                        >
                            <ChapterSelector
                                chapters={availableChapters}
                                selectedIds={selectedChapters}
                                onSelect={setSelectedChapters}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

             <div className="bg-[#11131a] border border-[#272a31] rounded-xl p-5 md:col-span-2 relative overflow-hidden flex flex-col gap-4">
                <div className="absolute inset-0 bg-gradient-to-r from-[#15171e] to-transparent opacity-50 z-0 pointer-events-none"></div>
                <div className="relative z-10 flex-1">
                  <div className="flex items-center gap-2 mb-3 text-amber-400">
                    <TrendingUp className="w-5 h-5" />
                    <h3 className="text-xs uppercase tracking-wider font-medium">Practice Insights</h3>
                  </div>
                  {selectedChapters.length > 0 ? (
                      <>
                        <h4 className="text-xl font-semibold text-white mb-1">Ready to start</h4>
                        <p className="text-slate-400 text-sm">
                            You have selected {selectedChapters.length} chapter{selectedChapters.length === 1 ? '' : 's'}. Our zero-compute engine will generate identification, numerical, and proportionality questions directly from your selected syllabus.
                        </p>
                      </>
                  ) : (
                      <>
                        <h4 className="text-xl font-semibold text-white mb-1">Select chapters above</h4>
                        <p className="text-slate-400 text-sm">
                           To view insights, build your formula sheets, or practice problems, please add chapters to your selection pool.
                        </p>
                      </>
                  )}
                </div>
            </div>
        </div>

        <div className="w-full md:w-80 shrink-0 flex flex-col gap-4 sticky top-24">
            <div className="bg-[#15171e] rounded-xl border border-[#272a31] overflow-hidden flex flex-col shadow-xl">
                <div className="p-4 border-b border-[#272a31] bg-[#1c1e26] flex items-center justify-between">
                    <h3 className="font-semibold text-white flex items-center gap-2">
                        <Target className="w-4 h-4 text-[#61dcb0]" /> Selected Pool
                    </h3>
                    <span className="bg-[#324565]/30 text-[#d8e2ff] text-xs px-2 py-0.5 rounded-full font-mono">{selectedChapters.length}</span>
                </div>

                <div className="flex-1 max-h-[400px] overflow-y-auto p-4 custom-scrollbar">
                    {selectedChaptersInfo.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-8 text-center text-slate-500 gap-3">
                            <BookOpen className="w-8 h-8 opacity-20" />
                            <p className="text-sm">No chapters selected yet.</p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-2">
                            {selectedChaptersInfo.map(info => (
                                <div key={info.id} className="bg-[#11131a] border border-[#272a31] rounded-lg p-3 flex justify-between items-start group">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-semibold text-[#61dcb0] mb-0.5 uppercase tracking-wider">{info.subject}</span>
                                        <span className="text-sm text-slate-300 leading-snug pr-4">{info.name}</span>
                                    </div>
                                    <button
                                        onClick={() => removeChapter(info.id)}
                                        className="text-slate-600 hover:text-red-400 transition-colors p-1 -mr-1 -mt-1 rounded hover:bg-red-400/10"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="p-4 border-t border-[#272a31] bg-[#11131a]">
                    <button
                        onClick={() => navigate('/quiz/active')}
                        disabled={selectedChapters.length === 0}
                        className="w-full bg-[#d8e2ff] text-[#003122] font-semibold py-3 px-4 rounded-lg hover:bg-white transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(216,226,255,0.1)]"
                    >
                        <PlayCircle className="w-5 h-5" />
                        Start Practice
                    </button>
                    {selectedChapters.length === 0 && (
                        <p className="text-center text-xs text-slate-500 mt-3">Select at least one chapter to begin.</p>
                    )}
                </div>
            </div>

            <div className="bg-[#11131a] border border-[#272a31] rounded-xl p-4 text-sm text-slate-400 flex flex-col gap-2 shadow-lg">
                <p className="flex items-start gap-2">
                    <GraduationCap className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">The engine dynamically generates identification, computation, and proportionality questions directly from your selected syllabus.</span>
                </p>
                <div className="h-px bg-[#272a31] w-full my-2"></div>
                <p className="flex items-start gap-2">
                    <TriangleAlert className="w-4 h-4 text-amber-500/70 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">All generated data relies strictly on the official static formulas configured in your sheets. No LLM APIs are used during the quiz.</span>
                </p>
            </div>

        </div>
      </main>
    </div>
  );
}
