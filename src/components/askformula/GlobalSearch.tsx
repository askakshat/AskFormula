import { toast } from "sonner";
import React, { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { searchFormulas, Formula } from "@/lib/formulas";
import katex from "katex";
import "katex/dist/katex.min.css";

export default function GlobalSearch() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleCopyLink = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const url = new URL(window.location.origin + "/build");
    url.searchParams.set("formula", id);
    navigator.clipboard.writeText(url.toString());
    setCopiedId(id);
    toast.success("Link to formula copied!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Formula[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.trim()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setResults(searchFormulas(query));
    } else {
      setResults([]);
    }
  }, [query]);

  const renderMath = (latex: string) => {
    try {
      return (
        <div
          dangerouslySetInnerHTML={{
            __html: katex.renderToString(latex, {
              displayMode: false,
              throwOnError: false,
            }),
          }}
        />
      );
    } catch {
      return <span>{latex}</span>;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4 sm:px-6">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />
      <div className="relative w-full max-w-2xl bg-[#11131a] border border-[#32353c] rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        <div className="flex items-center px-4 py-3 border-b border-[#32353c]">
          <Search className="w-5 h-5 text-[#e1e2ec]/50 mr-3" />
          <input
            ref={inputRef}
            type="text"
            className="flex-1 bg-transparent border-none outline-none text-[#e1e2ec] placeholder-[#e1e2ec]/50 text-base"
            placeholder="Search all formulas... (e.g. 'Ohm', 'Quadratic')"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-[#272a31] rounded-md transition-colors"
          >
            <X className="w-5 h-5 text-[#e1e2ec]/50" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-2">
          {query.trim() === "" ? (
            <div className="p-8 text-center text-[#e1e2ec]/50 text-sm">
              Type to search across Physics, Chemistry, Maths, and Biology.
            </div>
          ) : results.length === 0 ? (
            <div className="p-8 text-center text-[#e1e2ec]/50 text-sm">
              No formulas found for "{query}".
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {results.slice(0, 50).map((formula, idx) => (
                <div
                  key={`${formula.id}-${idx}`}
                  className="flex flex-col p-3 rounded-lg hover:bg-[#272a31] transition-colors group cursor-default"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-[14px] font-medium text-[#aec6ff]">
                      {formula.name}
                    </h4>
                    <span className="text-[11px] font-mono text-[#e1e2ec]/50 bg-[#0b0e15] px-2 py-0.5 rounded border border-[#32353c]">
                      {formula.chapter || "General"}
                    </span>
                  </div>
                  <div className="text-[14px] text-[#e1e2ec] bg-[#0b0e15] p-3 rounded border border-[#32353c] overflow-x-auto whitespace-nowrap scrollbar-hide">
                    {renderMath(formula.latex)}
                  </div>
                </div>
              ))}
              {results.length > 50 && (
                <div className="text-center text-[12px] text-[#e1e2ec]/50 py-4">
                  Showing top 50 results. Please refine your search.
                </div>
              )}
            </div>
          )}
        </div>
        <div className="px-4 py-2 border-t border-[#32353c] bg-[#0b0e15] flex justify-between items-center text-[11px] text-[#e1e2ec]/40">
          <span>
            Press{" "}
            <kbd className="font-mono bg-[#272a31] px-1 py-0.5 rounded border border-[#32353c]">
              Esc
            </kbd>{" "}
            to close
          </span>
          <span>
            {results.length} result{results.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>
    </div>
  );
}
