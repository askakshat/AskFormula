import { motion } from "framer-motion";
import { Atom, FlaskConical, Calculator, Leaf } from "lucide-react";

interface SubjectSelectorProps {
  onSelect: (subject: string) => void;
  selected: string | null;
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

export default function SubjectSelector({ onSelect, selected }: SubjectSelectorProps) {
  const subjects = examSubjects.school; // Version 1: School only

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-4"
    >
      <h2 className="text-xl font-semibold text-white tracking-[-0.02em]">
        <span className="text-blue-400/70 mr-2 text-base font-medium">02</span>
        Pick a subject
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {subjects.map((subject) => (
          <motion.button
            key={subject.name}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onSelect(subject.name)}
            className={`
              group relative p-5 rounded-2xl text-center transition-all duration-200 cursor-pointer
              backdrop-blur-2xl border
              ${
                selected === subject.name
                  ? "bg-blue-500/[0.12] border-blue-400/30 shadow-[0_0_30px_-8px_rgba(59,130,246,0.15)]"
                  : "bg-white/[0.03] border-white/[0.06] hover:bg-white/[0.06] hover:border-white/[0.12]"
              }
            `}
          >
            <div className="relative z-10">
              <div
                className={`mb-2.5 mx-auto ${
                  selected === subject.name
                    ? "text-blue-400"
                    : "text-slate-500 group-hover:text-slate-400"
                } transition-colors duration-200 flex justify-center`}
              >
                {subject.icon}
              </div>
              <h3 className="text-sm font-medium text-white">{subject.name}</h3>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
