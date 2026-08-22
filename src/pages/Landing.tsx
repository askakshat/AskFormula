import { useState, useMemo, useRef, useEffect } from "react";
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
  const [selectedChapters, setSelectedChapters] = useLocalStorage<string[]>("askformula-selected-chapters", []);

  const classRef = useRef<HTMLDivElement>(null);
  const subjectRef = useRef<HTMLDivElement>(null);
  const chapterRef = useRef<HTMLDivElement>(null);
  const formulaRef = useRef<HTMLDivElement>(null);

  const chapters = useMemo(() => {
    if (!subject || !selectedClass) return [];
    return getChaptersBySubject(subject).filter((ch) => ch.class === selectedClass);
  }, [subject, selectedClass]);

  const formulas = useMemo(() => {
    if (!subject || selectedChapters.length === 0) return [];
    return filterFormulas(subject, selectedChapters);
  }, [subject, selectedChapters]);

  const handleSubjectSelect = (s: string) => {
    setSubject(s);
    setSelectedChapters([]);
    setTimeout(() => {
      chapterRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
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
      document.getElementById("app-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  useEffect(() => {
    if (formulas.length > 0) {
      setTimeout(() => {
        formulaRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 150);
    }
  }, [formulas.length]);

  const steps = [
    { label: "Exam", done: !!exam },
    { label: "Class", done: !!selectedClass },
    { label: "Subject", done: !!subject },
    { label: "Chapters", done: selectedChapters.length > 0 },
    { label: "Formulas", done: formulas.length > 0 },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Hero />

      <section
        id="app-section"
        className="relative min-h-screen overflow-x-hidden bg-gradient-to-b from-slate-950 via-[#080c18] to-slate-950"
      >
        {/* Subtle ambient orbs */}
        <div className="absolute top-0 left-1/3 w-80 h-80 bg-blue-500/[0.03] rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-violet-500/[0.03] rounded-full blur-[100px]" />

        <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
          {/* Step indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-14 flex flex-col sm:flex-row sm:items-center justify-between gap-6"
          >
            <div className="flex flex-wrap items-center gap-y-3 gap-x-1.5 sm:gap-x-2">
              {steps.map((step, i) => (
                <div key={step.label} className="flex items-center gap-1.5 sm:gap-2">
                  <div className="flex items-center gap-1.5">
                    <div
                      className={`w-6 h-6 rounded-full text-[11px] font-semibold flex items-center justify-center transition-all duration-300 ${
                        step.done
                          ? "bg-blue-500 text-white"
                          : "bg-white/[0.04] text-slate-600 border border-white/[0.06]"
                      }`}
                    >
                      {i + 1}
                    </div>
                    <span
                      className={`text-xs font-medium transition-colors duration-300 ${
                        step.done ? "text-slate-300" : "text-slate-600"
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div
                      className={`w-6 sm:w-10 h-px transition-colors duration-300 ${
                        steps[i + 1].done ? "bg-blue-500/40" : "bg-white/[0.06]"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            <AnimatePresence>
              {exam && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  onClick={handleReset}
                  className="flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-white px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] transition-all self-start sm:self-auto cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Start Over
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>

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
                <ClassSelector onSelect={handleClassSelect} selected={selectedClass} />
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
                <ClassSelector onSelect={handleClassSelect} selected={selectedClass} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Step 3: Subject Selector */}
          <AnimatePresence>
            {selectedClass && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-10 overflow-hidden"
              >
                <SubjectSelector onSelect={handleSubjectSelect} selected={subject} exam={exam!} />
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
                <FormulaGrid formulas={formulas} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Footer />
      </section>

      {/* Floating PDF Button */}
      {formulas.length > 0 && (
        <PDFButton
          formulas={formulas.map((f) => ({
            id: f.id,
            name: f.name,
            latex: f.latex,
            tags: f.tags,
            chapter: "chapter" in f ? (f as { chapter?: string }).chapter : undefined,
          }))}
          subject={subject ?? "Physics"}
        />
      )}
    </div>
  );
}
