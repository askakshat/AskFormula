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
      return `<code class="text-sm">${formula.latex}</code>`;
    }
  }, [formula.latex]);

  return (
    <div className="group relative p-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/8 hover:border-white/20 transition-all duration-300">
      {/* Subtle gradient on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10">
        {/* Formula name */}
        <h3 className="text-sm font-medium text-white mb-2">{formula.name}</h3>

        {/* Rendered LaTeX */}
        <div
          className="text-slate-200 overflow-x-auto py-1 [&_.katex-display]:my-0 [&_.katex]:text-sm"
          dangerouslySetInnerHTML={{ __html: rendered }}
        />

        {/* Chapter tag */}
        {formula.chapter && (
          <div className="mt-3">
            <span className="inline-block px-2 py-0.5 text-[10px] font-medium rounded-full bg-blue-500/15 text-blue-300 border border-blue-400/20">
              {formula.chapter}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
