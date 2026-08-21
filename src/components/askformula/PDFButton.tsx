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
        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-6 py-3 rounded-2xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 backdrop-blur-xl border border-white/10 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isGenerating ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Download className="w-4 h-4" />
            Download PDF 📄
          </>
        )}
      </Button>
    </div>
  );
}
