import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import type { Chapter } from "@/lib/formulas";

interface ChapterSelectorProps {
  chapters: Chapter[];
  onSelect: (chapterIds: string[]) => void;
  selectedIds: string[];
}

export default function ChapterSelector({
  chapters,
  onSelect,
  selectedIds,
}: ChapterSelectorProps) {
  const [expandedClasses, setExpandedClasses] = useState<Record<string, boolean>>(
    () => {
      const classes = [...new Set(chapters.map((ch) => ch.class))];
      return Object.fromEntries(classes.map((c) => [c, true]));
    }
  );

  const class11Chapters = chapters.filter((ch) => ch.class === "11");
  const class12Chapters = chapters.filter((ch) => ch.class === "12");

  const allSelected = chapters.every((ch) => selectedIds.includes(ch.id));
  const someSelected = chapters.some((ch) => selectedIds.includes(ch.id));

  const toggleClass = (cls: string) => {
    setExpandedClasses((prev) => ({ ...prev, [cls]: !prev[cls] }));
  };

  const toggleAll = () => {
    if (allSelected) {
      onSelect([]);
    } else {
      onSelect(chapters.map((ch) => ch.id));
    }
  };

  const toggleChapter = (id: string) => {
    if (selectedIds.includes(id)) {
      onSelect(selectedIds.filter((i) => i !== id));
    } else {
      onSelect([...selectedIds, id]);
    }
  };

  const toggleClassChapters = (cls: string) => {
    const clsChapters = chapters.filter((ch) => ch.class === cls).map((ch) => ch.id);
    const allClsSelected = clsChapters.every((id) => selectedIds.includes(id));

    if (allClsSelected) {
      onSelect(selectedIds.filter((id) => !clsChapters.includes(id)));
    } else {
      const newIds = [...new Set([...selectedIds, ...clsChapters])];
      onSelect(newIds);
    }
  };

  const totalFormulas = chapters
    .filter((ch) => selectedIds.includes(ch.id))
    .reduce((sum, ch) => sum + ch.formulas.length, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white tracking-[-0.02em]">
          <span className="text-blue-400/70 mr-2 text-base font-medium">03</span>
          Choose chapters
        </h2>
        {selectedIds.length > 0 && (
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-sm text-slate-400"
          >
            {totalFormulas} formula{totalFormulas !== 1 ? "s" : ""} selected
          </motion.span>
        )}
      </div>

      {/* Select All */}
      <button
        onClick={toggleAll}
        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-200 cursor-pointer"
      >
        <div
          className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200 ${
            allSelected
              ? "bg-blue-500 border-blue-500"
              : someSelected
                ? "bg-blue-500/20 border-blue-400"
                : "border-slate-600"
          }`}
        >
          {allSelected && (
            <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none">
              <path d="M2 6l3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
          {someSelected && !allSelected && (
            <div className="w-2 h-0.5 bg-blue-400 rounded" />
          )}
        </div>
        <span className="text-sm font-medium text-white">Select all chapters</span>
        <span className="text-xs text-slate-500 ml-auto">{chapters.length} available</span>
      </button>

      {/* Class sections */}
      {[
        { cls: "11", label: "Class 11", items: class11Chapters },
        { cls: "12", label: "Class 12", items: class12Chapters },
      ].map(({ cls, label, items }) => {
        if (items.length === 0) return null;
        const isExpanded = expandedClasses[cls] ?? true;
        const clsIds = items.map((ch) => ch.id);
        const clsSelected = clsIds.filter((id) => selectedIds.includes(id)).length;

        return (
          <div key={cls} className="space-y-1.5">
            {/* Class header */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleClass(cls)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/[0.04] transition-all duration-200 cursor-pointer"
              >
                {isExpanded ? (
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                )}
                <span className="text-sm font-medium text-slate-300">{label}</span>
                <span className="text-xs text-slate-600">
                  {clsSelected}/{clsIds.length}
                </span>
              </button>

              <div className="flex-1 h-px bg-white/[0.04]" />

              <button
                onClick={() => toggleClassChapters(cls)}
                className="text-xs text-slate-500 hover:text-slate-300 px-2 py-1 rounded-md hover:bg-white/[0.04] transition-all duration-200 cursor-pointer"
              >
                {clsSelected === clsIds.length ? "Deselect" : "Select all"}
              </button>
            </div>

            {/* Chapter rows */}
            {isExpanded && (
              <div className="space-y-0.5 pl-4">
                {items.map((chapter) => {
                  const isSelected = selectedIds.includes(chapter.id);
                  return (
                    <label
                      key={chapter.id}
                      className={`
                        flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-150
                        ${isSelected
                          ? "bg-blue-500/[0.08]"
                          : "hover:bg-white/[0.03]"
                        }
                      `}
                    >
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={() => toggleChapter(chapter.id)}
                        className="border-slate-600 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                      />
                      <span className="text-sm text-slate-200 flex-1">{chapter.name}</span>
                      <span className="text-xs text-slate-600 tabular-nums">
                        {chapter.formulas.length}
                      </span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </motion.div>
  );
}
