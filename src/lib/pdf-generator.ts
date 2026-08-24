import katex from "katex";
import html2canvas from "html2canvas";
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

const KATEX_CDN = "https://cdn.jsdelivr.net/npm/katex@0.18.4/dist";

/** Fetch KaTeX CSS, replace font urls with base64 data URIs so html2canvas can use them */
async function fetchEmbeddedKaTeXCSS(): Promise<string> {
  const cssResp = await fetch(`${KATEX_CDN}/katex.min.css`);
  let css = await cssResp.text();

  const fontRefs = [...new Set([...css.matchAll(/url\(fonts\/([^)]+)\)/g)].map(m => m[1]))];

  const dataUriMap = new Map<string, string>();
  await Promise.all(
    fontRefs.map(async (ref) => {
      try {
        const resp = await fetch(`${KATEX_CDN}/fonts/${ref}`);
        const buf = await resp.arrayBuffer();
        const bytes = new Uint8Array(buf);
        let binary = "";
        for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
        const mime = ref.endsWith(".woff2") ? "font/woff2" : "font/woff";
        dataUriMap.set(ref, `data:${mime};base64,${btoa(binary)}`);
      } catch { /* non-fatal */ }
    })
  );

  css = css.replace(/url\(fonts\/([^)]+)\)/g, (_m, f) => {
    const uri = dataUriMap.get(f);
    return uri ? `url(${uri})` : _m;
  });

  return css;
}

export async function generatePDF(
  formulas: FormulaItem[],
  chaptersData: Chapter[],
  subject: string,
  layout: PDFLayout = "full",
  includeContent: ("formulas"|"keyPoints"|"keyDerivations")[] = ["formulas", "keyPoints", "keyDerivations"]
): Promise<void> {
  // Fetch and embed KaTeX CSS with base64 fonts FIRST
  let katexCssInlined = "";
  try {
    katexCssInlined = await fetchEmbeddedKaTeXCSS();
  } catch {
    console.warn("[PDF] Failed to fetch/embed KaTeX CSS");
  }

  // Inject a <style> into document.head so html2canvas sees the KaTeX styles
  const styleEl = document.createElement("style");
  styleEl.setAttribute("data-pdf", "true");
  styleEl.textContent = `
    ${katexCssInlined}
    .katex-display > .katex,
    .katex .mord, .katex .mbin, .katex .mrel,
    .katex .mopen, .katex .mclose, .katex .mpunct, .katex .mop,
    .katex { color: #000000 !important; }
  `;
  document.head.appendChild(styleEl);

  const container = document.createElement("div");
  container.style.width = layout === "compact" ? "1123px" : "794px";
  container.style.background = "#ffffff";
  container.style.padding = layout === "compact" ? "20px" : "40px";
  container.style.fontFamily = "'Comic Sans MS', 'Chalkboard SE', 'Marker Felt', system-ui, sans-serif";
  container.style.color = "#1e293b";

  const dateStr = new Date().toLocaleDateString("en-IN", {
    year: "numeric", month: "long", day: "numeric",
  });

  const chapters = new Map<string, FormulaItem[]>();
  for (const f of formulas) {
    const key = f.chapter ?? "General";
    if (!chapters.has(key)) chapters.set(key, []);
    chapters.get(key)!.push(f);
  }

  // Directly fetch the KaTeX CDN stylesheet and inject PDF-specific overrides.
  // Make sure version matches the installed katex package (0.18.4)
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
          /* Force text and KaTeX to wrap to prevent cutting */
      #askformula-pdf-container, #askformula-pdf-container * {
        word-wrap: break-word !important;
        overflow-wrap: break-word !important;
      }
      #askformula-pdf-container .katex-display {
        max-width: 100% !important;
        overflow-wrap: break-word !important;
        word-wrap: break-word !important;
      }
      #askformula-pdf-container .katex {
        display: inline-block !important;
        max-width: 100% !important;
        white-space: normal !important;
      }
      #askformula-pdf-container .katex-html {
        max-width: 100% !important;
        display: flex !important;
        flex-wrap: wrap !important;
        justify-content: center !important;
        align-items: center !important;
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

  const renderKaTeXHTML = (text: string, inline = true) => {
    try {
      return text.split(/(\$.*?\$)/g).map(part => {
        if (part.startsWith('$') && part.endsWith('$')) {
          return katex.renderToString(part.slice(1, -1), { throwOnError: false, displayMode: !inline });
        }
        return part;
      }).join('');
    } catch { return text; }
  };

  let htmlContent = `
    <div style="margin-bottom: ${headerMargin}; text-align: center;">
      <h1 style="margin: 0; font-size: ${titleSize}; color: #1e293b; text-transform: uppercase; letter-spacing: 1px;">AskFormula</h1>
      <h2 style="margin: 5px 0 0 0; font-size: ${subtitleSize}; color: #334155; font-weight: 600;">${subject} Revision Sheet</h2>
      <p style="margin: 5px 0 0 0; font-size: 12px; color: #64748b;">Generated on ${dateStr}</p>
    </div>
  `;

  let colorIndex = 0;
  const chapterNames = Array.from(new Set([
    ...chaptersData.map(ch => ch.name || ch.chapterName || "General"),
    ...Array.from(chapters.keys())
  ]));

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
          <div style="background-color: ${chapterColor}; color: #1e293b; display: inline-block; padding: 8px 24px; border-radius: 20px; border: 2px solid #1e293b; font-weight: bold; font-size: ${layout === "compact" ? "16px" : "22px"}; box-shadow: 3px 3px 0px 0px rgba(30, 41, 59, 1);">
            ${chapterName}
          </div>
        </div>
    `;

    if (hasKeyPoints) {
      htmlContent += `
        <div style="margin-bottom: ${gapSize}; background: #fefce8; border: 2px solid #1e293b; border-radius: 8px; padding: ${cardPadding}; box-shadow: 2px 2px 0px 0px rgba(30, 41, 59, 1); page-break-inside: avoid; width: 100%; box-sizing: border-box; min-width: 0; overflow-wrap: break-word; word-break: break-word;">
          <h4 style="margin: 0 0 10px 0; font-size: 14px; font-weight: bold; color: #1e293b; text-transform: uppercase;">Key Points</h4>
          <ul style="margin: 0; padding-left: 20px; font-size: ${mathSize}; color: #000000; line-height: 1.5; white-space: pre-wrap; word-wrap: break-word;">
            ${keyPoints.map(p => `<li style="margin-bottom: 6px;">${renderKaTeXHTML(p)}</li>`).join('')}
          </ul>
        </div>`;
    }

    if (hasDerivations) {
      htmlContent += `
        <div style="margin-bottom: ${gapSize}; background: #f0fdf4; border: 2px solid #1e293b; border-radius: 8px; padding: ${cardPadding}; box-shadow: 2px 2px 0px 0px rgba(30, 41, 59, 1); page-break-inside: avoid; width: 100%; box-sizing: border-box; min-width: 0; overflow-wrap: break-word; word-break: break-word;">
          <h4 style="margin: 0 0 10px 0; font-size: 14px; font-weight: bold; color: #1e293b; text-transform: uppercase;">Key Derivations</h4>
          <ul style="margin: 0; padding-left: 20px; font-size: ${mathSize}; color: #000000; line-height: 1.5; white-space: pre-wrap; word-wrap: break-word;">
            ${keyDerivations.map(d => `<li style="margin-bottom: 6px;">${renderKaTeXHTML(d)}</li>`).join('')}
          </ul>
        </div>`;
    }

    if (hasFormulas) {
      htmlContent += `
        <div style="display: grid; grid-template-columns: ${gridColumns}; gap: ${gapSize}; align-items: start; width: 100%; box-sizing: border-box; min-width: 0; max-width: 100%;">
      `;

      for (const formula of items) {
        let renderedMath = "";
        try { renderedMath = katex.renderToString(formula.latex, { displayMode: true, throwOnError: false }); }
        catch { renderedMath = `<span style="color: red;">Error rendering formula</span>`; }

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
            ">
              <div style="display: flex; align-items: flex-start; justify-content: flex-start; gap: 6px;">
                <span style="color: #eab308; font-size: 14px;">⭐</span>
                <h3 style="margin: 0; font-size: 13px; color: #1e293b; font-weight: 700; line-height: 1.2; word-break: break-word; overflow-wrap: break-word; flex: 1; min-width: 0;">${formula.name}</h3>
              </div>
              <div style="font-size: ${mathSize}; color: #000000; display: block; width: 100%; overflow-x: hidden; text-align: center; padding: 4px 0;">
                ${renderedMath}
              </div>
            </div>
          </div>`;
      }
      htmlContent += `</div>`;
    }
    htmlContent += `</div>`;
  }

  container.innerHTML = htmlContent;

  const slug = subject.toLowerCase().replace(/\s+/g, "-");
  const date = new Date().toISOString().split("T")[0];

  // Position in normal flow — html2canvas reads computed layout
  container.style.position = "relative";
  container.style.left = "0";
  container.style.top = "0";
  container.style.zIndex = "-1";
  document.body.appendChild(container);

  // Let browser compute styles and render
  await document.fonts.ready;
  await new Promise(r => setTimeout(r, 500));

  // Scale down any formula whose KaTeX output is wider than its card
  const containerWidth = container.clientWidth;
  const cols = layout === "compact" ? 4 : 2;
  const gapPx = parseFloat(gapSize);
  const availablePerCol = (containerWidth - (cols - 1) * gapPx) / cols;

  container.querySelectorAll<HTMLElement>('[data-math]').forEach((el) => {
    // Measure natural width of the KaTeX content
    const katexEl = el.querySelector<HTMLElement>('.katex-display') || el.querySelector<HTMLElement>('.katex');
    if (!katexEl) return;

    const naturalWidth = katexEl.scrollWidth;
    if (naturalWidth > availablePerCol) {
      const zoom = availablePerCol / naturalWidth;
      katexEl.style.zoom = String(zoom);
    }
  });

  try {
    const opt = {
      margin: 15, // 15mm margin on all sides
      filename: `askformula-${slug}-${date}.pdf`,
      image: { type: 'jpeg' as const, quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, logging: true, scrollX: 0, scrollY: 0, windowWidth: layout === "compact" ? 1123 : 794 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' as const },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    await html2pdf().set(opt).from(wrapper).save();
  } finally {
    document.body.removeChild(container);
    document.head.removeChild(styleEl);
  }
}
