import { useMemo } from "react";
import katex from "katex";

interface FormulaCardProps {
  formula: {
    id: string;
    name: string;
    latex: string;
    tags: string[];
    chapter?: string;
  };
}

export default function FormulaCard({ formula }: FormulaCardProps) {
  const rendered = useMemo(() => {
    try {
      return katex.renderToString(formula.latex, {
        throwOnError: false,
        displayMode: true,
      });
    } catch {
      return `<code class="text-sm font-mono">${formula.latex}</code>`;
    }
  }, [formula.latex]);

  return (
    <div className="group relative p-5 rounded-2xl bg-white/[0.03] backdrop-blur-2xl border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-200">
      <div className="relative z-10">
        {/* Formula name */}
        <h3 className="text-[13px] font-medium text-slate-300 mb-3 tracking-[-0.01em]">
          {formula.name}
        </h3>

        {/* Rendered LaTeX */}
        <div
          className="text-slate-200 overflow-x-auto py-0.5 [&_.katex-display]:my-1 [&_.katex]:text-[15px]"
          dangerouslySetInnerHTML={{ __html: rendered }}
        />

        {/* Chapter tag */}
        {formula.chapter && (
          <div className="mt-3 pt-3 border-t border-white/[0.04]">
            <span className="text-[11px] text-slate-500 font-medium">
              {formula.chapter}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
