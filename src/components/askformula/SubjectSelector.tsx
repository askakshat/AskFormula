import { motion } from "framer-motion";
import { Atom, FlaskConical, Calculator, Leaf } from "lucide-react";

interface SubjectSelectorProps {
  onSelect: (subject: string) => void;
  selected: string | null;
}

const examSubjects: Record<string, { name: string; icon: React.ReactNode }[]> = {
  school: [
    { name: "Physics", icon: <Atom className="w-7 h-7" /> },
    { name: "Chemistry", icon: <FlaskConical className="w-7 h-7" /> },
    { name: "Mathematics", icon: <Calculator className="w-7 h-7" /> },
    { name: "Biology", icon: <Leaf className="w-7 h-7" /> },
  ],
  jee: [
    { name: "Physics", icon: <Atom className="w-7 h-7" /> },
    { name: "Chemistry", icon: <FlaskConical className="w-7 h-7" /> },
    { name: "Mathematics", icon: <Calculator className="w-7 h-7" /> },
  ],
  neet: [
    { name: "Physics", icon: <Atom className="w-7 h-7" /> },
    { name: "Chemistry", icon: <FlaskConical className="w-7 h-7" /> },
    { name: "Biology", icon: <Leaf className="w-7 h-7" /> },
  ],
};

export default function SubjectSelector({ onSelect, selected }: SubjectSelectorProps) {
  const subjects = examSubjects.school; // Version 1: School only

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-4"
    >
      <h2 className="text-xl font-semibold text-white">
        <span className="text-blue-400 mr-2">02</span>
        Select Subject
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {subjects.map((subject) => (
          <motion.button
            key={subject.name}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onSelect(subject.name)}
            className={`
              group relative p-5 rounded-2xl text-center transition-all duration-300 cursor-pointer
              backdrop-blur-xl border
              ${
                selected === subject.name
                  ? "bg-blue-500/20 border-blue-400/50 shadow-lg shadow-blue-500/10"
                  : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
              }
            `}
          >
            {selected === subject.name && (
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/10 to-transparent" />
            )}

            <div className="relative z-10">
              <div
                className={`mb-2 mx-auto ${
                  selected === subject.name
                    ? "text-blue-400"
                    : "text-slate-400 group-hover:text-slate-300"
                } transition-colors flex justify-center`}
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
