import { useEffect, useState } from "react";
export interface FormulaItem {
  id: string;
  name: string;
  latex: string;
  chapter?: string;
  category?: string;
} // Will move this interface out later or just copy it
import { Chapter } from "@/lib/formulas";
import { Button } from "@/components/ui/button";
import { Printer, ArrowLeft } from "lucide-react";
import katex from "katex";
import "katex/dist/katex.min.css";

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
    chapters.get(key)!.push(f);
  }

  const chapterNames = Array.from(new Set([
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
      <div className="print:hidden sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
           <Button variant="outline" onClick={handleBack} className="gap-2">
             <ArrowLeft className="w-4 h-4" /> Close
           </Button>
           <h1 className="font-semibold text-lg text-slate-800">Print Preview: {subject}</h1>
        </div>
        <Button onClick={handlePrint} className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
          <Printer className="w-4 h-4" /> Print / Save as PDF
        </Button>
      </div>

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
          .katex-display {
             max-width: 100%;
             overflow-x: hidden;
             overflow-y: hidden;
             white-space: normal;
             word-break: break-word;
             overflow-wrap: break-word;
          }
          .katex {
             display: inline-block;
             max-width: 100%;
             white-space: normal;
             word-break: break-word;
          }
          .katex-html {
             max-width: 100%;
             display: inline-flex;
             flex-wrap: wrap;
             justify-content: center;
             white-space: normal;
          }
          .katex .base {
             display: inline-flex;
             flex-wrap: wrap;
             max-width: 100%;
             white-space: normal;
          }
          .katex .mord, .katex .mbin, .katex .mrel, .katex .minner {
             white-space: normal;
          }
        `}
      </style>

      {/* Main Print Content */}
      <div className="max-w-[1123px] mx-auto p-8 print:p-0 bg-white print:bg-transparent shadow-lg print:shadow-none min-h-[297mm]">
        <div className={`mb-${layout === 'compact' ? '6' : '10'} text-center`}>
          <h1 className={`m-0 text-slate-800 uppercase tracking-wide font-bold ${layout === 'compact' ? 'text-2xl' : 'text-4xl'}`}>
            AskFormula
          </h1>
          <h2 className={`mt-2 font-semibold text-slate-700 ${layout === 'compact' ? 'text-lg' : 'text-xl'}`}>
            {subject} Revision Sheet
          </h2>
          <p className="mt-1 text-sm text-slate-500">Generated on {dateStr}</p>
        </div>

        {chapterNames.map((chapterName, idx) => {
          const items = chapters.get(chapterName) || [];
          const chapterMeta = chaptersData.find(ch => (ch.name || (ch as any).chapterName) === chapterName);
          const keyPoints = chapterMeta?.keyPoints || [];
          const keyDerivations = chapterMeta?.keyDerivations || [];

          const hasFormulas = includeContent.includes("formulas") && items.length > 0;
          const hasKeyPoints = includeContent.includes("keyPoints") && keyPoints.length > 0;
          const hasDerivations = includeContent.includes("keyDerivations") && keyDerivations.length > 0;

          if (!hasFormulas && !hasKeyPoints && !hasDerivations) return null;

          const chapterColor = titleColors[idx % titleColors.length];
          const gapSize = layout === "compact" ? "gap-3" : "gap-6";
          const cardPadding = layout === "compact" ? "p-3" : "p-4";
          const mathSize = layout === "compact" ? "text-[14px]" : "text-[18px]";

          return (
            <div key={chapterName} className={`mb-${layout === "compact" ? "6" : "10"}`}>
              <div className={`text-center mb-${layout === "compact" ? "4" : "6"}`}>
                <div
                  className={`inline-block px-6 py-2 rounded-full border-2 border-slate-800 font-bold ${layout === "compact" ? "text-base" : "text-xl"} shadow-[3px_3px_0px_0px_rgba(30,41,59,1)] text-slate-800`}
                  style={{ backgroundColor: chapterColor }}
                >
                  {chapterName}
                </div>
              </div>

              {hasKeyPoints && (
                <div className={`mb-4 bg-yellow-50 border-2 border-slate-800 rounded-lg ${cardPadding} shadow-[2px_2px_0px_0px_rgba(30,41,59,1)] break-inside-avoid w-full`}>
                  <h4 className="m-0 mb-2 text-sm font-bold text-slate-800 uppercase">Key Points</h4>
                  <ul className={`m-0 pl-5 ${mathSize} text-black leading-relaxed space-y-2 list-disc list-inside`}>
                    {keyPoints.map((point, i) => (
                      <li key={i}>{renderKaTeXHTML(point)}</li>
                    ))}
                  </ul>
                </div>
              )}

              {hasDerivations && (
                <div className={`mb-4 bg-green-50 border-2 border-slate-800 rounded-lg ${cardPadding} shadow-[2px_2px_0px_0px_rgba(30,41,59,1)] break-inside-avoid w-full`}>
                  <h4 className="m-0 mb-2 text-sm font-bold text-slate-800 uppercase">Key Derivations</h4>
                  <ul className={`m-0 pl-5 ${mathSize} text-black leading-relaxed space-y-2 list-disc list-inside`}>
                    {keyDerivations.map((der, i) => (
                      <li key={i}>{renderKaTeXHTML(der)}</li>
                    ))}
                  </ul>
                </div>
              )}

              {hasFormulas && (
                <div className={`grid ${layout === "compact" ? "grid-cols-4" : "grid-cols-2"} ${gapSize} items-start w-full`}>
                  {items.map(formula => (
                    <div
                      key={formula.id}
                      className={`bg-white border-2 border-slate-800 rounded-lg ${cardPadding} break-inside-avoid shadow-[2px_2px_0px_0px_rgba(30,41,59,1)] flex flex-col gap-2 w-full`}
                    >
                      <div className="flex items-start gap-1.5 w-full">
                        <span className="text-yellow-500 text-sm">⭐</span>
                        <h3 className="m-0 text-[13px] text-slate-800 font-bold leading-tight break-words flex-1">
                          {formula.name}
                        </h3>
                      </div>
                      <div className={`${mathSize} text-black block w-full text-center py-1 break-words overflow-x-hidden max-w-full`}>
                        {renderMath(formula.latex)}
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
  );
}
