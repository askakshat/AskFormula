import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import katex from "katex";
import "katex/dist/katex.min.css";
import { ArrowLeft, Printer } from "lucide-react";
import { Button } from "../components/ui/button";

interface FormulaItem {
  id: string;
  name: string;
  latex: string;
  chapter?: string;
}

interface Chapter {
  id: string;
  name: string;
  keyPoints?: string[];
  keyDerivations?: string[];
}

interface PrintData {
  formulas: FormulaItem[];
  chapters: Chapter[];
  subject: string;
  layout: string;
  includeContent: string[];
}

export default function PrintView() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const navigate = useNavigate();
  const [data, setData] = useState<PrintData | null>(null);

  useEffect(() => {
    // Hide header/footer on mount, restore on unmount
    const style = document.createElement("style");
    style.innerHTML = `
      @media print {
        header, footer, nav, .no-print { display: none !important; }
        body { background: white !important; }
      }
    `;
    document.head.appendChild(style);

    const storedData = sessionStorage.getItem("askformula-print-data");
    if (storedData) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setData(JSON.parse(storedData));
      } catch (e) {
        console.error("Failed to parse print data", e);
      }
    }

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  if (!data) {
    return (
      <div className="p-8 text-center text-slate-900">
        <p>No print data found. Please go back and try exporting again.</p>
      </div>
    );
  }

  const {
    formulas,
    chapters: chaptersData,
    subject,
    layout,
    includeContent,
  } = data;

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
    const parts = f.latex
      .split(/,\s*\\qquad\s*|\\qquad\s*/)
      .filter((p) => p.trim());
    if (parts.length > 1) {
      parts.forEach((part, index) => {
        chapters.get(key)!.push({
          ...f,
          id: `${f.id}_part${index + 1}`,
          name: `${f.name} (${index + 1})`,
          latex: part,
        });
      });
    } else {
      chapters.get(key)!.push(f);
    }
  }

  const chapterNames = Array.from(
    new Set([
      ...chaptersData.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (ch) => ch.name || (ch as any).chapterName || "General",
      ),
      ...Array.from(chapters.keys()),
    ]),
  );

  const titleColors = ["#fecaca", "#bbf7d0", "#bfdbfe", "#fef08a", "#e9d5ff"];

  const renderKaTeXHTML = (text: string, inline: boolean = true) => {
    try {
      const parts = text.split(/(\$.*?\$)/g);
      return parts.map((part, i) => {
        if (part.startsWith("$") && part.endsWith("$")) {
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
            __html: katex.renderToString(latex, {
              displayMode: true,
              throwOnError: false,
            }),
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
    <div className="bg-slate-100 print:bg-white text-slate-900 font-sans">
      {/* Print Controls (Hidden on print) */}
      <div className="print:hidden sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={handleBack} className="gap-2">
            <ArrowLeft className="w-4 h-4" /> Close
          </Button>
          <h1 className="font-semibold text-lg text-slate-800">
            Print Preview: {subject}
          </h1>
        </div>
        <Button
          onClick={handlePrint}
          className="gap-2 bg-blue-600 hover:bg-blue-700 text-white"
        >
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

          /* Footer styling */
          @page {
            margin: 15mm;
            @bottom-center {
              content: "Generated for free at AskFormula - ask-formula.vercel.app";
              font-family: sans-serif;
              font-size: 10pt;
              color: #64748b;
            }
          }

          .print-footer {
             display: none;
          }

          @media print {
            .print-footer {
              display: block;
              position: fixed;
              bottom: 0;
              left: 0;
              width: 100%;
              text-align: center;
              font-size: 10px;
              color: #64748b;
              padding-bottom: 10px;
              page-break-after: always;
            }
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


        `}
      </style>

      {/* Main Print Content */}
      <div className="w-full max-w-[794px] print:max-w-full mx-auto p-8 print:p-0 bg-white print:bg-transparent shadow-lg print:shadow-none  break-words">
        <div
          className={`${layout === "compact" ? "mb-6" : "mb-10"} text-center`}
        >
          <h1
            className={`m-0 text-slate-800 uppercase tracking-wide font-bold ${layout === "compact" ? "text-2xl" : "text-4xl"}`}
          >
            AskFormula
          </h1>
          <h2
            className={`mt-2 font-semibold text-slate-700 ${layout === "compact" ? "text-lg" : "text-xl"}`}
          >
            {subject} Revision Sheet
          </h2>
          <p className="mt-1 text-sm text-slate-500">Generated on {dateStr}</p>
        </div>

        {chapterNames.map((chapterName, idx) => {
          const items = chapters.get(chapterName) || [];
          const chapterMeta = chaptersData.find(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (ch) => (ch.name || (ch as any).chapterName) === chapterName,
          );
          const keyPoints = chapterMeta?.keyPoints || [];
          const keyDerivations = chapterMeta?.keyDerivations || [];

          const hasFormulas =
            includeContent.includes("formulas") && items.length > 0;
          const hasKeyPoints =
            includeContent.includes("keyPoints") && keyPoints.length > 0;
          const hasDerivations =
            includeContent.includes("keyDerivations") &&
            keyDerivations.length > 0;

          if (!hasFormulas && !hasKeyPoints && !hasDerivations) return null;

          const chapterColor = titleColors[idx % titleColors.length];
          const gapSize = layout === "compact" ? "gap-3" : "gap-6";
          const cardPadding = layout === "compact" ? "p-3" : "p-4";
          const mathSize = layout === "compact" ? "text-[14px]" : "text-[18px]";

          return (
            <div
              key={chapterName}
              className={`${layout === "compact" ? "mb-6" : "mb-10"} w-full`}
            >
              <div
                className={`text-center ${layout === "compact" ? "mb-4" : "mb-6"}`}
              >
                <div
                  className={`inline-block px-6 py-2 rounded-full border-2 border-slate-800 font-bold ${layout === "compact" ? "text-base" : "text-xl"} shadow-[3px_3px_0px_0px_rgba(30,41,59,1)] text-slate-800`}
                  style={{ backgroundColor: chapterColor }}
                >
                  {chapterName}
                </div>
              </div>

              {hasKeyPoints && (
                <div
                  className={`mb-4 bg-yellow-50 border-2 border-slate-800 rounded-lg ${cardPadding} shadow-[2px_2px_0px_0px_rgba(30,41,59,1)] break-inside-avoid w-full`}
                >
                  <h4 className="m-0 mb-2 text-sm font-bold text-slate-800 uppercase">
                    Key Points
                  </h4>
                  <ul
                    className={`m-0 pl-5 ${mathSize} text-black leading-relaxed space-y-2 list-disc list-inside`}
                  >
                    {keyPoints.map((point, i) => (
                      <li key={i}>{renderKaTeXHTML(point)}</li>
                    ))}
                  </ul>
                </div>
              )}

              {hasDerivations && (
                <div
                  className={`mb-4 bg-green-50 border-2 border-slate-800 rounded-lg ${cardPadding} shadow-[2px_2px_0px_0px_rgba(30,41,59,1)] break-inside-avoid w-full`}
                >
                  <h4 className="m-0 mb-2 text-sm font-bold text-slate-800 uppercase">
                    Key Derivations
                  </h4>
                  <ul
                    className={`m-0 pl-5 ${mathSize} text-black leading-relaxed space-y-2 list-disc list-inside`}
                  >
                    {keyDerivations.map((der, i) => (
                      <li key={i}>{renderKaTeXHTML(der)}</li>
                    ))}
                  </ul>
                </div>
              )}

              {hasFormulas && (
                <div
                  className={`grid ${layout === "compact" ? "grid-cols-4" : "grid-cols-2"} ${gapSize} items-start w-full`}
                >
                  {items.map((formula) => {
                    const isMissingFormula =
                      !formula.latex || formula.latex.trim() === "";
                    return (
                      <div
                        key={formula.id}
                        className={`bg-white border-2 border-slate-800 rounded-lg ${cardPadding} break-inside-avoid shadow-[2px_2px_0px_0px_rgba(30,41,59,1)] flex flex-col gap-2 w-full min-w-0 [container-type:inline-size]`}
                      >
                        <div className="flex items-start gap-1.5 w-full min-w-0">
                          <span className="text-yellow-500 text-sm shrink-0">
                            ⭐
                          </span>
                          <h3 className="m-0 text-[13px] text-slate-800 font-bold leading-tight break-words whitespace-normal flex-1 min-w-0">
                            {formula.name}
                          </h3>
                        </div>
                        {!isMissingFormula && (
                          <div
                            className={`text-black block w-full text-center py-1 break-words max-w-full min-w-0 ${layout === "compact" ? "scale-math-compact" : "scale-math-full"}`}
                          >
                            {renderMath(formula.latex)}
                          </div>
                        )}
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
  );
}
