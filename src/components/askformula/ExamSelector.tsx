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
    subtitle: "CBSE · ICSE · State Boards",
    icon: <BookOpen className="w-7 h-7" strokeWidth={1.5} />,
  },
  {
    type: "jee",
    label: "JEE",
    subtitle: "Main & Advanced",
    icon: <Target className="w-7 h-7" strokeWidth={1.5} />,
  },
  {
    type: "neet",
    label: "NEET",
    subtitle: "UG Medical Entrance",
    icon: <FlaskConical className="w-7 h-7" strokeWidth={1.5} />,
  },
];

export default function ExamSelector({ onSelect, selected }: ExamSelectorProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-white tracking-[-0.02em]">
        <span className="text-blue-400/70 mr-2 text-base font-medium">01</span>
        Choose your exam
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {exams.map((exam) => (
          <motion.button
            key={exam.type}
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.985 }}
            onClick={() => onSelect(exam.type)}
            className={`
              group relative p-5 rounded-2xl text-left transition-all duration-200 cursor-pointer
              backdrop-blur-2xl border
              ${
                selected === exam.type
                  ? "bg-blue-500/[0.12] border-blue-400/30 shadow-[0_0_30px_-8px_rgba(59,130,246,0.15)]"
                  : "bg-white/[0.03] border-white/[0.06] hover:bg-white/[0.06] hover:border-white/[0.12]"
              }
            `}
          >
            <div className="relative z-10">
              <div
                className={`mb-3 ${
                  selected === exam.type
                    ? "text-blue-400"
                    : "text-slate-500 group-hover:text-slate-400"
                } transition-colors duration-200`}
              >
                {exam.icon}
              </div>
              <h3 className="text-[15px] font-semibold text-white mb-0.5">
                {exam.label}
              </h3>
              <p className="text-xs text-slate-500">{exam.subtitle}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
