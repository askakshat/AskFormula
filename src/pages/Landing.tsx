import Hero from "@/components/askformula/Hero";
import Footer from "@/components/askformula/Footer";

export default function Landing() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#0b0e15] text-[#e1e2ec] font-sans flex flex-col">
      <Hero />
      <Footer />
    </div>
  );
}
