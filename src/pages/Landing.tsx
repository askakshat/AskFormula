import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Hero from "@/components/askformula/Hero";
import ExamSelector from "@/components/askformula/ExamSelector";
import SubjectSelector from "@/components/askformula/SubjectSelector";
import ChapterSelector from "@/components/askformula/ChapterSelector";
import FormulaGrid from "@/components/askformula/FormulaGrid";
import PDFButton from "@/components/askformula/PDFButton";
import Footer from "@/components/askformula/Footer";
import { getChaptersBySubject, filterFormulas } from "@/lib/formulas";
import { Atom } from "lucide-react";

export default function Landing() {
  const [exam, setExam] = useState<"school" | "jee" | "neet" | null>(null);
  const [subject, setSubject] = useState<string | null>(null);
  const [selectedChapters, setSelectedChapters] = useState<string[]>([]);

  // Get chapters for selected subject
  const chapters = useMemo(() => {
    if (!subject) return [];
    return getChaptersBySubject(subject);
  }, [subject]);

  // Get filtered formulas
  const formulas = useMemo(() => {
    if (!subject || selectedChapters.length === 0) return [];
    return filterFormulas(subject, selectedChapters);
  }, [subject, selectedChapters]);

  // Reset selections when subject changes
  const handleSubjectSelect = (s: string) => {
    setSubject(s);
    setSelectedChapters([]);
  };

  // Reset when exam changes
  const handleExamSelect = (e: "school" | "jee" | "neet") => {
    setExam(e);
    setSubject(null);
    setSelectedChapters([]);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* App Section */}
      <section
        id="app-section"
        className="relative min-h-screen bg-gradient-to-b from-slate-950 via-indigo-950/50 to-slate-950"
      >
        {/* Background blur orbs */}
        <div className="absolute top-0 left-1/3 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-violet-500/5 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          {/* Navigation bar */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="inline-flex items-center gap-2 mb-8">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-400/20 flex items-center justify-center backdrop-blur-xl">
                <Atom className="w-5 h-5 text-blue-400" />
              </div>
              <span className="text-2xl font-bold text-white">
                Ask<span className="text-blue-400">Formula</span>
              </span>
            </div>

            {/* Step progress indicator */}
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span className={exam ? "text-blue-400" : ""}>Exam</span>
              <span>→</span>
              <span className={subject ? "text-blue-400" : ""}>Subject</span>
              <span>→</span>
              <span className={selectedChapters.length > 0 ? "text-blue-400" : ""}>Chapters</span>
              <span>→</span>
              <span className={formulas.length > 0 ? "text-blue-400" : ""}>Formulas</span>
            </div>
          </motion.div>

          {/* Step 1: Exam Selector */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-10"
          >
            <ExamSelector onSelect={handleExamSelect} selected={exam} />
          </motion.div>

          {/* Step 2: Subject Selector */}
          <AnimatePresence>
            {exam && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-10 overflow-hidden"
              >
                <SubjectSelector onSelect={handleSubjectSelect} selected={subject} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Step 3: Chapter Selector */}
          <AnimatePresence>
            {subject && chapters.length > 0 && (
              <motion.div
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

          {/* Step 4: Formula Grid */}
          <AnimatePresence>
            {formulas.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-24"
              >
                <FormulaGrid formulas={formulas} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
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
