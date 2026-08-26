import { motion } from "framer-motion";

interface ClassSelectorProps {
  onSelect: (cls: string) => void;
  selected: string | null;
}

const classes = [
  { id: "11", name: "Class 11" },
  { id: "12", name: "Class 12", disabled: false },
];

export default function ClassSelector({
  onSelect,
  selected,
}: ClassSelectorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-4"
    >
      <h2 className="text-xl font-semibold text-[#e1e2ec] tracking-[-0.02em] flex items-center">
        <span className="font-mono text-[13px] text-[#aec6ff] bg-[#00275d]/20 px-2 py-0.5 rounded mr-2">
          02
        </span>
        Select your class
      </h2>
      <div className="grid grid-cols-2 gap-3 sm:max-w-md">
        {classes.map((cls) => (
          <motion.button
            key={cls.id}
            whileHover={cls.disabled ? {} : { scale: 1.02 }}
            whileTap={cls.disabled ? {} : { scale: 0.97 }}
            onClick={() => !cls.disabled && onSelect(cls.id)}
            disabled={cls.disabled}
            className={`
              group relative px-5 py-4 rounded-2xl text-center transition-all duration-200
              backdrop-blur-2xl border
              ${
                cls.disabled
                  ? "bg-white/[0.01] border-white/[0.02] text-slate-500/50 cursor-not-allowed"
                  : selected === cls.id
                    ? "bg-blue-500/[0.12] border-blue-400/30 shadow-[0_0_30px_-8px_rgba(59,130,246,0.15)] text-blue-400 cursor-pointer"
                    : "bg-white/[0.03] border-white/[0.06] hover:bg-white/[0.06] hover:border-white/[0.12] text-white cursor-pointer"
              }
            `}
          >
            <h3
              className={`text-[15px] font-semibold ${cls.disabled ? "text-white/50" : ""}`}
            >
              {cls.name}
            </h3>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
