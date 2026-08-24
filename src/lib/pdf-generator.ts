import katex from "katex";
import * as htmlToImage from "html-to-image";
import jsPDF from "jspdf";

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
  // A4 size roughly at 96 DPI: 794px width. We'll use this as base and scale up via pixelRatio.
  container.style.width = layout === "compact" ? "1123px" : "794px";
  container.style.background = "#ffffff";
  container.style.padding = layout === "compact" ? "20px" : "40px";
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

  // Pre-fetch KaTeX CSS and inline it (external <link> tags don't survive html-to-image's SVG foreignObject)
  const KATEX_CSS_URL = "https://cdn.jsdelivr.net/npm/katex@0.18.4/dist/katex.min.css";
  const KATEX_FONT_BASE = "https://cdn.jsdelivr.net/npm/katex@0.18.4/dist/fonts/";

  let katexCssText = "";
  try {
    const cssResponse = await fetch(KATEX_CSS_URL);
    katexCssText = await cssResponse.text();
    // Rewrite relative font URLs to absolute CDN URLs so they survive foreignObject cloning
    katexCssText = katexCssText.replace(/url\(fonts\//g, `url(${KATEX_FONT_BASE}`);
  } catch {
    console.warn("[PDF] Failed to fetch KaTeX CSS, formulas may render without styling");
  }

  const stylesHtml = `
    <style>
      ${katexCssText}
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
      <div style="margin-bottom: ${layout === "compact" ? "20px" : "40px"}; page-break-inside: avoid;">
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
        <div style="margin-bottom: ${gapSize}; background: #fefce8; border: 2px solid #1e293b; border-radius: 8px; padding: ${cardPadding}; box-shadow: 2px 2px 0px 0px rgba(30, 41, 59, 1); page-break-inside: avoid; width: 100%; box-sizing: border-box;">
          <h4 style="margin: 0 0 10px 0; font-size: 14px; font-weight: bold; color: #1e293b; text-transform: uppercase;">Key Points</h4>
          <ul style="margin: 0; padding-left: 20px; font-size: ${mathSize}; color: #000000; line-height: 1.5; white-space: pre-wrap; word-wrap: break-word;">
            ${keyPoints.map(point => `<li style="margin-bottom: 6px;">${renderKaTeXHTML(point)}</li>`).join('')}
          </ul>
        </div>
      `;
    }

    if (hasDerivations) {
      htmlContent += `
        <div style="margin-bottom: ${gapSize}; background: #f0fdf4; border: 2px solid #1e293b; border-radius: 8px; padding: ${cardPadding}; box-shadow: 2px 2px 0px 0px rgba(30, 41, 59, 1); page-break-inside: avoid; width: 100%; box-sizing: border-box;">
          <h4 style="margin: 0 0 10px 0; font-size: 14px; font-weight: bold; color: #1e293b; text-transform: uppercase;">Key Derivations</h4>
          <ul style="margin: 0; padding-left: 20px; font-size: ${mathSize}; color: #000000; line-height: 1.5; white-space: pre-wrap; word-wrap: break-word;">
            ${keyDerivations.map(der => `<li style="margin-bottom: 6px;">${renderKaTeXHTML(der)}</li>`).join('')}
          </ul>
        </div>
      `;
    }

    if (hasFormulas) {
      htmlContent += `
        <div style="display: grid; grid-template-columns: ${gridColumns}; gap: ${gapSize}; align-items: start;">
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
            border: 2px solid #1e293b;
            border-radius: 8px;
            padding: ${cardPadding};
            page-break-inside: avoid;
            box-shadow: 2px 2px 0px 0px rgba(30, 41, 59, 1);
            display: flex;
            flex-direction: column;
            gap: 8px;
            box-sizing: border-box;
            overflow: hidden;
          ">
            <div style="display: flex; align-items: flex-start; justify-content: flex-start; gap: 6px;">
              <span style="color: #eab308; font-size: 14px;">⭐</span>
              <h3 style="margin: 0; font-size: 13px; color: #1e293b; font-weight: 700; line-height: 1.2;">${formula.name}</h3>
            </div>
            <div style="font-size: ${mathSize}; color: #000000; display: block; width: 100%; overflow: hidden; text-align: center; padding: 4px 0; box-sizing: border-box;">
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

  // Pre-load KaTeX web fonts so html-to-image can embed them
  if (katexCssText) {
    const fontUrls = [...new Set([...katexCssText.matchAll(/url\(([^)]+\.woff2?)\)/g)].map(m => m[1]))];
    await Promise.all(
      fontUrls.map(async (url) => {
        try {
          const resp = await fetch(url);
          const buffer = await resp.arrayBuffer();
          const face = new FontFace(
            url.match(/([^/]+)\.woff/)?.[1] ?? "KaTeX_Unknown",
            buffer,
          );
          document.fonts.add(face);
          await face.load();
        } catch {
          // Font loading failure is non-fatal
        }
      })
    );
  }

  // We must append the container to the document body temporarily so html-to-image can read computed styles properly
  container.style.position = "absolute";
  container.style.left = "0px";
  container.style.top = "0px";
  container.style.zIndex = "-9999";
  container.style.opacity = "0"; // hide it visually without display: none
  container.style.pointerEvents = "none";
  document.body.appendChild(container);

  // Wait for fonts to load and ensure browser parses injected CSS
  await document.fonts.ready;
  await new Promise((resolve) => setTimeout(resolve, 1000));

  try {
    const canvasDataUrl = await htmlToImage.toPng(container, {
      pixelRatio: 2,
      backgroundColor: "#f8fafc",
      skipFonts: false, // Ensure fonts are embedded
    });

    const pdf = new jsPDF({
      unit: "mm",
      format: "a4",
      orientation: "portrait",
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const img = new Image();
    img.src = canvasDataUrl;
    await new Promise((resolve) => {
      img.onload = resolve;
    });

    const margin = 10;
    const innerWidth = pdfWidth - margin * 2;
    const imgRatio = img.height / img.width;
    const imgHeightMm = innerWidth * imgRatio;

    let heightLeft = imgHeightMm;
    let position = margin;

    pdf.addImage(canvasDataUrl, "PNG", margin, position, innerWidth, imgHeightMm);
    heightLeft -= (pdfHeight - margin * 2);

    while (heightLeft > 0) {
      position = heightLeft - imgHeightMm + margin;
      pdf.addPage();
      pdf.addImage(canvasDataUrl, "PNG", margin, position, innerWidth, imgHeightMm);
      heightLeft -= (pdfHeight - margin * 2);
    }

    pdf.save(`askformula-${slug}-${date}.pdf`);
  } finally {
    document.body.removeChild(container);
  }
}
