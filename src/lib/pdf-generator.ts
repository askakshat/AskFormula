import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import katex from "katex";

export interface FormulaItem {
  id: string;
  name: string;
  latex: string;
  tags: string[];
  chapter?: string;
}

/**
 * Render a LaTeX string into a temporary DOM element, capture it with
 * html2canvas, and return the canvas. The element is positioned so
 * html2canvas can reliably rasterise it.
 */
async function renderLatexToCanvas(latex: string): Promise<HTMLCanvasElement | null> {
  const wrapper = document.createElement("div");

  // Keep the element inside the viewport so html2canvas can see it,
  // but move it far off-screen and make it invisible to the user.
  Object.assign(wrapper.style, {
    position: "fixed",
    left: "0",
    top: "0",
    zIndex: "-1",
    pointerEvents: "none",
    background: "white",
    padding: "6px 10px",
    display: "inline-block",
    maxWidth: "500px",
    fontSize: "13px",
    lineHeight: "1.4",
    fontFamily:
      'KaTeX_Main, "Times New Roman", Times, serif',
    color: "#1e293b",
  });

  try {
    katex.render(latex, wrapper, { throwOnError: false, displayMode: true });
  } catch {
    wrapper.textContent = latex;
  }

  document.body.appendChild(wrapper);

  // Let the browser finish layout + font loading before capture.
  await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

  try {
    const canvas = await html2canvas(wrapper, {
      backgroundColor: "#ffffff",
      scale: 2,
      logging: false,
      useCORS: true,
      allowTaint: true,
    });
    return canvas;
  } catch {
    return null;
  } finally {
    document.body.removeChild(wrapper);
  }
}

/**
 * Build and download a PDF formula sheet.
 */
export async function generatePDF(
  formulas: FormulaItem[],
  subject: string
): Promise<void> {
  const pdf = new jsPDF("p", "mm", "a4");
  const pageW = 210;
  const pageH = 297;
  const mx = 18;           // horizontal margin
  const cw = pageW - 2 * mx; // content width
  let y = mx;

  // ── Header ──────────────────────────────────────────────
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

  // Separator
  pdf.setDrawColor(203, 213, 225);
  pdf.setLineWidth(0.25);
  pdf.line(mx, y, pageW - mx, y);
  y += 8;

  // ── Group formulas by chapter ───────────────────────────
  const chapters = new Map<string, FormulaItem[]>();
  for (const f of formulas) {
    const key = f.chapter ?? "General";
    if (!chapters.has(key)) chapters.set(key, []);
    chapters.get(key)!.push(f);
  }

  const formulaCount = { done: 0, total: formulas.length };

  // ── Render each chapter ─────────────────────────────────
  for (const [chapterName, items] of chapters) {
    // Need room for chapter heading + at least one formula
    if (y > pageH - 50) {
      pdf.addPage();
      y = mx;
    }

    // Chapter heading
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(13);
    pdf.setTextColor(59, 130, 246);
    pdf.text(chapterName, mx, y);
    y += 3;

    // Thin accent line under heading
    pdf.setDrawColor(59, 130, 246);
    pdf.setLineWidth(0.4);
    pdf.line(mx, y, mx + 30, y);
    y += 6;

    // ── Render each formula ─────────────────────────────
    for (const formula of items) {
      const nameH = 5;
      const gapAfter = 5;
      const imgMaxH = 18;

      // Check page break (estimate: name + image + gap)
      if (y + nameH + imgMaxH + gapAfter > pageH - mx) {
        pdf.addPage();
        y = mx;
      }

      // Formula name
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(9);
      pdf.setTextColor(51, 65, 85);
      pdf.text(formula.name, mx, y);
      y += nameH;

      // Try to render KaTeX → canvas → image
      const canvas = await renderLatexToCanvas(formula.latex);

      if (canvas && canvas.width > 0 && canvas.height > 0) {
        const imgData = canvas.toDataURL("image/png");
        const natW = canvas.width;
        const natH = canvas.height;

        // Scale to fit content width, capped at imgMaxH
        let drawW = cw;
        let drawH = (natH / natW) * drawW;
        if (drawH > imgMaxH) {
          drawH = imgMaxH;
          drawW = (natW / natH) * drawH;
        }

        // Final page-break check with actual image height
        if (y + drawH + gapAfter > pageH - mx) {
          pdf.addPage();
          y = mx;
        }

        pdf.addImage(imgData, "PNG", mx, y, drawW, drawH);
        y += drawH;
      } else {
        // Fallback: plain-text LaTeX source
        pdf.setFont("courier", "normal");
        pdf.setFontSize(8);
        pdf.setTextColor(71, 85, 105);

        // Word-wrap long strings
        const lines = pdf.splitTextToSize(formula.latex, cw);
        for (const line of lines) {
          if (y + 4 > pageH - mx) {
            pdf.addPage();
            y = mx;
          }
          pdf.text(line, mx, y);
          y += 3.5;
        }
      }

      // Divider between formulas
      y += 1;
      pdf.setDrawColor(226, 232, 240);
      pdf.setLineWidth(0.15);
      pdf.line(mx, y, pageW - mx, y);
      y += gapAfter;

      formulaCount.done++;
    }

    // Extra space between chapters
    y += 4;
  }

  // ── Footer on every page ───────────────────────────────
  const totalPages = pdf.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    pdf.setPage(i);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(7);
    pdf.setTextColor(180, 190, 200);
    pdf.text(
      `AskFormula  ·  ${formulaCount.total} formulas  ·  Page ${i} of ${totalPages}`,
      pageW / 2,
      pageH - 10,
      { align: "center" }
    );
  }

  // ── Save ────────────────────────────────────────────────
  const slug = subject.toLowerCase().replace(/\s+/g, "-");
  const date = new Date().toISOString().split("T")[0];
  pdf.save(`askformula-${slug}-${date}.pdf`);
}
