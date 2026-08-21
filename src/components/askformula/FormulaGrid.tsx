import { motion } from "framer-motion";
import FormulaCard from "./FormulaCard";
import type { Formula } from "@/lib/formulas";

interface FormulaGridProps {
  formulas: Formula[];
}

export default function FormulaGrid({ formulas }: FormulaGridProps) {
  if (formulas.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-slate-500 text-sm">
          Select some chapters above to see their formulas.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-semibold text-white tracking-[-0.02em]">
          <span className="text-blue-400/70 mr-2 text-base font-medium">04</span>
          Your formulas
        </h2>
        <span className="text-sm text-slate-500 tabular-nums">
          {formulas.length} formula{formulas.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {formulas.map((formula, i) => (
          <motion.div
            key={formula.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: i * 0.015 }}
          >
            <FormulaCard formula={formula} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
