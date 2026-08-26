import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, BookOpen, Plus } from 'lucide-react';
import { searchFormulas, SearchResult } from '@/lib/search';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import 'katex/dist/katex.min.css';
import renderMathInElement from 'katex/contrib/auto-render';

export default function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const [selectedChapters, setSelectedChapters] = useLocalStorage<string[]>('askformula-selected-chapters', []);
  const [subject, setSubject] = useLocalStorage<string | null>('askformula-subject', null);
  const [exam, setExam] = useLocalStorage<"school" | "jee" | "neet" | null>('askformula-exam', null);
  const [selectedClass, setSelectedClass] = useLocalStorage<string | null>('askformula-class', null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setResults(searchFormulas(query));
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  // Render KaTeX for results
  useEffect(() => {
    if (resultsRef.current && results.length > 0) {
      renderMathInElement(resultsRef.current, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "$", right: "$", display: false },
        ],
        throwOnError: false,
      });
    }
  }, [results]);

  const handleSelect = (result: SearchResult) => {
    // We only add the chapter so all formulas for it become available.
    // Setting all context to match the search result
    if (result.examTypes.includes('jee')) setExam('jee');
    else if (result.examTypes.includes('neet')) setExam('neet');
    else setExam('school');

    setSelectedClass(result.className);
    setSubject(result.subjectName);

    if (!selectedChapters.includes(result.chapter.id)) {
      setSelectedChapters([...selectedChapters, result.chapter.id]);
    }

    setIsOpen(false);
    setQuery('');

    setTimeout(() => {
       document.getElementById('app-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <>
      <div className="fixed top-4 right-4 sm:top-6 sm:right-8 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-slate-900/80 backdrop-blur-md border border-slate-700/50 rounded-full text-slate-300 hover:text-white hover:border-slate-500/50 transition-all group"
        >
          <Search className="w-4 h-4 group-hover:text-blue-400 transition-colors" />
          <span className="text-sm font-medium hidden sm:inline-block">Search Formulas...</span>
          <div className="hidden sm:flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-slate-800 text-[10px] text-slate-400 font-mono">
            <span className="text-xs">⌘</span>K
          </div>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[100]"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="fixed top-20 left-1/2 -translate-x-1/2 w-[90%] max-w-2xl bg-slate-900 border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden z-[101]"
            >
              <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-800">
                <Search className="w-5 h-5 text-slate-400" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for formulas (e.g. 'Quadratic' or 'Ohm')..."
                  className="flex-1 bg-transparent border-none outline-none text-slate-200 placeholder-slate-500 text-lg"
                />
                <button onClick={() => setIsOpen(false)} className="p-1 rounded-md hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="max-h-[60vh] overflow-y-auto p-2" ref={resultsRef}>
                {results.length > 0 ? (
                  <div className="flex flex-col gap-1">
                    {results.map((result, i) => (
                      <button
                        key={`${result.formula.id}-${i}`}
                        onClick={() => handleSelect(result)}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl hover:bg-slate-800/50 text-left transition-colors group gap-3"
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-slate-200 font-medium">{result.formula.name}</h4>
                            <div className="flex gap-1">
                              {result.formula.tags?.slice(0,2).map(t => (
                                <span key={t} className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700/50">
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-slate-500">
                            <BookOpen className="w-3 h-3" />
                            <span>{result.subjectName} • Class {result.className} • {result.chapter.name}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between sm:justify-end gap-4">
                           <div className="text-sm text-blue-400/80 bg-slate-950/50 px-3 py-1.5 rounded-lg border border-slate-800">
                              {`$${result.formula.latex}$`}
                           </div>
                           <Plus className="w-5 h-5 text-slate-600 group-hover:text-blue-400 transition-colors shrink-0" />
                        </div>
                      </button>
                    ))}
                  </div>
                ) : query.length > 1 ? (
                  <div className="text-center py-12 text-slate-500">
                    No formulas found for "{query}"
                  </div>
                ) : (
                  <div className="text-center py-12 text-slate-500">
                    Start typing to search across all subjects and chapters...
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
