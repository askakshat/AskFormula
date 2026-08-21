import jsPDF from "jspdf";

export interface FormulaItem {
  id: string;
  name: string;
  latex: string;
  tags: string[];
  chapter?: string;
}

// ── Symbol-font mapping for Greek letters (PDF Symbol encoding) ──
// When pdf.setFont("Symbol") is active, these ASCII codes produce Greek letters.
const GREEK_SYMBOL: Record<string, string> = {
  alpha: "a", beta: "b", gamma: "g", delta: "d", epsilon: "e",
  zeta: "z", eta: "h", theta: "q", iota: "i", kappa: "k",
  lambda: "l", mu: "m", nu: "n", xi: "x", pi: "p",
  rho: "r", sigma: "s", tau: "t", phi: "f", chi: "c",
  psi: "y", omega: "w",
  Alpha: "A", Beta: "B", Gamma: "G", Delta: "D", Epsilon: "E",
  Zeta: "Z", Eta: "H", Theta: "Q", Iota: "I", Kappa: "K",
  Lambda: "L", Mu: "M", Nu: "N", Xi: "X", Pi: "P",
  Rho: "R", Sigma: "S", Tau: "T", Phi: "F", Chi: "C",
  Psi: "Y", Omega: "W",
};

const TEXT_SYMBOLS: Record<string, string> = {
  times: "\u00D7", cdot: "\u00B7", pm: "\u00B1", mp: "\u2213",
  leq: "\u2264", geq: "\u2265", neq: "\u2260", approx: "\u2248",
  equiv: "\u2261", infty: "\u221E", partial: "\u2202", nabla: "\u2207",
  rightarrow: "\u2192", leftarrow: "\u2190", prime: "\u2032",
  forall: "\u2200", exists: "\u2203",
  int: "\u222B", oint: "\u222E", sqrt: "\u221A",
};

// ── Brace-group extractor ──
function braceGroup(src: string, start: number): [string, number] {
  let depth = 1;
  let i = start;
  while (i < src.length && depth > 0) {
    if (src[i] === "{") depth++;
    else if (src[i] === "}") depth--;
    i++;
  }
  return [src.slice(start, i - 1), i];
}

// ── Atom types ──
type Atom =
  | { type: "text"; text: string; font: "normal" | "symbol" }
  | { type: "frac"; num: Atom[]; den: Atom[] }
  | { type: "sup"; items: Atom[] }
  | { type: "sub"; items: Atom[] }
  | { type: "group"; items: Atom[] };

// ── Tokeniser ──
function tokenize(src: string): Atom[] {
  const atoms: Atom[] = [];
  let i = 0;
  while (i < src.length) {
    const ch = src[i];

    if (ch === "\\") {
      i++;
      let cmd = "";
      while (i < src.length && /[a-zA-Z]/.test(src[i])) { cmd += src[i]; i++; }
      if (cmd === "" && i < src.length) { cmd = src[i]; i++; }

      if (cmd === "frac") {
        while (i < src.length && src[i] === " ") i++;
        let num: Atom[] = [];
        let den: Atom[] = [];
        if (i < src.length && src[i] === "{") { const [c, e] = braceGroup(src, i + 1); num = tokenize(c); i = e; }
        while (i < src.length && src[i] === " ") i++;
        if (i < src.length && src[i] === "{") { const [c, e] = braceGroup(src, i + 1); den = tokenize(c); i = e; }
        atoms.push({ type: "frac", num, den });
      } else if (cmd === "text" || cmd === "mathrm" || cmd === "mathbf") {
        while (i < src.length && src[i] === " ") i++;
        if (i < src.length && src[i] === "{") { const [c, e] = braceGroup(src, i + 1); atoms.push({ type: "text", text: c, font: "normal" }); i = e; }
      } else if (cmd === "sqrt") {
        while (i < src.length && src[i] === " ") i++;
        if (i < src.length && src[i] === "{") {
          const [c, e] = braceGroup(src, i + 1);
          atoms.push({ type: "text", text: "\u221A", font: "normal" });
          atoms.push({ type: "group", items: tokenize(c) });
          i = e;
        }
      } else if (cmd === "vec") {
        while (i < src.length && src[i] === " ") i++;
        if (i < src.length && src[i] === "{") {
          const [c, e] = braceGroup(src, i + 1);
          atoms.push(...tokenize(c));
          i = e;
        }
      } else if (cmd === "overline") {
        while (i < src.length && src[i] === " ") i++;
        if (i < src.length && src[i] === "{") {
          const [c, e] = braceGroup(src, i + 1);
          atoms.push({ type: "group", items: tokenize(c) });
          i = e;
        }
      } else if (GREEK_SYMBOL[cmd]) {
        atoms.push({ type: "text", text: GREEK_SYMBOL[cmd], font: "symbol" });
      } else if (TEXT_SYMBOLS[cmd] !== undefined) {
        atoms.push({ type: "text", text: TEXT_SYMBOLS[cmd], font: "normal" });
      }
      continue;
    }

    if (ch === "^") {
      i++;
      if (i < src.length && src[i] === "{") { const [c, e] = braceGroup(src, i + 1); atoms.push({ type: "sup", items: tokenize(c) }); i = e; }
      else if (i < src.length) { atoms.push({ type: "sup", items: [{ type: "text", text: src[i], font: "normal" }] }); i++; }
      continue;
    }

    if (ch === "_") {
      i++;
      if (i < src.length && src[i] === "{") { const [c, e] = braceGroup(src, i + 1); atoms.push({ type: "sub", items: tokenize(c) }); i = e; }
      else if (i < src.length) { atoms.push({ type: "sub", items: [{ type: "text", text: src[i], font: "normal" }] }); i++; }
      continue;
    }

    if (ch === "{") { const [c, e] = braceGroup(src, i + 1); atoms.push({ type: "group", items: tokenize(c) }); i = e; continue; }
    if (ch === "}") { i++; continue; }
    if (ch === " " || ch === "~") { i++; while (i < src.length && src[i] === " ") i++; continue; }

    atoms.push({ type: "text", text: ch, font: "normal" });
    i++;
  }
  return atoms;
}

// ── Flatten atoms to plain text (for width estimation) ──
function flatten(atoms: Atom[]): string {
  let r = "";
  for (const a of atoms) {
    if (a.type === "text") r += a.text;
    else if (a.type === "group") r += flatten(a.items);
    else if (a.type === "frac") r += flatten(a.num) + "/" + flatten(a.den);
    else if (a.type === "sup") r += flatten(a.items);
    else if (a.type === "sub") r += flatten(a.items);
  }
  return r;
}

// ── Helper: measure text width (sets font temporarily) ──
function measureText(pdf: jsPDF, text: string, size: number, font: "normal" | "symbol"): number {
  if (font === "symbol") {
    pdf.setFont("Symbol", "normal");
  } else {
    pdf.setFont("helvetica", "normal");
  }
  pdf.setFontSize(size);
  return pdf.getTextWidth(text);
}

// ── Render atoms onto the PDF ──
function renderAtoms(
  pdf: jsPDF,
  atoms: Atom[],
  x: number,
  y: number,
  size: number,
  color: [number, number, number],
  maxRight: number,
): number {
  const SCRIPT = size * 0.72;
  const FRAC_LINE_GAP = 0.8;
  const LINE_PAD = 0.4;
  let cx = x;

  for (const atom of atoms) {
    if (cx > maxRight) break;

    switch (atom.type) {
      case "text": {
        if (atom.font === "symbol") {
          pdf.setFont("Symbol", "normal");
        } else {
          pdf.setFont("helvetica", "normal");
        }
        pdf.setFontSize(size);
        pdf.setTextColor(color[0], color[1], color[2]);
        pdf.text(atom.text, cx, y);
        cx += pdf.getTextWidth(atom.text);
        break;
      }

      case "group": {
        cx = renderAtoms(pdf, atom.items, cx, y, size, color, maxRight);
        break;
      }

      case "sup": {
        const txt = flatten(atom.items);
        const w = measureText(pdf, txt, SCRIPT, "normal");
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(SCRIPT);
        pdf.setTextColor(color[0], color[1], color[2]);
        pdf.text(txt, cx, y - size * 0.28);
        cx += w;
        break;
      }

      case "sub": {
        const txt = flatten(atom.items);
        const w = measureText(pdf, txt, SCRIPT, "normal");
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(SCRIPT);
        pdf.setTextColor(color[0], color[1], color[2]);
        pdf.text(txt, cx, y + size * 0.15);
        cx += w;
        break;
      }

      case "frac": {
        const numText = flatten(atom.num);
        const denText = flatten(atom.den);
        const numW = measureText(pdf, numText, SCRIPT, "normal");
        const denW = measureText(pdf, denText, SCRIPT, "normal");
        const lineW = Math.max(numW, denW) + 2 * LINE_PAD;
        const lineY = y + size * 0.05;

        // Numerator
        renderAtoms(pdf, atom.num, cx + (lineW - numW) / 2, lineY - FRAC_LINE_GAP, SCRIPT, color, maxRight);

        // Fraction line
        pdf.setDrawColor(color[0], color[1], color[2]);
        pdf.setLineWidth(0.12);
        pdf.line(cx + LINE_PAD * 0.5, lineY, cx + lineW - LINE_PAD * 0.5, lineY);

        // Denominator
        renderAtoms(pdf, atom.den, cx + (lineW - denW) / 2, lineY + SCRIPT * 0.35 + FRAC_LINE_GAP, SCRIPT, color, maxRight);

        cx += lineW;
        break;
      }
    }
  }

  return cx;
}

// ── Render one formula (name + expression) ──
function renderFormulaOnPDF(
  pdf: jsPDF,
  formula: FormulaItem,
  x: number,
  y: number,
  maxRight: number,
  pageH: number,
  mx: number,
): number {
  const NAME_SIZE = 9;
  const FORMULA_SIZE = 12;
  const NAME_COLOR: [number, number, number] = [51, 65, 85];
  const FORMULA_COLOR: [number, number, number] = [30, 41, 59];
  const ACCENT: [number, number, number] = [100, 116, 139];

  if (y + 18 > pageH - mx) {
    pdf.addPage();
    y = mx;
  }

  // Name
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(NAME_SIZE);
  pdf.setTextColor(NAME_COLOR[0], NAME_COLOR[1], NAME_COLOR[2]);
  pdf.text(formula.name, x, y);
  y += NAME_SIZE * 0.38;

  // Small dot accent before formula
  pdf.setFillColor(ACCENT[0], ACCENT[1], ACCENT[2]);
  pdf.circle(x + 1.2, y + 1.5, 0.4, "F");

  // Formula
  const atoms = tokenize(formula.latex);
  const startX = x + 3;
  const endX = renderAtoms(pdf, atoms, startX, y + FORMULA_SIZE * 0.35, FORMULA_SIZE, FORMULA_COLOR, maxRight);
  void endX;
  y += FORMULA_SIZE * 0.35 + FORMULA_SIZE * 0.32;

  return y;
}

// ── Public API ───────────────────────────────────────────────

export async function generatePDF(
  formulas: FormulaItem[],
  subject: string,
): Promise<void> {
  const pdf = new jsPDF("p", "mm", "a4");
  const pageW = 210;
  const pageH = 297;
  const mx = 18;
  const cw = pageW - 2 * mx;
  let y = mx;

  // ── Header ───────────────────────────────────────────
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(24);
  pdf.setTextColor(15, 23, 42);
  pdf.text("AskFormula", mx, y);
  y += 10;

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(12);
  pdf.setTextColor(100, 116, 139);
  pdf.text(`${subject} Formula Sheet`, mx, y);
  y += 6;

  const dateStr = new Date().toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  pdf.setFontSize(8);
  pdf.setTextColor(148, 163, 184);
  pdf.text(`Generated on ${dateStr}`, mx, y);
  y += 3;

  pdf.setDrawColor(59, 130, 246);
  pdf.setLineWidth(0.6);
  pdf.line(mx, y, mx + 40, y);
  pdf.setDrawColor(203, 213, 225);
  pdf.setLineWidth(0.2);
  pdf.line(mx + 42, y, pageW - mx, y);
  y += 8;

  // ── Group by chapter ──────────────────────────────────
  const chapters = new Map<string, FormulaItem[]>();
  for (const f of formulas) {
    const key = f.chapter ?? "General";
    if (!chapters.has(key)) chapters.set(key, []);
    chapters.get(key)!.push(f);
  }

  // ── Render chapters ──────────────────────────────────
  for (const [chapterName, items] of chapters) {
    if (y > pageH - 30) {
      pdf.addPage();
      y = mx;
    }

    // Chapter pill
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(10);
    const chW = pdf.getTextWidth(chapterName) + 8;
    pdf.setFillColor(59, 130, 246);
    pdf.roundedRect(mx, y - 3.5, chW, 6, 1.5, 1.5, "F");
    pdf.setTextColor(255, 255, 255);
    pdf.text(chapterName, mx + 4, y);
    y += 8;

    for (const formula of items) {
      y = renderFormulaOnPDF(pdf, formula, mx, y, pageW - mx, pageH, mx);

      pdf.setDrawColor(230, 235, 243);
      pdf.setLineWidth(0.12);
      pdf.line(mx + 3, y, pageW - mx - 3, y);
      y += 5;
    }

    y += 6;
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
      { align: "center" },
    );
  }

  // ── Save ──────────────────────────────────────────────
  const slug = subject.toLowerCase().replace(/\s+/g, "-");
  const date = new Date().toISOString().split("T")[0];
  pdf.save(`askformula-${slug}-${date}.pdf`);
}
