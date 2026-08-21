import { motion } from "framer-motion";
import { BookOpen, Target, FlaskConical } from "lucide-react";

type ExamType = "school" | "jee" | "neet";

interface ExamSelectorProps {
  onSelect: (exam: ExamType) => void;
  selected: ExamType | null;
}

const exams: {
  type: ExamType;
  label: string;
  subtitle: string;
  icon: React.ReactNode;
}[] = [
  {
    type: "school",
    label: "School",
    subtitle: "CBSE / ICSE",
    icon: <BookOpen className="w-8 h-8" />,
  },
  {
    type: "jee",
    label: "JEE",
    subtitle: "Main + Advanced",
    icon: <Target className="w-8 h-8" />,
  },
  {
    type: "neet",
    label: "NEET",
    subtitle: "Medical Entrance",
    icon: <FlaskConical className="w-8 h-8" />,
  },
];

export default function ExamSelector({ onSelect, selected }: ExamSelectorProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-white">
        <span className="text-blue-400 mr-2">01</span>
        Select Exam Type
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {exams.map((exam) => (
          <motion.button
            key={exam.type}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(exam.type)}
            className={`
              group relative p-6 rounded-2xl text-left transition-all duration-300 cursor-pointer
              backdrop-blur-xl border
              ${
                selected === exam.type
                  ? "bg-blue-500/20 border-blue-400/50 shadow-lg shadow-blue-500/10"
                  : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
              }
            `}
          >
            {/* Glow effect on selected */}
            {selected === exam.type && (
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/10 to-transparent" />
            )}

            <div className="relative z-10">
              <div
                className={`mb-3 ${
                  selected === exam.type ? "text-blue-400" : "text-slate-400 group-hover:text-slate-300"
                } transition-colors`}
              >
                {exam.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">
                {exam.label}
              </h3>
              <p className="text-sm text-slate-400">{exam.subtitle}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
