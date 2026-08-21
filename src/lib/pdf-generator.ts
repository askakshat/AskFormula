import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import katex from "katex";

export interface FormulaItem {
  id: string;
  name: string;
  latex: string;
  tags?: string[];
  chapter?: string;
}

export async function generatePDF(
  formulas: FormulaItem[],
  subject: string,
): Promise<void> {
  // Create a hidden container for rendering html2canvas
  const container = document.createElement("div");
  container.style.position = "absolute";
  container.style.top = "-9999px";
  container.style.left = "-9999px";
  container.style.width = "794px"; // A4 width at 96 DPI
  container.style.backgroundColor = "white";
  container.style.padding = "40px";
  container.style.fontFamily = "system-ui, -apple-system, sans-serif";
  container.style.color = "#0f172a";
  document.body.appendChild(container);

  const dateStr = new Date().toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Group by chapter
  const chapters = new Map<string, FormulaItem[]>();
  for (const f of formulas) {
    const key = f.chapter ?? "General";
    if (!chapters.has(key)) chapters.set(key, []);
    chapters.get(key)!.push(f);
  }

  // Generate HTML content
  let htmlContent = `
    <div style="margin-bottom: 30px;">
      <h1 style="margin: 0; font-size: 32px; color: #0f172a;">AskFormula</h1>
      <h2 style="margin: 5px 0 0 0; font-size: 18px; color: #64748b; font-weight: 400;">${subject} Formula Sheet</h2>
      <p style="margin: 5px 0 0 0; font-size: 12px; color: #94a3b8;">Generated on ${dateStr}</p>
      <div style="margin-top: 15px; border-bottom: 3px solid #3b82f6; width: 60px; display: inline-block;"></div>
      <div style="margin-top: -3px; border-bottom: 1px solid #cbd5e1; width: calc(100% - 60px); display: inline-block; vertical-align: top;"></div>
    </div>
  `;

  for (const [chapterName, items] of chapters) {
    htmlContent += `
      <div style="margin-bottom: 30px; page-break-inside: avoid;">
        <div style="background-color: #3b82f6; color: white; display: inline-block; padding: 6px 12px; border-radius: 6px; font-weight: bold; font-size: 14px; margin-bottom: 15px;">
          ${chapterName}
        </div>
    `;

    for (const formula of items) {
      let renderedMath = "";
      try {
        renderedMath = katex.renderToString(formula.latex, {
          displayMode: true,
          throwOnError: false,
        });
      } catch (e) {
        renderedMath = `<span style="color: red;">Error rendering formula</span>`;
      }

      htmlContent += `
        <div style="margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid #e2e8f0; page-break-inside: avoid;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
            <div style="width: 4px; height: 4px; background-color: #64748b; border-radius: 50%;"></div>
            <h3 style="margin: 0; font-size: 14px; color: #334155;">${formula.name}</h3>
          </div>
          <div style="padding-left: 12px; font-size: 16px; color: #1e293b; overflow-x: auto;">
            ${renderedMath}
          </div>
        </div>
      `;
    }
    htmlContent += `</div>`;
  }

  container.innerHTML = htmlContent;

  // Render to canvas
  const canvas = await html2canvas(container, {
    scale: 2, // Higher resolution
    useCORS: true,
    logging: false,
  });

  document.body.removeChild(container);

  // Generate PDF
  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "mm", "a4");
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

  let heightLeft = pdfHeight;
  let position = 0;

  // Handle multi-page
  pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
  heightLeft -= pdf.internal.pageSize.getHeight();

  while (heightLeft >= 0) {
    position = heightLeft - pdfHeight;
    pdf.addPage();
    pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
    heightLeft -= pdf.internal.pageSize.getHeight();
  }

  // Add footers
  const totalPages = pdf.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    pdf.setPage(i);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(7);
    pdf.setTextColor(180, 190, 200);
    pdf.text(
      `AskFormula  ·  ${formulas.length} formulas  ·  Page ${i} of ${totalPages}`,
      pdfWidth / 2,
      pdf.internal.pageSize.getHeight() - 10,
      { align: "center" },
    );
  }

  const slug = subject.toLowerCase().replace(/\s+/g, "-");
  const date = new Date().toISOString().split("T")[0];
  pdf.save(`askformula-${slug}-${date}.pdf`);
}
