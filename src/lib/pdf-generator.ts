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

// Render LaTeX to a canvas element
async function renderLatexToCanvas(latex: string): Promise<HTMLCanvasElement> {
  const div = document.createElement("div");
  div.style.position = "absolute";
  div.style.left = "-9999px";
  div.style.top = "-9999px";
  div.style.fontSize = "14px";
  div.style.padding = "8px";
  div.style.background = "white";
  div.style.color = "#1e293b";
  div.style.display = "inline-block";

  try {
    katex.render(latex, div, {
      throwOnError: false,
      displayMode: true,
    });
  } catch {
    div.textContent = latex;
  }

  document.body.appendChild(div);
  const canvas = await html2canvas(div, {
    backgroundColor: "#ffffff",
    scale: 2,
  });
  document.body.removeChild(div);
  return canvas;
}

// Generate PDF with all selected formulas
export async function generatePDF(
  formulas: FormulaItem[],
  subject: string
): Promise<void> {
  const pdf = new jsPDF("p", "mm", "a4");
  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 20;
  const contentWidth = pageWidth - 2 * margin;
  let y = margin;

  // Add header
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(20);
  pdf.setTextColor(30, 41, 59);
  pdf.text("AskFormula", margin, y);
  y += 8;

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(12);
  pdf.setTextColor(100, 116, 139);
  pdf.text(`${subject} Formula Sheet`, margin, y);
  y += 6;

  const dateStr = new Date().toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  pdf.setFontSize(9);
  pdf.text(`Generated on ${dateStr}`, margin, y);
  y += 4;

  // Draw separator line
  pdf.setDrawColor(148, 163, 184);
  pdf.setLineWidth(0.3);
  pdf.line(margin, y, pageWidth - margin, y);
  y += 8;

  // Group formulas by chapter
  const chapterMap = new Map<string, FormulaItem[]>();
  for (const f of formulas) {
    const ch = f.chapter ?? "General";
    if (!chapterMap.has(ch)) chapterMap.set(ch, []);
    chapterMap.get(ch)!.push(f);
  }

  // Process each chapter
  for (const [chapterName, chapterFormulas] of chapterMap) {
    // Check if we need a new page for chapter header
    if (y > pageHeight - 40) {
      pdf.addPage();
      y = margin;
    }

    // Chapter heading
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(14);
    pdf.setTextColor(59, 130, 246);
    pdf.text(chapterName, margin, y);
    y += 8;

    // Process each formula
    for (const formula of chapterFormulas) {
      try {
        // Render formula to canvas
        const canvas = await renderLatexToCanvas(formula.latex);
        const imgData = canvas.toDataURL("image/png");
        const imgWidth = contentWidth;
        const imgHeight = (canvas.height / canvas.width) * imgWidth;

        const neededHeight = 8 + Math.min(imgHeight, 20) + 6;

        // Check if we need a new page
        if (y + neededHeight > pageHeight - margin) {
          pdf.addPage();
          y = margin;
        }

        // Formula name
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(10);
        pdf.setTextColor(30, 41, 59);
        pdf.text(formula.name, margin, y);
        y += 5;

        // Formula image
        const displayHeight = Math.min(imgHeight, 20);
        const displayWidth = (displayHeight / imgHeight) * imgWidth;
        pdf.addImage(imgData, "PNG", margin, y, displayWidth, displayHeight);
        y += displayHeight + 4;

        // Separator
        pdf.setDrawColor(226, 232, 240);
        pdf.setLineWidth(0.1);
        pdf.line(margin, y, pageWidth - margin, y);
        y += 4;
      } catch {
        // Fallback: add formula as text
        if (y + 15 > pageHeight - margin) {
          pdf.addPage();
          y = margin;
        }
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(10);
        pdf.setTextColor(30, 41, 59);
        pdf.text(formula.name, margin, y);
        y += 5;
        pdf.setFont("courier", "normal");
        pdf.setFontSize(9);
        pdf.setTextColor(71, 85, 105);
        pdf.text(formula.latex, margin, y);
        y += 10;
      }
    }

    y += 4;
  }

  // Save PDF
  const filename = `askformula-${subject.toLowerCase()}-${new Date().toISOString().split("T")[0]}.pdf`;
  pdf.save(filename);
}
