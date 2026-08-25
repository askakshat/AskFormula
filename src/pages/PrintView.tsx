import { useEffect, useState } from "react";
import { Chapter } from "@/lib/formulas";
import { Button } from "@/components/ui/button";
import { Printer, ArrowLeft } from "lucide-react";
import katex from "katex";
import "katex/dist/katex.min.css";

export interface FormulaItem {
  id: string;
  name: string;
  latex: string;
  chapter?: string;
  category?: string;
}

// Interface definitions (copied from pdf-generator.ts temporarily until we delete it)
export type PDFLayout = "compact" | "full";

export interface PrintData {
  formulas: FormulaItem[];
  chapters: Chapter[];
  subject: string;
  layout: PDFLayout;
  includeContent: ("formulas"|"keyPoints"|"keyDerivations")[];
}

export default function PrintView() {
  const [data, setData] = useState<PrintData | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("askformula-print-data");
    if (stored) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setData(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse print data", e);
      }
    }
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-900">
        <p>No print data found. Please go back and try exporting again.</p>
      </div>
    );
  }

  const { formulas, chapters: chaptersData, subject, layout, includeContent } = data;

  const dateStr = new Date().toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const chapters = new Map<string, FormulaItem[]>();
  for (const f of formulas) {
    const key = f.chapter ?? "General";
    if (!chapters.has(key)) chapters.set(key, []);

    // Split formulas containing multiple equations separated by \qquad
    const parts = f.latex.split(/,\s*\\qquad\s*|\\qquad\s*/).filter(p => p.trim());
    if (parts.length > 1) {
      parts.forEach((part, index) => {
        chapters.get(key)!.push({
          ...f,
          id: `${f.id}_part${index + 1}`,
          name: `${f.name} (${index + 1})`,
          latex: part
        });
      });
    } else {
      chapters.get(key)!.push(f);
    }
  }

  const chapterNames = Array.from(new Set([
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...chaptersData.map(ch => ch.name || (ch as any).chapterName || "General"),
    ...Array.from(chapters.keys())
  ]));

  const titleColors = ["#fecaca", "#bbf7d0", "#bfdbfe", "#fef08a", "#e9d5ff"];

  const renderKaTeXHTML = (text: string, inline: boolean = true) => {
    try {
      const parts = text.split(/(\$.*?\$)/g);
      return parts.map((part, i) => {
        if (part.startsWith('$') && part.endsWith('$')) {
          const math = part.slice(1, -1);
          const html = katex.renderToString(math, {
            throwOnError: false,
            displayMode: !inline,
          });
          return <span key={i} dangerouslySetInnerHTML={{ __html: html }} />;
        }
        return <span key={i}>{part}</span>;
      });
    } catch {
      return text;
    }
  };

  const renderMath = (latex: string) => {
    try {
      return (
        <div
          dangerouslySetInnerHTML={{
            __html: katex.renderToString(latex, { displayMode: true, throwOnError: false })
          }}
        />
      );
    } catch {
      return <span className="text-red-500">Error rendering formula</span>;
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-slate-100 print:bg-white text-slate-900 font-sans">
      {/* Print Controls (Hidden on print) */}
      <header className="print:hidden flex flex-col md:flex-row justify-between items-start md:items-end gap-4 p-8 bg-[#0b0e15] border-b border-[#32353c] text-[#e1e2ec]">
        <div>
          <h1 className="text-3xl font-bold mb-2">Finalize Your Cheat Sheet</h1>
          <p className="text-[14px] text-[#e1e2ec]/70 flex items-center gap-2">
            {subject} · {chapterNames.length} Chapters · {formulas.length} Formulas
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" onClick={handleBack} className="bg-[#272a31] border-[#32353c] hover:border-[#aec6ff] hover:text-[#aec6ff] hover:bg-[#272a31] transition-colors text-[14px] h-[36px] px-4 gap-2 text-[#e1e2ec]">
            <ArrowLeft className="w-[18px] h-[18px]" /> Close
          </Button>
          <Button onClick={handlePrint} className="bg-[#aec6ff] text-[#002e6a] hover:opacity-90 hover:bg-[#aec6ff] transition-opacity font-medium text-[14px] h-[36px] px-4 gap-2">
            <Printer className="w-[18px] h-[18px]" /> Export to PDF
          </Button>
        </div>
      </header>

      <style>
        {`
          @media print {
            @page {
              margin: 15mm;
            }
            body {
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
          }


          /* Force KaTeX text color to black for PDF export */
          .katex-display > .katex,
          .katex .mord,
          .katex .mbin,
          .katex .mrel,
          .katex .mopen,
          .katex .mclose,
          .katex .mpunct,
          .katex .mop,
          .katex {
            color: #000000 !important;
          }

          /* Native KaTeX Print Fixes */
          /* We use container queries in inline-size to shrink formulas to fit. */
          .scale-math-full .katex-display {
             font-size: min(1.125rem, 4.5cqi) !important;
          }
          .scale-math-compact .katex-display {
             font-size: min(0.875rem, 4.5cqi) !important;
          }

          .katex-display {
             max-width: 100%;
             overflow-wrap: break-word;
             word-wrap: break-word;
             white-space: normal;
          }
          .katex {
             max-width: 100%;
             white-space: normal;
          }
          /* Allow specific elements inside katex to wrap */
          .katex-html {
             white-space: normal !important;
             overflow-wrap: break-word !important;
          }
          /* We don't want math rendering to completely break, but we need it to wrap if necessary */
          .base {
             white-space: normal !important;
             display: inline !important;
          }
          .print-content-wrapper {
              display: block !important;
          }
          .no-break {
              break-inside: avoid;
              page-break-inside: avoid;
          }
        `}
      </style>

      {/* Main Print Content Preview Pane Wrapper */}
      <div className="print:hidden w-full max-w-[1200px] mx-auto p-8 flex-grow">
        <div className="bg-[#0b0e15] border border-[#32353c] rounded-lg overflow-hidden flex flex-col shadow-[0_0_40px_rgba(0,0,0,0.5)]">
          <div className="bg-[#11131a] px-4 py-2 border-b border-[#32353c] flex items-center justify-between text-[#e1e2ec]/70">
            <span className="font-mono text-[13px]">Sheet Preview (A4 - {layout === 'compact' ? '2 Columns' : 'Single Column'})</span>
          </div>
          <div className="flex-grow overflow-y-auto bg-[#11131a] p-8">
            <div className="w-full max-w-[800px] mx-auto p-8 shadow-sm flex flex-col bg-[#e1e2ec] text-[#11131a] min-h-[1131px] break-words">
              <div className="border-b-2 border-[#11131a] pb-4 mb-4">
                <h2 className="text-center text-[#11131a] uppercase tracking-wider font-bold text-xl">{subject} Formulas</h2>
              </div>
              <div className={`gap-8 columns-1`}>

              {chapterNames.map((chapterName, idx) => {
                const items = chapters.get(chapterName) || [];
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const chapterMeta = chaptersData.find(ch => (ch.name || (ch as any).chapterName) === chapterName);
                const keyPoints = chapterMeta?.keyPoints || [];
                const keyDerivations = chapterMeta?.keyDerivations || [];

                const hasFormulas = includeContent.includes("formulas") && items.length > 0;
                const hasKeyPoints = includeContent.includes("keyPoints") && keyPoints.length > 0;
                const hasDerivations = includeContent.includes("keyDerivations") && keyDerivations.length > 0;

                if (!hasFormulas && !hasKeyPoints && !hasDerivations) return null;

                return (
                  <div key={chapterName} className="no-break mb-8 w-full">
                    <h3 className="text-base font-bold mb-3 border-b border-gray-400 pb-1 text-[#11131a]">{idx + 1}. {chapterName}</h3>

                    {hasKeyPoints && (
                      <div className="mb-4 text-[14px]">
                        <h4 className="m-0 mb-1 text-[13px] font-bold text-slate-800 uppercase">Key Points</h4>
                        <ul className="m-0 pl-5 text-black leading-relaxed space-y-1 list-disc list-inside">
                          {keyPoints.map((point, i) => (
                            <li key={i}>{renderKaTeXHTML(point)}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {hasDerivations && (
                      <div className="mb-4 text-[14px]">
                        <h4 className="m-0 mb-1 text-[13px] font-bold text-slate-800 uppercase">Key Derivations</h4>
                        <ul className="m-0 pl-5 text-black leading-relaxed space-y-1 list-disc list-inside">
                          {keyDerivations.map((der, i) => (
                            <li key={i}>{renderKaTeXHTML(der)}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {hasFormulas && (
                      <div>
                        {items.map(formula => (
                          <div key={formula.id} className="mb-4">
                            <div className={`text-center my-2 italic text-black ${layout === "compact" ? "scale-math-compact" : "scale-math-full"} max-w-full min-w-0 [container-type:inline-size]`}>
                              {renderMath(formula.latex)}
                            </div>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-1 font-mono text-[13px] text-sm">
                              <div className="flex justify-between text-gray-700"><span>⭐</span><span className="text-right truncate">{formula.name}</span></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actual Print Content (Only visible on print) */}
      <div className="hidden print:block w-full max-w-full mx-auto p-0 bg-transparent shadow-none break-words text-black print-content-wrapper">
        <div className="border-b-2 border-black pb-4 mb-4 text-center">
          <h2 className="text-black uppercase tracking-wider font-bold text-2xl">{subject} Formulas</h2>
          <p className="mt-1 text-sm text-slate-500">AskFormula - Generated on {dateStr}</p>
        </div>
        <div className={`gap-8 columns-1`}>

        {chapterNames.map((chapterName, idx) => {
          const items = chapters.get(chapterName) || [];
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const chapterMeta = chaptersData.find(ch => (ch.name || (ch as any).chapterName) === chapterName);
          const keyPoints = chapterMeta?.keyPoints || [];
          const keyDerivations = chapterMeta?.keyDerivations || [];

          const hasFormulas = includeContent.includes("formulas") && items.length > 0;
          const hasKeyPoints = includeContent.includes("keyPoints") && keyPoints.length > 0;
          const hasDerivations = includeContent.includes("keyDerivations") && keyDerivations.length > 0;

          if (!hasFormulas && !hasKeyPoints && !hasDerivations) return null;

          return (
            <div key={chapterName} className="no-break mb-8 w-full">
              <h3 className="text-base font-bold mb-3 border-b border-gray-400 pb-1 text-black">{idx + 1}. {chapterName}</h3>

              {hasKeyPoints && (
                <div className="mb-4 text-[14px]">
                  <h4 className="m-0 mb-1 text-[13px] font-bold text-black uppercase">Key Points</h4>
                  <ul className="m-0 pl-5 text-black leading-relaxed space-y-1 list-disc list-inside">
                    {keyPoints.map((point, i) => (
                      <li key={i}>{renderKaTeXHTML(point)}</li>
                    ))}
                  </ul>
                </div>
              )}

              {hasDerivations && (
                <div className="mb-4 text-[14px]">
                  <h4 className="m-0 mb-1 text-[13px] font-bold text-black uppercase">Key Derivations</h4>
                  <ul className="m-0 pl-5 text-black leading-relaxed space-y-1 list-disc list-inside">
                    {keyDerivations.map((der, i) => (
                      <li key={i}>{renderKaTeXHTML(der)}</li>
                    ))}
                  </ul>
                </div>
              )}

              {hasFormulas && (
                <div>
                  {items.map(formula => {
                    const isMissingFormula = !formula.latex || formula.latex.trim() === "";
                    return (
                      <div key={formula.id} className="mb-4 w-full">
                        {!isMissingFormula && (
                          <div className={`text-center my-2 italic text-black ${layout === "compact" ? "scale-math-compact" : "scale-math-full"} max-w-full min-w-0 [container-type:inline-size]`}>
                            {renderMath(formula.latex)}
                          </div>
                        )}
                        <div className="flex font-mono text-[13px] text-sm">
                          <div className="flex items-start text-gray-700 w-full overflow-hidden">
                            <span className="mr-1 flex-shrink-0">⭐</span>
                            <span className="break-words whitespace-normal leading-tight text-left">{formula.name}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
        </div>
      </div>

    </div>
  );
}
