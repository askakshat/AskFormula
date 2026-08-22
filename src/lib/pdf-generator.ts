import html2pdf from "html2pdf.js";
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
  const container = document.createElement("div");
  container.style.width = "794px";
  container.style.background = "#f8fafc";
  container.style.padding = "40px";
  container.style.fontFamily = "system-ui, -apple-system, sans-serif";
  container.style.color = "#000000";

  const dateStr = new Date().toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const chapters = new Map<string, FormulaItem[]>();
  for (const f of formulas) {
    const key = f.chapter ?? "General";
    if (!chapters.has(key)) chapters.set(key, []);
    chapters.get(key)!.push(f);
  }

  // Directly fetch the KaTeX CDN stylesheet and inject PDF-specific overrides.
  const stylesHtml = `
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css" crossorigin="anonymous">
    <style>
      /* Force KaTeX text color to black for PDF export */
      .katex-display > .katex,
      .katex .mord,
      .katex .mbin,
      .katex .mrel,
      .katex .mopen,
      .katex .mclose,
      .katex .mpunct,
      .katex .mop,
      .katex {
        color: #000000 !important;
      }
    </style>
  `;

  let htmlContent = `
    ${stylesHtml}
    <div style="margin-bottom: 30px;">
      <h1 style="margin: 0; font-size: 32px; color: #000000;">AskFormula</h1>
      <h2 style="margin: 5px 0 0 0; font-size: 18px; color: #333333; font-weight: 400;">${subject} Formula Sheet</h2>
      <p style="margin: 5px 0 0 0; font-size: 12px; color: #666666;">Generated on ${dateStr}</p>
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
      } catch {
        renderedMath = `<span style="color: red;">Error rendering formula</span>`;
      }

      htmlContent += `
          <div style="
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            padding: 16px;
            page-break-inside: avoid;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
          ">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">
              <div style="width: 6px; height: 6px; background-color: #3b82f6; border-radius: 50%;"></div>
              <h3 style="margin: 0; font-size: 14px; color: #000000; font-weight: 600;">${formula.name}</h3>
            </div>
            <div style="font-size: 16px; color: #000000; display: block; width: 100%; overflow-x: hidden;">
              ${renderedMath}
            </div>
          </div>
      `;
    }
    htmlContent += `</div></div>`;
  }

  container.innerHTML = htmlContent;

  const slug = subject.toLowerCase().replace(/\s+/g, "-");
  const date = new Date().toISOString().split("T")[0];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const opt: any = {
    margin: 10,
    filename: `askformula-${slug}-${date}.pdf`,
    image: { type: 'jpeg', quality: 1 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  await html2pdf().set(opt).from(container).save();
}
