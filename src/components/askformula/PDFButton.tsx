import { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generatePDF, type FormulaItem } from "@/lib/pdf-generator";

interface PDFButtonProps {
  formulas: FormulaItem[];
  subject: string;
}

export default function PDFButton({ formulas, subject }: PDFButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    if (formulas.length === 0 || isGenerating) return;

    setIsGenerating(true);
    try {
      await generatePDF(formulas, subject);
    } catch (err) {
      console.error("PDF generation failed:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={handleDownload}
        disabled={formulas.length === 0 || isGenerating}
        className="bg-white text-slate-950 hover:bg-slate-100 px-5 py-3 rounded-full shadow-[0_4px_24px_-4px_rgba(255,255,255,0.1)] hover:shadow-[0_4px_32px_-4px_rgba(255,255,255,0.15)] transition-all duration-200 backdrop-blur-xl border border-white/[0.08] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed font-medium"
      >
        {isGenerating ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Building PDF
          </>
        ) : (
          <>
            <Download className="w-4 h-4" />
            Download PDF
          </>
        )}
      </Button>
    </div>
  );
}
