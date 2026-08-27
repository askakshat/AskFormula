import { useState, useMemo, useRef, useEffect } from "react";
import { useSearchParams } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw } from "lucide-react";
import ExamSelector from "@/components/askformula/ExamSelector";
import ClassSelector from "@/components/askformula/ClassSelector";
import SubjectSelector from "@/components/askformula/SubjectSelector";
import ChapterSelector from "@/components/askformula/ChapterSelector";
import PDFButton from "@/components/askformula/PDFButton";
import { getChaptersBySubject, filterFormulas } from "@/lib/formulas";
import { useLocalStorage } from "@/lib/local-storage";

export default function Build() {
  const [exam, setExam] = useState<"school" | "jee" | "neet" | null>(null);
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [subject, setSubject] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  // Template pre-fill logic
  useEffect(() => {
    const template = searchParams.get('template');
    if (template) {
      if (template === 'jee-physics') {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setExam('jee');
        setSelectedClass('12');
        setSubject('Physics');
      } else if (template === 'neet-bio') {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setExam('neet');
        setSelectedClass('11');
        setSubject('Biology');
      } else if (template === 'cbse-math') {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setExam('school');
        setSelectedClass('12');
        setSubject('Mathematics');
      }

      // Clear param so it doesn't persist awkwardly
      searchParams.delete('template');
      setSearchParams(searchParams, { replace: true });
    }
  }, [searchParams, setSearchParams, setExam, setSelectedClass, setSubject]);

  const [selectedChapters, setSelectedChapters] = useLocalStorage<string[]>(
    "askformula-selected-chapters",
    [],
  );

  const classRef = useRef<HTMLDivElement>(null);

  const subjectRef = useRef<HTMLDivElement>(null);
  const chapterRef = useRef<HTMLDivElement>(null);

  const handleReset = () => {
    setExam(null);
    setSelectedClass(null);
    setSubject(null);
    setSelectedChapters([]);
  };

  const chapters = useMemo(() => {
    if (!subject || !selectedClass) return [];
    return getChaptersBySubject(subject).filter(
      (ch) => ch.class === selectedClass,
    );
  }, [subject, selectedClass]);

  const formulas = useMemo(() => {
    if (!subject || selectedChapters.length === 0) return [];
    return filterFormulas(subject, selectedChapters);
  }, [subject, selectedChapters]);

  const handleSubjectSelect = (s: string) => {
    setSubject(s);
    setSelectedChapters([]);
    setTimeout(() => {
      chapterRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 150);
  };

  const handleExamSelect = (e: "school" | "jee" | "neet") => {
    setExam(e);
    setSelectedClass(null);
    setSubject(null);
    setSelectedChapters([]);
  };

  const handleClassSelect = (cls: string) => {
    setSelectedClass(cls);
    setSubject(null);
    setSelectedChapters([]);
    setTimeout(() => {
      document
        .getElementById("app-section")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#0b0e15] text-[#e1e2ec] font-sans flex flex-col">
      <header className="bg-surface-container-lowest dark:bg-[#0b0e15] fixed top-0 w-full z-50 border-b border-[#32353c] transition-colors duration-200">
        <div className="flex justify-between items-center px-6 md:px-12 py-3 max-w-[1200px] mx-auto h-16">
          <div
            className="flex items-center gap-3 cursor-pointer active:opacity-80"
            onClick={() => (window.location.href = "/")}
          >
            <span className="font-headline-md text-xl font-bold text-[#aec6ff]">
              AskFormula
            </span>
          </div>
          <div className="flex items-center">
            <span className="font-body-md text-[14px] text-[#e1e2ec]/70">
              Build Flow
            </span>
          </div>
        </div>
      </header>

      <section
        id="app-section"
        className="relative flex-grow flex justify-center w-full bg-[#0b0e15] pt-20"
      >
        <div className="w-full max-w-[1200px] px-6 md:px-12 py-8 flex flex-col md:flex-row gap-12 relative">
          {/* Left Sidebar: Progress Indicator */}

          {/* Sidebar / Top Progress Indicator */}
          <aside className="w-full md:w-64 flex-shrink-0">
            <div className="md:sticky md:top-32">
              <div className="hidden md:block mb-6">
                <h2 className="text-xl font-semibold text-[#aec6ff]">
                  Configuration
                </h2>
                <p className="text-[14px] text-[#e1e2ec]/70 mt-1">
                  Select your parameters
                </p>
              </div>

              {/* Horizontal steps on mobile, vertical on desktop */}
              <div className="flex flex-row overflow-x-auto pb-4 md:pb-0 md:flex-col gap-4 md:gap-4 relative scrollbar-hide snap-x">
                <div className="hidden md:block absolute left-[11px] top-4 bottom-4 w-px bg-[#32353c] -z-10" />

                {/* Steps */}
                <div className="flex items-center gap-2 md:gap-3 flex-shrink-0 snap-start">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-[12px] z-10 ${exam ? "bg-[#00275d] text-[#aec6ff]" : "bg-[#272a31] border border-[#32353c] text-[#e1e2ec]/50"}`}
                  >
                    1
                  </div>
                  <span
                    className={`text-[13px] whitespace-nowrap ${exam ? "text-[#aec6ff]" : "text-[#e1e2ec]/50"}`}
                  >
                    Board
                  </span>
                </div>

                <div className="md:hidden w-8 h-px bg-[#32353c] my-auto flex-shrink-0" />

                <div className="flex items-center gap-2 md:gap-3 flex-shrink-0 snap-start">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-[12px] z-10 ${selectedClass ? "bg-[#00275d] text-[#aec6ff]" : "bg-[#272a31] border border-[#32353c] text-[#e1e2ec]/50"}`}
                  >
                    2
                  </div>
                  <span
                    className={`text-[13px] whitespace-nowrap ${selectedClass ? "text-[#aec6ff]" : "text-[#e1e2ec]/50"}`}
                  >
                    Class
                  </span>
                </div>

                <div className="md:hidden w-8 h-px bg-[#32353c] my-auto flex-shrink-0" />

                <div className="flex items-center gap-2 md:gap-3 flex-shrink-0 snap-start">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-[12px] z-10 ${subject ? "bg-[#00275d] text-[#aec6ff]" : "bg-[#272a31] border border-[#32353c] text-[#e1e2ec]/50"}`}
                  >
                    3
                  </div>
                  <span
                    className={`text-[13px] whitespace-nowrap ${subject ? "text-[#aec6ff]" : "text-[#e1e2ec]/50"}`}
                  >
                    Subject
                  </span>
                </div>

                <div className="md:hidden w-8 h-px bg-[#32353c] my-auto flex-shrink-0" />

                <div className="flex items-center gap-2 md:gap-3 flex-shrink-0 snap-start">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-[12px] z-10 ${selectedChapters.length > 0 ? "bg-[#00275d] text-[#aec6ff]" : "bg-[#272a31] border border-[#32353c] text-[#e1e2ec]/50"}`}
                  >
                    4
                  </div>
                  <span
                    className={`text-[13px] whitespace-nowrap ${selectedChapters.length > 0 ? "text-[#aec6ff]" : "text-[#e1e2ec]/50"}`}
                  >
                    Chapters
                  </span>
                </div>
              </div>

              {exam && selectedClass && subject && (
                <div className="hidden md:flex mt-8 bg-[#272a31]/50 border border-[#aec6ff]/20 rounded-lg p-4 flex-col gap-2">
                  <span className="text-[12px] text-[#aec6ff] font-medium uppercase tracking-wider">
                    Current Context
                  </span>
                  <div className="flex flex-col gap-1 mt-2">
                    <p className="text-[14px] text-[#e1e2ec] font-medium">
                      {exam === "school"
                        ? "CBSE Board"
                        : exam === "jee"
                          ? "JEE Mains"
                          : "NEET"}
                    </p>
                    <p className="text-[13px] text-[#e1e2ec]/70">
                      Class {selectedClass}
                    </p>
                    <p className="text-[13px] text-[#e1e2ec]/70">{subject}</p>
                  </div>
                </div>
              )}
            </div>
          </aside>

          {/* Right Content */}
          <div className="flex-1 flex flex-col w-full max-w-full">
            {/* Breadcrumb / Step indicator */}
            {exam && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-2 text-[12px] font-medium text-slate-400 mb-8"
              >
                <span
                  className="hover:text-[#aec6ff] cursor-pointer transition-colors"
                  onClick={() => {
                    setSubject(null);
                    setSelectedClass(null);
                  }}
                >
                  {exam === "school"
                    ? "School"
                    : exam === "jee"
                      ? "JEE"
                      : "NEET"}
                </span>
                {selectedClass && (
                  <>
                    <span>/</span>
                    <span
                      className="hover:text-[#aec6ff] cursor-pointer transition-colors"
                      onClick={() => setSubject(null)}
                    >
                      Class {selectedClass}
                    </span>
                  </>
                )}
                {subject && (
                  <>
                    <span>/</span>
                    <span className="text-[#aec6ff]">{subject}</span>
                  </>
                )}

                <AnimatePresence>
                  <motion.button
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    onClick={handleReset}
                    className="ml-auto flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-white px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] transition-all cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Start Over
                  </motion.button>
                </AnimatePresence>
              </motion.div>
            )}

            {/* Step 1: Exam Selector */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05, duration: 0.4 }}
              className="mb-10"
            >
              <ExamSelector onSelect={handleExamSelect} selected={exam} />
            </motion.div>

            {/* Step 2: Class Selector */}
            <AnimatePresence>
              {exam && (
                <motion.div
                  ref={classRef}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mb-10 overflow-hidden"
                >
                  <ClassSelector
                    onSelect={handleClassSelect}
                    selected={selectedClass}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Step 3: Subject Selector */}
            <AnimatePresence>
              {selectedClass && (
                <motion.div
                  ref={subjectRef}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mb-10 overflow-hidden"
                >
                  <SubjectSelector
                    onSelect={handleSubjectSelect}
                    selected={subject}
                    exam={exam!}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Step 4: Chapter Selector */}
            <AnimatePresence>
              {subject && chapters.length > 0 && selectedClass && (
                <motion.div
                  ref={chapterRef}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mb-10 overflow-hidden"
                >
                  <ChapterSelector
                    chapters={chapters}
                    onSelect={setSelectedChapters}
                    selectedIds={selectedChapters}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Floating PDF Button */}
      {selectedChapters.length > 0 && (
        <PDFButton
          formulas={formulas.map((f) => ({
            id: f.id,
            name: f.name,
            latex: f.latex,
            tags: f.tags,
            chapter:
              "chapter" in f ? (f as { chapter?: string }).chapter : undefined,
          }))}
          chapters={chapters.filter((ch) => selectedChapters.includes(ch.id))}
          subject={subject ?? "Physics"}
        />
      )}
    </div>
  );
}
