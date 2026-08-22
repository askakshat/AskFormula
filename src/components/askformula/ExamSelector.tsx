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
  disabled?: boolean;
}[] = [
  {
    type: "school",
    label: "School",
    subtitle: "CBSE · ICSE · State Boards",
    icon: <BookOpen className="w-7 h-7" strokeWidth={1.5} />,
  },
  {
    type: "jee",
    label: "JEE (Coming Soon)",
    subtitle: "Main & Advanced",
    icon: <Target className="w-7 h-7" strokeWidth={1.5} />,
    disabled: true,
  },
  {
    type: "neet",
    label: "NEET (Coming Soon)",
    subtitle: "UG Medical Entrance",
    icon: <FlaskConical className="w-7 h-7" strokeWidth={1.5} />,
    disabled: true,
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
            whileHover={exam.disabled ? {} : { scale: 1.015 }}
            whileTap={exam.disabled ? {} : { scale: 0.985 }}
            onClick={() => !exam.disabled && onSelect(exam.type)}
            disabled={exam.disabled}
            className={`
              group relative p-5 rounded-2xl text-left transition-all duration-200
              backdrop-blur-2xl border
              ${
                exam.disabled
                  ? "bg-white/[0.01] border-white/[0.02] text-slate-500/50 cursor-not-allowed"
                  : selected === exam.type
                    ? "bg-blue-500/[0.12] border-blue-400/30 shadow-[0_0_30px_-8px_rgba(59,130,246,0.15)] cursor-pointer"
                    : "bg-white/[0.03] border-white/[0.06] hover:bg-white/[0.06] hover:border-white/[0.12] cursor-pointer"
              }
            `}
          >
            <div className="relative z-10">
              <div
                className={`mb-3 ${
                  exam.disabled
                    ? "text-slate-500/50"
                    : selected === exam.type
                      ? "text-blue-400"
                      : "text-slate-500 group-hover:text-slate-400"
                } transition-colors duration-200`}
              >
                {exam.icon}
              </div>
              <h3 className={`text-[15px] font-semibold mb-0.5 ${exam.disabled ? 'text-white/50' : 'text-white'}`}>
                {exam.label}
              </h3>
              <p className={`text-xs ${exam.disabled ? 'text-slate-500/50' : 'text-slate-500'}`}>
                {exam.subtitle}
              </p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
