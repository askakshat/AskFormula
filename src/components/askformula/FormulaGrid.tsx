import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import FormulaCard from "./FormulaCard";
import type { Formula } from "@/lib/formulas";

interface FormulaGridProps {
  formulas: Formula[];
}

export default function FormulaGrid({ formulas }: FormulaGridProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFormulas = useMemo(() => {
    if (!searchQuery.trim()) return formulas;
    const query = searchQuery.toLowerCase();
    return formulas.filter(
      (f) =>
        f.name.toLowerCase().includes(query) ||
        f.tags?.some((t) => t.toLowerCase().includes(query))
    );
  }, [formulas, searchQuery]);

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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 gap-4">
        <h2 className="text-xl font-semibold text-white tracking-[-0.02em] whitespace-nowrap">
          <span className="text-blue-400/70 mr-2 text-base font-medium">05</span>
          Your formulas
        </h2>

        <div className="relative flex-1 max-w-md w-full sm:ml-auto">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-slate-700 rounded-md leading-5 bg-slate-800/50 text-slate-300 placeholder-slate-400 focus:outline-none focus:bg-slate-800 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
            placeholder="Search by name, tag, or chapter..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center justify-end mb-4">
        <span className="text-sm text-slate-500 tabular-nums">
          Showing {filteredFormulas.length} of {formulas.length} formula{formulas.length !== 1 ? "s" : ""}
        </span>
      </div>

      {filteredFormulas.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredFormulas.map((formula, i) => (
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
      ) : (
        <div className="text-center py-12 border border-dashed border-slate-700 rounded-lg">
          <p className="text-slate-400 text-sm">
            No formulas found matching "{searchQuery}".
          </p>
        </div>
      )}
    </motion.div>
  );
}
