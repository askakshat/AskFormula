import katex from "katex";
import html2pdf from "html2pdf.js";

export interface FormulaItem {
  id: string;
  name: string;
  latex: string;
  tags?: string[];
  chapter?: string;
}

export type PDFLayout = "compact" | "full";

import { Chapter } from "./formulas";

export async function generatePDF(
  formulas: FormulaItem[],
  chaptersData: Chapter[],
  subject: string,
  layout: PDFLayout = "full",
  includeContent: ("formulas"|"keyPoints"|"keyDerivations")[] = ["formulas", "keyPoints", "keyDerivations"]
): Promise<void> {
  const container = document.createElement("div");
  container.id = "askformula-pdf-container";
  container.style.width = "100%";
  container.style.boxSizing = "border-box";
  container.style.background = "#ffffff";
  container.style.padding = "0";
  container.style.fontFamily = "'Comic Sans MS', 'Chalkboard SE', 'Marker Felt', system-ui, sans-serif";
  container.style.color = "#1e293b";

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

  const stylesHtml = `
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.18.4/dist/katex.min.css" crossorigin="anonymous">
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

      /* Prevent formula cards from breaking across pages */
      .formula-card {
        page-break-inside: avoid !important;
        break-inside: avoid !important;
      }

      /* Prevent key points / derivations boxes from breaking across pages */
      .content-box {
        page-break-inside: avoid !important;
        break-inside: avoid !important;
      }
    </style>
  `;

  const titleSize = layout === "compact" ? "24px" : "36px";
  const subtitleSize = layout === "compact" ? "16px" : "20px";
  const headerMargin = layout === "compact" ? "20px" : "30px";
  const gridColumns = layout === "compact" ? "1fr 1fr 1fr 1fr" : "1fr 1fr";
  const gapSize = layout === "compact" ? "12px" : "24px";
  const cardPadding = layout === "compact" ? "10px" : "16px";
  const mathSize = layout === "compact" ? "14px" : "18px";
  const titleColors = ["#fecaca", "#bbf7d0", "#bfdbfe", "#fef08a", "#e9d5ff"];

  let htmlContent = `
    ${stylesHtml}
    <div style="margin-bottom: ${headerMargin}; text-align: center;">
      <h1 style="margin: 0; font-size: ${titleSize}; color: #1e293b; text-transform: uppercase; letter-spacing: 1px;">AskFormula</h1>
      <h2 style="margin: 5px 0 0 0; font-size: ${subtitleSize}; color: #334155; font-weight: 600;">${subject} Revision Sheet</h2>
      <p style="margin: 5px 0 0 0; font-size: 12px; color: #64748b;">Generated on ${dateStr}</p>
    </div>
  `;

  let colorIndex = 0;

  // Use chaptersData to ensure we get empty chapters too, or chapters with only theory
  const chapterNames = Array.from(new Set([
    ...chaptersData.map(ch => ch.name || ch.chapterName || "General"),
    ...Array.from(chapters.keys())
  ]));

  const renderKaTeXHTML = (text: string, inline: boolean = true) => {
    try {
      const parts = text.split(/(\$.*?\$)/g);
      return parts.map(part => {
        if (part.startsWith('$') && part.endsWith('$')) {
          const math = part.slice(1, -1);
          return katex.renderToString(math, {
            throwOnError: false,
            displayMode: !inline,
          });
        }
        return part;
      }).join('');
    } catch {
      return text;
    }
  };

  for (const chapterName of chapterNames) {
    const items = chapters.get(chapterName) || [];
    const chapterMeta = chaptersData.find(ch => (ch.name || ch.chapterName) === chapterName);
    const keyPoints = chapterMeta?.keyPoints || [];
    const keyDerivations = chapterMeta?.keyDerivations || [];

    const hasFormulas = includeContent.includes("formulas") && items.length > 0;
    const hasKeyPoints = includeContent.includes("keyPoints") && keyPoints.length > 0;
    const hasDerivations = includeContent.includes("keyDerivations") && keyDerivations.length > 0;

    if (!hasFormulas && !hasKeyPoints && !hasDerivations) continue;

    const chapterColor = titleColors[colorIndex % titleColors.length];
    colorIndex++;

    htmlContent += `
      <div style="margin-bottom: ${layout === "compact" ? "20px" : "40px"};">
        <div style="text-align: center; margin-bottom: ${layout === "compact" ? "15px" : "25px"};">
          <div style="
            background-color: ${chapterColor};
            color: #1e293b;
            display: inline-block;
            padding: 8px 24px;
            border-radius: 20px;
            border: 2px solid #1e293b;
            font-weight: bold;
            font-size: ${layout === "compact" ? "16px" : "22px"};
            box-shadow: 3px 3px 0px 0px rgba(30, 41, 59, 1);
          ">
            ${chapterName}
          </div>
        </div>
    `;

    if (hasKeyPoints) {
      htmlContent += `
        <div class="content-box" style="margin-bottom: ${gapSize}; background: #fefce8; border: 2px solid #1e293b; border-radius: 8px; padding: ${cardPadding}; box-shadow: 2px 2px 0px 0px rgba(30, 41, 59, 1); width: 100%; box-sizing: border-box;">
          <h4 style="margin: 0 0 10px 0; font-size: 14px; font-weight: bold; color: #1e293b; text-transform: uppercase;">Key Points</h4>
          <ul style="margin: 0; padding-left: 20px; font-size: ${mathSize}; color: #000000; line-height: 1.5; white-space: pre-wrap; word-wrap: break-word;">
            ${keyPoints.map(point => `<li style="margin-bottom: 6px;">${renderKaTeXHTML(point)}</li>`).join('')}
          </ul>
        </div>
      `;
    }

    if (hasDerivations) {
      htmlContent += `
        <div class="content-box" style="margin-bottom: ${gapSize}; background: #f0fdf4; border: 2px solid #1e293b; border-radius: 8px; padding: ${cardPadding}; box-shadow: 2px 2px 0px 0px rgba(30, 41, 59, 1); width: 100%; box-sizing: border-box;">
          <h4 style="margin: 0 0 10px 0; font-size: 14px; font-weight: bold; color: #1e293b; text-transform: uppercase;">Key Derivations</h4>
          <ul style="margin: 0; padding-left: 20px; font-size: ${mathSize}; color: #000000; line-height: 1.5; white-space: pre-wrap; word-wrap: break-word;">
            ${keyDerivations.map(der => `<li style="margin-bottom: 6px;">${renderKaTeXHTML(der)}</li>`).join('')}
          </ul>
        </div>
      `;
    }

    if (hasFormulas) {
      htmlContent += `
        <div style="display: grid; grid-template-columns: ${gridColumns}; gap: ${gapSize}; align-items: start; width: 100%; box-sizing: border-box;">
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
            <div class="formula-card" style="
              background: #ffffff;
              border: 2px solid #1e293b;
              border-radius: 8px;
              padding: ${cardPadding};
              box-shadow: 2px 2px 0px 0px rgba(30, 41, 59, 1);
              display: flex;
              flex-direction: column;
              gap: 8px;
              box-sizing: border-box;
              max-width: 100%;
              width: 100%;
              min-width: 0;
              overflow: hidden;
            ">
              <div style="display: flex; align-items: flex-start; justify-content: flex-start; gap: 6px;">
                <span style="color: #eab308; font-size: 14px;">⭐</span>
                <h3 style="margin: 0; font-size: 13px; color: #1e293b; font-weight: 700; line-height: 1.2; word-break: break-word;">${formula.name}</h3>
              </div>
              <div style="font-size: ${mathSize}; color: #000000; display: block; width: 100%; text-align: center; padding: 4px 0; overflow: hidden; box-sizing: border-box;">
                ${renderedMath}
              </div>
            </div>
        `;
      }
      htmlContent += `</div>`;
    }

    htmlContent += `</div>`;
  }

  container.innerHTML = htmlContent;

  const slug = subject.toLowerCase().replace(/\s+/g, "-");
  const date = new Date().toISOString().split("T")[0];

  // Create a wrapper to hide the container off-screen
  const wrapper = document.createElement("div");
  wrapper.style.position = "absolute";
  wrapper.style.top = "0";
  wrapper.style.left = "0";
  wrapper.style.width = layout === "compact" ? "1123px" : "794px";
  wrapper.style.pointerEvents = "none";
  wrapper.style.zIndex = "-9999";
  wrapper.style.backgroundColor = "#f8fafc";
  wrapper.style.padding = "0";
  wrapper.style.boxSizing = "border-box";

  wrapper.appendChild(container);
  document.body.appendChild(wrapper);

  // Wait for fonts to load and ensure browser parses injected CSS
  await document.fonts.ready;
  await new Promise((resolve) => setTimeout(resolve, 1500));

  try {
    const opt = {
      margin: 15,
      filename: `askformula-${slug}-${date}.pdf`,
      image: { type: 'jpeg' as const, quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, logging: true, scrollX: 0, scrollY: 0, windowWidth: layout === "compact" ? 1123 : 794 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' as const },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    await html2pdf().set(opt).from(wrapper).save();
  } finally {
    document.body.removeChild(wrapper);
  }
}
