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
  // Wait a tick to ensure KaTeX fonts are fully loaded if running in browser
  await new Promise((resolve) => setTimeout(resolve, 100));

  // Create a hidden container for rendering html2canvas
  const container = document.createElement("div");
  // We avoid absolute negative positioning so that the browser actually
  // allocates layout correctly for complex fonts, but we use fixed and opacity 0
  // or extremely high z-index to hide it.
  container.style.position = "fixed";
  container.style.top = "0";
  container.style.left = "0";
  container.style.zIndex = "-9999";
  container.style.width = "794px"; // A4 width at 96 DPI
  // Add a soft, abstract gradient background for the glassmorphism base
  container.style.background = "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)";
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

  // Find all existing styles on the page to ensure KaTeX css is copied
  let stylesHtml = "";
  for (const styleSheet of document.styleSheets) {
    try {
      if (styleSheet.href) {
        stylesHtml += `<link rel="stylesheet" href="${styleSheet.href}" crossorigin="anonymous">`;
      } else {
        const rules = Array.from(styleSheet.cssRules)
          .map((rule) => rule.cssText)
          .join("\n");
        stylesHtml += `<style>${rules}</style>`;
      }
    } catch (e) {
      // Ignore cross-origin stylesheet errors
    }
  }

  // Generate HTML content
  let htmlContent = `
    ${stylesHtml}
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
      <div style="margin-bottom: 40px; page-break-inside: avoid;">
        <div style="background-color: #3b82f6; color: white; display: inline-block; padding: 6px 16px; border-radius: 8px; font-weight: bold; font-size: 15px; margin-bottom: 20px; box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.2);">
          ${chapterName}
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
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
          <div style="
            background: rgba(255, 255, 255, 0.65);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.8);
            border-radius: 12px;
            padding: 16px;
            page-break-inside: avoid;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
          ">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px; border-bottom: 1px solid rgba(148, 163, 184, 0.3); padding-bottom: 8px;">
              <div style="width: 6px; height: 6px; background-color: #3b82f6; border-radius: 50%;"></div>
              <h3 style="margin: 0; font-size: 14px; color: #1e293b; font-weight: 600;">${formula.name}</h3>
            </div>
            <div style="font-size: 16px; color: #0f172a; display: block; width: 100%; overflow-x: hidden;">
              ${renderedMath}
            </div>
          </div>
      `;
    }
    htmlContent += `</div></div>`;
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
