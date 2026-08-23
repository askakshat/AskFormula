import { useState } from "react";
import { Download, Loader2, LayoutGrid, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { generatePDF, type FormulaItem, type PDFLayout } from "@/lib/pdf-generator";
import { useLocalStorage, type SavedPDF } from "@/lib/local-storage";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PDFButtonProps {
  formulas: FormulaItem[];
  subject: string;
}

export default function PDFButton({ formulas, subject }: PDFButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [savedPDFs, setSavedPDFs] = useLocalStorage<SavedPDF[]>("askformula-saved-pdfs", []);

  const handleDownload = async (layout: PDFLayout) => {
    if (formulas.length === 0 || isGenerating) return;

    setIsGenerating(true);
    const toastId = toast.loading(`Generating ${layout} PDF layout...`, {
      description: "Please wait, rendering formulas. This may take a moment."
    });

    try {
      await generatePDF(formulas, subject, layout);

      const newSavedPdf = {
        id: crypto.randomUUID(),
        subject,
        date: new Date().toISOString(),
        layout,
      };
      setSavedPDFs([newSavedPdf, ...savedPDFs].slice(0, 50)); // keep last 50

      toast.success("PDF generated successfully!", {
        id: toastId,
        description: "Your file is ready to download.",
      });
    } catch (err) {
      console.error("PDF generation failed:", err);
      toast.error("Failed to generate PDF.", {
        id: toastId,
        description: "An error occurred while creating your file. Please try again.",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed bottom-6 left-0 right-0 px-6 sm:px-0 sm:left-auto sm:right-6 z-50 w-full sm:w-auto flex justify-center sm:justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            disabled={formulas.length === 0 || isGenerating}
            className="w-full sm:w-auto bg-white text-slate-950 hover:bg-slate-100 px-5 h-12 sm:h-10 rounded-full shadow-[0_4px_24px_-4px_rgba(255,255,255,0.1)] hover:shadow-[0_4px_32px_-4px_rgba(255,255,255,0.15)] transition-all duration-200 backdrop-blur-xl border border-white/[0.08] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed font-medium text-base sm:text-sm"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 sm:w-4 sm:h-4 animate-spin mr-2" />
                Building PDF
              </>
            ) : (
              <>
                <Download className="w-5 h-5 sm:w-4 sm:h-4 mr-2" />
                Download PDF
              </>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48 bg-slate-800 border-slate-700 text-slate-200">
          <DropdownMenuItem
            onClick={() => handleDownload("compact")}
            className="cursor-pointer focus:bg-slate-700 focus:text-white"
          >
            <LayoutGrid className="mr-2 h-4 w-4 text-slate-400" />
            Compact Layout (More cols)
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleDownload("full")}
            className="cursor-pointer focus:bg-slate-700 focus:text-white"
          >
            <Maximize2 className="mr-2 h-4 w-4 text-slate-400" />
            Full Layout (Bigger text)
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
