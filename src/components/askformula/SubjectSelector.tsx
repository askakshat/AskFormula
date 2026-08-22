import { motion } from "framer-motion";
import { Atom, FlaskConical, Calculator, Leaf, Lock } from "lucide-react";
import { allSubjects } from "@/lib/formulas";

type ExamType = "school" | "jee" | "neet";

interface SubjectSelectorProps {
  onSelect: (subject: string) => void;
  selected: string | null;
  exam: ExamType;
}

const examSubjects: Record<string, { name: string; icon: React.ReactNode }[]> = {
  school: [
    { name: "Physics", icon: <Atom className="w-6 h-6" strokeWidth={1.5} /> },
    { name: "Chemistry", icon: <FlaskConical className="w-6 h-6" strokeWidth={1.5} /> },
    { name: "Mathematics", icon: <Calculator className="w-6 h-6" strokeWidth={1.5} /> },
    { name: "Biology", icon: <Leaf className="w-6 h-6" strokeWidth={1.5} /> },
  ],
  jee: [
    { name: "Physics", icon: <Atom className="w-6 h-6" strokeWidth={1.5} /> },
    { name: "Chemistry", icon: <FlaskConical className="w-6 h-6" strokeWidth={1.5} /> },
    { name: "Mathematics", icon: <Calculator className="w-6 h-6" strokeWidth={1.5} /> },
  ],
  neet: [
    { name: "Physics", icon: <Atom className="w-6 h-6" strokeWidth={1.5} /> },
    { name: "Chemistry", icon: <FlaskConical className="w-6 h-6" strokeWidth={1.5} /> },
    { name: "Biology", icon: <Leaf className="w-6 h-6" strokeWidth={1.5} /> },
  ],
};

export default function SubjectSelector({ onSelect, selected, exam }: SubjectSelectorProps) {
  const subjects = examSubjects[exam] || examSubjects.school;
  const availableSubjectNames = new Set(allSubjects.map(s => s.subject.toLowerCase()));

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-4"
    >
      <h2 className="text-xl font-semibold text-white tracking-[-0.02em]">
        <span className="text-blue-400/70 mr-2 text-base font-medium">03</span>
        Pick a subject
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {subjects.map((subject) => {
          const isAvailable = availableSubjectNames.has(subject.name.toLowerCase());

          return (
            <motion.button
              key={subject.name}
              whileHover={isAvailable ? { scale: 1.02 } : {}}
              whileTap={isAvailable ? { scale: 0.97 } : {}}
              onClick={() => isAvailable && onSelect(subject.name)}
              disabled={!isAvailable}
              className={`
                group relative p-5 rounded-2xl text-center transition-all duration-200
                backdrop-blur-2xl border
                ${
                  !isAvailable
                    ? "bg-slate-900/50 border-slate-800/50 cursor-not-allowed opacity-75"
                    : selected === subject.name
                    ? "bg-blue-500/[0.12] border-blue-400/30 shadow-[0_0_30px_-8px_rgba(59,130,246,0.15)] cursor-pointer"
                    : "bg-white/[0.03] border-white/[0.06] hover:bg-white/[0.06] hover:border-white/[0.12] cursor-pointer"
                }
              `}
            >
              <div className="relative z-10">
                <div
                  className={`mb-2.5 mx-auto ${
                    !isAvailable
                      ? "text-slate-600"
                      : selected === subject.name
                      ? "text-blue-400"
                      : "text-slate-500 group-hover:text-slate-400"
                  } transition-colors duration-200 flex justify-center`}
                >
                  {subject.icon}
                </div>
                <h3 className={`text-sm font-medium ${!isAvailable ? "text-slate-500" : "text-white"}`}>
                  {subject.name}
                </h3>

                {!isAvailable && (
                  <div className="absolute top-0 right-0 -mt-2 -mr-2 bg-slate-800 border border-slate-700 rounded-full px-2 py-0.5 flex items-center gap-1 shadow-lg">
                    <Lock className="w-3 h-3 text-slate-400" />
                    <span className="text-[10px] font-medium text-slate-300 whitespace-nowrap">Coming soon</span>
                  </div>
                )}
                {isAvailable && (
                  <div className="absolute top-0 right-0 -mt-2 -mr-2 bg-blue-500/20 border border-blue-400/30 rounded-full px-2 py-0.5 flex items-center shadow-lg">
                    <span className="text-[10px] font-medium text-blue-300 whitespace-nowrap">Ready</span>
                  </div>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
