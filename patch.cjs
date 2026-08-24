const fs = require('fs');
let content = fs.readFileSync('src/lib/pdf-generator.ts', 'utf8');

const oldCode = `    let heightLeft = imgHeightMm;
    let position = margin;

    pdf.addImage(canvasDataUrl, "PNG", margin, position, innerWidth, imgHeightMm);
    heightLeft -= (pdfHeight - margin * 2);

    while (heightLeft > 0) {
      position = heightLeft - imgHeightMm + margin;
      pdf.addPage();
      pdf.addImage(canvasDataUrl, "PNG", margin, position, innerWidth, imgHeightMm);
      heightLeft -= (pdfHeight - margin * 2);
    }`;

const newCode = `    const pageHeightInside = pdfHeight - margin * 2;
    let heightLeft = imgHeightMm;
    let position = margin;
    let pageOffset = 0;

    pdf.addImage(canvasDataUrl, "PNG", margin, position, innerWidth, imgHeightMm);

    // Draw white rectangles to cover the margins and prevent overlap/duplication artifacts
    pdf.setFillColor(255, 255, 255);
    pdf.rect(0, 0, pdfWidth, margin, "F");
    pdf.rect(0, pdfHeight - margin, pdfWidth, margin, "F");

    heightLeft -= pageHeightInside;

    while (heightLeft > 0) {
      pageOffset += pageHeightInside;
      position = margin - pageOffset;

      pdf.addPage();
      pdf.addImage(canvasDataUrl, "PNG", margin, position, innerWidth, imgHeightMm);

      // Draw white rectangles for margins on subsequent pages
      pdf.setFillColor(255, 255, 255);
      pdf.rect(0, 0, pdfWidth, margin, "F");
      pdf.rect(0, pdfHeight - margin, pdfWidth, margin, "F");

      heightLeft -= pageHeightInside;
    }`;

content = content.replace(oldCode, newCode);
fs.writeFileSync('src/lib/pdf-generator.ts', content);
