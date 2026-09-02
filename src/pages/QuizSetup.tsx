import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import ChapterSelector from '@/components/askformula/ChapterSelector';
import SubjectSelector from '@/components/askformula/SubjectSelector';
import ClassSelector from '@/components/askformula/ClassSelector';
import ExamSelector from '@/components/askformula/ExamSelector';
import { allSubjects } from '@/lib/formulas';
import { useLocalStorage } from '@/lib/local-storage';

export default function QuizSetup() {
  const navigate = useNavigate();
  const [selectedChapters, setSelectedChapters] = useLocalStorage<string[]>("askformula-quiz-chapters", []);

  const [exam, setExam] = useState<"school" | "jee" | "neet">("school");
  const [cls, setCls] = useState<"11" | "12">("11");
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  // Derive chapters based on filters
  const filteredChapters = useMemo(() => {
    if (!selectedSubject) return [];

    // Logic similar to Build.tsx
    let targetSubjectName = selectedSubject;
    if (exam === "jee") {
      targetSubjectName = "JEE " + selectedSubject;
    }

    const subjectData = allSubjects.find(
      (s) => s.subject.toLowerCase() === targetSubjectName.toLowerCase()
    );

    if (!subjectData) return [];

    return subjectData.chapters.filter((ch) => {
        if (exam === "school" || exam === "neet") {
            return ch.class === cls;
        }
        return true; // JEE combines classes usually in the data or we can filter if needed
    });
  }, [exam, cls, selectedSubject]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-slate-200 font-sans p-6 md:p-12">
        <div className="max-w-4xl mx-auto flex flex-col gap-8">
            <button
                onClick={() => navigate('/quiz')}
                className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors self-start"
            >
                <ArrowLeft className="w-4 h-4" /> Back to Dashboard
            </button>

            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Configure Practice Session</h1>
                <p className="text-slate-400">Select your target exam, class, subject, and specific chapters.</p>
            </div>

            <div className="bg-[#11131a] border border-[#272a31] rounded-xl p-6 flex flex-col gap-8 shadow-xl">
                <ExamSelector onSelect={(v) => setExam(v as "school" | "jee" | "neet")} selected={exam} />
                {(exam === "school" || exam === "neet") && (
                    <ClassSelector onSelect={(v) => setCls(v as "11" | "12")} selected={cls} />
                )}
                <SubjectSelector
                    onSelect={setSelectedSubject}
                    selected={selectedSubject}
                    exam={exam}
                />

                {selectedSubject && filteredChapters.length > 0 && (
                    <div className="pt-8 border-t border-[#272a31]">
                        <ChapterSelector
                            chapters={filteredChapters}
                            selectedIds={selectedChapters}
                            onSelect={setSelectedChapters}
                        />
                    </div>
                )}
            </div>

            <div className="flex justify-end">
                <button
                    onClick={() => navigate('/quiz/active')}
                    disabled={selectedChapters.length === 0}
                    className="bg-[#d8e2ff] text-[#003122] font-semibold px-8 py-4 rounded-xl hover:bg-white transition-colors flex items-center gap-2 shadow-[0_0_20px_rgba(216,226,255,0.1)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Begin Session
                    <span className="material-symbols-outlined">play_arrow</span>
                </button>
            </div>
        </div>
    </div>
  );
}
