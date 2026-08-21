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

// ── Render a single KaTeX formula to a canvas via html2canvas ──

async function renderFormula(latex: string): Promise<HTMLCanvasElement | null> {
  const el = document.createElement("div");

  // Position in-viewport but behind everything so html2canvas can rasterise it
  Object.assign(el.style, {
    position: "fixed",
    left: "0",
    top: "0",
    zIndex: "-1",
    background: "white",
    padding: "4px 8px",
    display: "inline-block",
    maxWidth: "480px",
    fontSize: "13px",
    lineHeight: "1.5",
    color: "#1e293b",
    whiteSpace: "nowrap",
  });

  try {
    katex.render(latex, el, { throwOnError: false, displayMode: true });
  } catch {
    el.textContent = latex;
  }

  document.body.appendChild(el);

  // Wait for fonts + layout
  try {
    await document.fonts.ready;
  } catch {
    // fonts.ready not supported in all environments
  }
  await new Promise((r) => setTimeout(r, 80));

  try {
    const canvas = await html2canvas(el, {
      backgroundColor: "#ffffff",
      scale: 2,
      logging: false,
      useCORS: true,
      allowTaint: true,
      // Capture the element itself, not the whole viewport
      width: el.scrollWidth + 2,
      height: el.scrollHeight + 2,
      windowWidth: el.scrollWidth + 2,
      windowHeight: el.scrollHeight + 2,
    });
    return canvas;
  } catch {
    return null;
  } finally {
    document.body.removeChild(el);
  }
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
      // Page break check (name + estimated image height + gap)
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

        // Scale to fit content width, cap height at 16mm
        let drawW = cw;
        let drawH = (natH / natW) * drawW;
        if (drawH > 16) {
          drawH = 16;
          drawW = (natW / natH) * drawH;
        }

        // Final page break check
        if (y + drawH + 4 > pageH - mx) {
          pdf.addPage();
          y = mx;
        }

        pdf.addImage(imgData, "PNG", mx, y, drawW, drawH);
        y += drawH + 3;
      } else {
        // Fallback: raw LaTeX text
        pdf.setFont("courier", "normal");
        pdf.setFontSize(8);
        pdf.setTextColor(100, 116, 139);
        const lines = pdf.splitTextToSize(formula.latex, cw);
        for (const line of lines) {
          if (y + 4 > pageH - mx) {
            pdf.addPage();
            y = mx;
          }
          pdf.text(line, mx, y);
          y += 3.5;
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
