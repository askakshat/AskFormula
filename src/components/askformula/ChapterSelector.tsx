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
        <h2 className="text-xl font-semibold text-[#e1e2ec] tracking-[-0.02em]">
          <span className="font-mono text-[13px] text-[#aec6ff] bg-[#00275d]/20 px-2 py-0.5 rounded mr-2">04</span>
          Choose chapters
        </h2>
        {selectedIds.length > 0 && (
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="font-mono text-[13px] text-slate-400"
          >
            <span className="text-[#aec6ff]">{totalFormulas}</span> / {chapters.reduce((sum, ch) => sum + ch.formulas.length, 0)} formulas
          </motion.span>
        )}
      </div>

      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-[#e1e2ec]/50" />
        </div>
        <input
          type="text"
          placeholder="Search chapters..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-[#11131a] border border-[#32353c] text-[#e1e2ec] text-sm rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:border-[#aec6ff] transition-colors placeholder:text-[#e1e2ec]/30"
        />
      </div>

      <div className="flex justify-between items-center py-2 px-1">
        <span className="text-sm font-medium text-[#e1e2ec]/70">Available Chapters</span>
        <button
          onClick={toggleAll}
          className="text-sm font-medium text-[#aec6ff] hover:text-[#ffb77d] transition-colors"
        >
          {allFilteredSelected ? "Deselect All" : "Select All"}
        </button>
      </div>

      {/* Chapter rows */}
      <div className="space-y-2 max-h-96 overflow-y-auto pr-1 custom-scrollbar">
        {filteredChapters.map((chapter) => {
          const isSelected = selectedIds.includes(chapter.id);
          return (
            <label
              key={chapter.id}
              className={`
                cursor-pointer flex items-center justify-between p-4 rounded-xl group relative overflow-hidden border transition-all duration-200
                ${isSelected
                  ? "bg-[#272a31] border-[#aec6ff]"
                  : "bg-[#0b0e15] border-[#32353c] hover:bg-[#272a31] hover:border-[#61dcb0]"
                }
              `}
            >
              <div className="flex items-center gap-4 relative z-10 w-full">
                <Checkbox
                  checked={isSelected}
                  onCheckedChange={() => toggleChapter(chapter.id)}
                  className={`
                    w-5 h-5 rounded border ${isSelected ? "bg-[#aec6ff] border-[#aec6ff] text-[#002e6a]" : "bg-[#32353c] border-[#32353c]"}
                  `}
                />
                <div className="flex flex-col flex-1">
                  <p className={`text-base font-medium transition-colors ${isSelected ? "text-[#aec6ff]" : "text-[#e1e2ec] group-hover:text-[#aec6ff]"}`}>
                    {chapter.name}
                  </p>
                  <p className="font-mono text-[12px] text-[#e1e2ec]/70 mt-1 flex gap-3">
                    <span>~{chapter.formulas.length} formulas</span>
                    {chapter.formulas.length > 15 && <span><span className="text-[#61dcb0]/70">●</span> High Yield</span>}
                  </p>
                </div>
              </div>
            </label>
          );
        })}
      </div>
    </motion.div>
  );
}
