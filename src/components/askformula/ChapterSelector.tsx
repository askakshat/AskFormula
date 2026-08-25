import { motion } from "framer-motion";
import { Checkbox } from "@/components/ui/checkbox";
import { Search } from "lucide-react";
import type { Chapter } from "@/lib/formulas";
import { useState, useMemo } from "react";

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
  const [searchTerm, setSearchTerm] = useState("");

  const filteredChapters = useMemo(() => {
    return chapters.filter(ch =>
      ch.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [chapters, searchTerm]);

  const allFilteredSelected = filteredChapters.length > 0 && filteredChapters.every((ch) => selectedIds.includes(ch.id));

  const toggleAll = () => {
    if (allFilteredSelected) {
      const filteredIds = new Set(filteredChapters.map(ch => ch.id));
      onSelect(selectedIds.filter(id => !filteredIds.has(id)));
    } else {
      const newIds = new Set(selectedIds);
      filteredChapters.forEach(ch => newIds.add(ch.id));
      onSelect(Array.from(newIds));
    }
  };

  const toggleChapter = (id: string) => {
    if (selectedIds.includes(id)) {
      onSelect(selectedIds.filter((i) => i !== id));
    } else {
      onSelect([...selectedIds, id]);
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
          <span className="text-blue-400/70 mr-2 text-base font-medium">04</span>
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

      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-slate-500" />
        </div>
        <input
          type="text"
          placeholder="Search chapters..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-slate-900 border border-slate-700 text-slate-200 text-sm rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div className="flex justify-between items-center py-2 px-1">
        <button
          onClick={toggleAll}
          className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
        >
          {allFilteredSelected ? "Deselect All" : "Select All"}
        </button>
        <span className="text-xs text-slate-500">{filteredChapters.length} available</span>
      </div>

      {/* Chapter rows */}
      <div className="space-y-0.5 pl-1 max-h-96 overflow-y-auto pr-1 custom-scrollbar">
        {filteredChapters.map((chapter) => {
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
    </motion.div>
  );
}
