import jsPDF from "jspdf";

export interface FormulaItem {
  id: string;
  name: string;
  latex: string;
  tags: string[];
  chapter?: string;
}

// ── LaTeX → readable plain text ─────────────────────────────

function rep(s: string, search: string, replacement: string): string {
  return s.split(search).join(replacement);
}

function repAll(s: string, search: string, replacement: string): string {
  return s.split(search).join(replacement);
}

function latexToText(latex: string): string {
  let s = latex;

  // Greek letters
  const GREEK: [string, string][] = [
    ["\\alpha", "α"], ["\\beta", "β"], ["\\gamma", "γ"], ["\\delta", "δ"],
    ["\\epsilon", "ε"], ["\\theta", "θ"], ["\\lambda", "λ"], ["\\mu", "μ"],
    ["\\pi", "π"], ["\\sigma", "σ"], ["\\omega", "ω"], ["\\phi", "φ"],
    ["\\rho", "ρ"], ["\\tau", "τ"], ["\\psi", "ψ"],
    ["\\Delta", "Δ"], ["\\Sigma", "Σ"], ["\\Omega", "Ω"], ["\\Phi", "Φ"],
    ["\\Gamma", "Γ"], ["\\Lambda", "Λ"],
  ];
  for (const [cmd, ch] of GREEK) {
    s = rep(s, cmd, ch);
  }

  // Common symbols
  s = rep(s, "\\times", "×");
  s = rep(s, "\\cdot", "·");
  s = rep(s, "\\pm", "±");
  s = rep(s, "\\mp", "∓");
  s = rep(s, "\\leq", "≤");
  s = rep(s, "\\geq", "≥");
  s = rep(s, "\\neq", "≠");
  s = rep(s, "\\approx", "≈");
  s = rep(s, "\\infty", "∞");
  s = rep(s, "\\partial", "∂");
  s = rep(s, "\\nabla", "∇");
  s = rep(s, "\\rightarrow", "→");
  s = rep(s, "\\leftarrow", "←");
  s = rep(s, "\\oint", "∮");
  s = rep(s, "\\int", "∫");
  s = rep(s, "\\sum", "Σ");
  s = rep(s, "\\prod", "Π");
  s = rep(s, "\\sqrt", "√");
  s = rep(s, "\\hat", "");
  s = rep(s, "\\overline", "̄");
  s = rep(s, "\\vec", "");

  // \text{...} / \mathrm{...} / \mathbf{...} → just the content
  s = rep(s, "\\text{", "");
  s = rep(s, "\\mathrm{", "");
  s = rep(s, "\\mathbf{", "");
  s = rep(s, "\\textbf{", "");

  // Fractions: \frac{a}{b} → (a)/(b)
  s = s.replace(/\\frac\{([^}]*)\}\{([^}]*)\}/g, "($1)/($2)");

  // Subscripts: _{abc} or _a
  s = s.replace(/_\{([^}]*)\}/g, (_, inner: string) => {
    const SUB: Record<string, string> = {
      "0": "₀", "1": "₁", "2": "₂", "3": "₃", "4": "₄",
      "5": "₅", "6": "₆", "7": "₇", "8": "₈", "9": "₉",
      a: "ₐ", e: "ₑ", i: "ᵢ", o: "ₒ", u: "ᵤ",
    };
    return [...inner].map((c) => SUB[c] ?? c).join("");
  });
  s = s.replace(/_([a-zA-Z0-9])/, (_, c: string) => {
    const SUB: Record<string, string> = {
      "0": "₀", "1": "₁", "2": "₂", "3": "₃", "4": "₄",
      "5": "₅", "6": "₆", "7": "₇", "8": "₈", "9": "₉",
      a: "ₐ", e: "ₑ", i: "ᵢ", o: "ₒ", u: "ᵤ",
    };
    return SUB[c] ?? c;
  });

  // Superscripts: ^{abc} or ^a
  s = s.replace(/\^\{([^}]*)\}/g, (_, inner: string) => {
    const SUP: Record<string, string> = {
      "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴",
      "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹",
      "+": "⁺", "-": "⁻", "=": "⁼", n: "ⁿ", i: "ⁱ",
    };
    return [...inner].map((c) => SUP[c] ?? c).join("");
  });
  s = s.replace(/\^([a-zA-Z0-9])/, (_, c: string) => {
    const SUP: Record<string, string> = {
      "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴",
      "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹",
      "+": "⁺", "-": "⁻", "=": "⁼", n: "ⁿ", i: "ⁱ",
    };
    return SUP[c] ?? c;
  });

  // Remove remaining backslash commands
  s = s.replace(/\\[a-zA-Z]+/g, " ");

  // Clean up braces and extra spaces
  s = s.replace(/[{}]/g, "");
  s = s.replace(/\s+/g, " ").trim();

  return s;
}

// ── PDF Generation ──────────────────────────────────────────

export async function generatePDF(
  formulas: FormulaItem[],
  subject: string
): Promise<void> {
  const pdf = new jsPDF("p", "mm", "a4");
  const pageW = 210;
  const pageH = 297;
  const mx = 18;
  const cw = pageW - 2 * mx;
  let y = mx;

  // ── Header ───────────────────────────────────────────
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(22);
  pdf.setTextColor(15, 23, 42);
  pdf.text("AskFormula", mx, y);
  y += 9;

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(11);
  pdf.setTextColor(100, 116, 139);
  pdf.text(`${subject} Formula Sheet`, mx, y);
  y += 5;

  const dateStr = new Date().toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  pdf.setFontSize(8);
  pdf.setTextColor(148, 163, 184);
  pdf.text(`Generated on ${dateStr}`, mx, y);
  y += 4;

  pdf.setDrawColor(203, 213, 225);
  pdf.setLineWidth(0.25);
  pdf.line(mx, y, pageW - mx, y);
  y += 8;

  // ── Group by chapter ──────────────────────────────────
  const chapters = new Map<string, FormulaItem[]>();
  for (const f of formulas) {
    const key = f.chapter ?? "General";
    if (!chapters.has(key)) chapters.set(key, []);
    chapters.get(key)!.push(f);
  }

  // ── Render each chapter ───────────────────────────────
  for (const [chapterName, items] of chapters) {
    if (y > pageH - 35) {
      pdf.addPage();
      y = mx;
    }

    // Chapter heading
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(13);
    pdf.setTextColor(59, 130, 246);
    pdf.text(chapterName, mx, y);
    y += 3;

    pdf.setDrawColor(59, 130, 246);
    pdf.setLineWidth(0.4);
    pdf.line(mx, y, mx + 30, y);
    y += 6;

    // ── Each formula ──────────────────────────────────
    for (const formula of items) {
      // Page break
      if (y + 14 > pageH - mx) {
        pdf.addPage();
        y = mx;
      }

      // Name
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(9);
      pdf.setTextColor(51, 65, 85);
      pdf.text(formula.name, mx, y);
      y += 5;

      // Formula text
      const readable = latexToText(formula.latex);
      pdf.setFont("courier", "normal");
      pdf.setFontSize(9);
      pdf.setTextColor(71, 85, 105);

      const lines = pdf.splitTextToSize(readable, cw);
      for (const line of lines) {
        if (y + 4 > pageH - mx) {
          pdf.addPage();
          y = mx;
        }
        pdf.text(line, mx, y);
        y += 4;
      }

      y += 1;

      // Divider
      pdf.setDrawColor(226, 232, 240);
      pdf.setLineWidth(0.15);
      pdf.line(mx, y, pageW - mx, y);
      y += 4;
    }

    y += 4;
  }

  // ── Page footers ──────────────────────────────────────
  const totalPages = pdf.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    pdf.setPage(i);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(7);
    pdf.setTextColor(180, 190, 200);
    pdf.text(
      `AskFormula  ·  ${formulas.length} formulas  ·  Page ${i} of ${totalPages}`,
      pageW / 2,
      pageH - 10,
      { align: "center" }
    );
  }

  // ── Save ──────────────────────────────────────────────
  const slug = subject.toLowerCase().replace(/\s+/g, "-");
  const date = new Date().toISOString().split("T")[0];
  pdf.save(`askformula-${slug}-${date}.pdf`);
}
