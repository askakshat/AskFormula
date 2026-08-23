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

const KATEX_CSS = `
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
  </style>
`;

export async function generatePDF(
  formulas: FormulaItem[],
  chaptersData: Chapter[],
  subject: string,
  layout: PDFLayout = "full",
  includeContent: ("formulas"|"keyPoints"|"keyDerivations")[] = ["formulas", "keyPoints", "keyDerivations"]
): Promise<void> {
  // 1. Preload fonts by injecting a dummy KaTeX element
  const dummyFontPreloader = document.createElement("div");
  dummyFontPreloader.innerHTML = `
    ${KATEX_CSS}
    <div style="opacity: 0; position: fixed; top: -9999px; left: -9999px;">
      ${katex.renderToString("a^2 + b^2 = c^2", { displayMode: true, throwOnError: false })}
    </div>
  `;
  document.body.appendChild(dummyFontPreloader);

  // Wait for fonts to load and ensure browser parses injected CSS
  await document.fonts.ready;
  await new Promise((resolve) => setTimeout(resolve, 1000));

  try {
    // A4 size roughly at 96 DPI.
    const pageWidthPx = layout === "compact" ? 1123 : 794;
    const pageHeightPx = layout === "compact" ? 1588 : 1123;
    const paddingPx = layout === "compact" ? 20 : 40;

    const titleSize = layout === "compact" ? "24px" : "36px";
    const subtitleSize = layout === "compact" ? "16px" : "20px";
    const headerMargin = layout === "compact" ? "20px" : "30px";

    // We'll use a masonry-like column layout or flex layout to allow accurate measurement
    // grid sometimes makes measurement tricky if items are forced to row boundaries
    const gridColumns = layout === "compact" ? 4 : 2;
    const gapSize = layout === "compact" ? 12 : 24;
    const cardPadding = layout === "compact" ? "10px" : "16px";
    const mathSize = layout === "compact" ? "14px" : "18px";
    const titleColors = ["#fecaca", "#bbf7d0", "#bfdbfe", "#fef08a", "#e9d5ff"];

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

    const wrapper = document.createElement("div");
    wrapper.style.position = "fixed";
    wrapper.style.top = "200vh"; // Push far off-screen vertically
    wrapper.style.left = "0";
    wrapper.style.width = "0";
    wrapper.style.height = "0";
    wrapper.style.overflow = "visible";
    wrapper.style.pointerEvents = "none";
    wrapper.style.zIndex = "-9999";
    document.body.appendChild(wrapper);

    const pages: HTMLElement[] = [];

    function createNewPage(): { page: HTMLElement; container: HTMLElement } {
      const page = document.createElement("div");
      page.style.width = `${pageWidthPx}px`;
      page.style.height = `${pageHeightPx}px`;
      page.style.background = "#ffffff";
      page.style.padding = `${paddingPx}px`;
      page.style.boxSizing = "border-box";
      page.style.fontFamily = "'Comic Sans MS', 'Chalkboard SE', 'Marker Felt', system-ui, sans-serif";
      page.style.color = "#1e293b";
      page.style.position = "relative";
      page.style.overflow = "hidden";
      page.innerHTML = KATEX_CSS;

      const container = document.createElement("div");
      container.style.width = "100%";
      page.appendChild(container);

      pages.push(page);
      wrapper.appendChild(page);
      return { page, container };
    }

    let { page: currentPage, container: currentContainer } = createNewPage();

    // Add Title to first page
    const titleDiv = document.createElement("div");
    titleDiv.style.marginBottom = headerMargin;
    titleDiv.style.textAlign = "center";
    titleDiv.innerHTML = `
      <h1 style="margin: 0; font-size: ${titleSize}; color: #1e293b; text-transform: uppercase; letter-spacing: 1px;">AskFormula</h1>
      <h2 style="margin: 5px 0 0 0; font-size: ${subtitleSize}; color: #334155; font-weight: 600;">${subject} Revision Sheet</h2>
      <p style="margin: 5px 0 0 0; font-size: 12px; color: #64748b;">Generated on ${dateStr}</p>
    `;
    currentContainer.appendChild(titleDiv);

    let colorIndex = 0;

    for (const [chapterName, items] of chapters) {
      const chapterColor = titleColors[colorIndex % titleColors.length];
      colorIndex++;

      // Create chapter header
      const chapterHeader = document.createElement("div");
      chapterHeader.style.marginBottom = layout === "compact" ? "15px" : "25px";
      chapterHeader.style.textAlign = "center";
      chapterHeader.style.width = "100%";
      chapterHeader.innerHTML = `
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
      `;

      currentContainer.appendChild(chapterHeader);

      // Check if header fits
      if (currentPage.scrollHeight > pageHeightPx) {
        currentContainer.removeChild(chapterHeader);
        const newPageData = createNewPage();
        currentPage = newPageData.page;
        currentContainer = newPageData.container;
        currentContainer.appendChild(chapterHeader);
      }

      // Create grid for items
      let currentGrid = document.createElement("div");
      currentGrid.style.display = "grid";
      currentGrid.style.gridTemplateColumns = `repeat(${gridColumns}, 1fr)`;
      currentGrid.style.gap = `${gapSize}px`;
      currentGrid.style.alignItems = "start";
      currentGrid.style.marginBottom = layout === "compact" ? "20px" : "40px";
      currentContainer.appendChild(currentGrid);

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

        const card = document.createElement("div");
        card.style.background = "#ffffff";
        card.style.border = "2px solid #1e293b";
        card.style.borderRadius = "8px";
        card.style.padding = cardPadding;
        card.style.boxShadow = "2px 2px 0px 0px rgba(30, 41, 59, 1)";
        card.style.display = "flex";
        card.style.flexDirection = "column";
        card.style.gap = "8px";
        card.innerHTML = `
          <div style="display: flex; align-items: flex-start; justify-content: flex-start; gap: 6px;">
            <span style="color: #eab308; font-size: 14px;">⭐</span>
            <h3 style="margin: 0; font-size: 13px; color: #1e293b; font-weight: 700; line-height: 1.2;">${formula.name}</h3>
          </div>
          <div style="font-size: ${mathSize}; color: #000000; display: block; width: 100%; overflow-x: hidden; text-align: center; padding: 4px 0;">
            ${renderedMath}
          </div>
        `;

        currentGrid.appendChild(card);

        // Allow some time for rendering to take layout space correctly
        // but synchronously checking scrollHeight generally works since fonts are preloaded
        if (currentPage.scrollHeight > pageHeightPx) {
          // It overflowed! Move to next page
          currentGrid.removeChild(card);

          const newPageData = createNewPage();
          currentPage = newPageData.page;
          currentContainer = newPageData.container;

          // Create a new grid for the new page
          currentGrid = document.createElement("div");
          currentGrid.style.display = "grid";
          currentGrid.style.gridTemplateColumns = `repeat(${gridColumns}, 1fr)`;
          currentGrid.style.gap = `${gapSize}px`;
          currentGrid.style.alignItems = "start";
          currentGrid.style.marginBottom = layout === "compact" ? "20px" : "40px";
          currentContainer.appendChild(currentGrid);

          currentGrid.appendChild(card);
        }
      }
    }

    // Wait a brief moment to ensure all DOM updates and layout paints are complete
    await new Promise((resolve) => setTimeout(resolve, 500));

    const pdf = new jsPDF({
      unit: "mm",
      format: "a4",
      orientation: "portrait",
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    for (let i = 0; i < pages.length; i++) {
      if (i > 0) {
        pdf.addPage();
      }

      const canvasDataUrl = await htmlToImage.toPng(pages[i], {
        pixelRatio: 2,
        backgroundColor: "#ffffff",
        skipFonts: false,
      });

      pdf.addImage(canvasDataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
    }

    const slug = subject.toLowerCase().replace(/\s+/g, "-");
    const date = new Date().toISOString().split("T")[0];
    pdf.save(`askformula-${slug}-${date}.pdf`);

    document.body.removeChild(wrapper);
  } finally {
    if (document.body.contains(dummyFontPreloader)) {
      document.body.removeChild(dummyFontPreloader);
    }
  }
}
