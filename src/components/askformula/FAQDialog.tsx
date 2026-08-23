import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

export function FAQDialog() {
  const faqs = [
    {
      question: "What is AskFormula?",
      answer: "AskFormula is a comprehensive tool designed to help students easily find, review, and export physics and mathematics formulas tailored for school, JEE, and NEET exams.",
    },
    {
      question: "Are the formulas free to use?",
      answer: "Yes, AskFormula is completely free to use. You can access all formulas and generate PDFs without any charges.",
    },
    {
      question: "Can I download the formulas as a PDF?",
      answer: "Absolutely! Once you select your desired chapters and view the formulas, you can click the 'Generate PDF' button to create a beautifully formatted revision sheet.",
    },
    {
      question: "Who built AskFormula?",
      answer: "AskFormula was created by AskAkshat (Akshat Agarwal) to help students with their studies by providing a clean, accessible way to revise formulas.",
    },
    {
      question: "How do I report an issue or missing formula?",
      answer: "If you notice a missing formula or an error, you can reach out directly to AskAkshat to help us improve the platform for everyone.",
    },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors mt-6">
          <HelpCircle className="w-3.5 h-3.5" />
          Frequently Asked Questions
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-slate-950 border-white/[0.06] text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold mb-4">Frequently Asked Questions</DialogTitle>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto pr-2">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-white/[0.06]">
                <AccordionTrigger className="text-sm font-medium text-left hover:no-underline hover:text-blue-400 py-3">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-400 text-sm leading-relaxed pb-3">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </DialogContent>
    </Dialog>
  );
}
