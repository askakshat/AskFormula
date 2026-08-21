import jsPDF from "jspdf";

export interface FormulaItem {
  id: string;
  name: string;
  latex: string;
  tags: string[];
  chapter?: string;
}

// ── LaTeX tokeniser / renderer that draws directly on jsPDF ──
//
// We walk the LaTeX string character by character, resolve commands
// (Greek, fractions, scripts, etc.) and emit jsPDF draw calls.
// No canvas, no DOM, no html2canvas — works everywhere.

const GREEK: Record<string, string> = {
  alpha: "\u03B1", beta: "\u03B2", gamma: "\u03B3", delta: "\u03B4",
  epsilon: "\u03B5", zeta: "\u03B6", eta: "\u03B7", theta: "\u03B8",
  iota: "\u03B9", kappa: "\u03BA", lambda: "\u03BB", mu: "\u03BC",
  nu: "\u03BD", xi: "\u03BE", pi: "\u03C0", rho: "\u03C1",
  sigma: "\u03C3", tau: "\u03C4", phi: "\u03C6", chi: "\u03C7",
  psi: "\u03C8", omega: "\u03C9",
  Alpha: "\u0391", Beta: "\u0392", Gamma: "\u0393", Delta: "\u0394",
  Epsilon: "\u0395", Zeta: "\u0396", Eta: "\u0397", Theta: "\u0398",
  Iota: "\u0399", Kappa: "\u039A", Lambda: "\u039B", Mu: "\u039C",
  Nu: "\u039D", Xi: "\u039E", Pi: "\u03A0", Rho: "\u03A1",
  Sigma: "\u03A3", Tau: "\u03A4", Phi: "\u03A6", Chi: "\u03A7",
  Psi: "\u03A8", Omega: "\u03A9",
};

const SYMBOLS: Record<string, string> = {
  times: "\u00D7", cdot: "\u00B7", pm: "\u00B1", mp: "\u2213",
  leq: "\u2264", geq: "\u2265", neq: "\u2260", approx: "\u2248",
  equiv: "\u2261", infty: "\u221E", partial: "\u2202", nabla: "\u2207",
  rightarrow: "\u2192", leftarrow: "\u2190", leftrightarrow: "\u2194",
  prime: "\u2032", forall: "\u2200", exists: "\u2203",
  int: "\u222B", oint: "\u222E", sum: "\u03A3", prod: "\u03A0",
  sqrt: "\u221A", overline: null as unknown as string, // handled specially
  vec: null as unknown as string, hat: null as unknown as string,
  dot: null as unknown as string, bar: null as unknown as string,
  text: null as unknown as string, mathbf: null as unknown as string,
  mathrm: null as unknown as string, frac: null as unknown as string,
};

// ── Helper: extract brace group starting at pos (after the opening {) ──
function braceGroup(src: string, start: number): [content: string, end: number] {
  let depth = 1;
  let i = start;
  while (i < src.length && depth > 0) {
    if (src[i] === "{") depth++;
    else if (src[i] === "}") depth--;
    i++;
  }
  return [src.slice(start, i - 1), i];
}

// ── Collect "atoms" from a LaTeX string ──────────────────────
// An atom is one of:
//   { text: "A", type: "normal" | "greek" | "symbol" | "space" }
//   { type: "frac", num: Atom[], den: Atom[] }
//   { type: "sup", items: Atom[] }
//   { type: "sub", items: Atom[] }
//   { type: "group", items: Atom[] }   // brace group

type Atom =
  | { type: "text"; text: string; kind: "normal" | "greek" | "symbol" | "space" }
  | { type: "frac"; num: Atom[]; den: Atom[] }
  | { type: "sup"; items: Atom[] }
  | { type: "sub"; items: Atom[] }
  | { type: "group"; items: Atom[] };

function tokenize(src: string): Atom[] {
  const atoms: Atom[] = [];
  let i = 0;

  while (i < src.length) {
    const ch = src[i];

    // ── Backslash command ──
    if (ch === "\\") {
      i++;
      // Read command name
      let cmd = "";
      while (i < src.length && /[a-zA-Z]/.test(src[i])) {
        cmd += src[i];
        i++;
      }
      // Special single-char commands
      if (cmd === "" && i < src.length) {
        cmd = src[i];
        i++;
      }

      if (cmd === "frac") {
        // \frac{num}{den}
        while (i < src.length && src[i] === " ") i++;
        let num: Atom[] = [];
        let den: Atom[] = [];
        if (i < src.length && src[i] === "{") {
          const [content, end] = braceGroup(src, i + 1);
          num = tokenize(content);
          i = end;
        }
        while (i < src.length && src[i] === " ") i++;
        if (i < src.length && src[i] === "{") {
          const [content, end] = braceGroup(src, i + 1);
          den = tokenize(content);
          i = end;
        }
        atoms.push({ type: "frac", num, den });
      } else if (cmd === "text" || cmd === "mathrm" || cmd === "mathbf" || cmd === "textbf") {
        while (i < src.length && src[i] === " ") i++;
        if (i < src.length && src[i] === "{") {
          const [content, end] = braceGroup(src, i + 1);
          atoms.push({ type: "text", text: content, kind: "normal" });
          i = end;
        }
      } else if (cmd === "sqrt") {
        while (i < src.length && src[i] === " ") i++;
        if (i < src.length && src[i] === "{") {
          const [content, end] = braceGroup(src, i + 1);
          atoms.push({ type: "text", text: "\u221A", kind: "symbol" });
          atoms.push({ type: "group", items: tokenize(content) });
          i = end;
        } else {
          atoms.push({ type: "text", text: "\u221A", kind: "symbol" });
        }
      } else if (cmd === "vec") {
        while (i < src.length && src[i] === " ") i++;
        if (i < src.length && src[i] === "{") {
          const [content, end] = braceGroup(src, i + 1);
          const items = tokenize(content);
          atoms.push(...items);
          atoms.push({ type: "text", text: "\u20D7", kind: "symbol" });
          i = end;
        }
      } else if (cmd === "hat") {
        while (i < src.length && src[i] === " ") i++;
        if (i < src.length && src[i] === "{") {
          const [content, end] = braceGroup(src, i + 1);
          const items = tokenize(content);
          atoms.push(...items);
          atoms.push({ type: "text", text: "\u0302", kind: "symbol" });
          i = end;
        }
      } else if (cmd === "overline") {
        while (i < src.length && src[i] === " ") i++;
        if (i < src.length && src[i] === "{") {
          const [content, end] = braceGroup(src, i + 1);
          atoms.push({ type: "group", items: tokenize(content) });
          atoms.push({ type: "text", text: "\u0305", kind: "symbol" });
          i = end;
        }
      } else if (GREEK[cmd]) {
        atoms.push({ type: "text", text: GREEK[cmd], kind: "greek" });
      } else if (SYMBOLS[cmd] !== undefined && SYMBOLS[cmd] !== null) {
        atoms.push({ type: "text", text: SYMBOLS[cmd], kind: "symbol" });
      }
      // Unknown commands are silently dropped
      continue;
    }

    // ── Superscript ──
    if (ch === "^") {
      i++;
      if (i < src.length && src[i] === "{") {
        const [content, end] = braceGroup(src, i + 1);
        atoms.push({ type: "sup", items: tokenize(content) });
        i = end;
      } else if (i < src.length) {
        atoms.push({ type: "sup", items: [{ type: "text", text: src[i], kind: "normal" }] });
        i++;
      }
      continue;
    }

    // ── Subscript ──
    if (ch === "_") {
      i++;
      if (i < src.length && src[i] === "{") {
        const [content, end] = braceGroup(src, i + 1);
        atoms.push({ type: "sub", items: tokenize(content) });
        i = end;
      } else if (i < src.length) {
        atoms.push({ type: "sub", items: [{ type: "text", text: src[i], kind: "normal" }] });
        i++;
      }
      continue;
    }

    // ── Brace group ──
    if (ch === "{") {
      const [content, end] = braceGroup(src, i + 1);
      atoms.push({ type: "group", items: tokenize(content) });
      i = end;
      continue;
    }

    // ── Closing brace (should not happen at this level) ──
    if (ch === "}") {
      i++;
      continue;
    }

    // ── Spaces ──
    if (ch === " " || ch === "~") {
      atoms.push({ type: "text", text: " ", kind: "space" });
      i++;
      while (i < src.length && src[i] === " ") i++;
      continue;
    }

    // ── Plain text ──
    atoms.push({ type: "text", text: ch, kind: "normal" });
    i++;
  }

  return atoms;
}

// ── Flatten atoms to a single text string (for width estimation) ──
function flattenAtoms(atoms: Atom[]): string {
  let result = "";
  for (const a of atoms) {
    switch (a.type) {
      case "text":
        result += a.text;
        break;
      case "group":
        result += flattenAtoms(a.items);
        break;
      case "frac":
        result += flattenAtoms(a.num) + "/" + flattenAtoms(a.den);
        break;
      case "sup":
        result += flattenAtoms(a.items);
        break;
      case "sub":
        result += flattenAtoms(a.items);
        break;
    }
  }
  return result;
}

// ── Render atoms onto a jsPDF page ───────────────────────────
//
// Returns the y position after rendering.
function renderAtoms(
  pdf: jsPDF,
  atoms: Atom[],
  x: number,
  y: number,
  fontSize: number,
  color: [number, number, number],
  maxRight: number
): number {
  const BASE = fontSize;
  const SCRIPT = fontSize * 0.7;
  const FRAC_GAP = 1.2; // mm gap between num and den
  const LINE_PAD = 0.5;

  let cx = x;

  for (const atom of atoms) {
    if (cx > maxRight) break;

    switch (atom.type) {
      case "text": {
        if (atom.kind === "space") {
          cx += BASE * 0.25;
          break;
        }
        pdf.setFont("helvetica", atom.kind === "normal" ? "normal" : "normal");
        pdf.setFontSize(BASE);
        pdf.setTextColor(color[0], color[1], color[2]);
        pdf.text(atom.text, cx, y);
        cx += pdf.getTextWidth(atom.text);
        break;
      }

      case "group": {
        const subY = renderAtoms(pdf, atom.items, cx, y, BASE, color, maxRight);
        cx += pdf.getTextWidth(flattenAtoms(atom.items));
        if (subY !== y) {
          // Multi-line group (from frac inside) — handled by frac
          return subY;
        }
        break;
      }

      case "sup": {
        const saved = pdf.getFontSize();
        pdf.setFontSize(SCRIPT);
        pdf.setTextColor(color[0], color[1], color[2]);
        const txt = flattenAtoms(atom.items);
        pdf.text(txt, cx, y - BASE * 0.35);
        cx += pdf.getTextWidth(txt);
        pdf.setFontSize(saved);
        break;
      }

      case "sub": {
        const saved = pdf.getFontSize();
        pdf.setFontSize(SCRIPT);
        pdf.setTextColor(color[0], color[1], color[2]);
        const txt = flattenAtoms(atom.items);
        pdf.text(txt, cx, y + BASE * 0.12);
        cx += pdf.getTextWidth(txt);
        pdf.setFontSize(saved);
        break;
      }

      case "frac": {
        const numText = flattenAtoms(atom.num);
        const denText = flattenAtoms(atom.den);

        pdf.setFontSize(SCRIPT);
        const numW = pdf.getTextWidth(numText);
        const denW = pdf.getTextWidth(denText);
        const lineW = Math.max(numW, denW) + 2 * LINE_PAD;
        const lineY = y + BASE * 0.05;

        // Draw numerator
        const numX = cx + (lineW - numW) / 2;
        renderAtoms(pdf, atom.num, numX, lineY - FRAC_GAP, SCRIPT, color, maxRight);

        // Draw fraction line
        pdf.setDrawColor(color[0], color[1], color[2]);
        pdf.setLineWidth(0.15);
        pdf.line(cx + LINE_PAD, lineY, cx + lineW - LINE_PAD, lineY);

        // Draw denominator
        const denX = cx + (lineW - denW) / 2;
        renderAtoms(pdf, atom.den, denX, lineY + SCRIPT * 0.4 + FRAC_GAP, SCRIPT, color, maxRight);

        cx += lineW;
        break;
      }
    }
  }

  return y;
}

// ── Render a full formula (name + LaTeX) onto the page ───────
function renderFormulaOnPDF(
  pdf: jsPDF,
  formula: FormulaItem,
  x: number,
  y: number,
  maxRight: number,
  pageH: number,
  mx: number
): number {
  const NAME_SIZE = 9;
  const FORMULA_SIZE = 11;
  const NAME_COLOR: [number, number, number] = [51, 65, 85];
  const FORMULA_COLOR: [number, number, number] = [30, 41, 59];

  // Check page break for name + formula estimate
  if (y + 16 > pageH - mx) {
    pdf.addPage();
    y = mx;
  }

  // Formula name
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(NAME_SIZE);
  pdf.setTextColor(NAME_COLOR[0], NAME_COLOR[1], NAME_COLOR[2]);
  pdf.text(formula.name, x, y);
  y += NAME_SIZE * 0.35;

  // Parse and render formula
  const atoms = tokenize(formula.latex);
  y = renderAtoms(pdf, atoms, x, y + FORMULA_SIZE * 0.35, FORMULA_SIZE, FORMULA_COLOR, maxRight);
  y += FORMULA_SIZE * 0.35;

  return y;
}

// ── Public API ───────────────────────────────────────────────

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

  // Decorative header line
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

  // ── Render each chapter ───────────────────────────────
  for (const [chapterName, items] of chapters) {
    // Chapter heading
    if (y > pageH - 30) {
      pdf.addPage();
      y = mx;
    }

    // Chapter pill
    pdf.setFillColor(59, 130, 246);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(10);
    const chW = pdf.getTextWidth(chapterName) + 8;
    pdf.roundedRect(mx, y - 3.5, chW, 6, 1.5, 1.5, "F");
    pdf.setTextColor(255, 255, 255);
    pdf.text(chapterName, mx + 4, y);
    y += 8;

    // Formulas
    for (const formula of items) {
      y = renderFormulaOnPDF(pdf, formula, mx, y, pageW - mx, pageH, mx);

      // Subtle divider
      pdf.setDrawColor(226, 232, 240);
      pdf.setLineWidth(0.1);
      pdf.line(mx + 2, y, pageW - mx - 2, y);
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
