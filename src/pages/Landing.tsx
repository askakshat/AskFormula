import { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw } from "lucide-react";
import Hero from "@/components/askformula/Hero";
import ExamSelector from "@/components/askformula/ExamSelector";
import ClassSelector from "@/components/askformula/ClassSelector";
import SubjectSelector from "@/components/askformula/SubjectSelector";
import ChapterSelector from "@/components/askformula/ChapterSelector";
import FormulaGrid from "@/components/askformula/FormulaGrid";
import PDFButton from "@/components/askformula/PDFButton";
import Footer from "@/components/askformula/Footer";
import { getChaptersBySubject, filterFormulas } from "@/lib/formulas";
import { useLocalStorage } from "@/lib/local-storage";

export default function Landing() {
  const [exam, setExam] = useState<"school" | "jee" | "neet" | null>(null);
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [subject, setSubject] = useState<string | null>(null);
  const [selectedChapters, setSelectedChapters] = useLocalStorage<string[]>(
    "askformula-selected-chapters",
    [],
  );

  const classRef = useRef<HTMLDivElement>(null);
  const subjectRef = useRef<HTMLDivElement>(null);
  const chapterRef = useRef<HTMLDivElement>(null);
  const formulaRef = useRef<HTMLDivElement>(null);

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
      <Hero />

      <section
        id="app-section"
        className="relative flex-grow flex justify-center w-full bg-[#0b0e15]"
      >
        <div className="w-full max-w-[1200px] px-6 md:px-12 py-16 relative">
          {/* Breadcrumb / Step indicator */}
          {exam && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 text-[12px] font-medium text-slate-400 mb-8"
            >
              <span className="hover:text-[#aec6ff] cursor-pointer transition-colors" onClick={() => { setSubject(null); setSelectedClass(null); }}>
                {exam === "school" ? "School" : exam === "jee" ? "JEE" : "NEET"}
              </span>
              {selectedClass && (
                <>
                  <span>/</span>
                  <span className="hover:text-[#aec6ff] cursor-pointer transition-colors" onClick={() => setSubject(null)}>
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

          {/* Step 5: Formula Grid */}
          <AnimatePresence>
            {formulas.length > 0 && (
              <motion.div
                ref={formulaRef}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-28 sm:mb-20 pb-20 sm:pb-0"
              >
                <FormulaGrid formulas={formulas} chapters={chapters.filter((ch) => selectedChapters.includes(ch.id))} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Footer />
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
