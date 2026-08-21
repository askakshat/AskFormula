import { useState } from "react";
import { motion } from "framer-motion";
import { CheckSquare, Square, ChevronDown, ChevronRight } from "lucide-react";
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">
          <span className="text-blue-400 mr-2">03</span>
          Select Chapters
        </h2>
        <span className="text-sm text-slate-400">
          {selectedIds.length} / {chapters.length} chapters
          {totalFormulas > 0 && (
            <span className="ml-2 text-blue-400">
              ({totalFormulas} formulas)
            </span>
          )}
        </span>
      </div>

      {/* Select All toggle */}
      <button
        onClick={toggleAll}
        className="w-full flex items-center gap-3 p-4 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all cursor-pointer"
      >
        {allSelected ? (
          <CheckSquare className="w-5 h-5 text-blue-400" />
        ) : someSelected ? (
          <div className="w-5 h-5 rounded bg-blue-500/30 border-2 border-blue-400 flex items-center justify-center">
            <div className="w-2 h-0.5 bg-blue-400 rounded" />
          </div>
        ) : (
          <Square className="w-5 h-5 text-slate-400" />
        )}
        <span className="font-medium text-white">Select All</span>
      </button>

      {/* Class sections */}
      {[
        { cls: "11", label: "Class 11", items: class11Chapters },
        { cls: "12", label: "Class 12", items: class12Chapters },
      ].map(({ cls, label, items }) => {
        if (items.length === 0) return null;
        const isExpanded = expandedClasses[cls] ?? true;
        const clsIds = items.map((ch) => ch.id);
        const clsAllSelected = clsIds.every((id) => selectedIds.includes(id));
        const clsSomeSelected = clsIds.some((id) => selectedIds.includes(id));

        return (
          <div key={cls} className="rounded-xl overflow-hidden">
            {/* Class header */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => toggleClass(cls)}
                className="flex items-center gap-2 p-3 flex-1 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all cursor-pointer"
              >
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                )}
                <span className="font-medium text-white">{label}</span>
                <span className="text-xs text-slate-400">
                  {clsIds.filter((id) => selectedIds.includes(id)).length}/{clsIds.length} selected
                </span>
              </button>

              <button
                onClick={() => toggleClassChapters(cls)}
                className="p-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all cursor-pointer"
              >
                {clsAllSelected ? (
                  <CheckSquare className="w-4 h-4 text-blue-400" />
                ) : clsSomeSelected ? (
                  <div className="w-4 h-4 rounded bg-blue-500/30 border-2 border-blue-400 flex items-center justify-center">
                    <div className="w-1.5 h-0.5 bg-blue-400 rounded" />
                  </div>
                ) : (
                  <Square className="w-4 h-4 text-slate-400" />
                )}
              </button>
            </div>

            {/* Chapters list */}
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-2 space-y-1 pl-4"
              >
                {items.map((chapter) => (
                  <label
                    key={chapter.id}
                    className={`
                      flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all
                      ${
                        selectedIds.includes(chapter.id)
                          ? "bg-blue-500/10 border border-blue-400/30"
                          : "bg-white/3 border border-transparent hover:bg-white/5"
                      }
                    `}
                  >
                    <Checkbox
                      checked={selectedIds.includes(chapter.id)}
                      onCheckedChange={() => toggleChapter(chapter.id)}
                      className="border-slate-500 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-sm text-white">{chapter.name}</span>
                    </div>
                    <span className="text-xs text-slate-400 shrink-0">
                      {chapter.formulas.length} formulas
                    </span>
                  </label>
                ))}
              </motion.div>
            )}
          </div>
        );
      })}
    </motion.div>
  );
}
