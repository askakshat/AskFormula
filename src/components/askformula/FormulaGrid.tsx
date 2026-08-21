import { motion } from "framer-motion";
import FormulaCard from "./FormulaCard";
import type { Formula } from "@/lib/formulas";

interface FormulaGridProps {
  formulas: Formula[];
}

export default function FormulaGrid({ formulas }: FormulaGridProps) {
  if (formulas.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-400">No formulas to display. Select chapters above.</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white">
          <span className="text-blue-400 mr-2">04</span>
          Formulas
        </h2>
        <span className="text-sm text-slate-400">{formulas.length} formulas</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {formulas.map((formula, i) => (
          <motion.div
            key={formula.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: i * 0.02 }}
          >
            <FormulaCard formula={formula} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
