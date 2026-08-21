import jsPDF from "jspdf";
import katex from "katex";

export interface FormulaItem {
  id: string;
  name: string;
  latex: string;
  tags: string[];
  chapter?: string;
}

// ── Render KaTeX formula onto a canvas using SVG foreignObject ──
// This avoids html2canvas entirely — we build an SVG containing the
// KaTeX HTML, load it as an image, and draw it onto a canvas.

async function renderFormula(latex: string): Promise<HTMLCanvasElement | null> {
  // 1. Render KaTeX to HTML
  const tmp = document.createElement("div");
  try {
    katex.render(latex, tmp, { throwOnError: false, displayMode: true });
  } catch {
    tmp.textContent = latex;
  }

  // 2. Collect KaTeX CSS rules from the page
  let katexCSS = "";
  try {
    for (const sheet of Array.from(document.styleSheets)) {
      try {
        const rules = sheet.cssRules || sheet.rules;
        for (const rule of Array.from(rules)) {
          const text = rule.cssText || "";
          if (text.includes("katex")) {
            katexCSS += text + "\n";
          }
        }
      } catch {
        // cross-origin sheet — skip
      }
    }
  } catch {
    // document.styleSheets not accessible
  }

  // 3. Build an SVG with foreignObject
  const w = Math.max(tmp.scrollWidth, 100) + 16;
  const h = Math.max(tmp.scrollHeight, 24) + 12;

  const serialised = new XMLSerializer().serializeToString(tmp);
  const svgStr = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">`,
    `<foreignObject width="100%" height="100%">`,
    `<div xmlns="http://www.w3.org/1999/xhtml" style="display:inline-block;padding:2px 6px;background:#fff;color:#1e293b;font-size:14px;white-space:nowrap">`,
    `<style>${katexCSS}</style>`,
    serialised,
    `</div>`,
    `</foreignObject>`,
    `</svg>`,
  ].join("");

  const blob = new Blob([svgStr], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  // 4. Load as image → draw on canvas
  return new Promise<HTMLCanvasElement | null>((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const scale = 2;
      canvas.width = img.naturalWidth * scale;
      canvas.height = img.naturalHeight * scale;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.scale(scale, scale);
        ctx.drawImage(img, 0, 0);
      }
      URL.revokeObjectURL(url);
      resolve(canvas);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(null);
    };
    img.src = url;
  });
}

// ── Build and download the PDF ───────────────────────────────

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
    if (y > pageH - 40) {
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
      if (y + 20 > pageH - mx) {
        pdf.addPage();
        y = mx;
      }

      // Formula name
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(9);
      pdf.setTextColor(51, 65, 85);
      pdf.text(formula.name, mx, y);
      y += 5;

      // Render KaTeX → canvas → image
      const canvas = await renderFormula(formula.latex);

      if (canvas && canvas.width > 0 && canvas.height > 0) {
        const imgData = canvas.toDataURL("image/png");
        const natW = canvas.width;
        const natH = canvas.height;

        let drawW = cw;
        let drawH = (natH / natW) * drawW;
        if (drawH > 16) {
          drawH = 16;
          drawW = (natW / natH) * drawH;
        }

        if (y + drawH + 4 > pageH - mx) {
          pdf.addPage();
          y = mx;
        }

        pdf.addImage(imgData, "PNG", mx, y, drawW, drawH);
        y += drawH + 3;
      } else {
        // Fallback: readable text
        pdf.setFont("courier", "normal");
        pdf.setFontSize(9);
        pdf.setTextColor(71, 85, 105);
        const lines = pdf.splitTextToSize(formula.latex, cw);
        for (const line of lines) {
          if (y + 4 > pageH - mx) {
            pdf.addPage();
            y = mx;
          }
          pdf.text(line, mx, y);
          y += 4;
        }
        y += 2;
      }

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
