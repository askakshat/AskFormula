import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Info } from "lucide-react";
import FormulaCard from "./FormulaCard";
import type { Formula, Chapter } from "@/lib/formulas";
import katex from "katex";

interface FormulaGridProps {
  formulas: Formula[];
  chapters?: Chapter[];
}

export default function FormulaGrid({ formulas, chapters = [] }: FormulaGridProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"formulas" | "keyPoints" | "keyDerivations">("formulas");

  const filteredFormulas = useMemo(() => {
    if (!searchQuery.trim()) return formulas;
    const query = searchQuery.toLowerCase();
    return formulas.filter(
      (f) =>
        f.name.toLowerCase().includes(query) ||
        f.tags?.some((t) => t.toLowerCase().includes(query))
    );
  }, [formulas, searchQuery]);

  const renderKaTeX = (text: string) => {
    try {
      // Find text between $...$ and render it with KaTeX, leave rest as text
      const parts = text.split(/(\$.*?\$)/g);
      return parts.map((part, index) => {
        if (part.startsWith('$') && part.endsWith('$')) {
          const math = part.slice(1, -1);
          const html = katex.renderToString(math, {
            throwOnError: false,
            displayMode: false,
          });
          return <span key={index} dangerouslySetInnerHTML={{ __html: html }} />;
        }
        return <span key={index}>{part}</span>;
      });
    } catch {
      return <span>{text}</span>;
    }
  };

  const getFilteredItems = (type: "keyPoints" | "keyDerivations") => {
    return chapters.flatMap(ch => {
      const items = ch[type] || [];
      if (!searchQuery.trim()) {
        return items.length > 0 ? [{ chapterName: ch.name || ch.chapterName || "Unknown Chapter", items }] : [];
      }

      const query = searchQuery.toLowerCase();
      const filteredItems = items.filter(item => item.toLowerCase().includes(query));
      return filteredItems.length > 0 ? [{ chapterName: ch.name || ch.chapterName || "Unknown Chapter", items: filteredItems }] : [];
    });
  };

  if (formulas.length === 0 && chapters.length === 0) {
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
          Study Material
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

      <div className="flex items-center space-x-2 mb-6 border-b border-white/[0.06] pb-px overflow-x-auto no-scrollbar">
        {(["formulas", "keyPoints", "keyDerivations"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`
              px-4 py-2 text-sm font-medium rounded-t-lg transition-colors whitespace-nowrap
              ${activeTab === tab
                ? "text-blue-400 border-b-2 border-blue-400 bg-blue-500/10"
                : "text-slate-400 hover:text-slate-300 hover:bg-white/5"}
            `}
          >
            {tab === "formulas" ? "Formulas" : tab === "keyPoints" ? "Key Points" : "Key Derivations"}
          </button>
        ))}
      </div>

      {activeTab === "formulas" && (
        <>
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
        </>
      )}

      {(activeTab === "keyPoints" || activeTab === "keyDerivations") && (
        <div className="space-y-6">
          {getFilteredItems(activeTab).length > 0 ? (
            getFilteredItems(activeTab).map((group, groupIdx) => (
              <motion.div
                key={group.chapterName}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: groupIdx * 0.05 }}
                className="bg-white/[0.02] border border-white/[0.05] rounded-xl overflow-hidden"
              >
                <div className="bg-white/[0.03] px-4 py-3 border-b border-white/[0.05]">
                  <h3 className="text-[15px] font-semibold text-slate-200">
                    {group.chapterName}
                  </h3>
                </div>
                <div className="p-4 space-y-3">
                  {group.items.map((item, idx) => (
                    <div key={idx} className="flex gap-3 text-slate-300 text-sm leading-relaxed">
                      <div className="mt-0.5 text-blue-400">
                        <Info className="w-4 h-4" />
                      </div>
                      <div className="flex-1 [&_.katex]:text-blue-300">
                        {renderKaTeX(item)}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-12 border border-dashed border-slate-700 rounded-lg">
              <p className="text-slate-400 text-sm">
                No {activeTab === "keyPoints" ? "key points" : "derivations"} found matching your criteria.
              </p>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}
