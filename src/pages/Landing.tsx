import GlobalSearch from "@/components/askformula/GlobalSearch";
import Hero from "@/components/askformula/Hero";
import Footer from "@/components/askformula/Footer";
import { Link } from "react-router";
import { motion } from "framer-motion";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, delay, ease: "easeOut" as any },
});


import { ArrowUpRight, Command, FileText, FlaskConical, FunctionSquare, Search } from "lucide-react";

const templates = [
  { href: "/build?template=jee-physics", eyebrow: "JEE / PHYSICS", title: "Mechanics &\nElectromagnetism", meta: "18 chapters · 240 formulas", icon: FileText, tone: "blue" },
  { href: "/build?template=neet-bio", eyebrow: "NEET / BIOLOGY", title: "Human Physiology\n& Genetics", meta: "14 systems · 190 concepts", icon: FlaskConical, tone: "green" },
  { href: "/build?template=cbse-math", eyebrow: "CBSE / CLASS 12", title: "Calculus & Algebra\nCheat Sheet", meta: "12 units · 160 formulas", icon: FunctionSquare, tone: "violet" },
];

const faqs = [
  ["What is AskFormula?", "A focused reference builder for students who want concise, customizable formula sheets instead of another noisy study dashboard."],
  ["Are all chapters covered?", "We support Class 11 and 12 Physics, Chemistry, Mathematics and Biology for CBSE/NCERT, plus the complete JEE Main and Advanced syllabus for PCM."],
  ["Can I export to PDF?", "Yes. Choose your chapters, shape your sheet, and export a clean, browser-generated PDF whenever you are ready to revise."],
];

export default function Landing() {
  return (
    <div className="landing-page">
      <header className="site-header">
        <div className="header-inner liquid-glass">
          <Link to="/" className="brand-lockup"><span className="brand-mark">A</span><span>AskFormula</span></Link>
          <nav className="desktop-nav"><a href="#how-it-works">How it works</a><a href="#templates">Templates</a><a href="#faq">FAQ</a></nav>
          <div className="header-actions">
            <button className="search-trigger" onClick={() => window.dispatchEvent(new Event("open-global-search"))}><Command size={13} /><span>K</span><span className="search-trigger-label">Search formulas</span></button>
            <Link to="/build" className="header-cta">Open builder <ArrowUpRight size={15} /></Link>
            <button className="mobile-search" onClick={() => window.dispatchEvent(new Event("open-global-search"))} aria-label="Search formulas"><Search size={18} /></button>
          </div>
        </div>
      </header>

      <Hero />

      <section id="templates" className="templates-section page-section relative z-10 py-24">
        <motion.div {...fadeUp(0)} className="section-intro templates-intro max-w-3xl mx-auto text-center mb-16">
          <p className="text-white/40 text-xs tracking-widest uppercase mb-4">START WITH A SHORTCUT</p>
          <h2 className="text-4xl md:text-6xl text-white mb-6 tracking-tight">Built for the way <em style={{ fontFamily: "\"Instrument Serif\", serif", fontStyle: "italic", fontWeight: 400, color: "rgba(255,255,255,0.7)" }}>you actually study.</em></h2>
          <p className="text-white/60">Pick a starting point, then make it yours. Every template is structured for speed, clarity, and a little less last-minute panic.</p>
        </motion.div>
        <div className="template-grid grid md:grid-cols-3 gap-6 max-w-6xl mx-auto px-6">
          {templates.map(({ href, eyebrow, title, meta, icon: Icon, tone }, i) => (
            <motion.div {...fadeUp(i * 0.15)} key={href}>
              <Link to={href} className="liquid-glass block p-8 rounded-3xl group hover:scale-[1.02] transition-transform duration-300">
                <div className="flex justify-between items-center mb-12">
                  <span className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 text-white group-hover:bg-white/10 transition-colors"><Icon size={20} /></span>
                  <ArrowUpRight className="text-white/30 group-hover:text-white transition-colors" size={20} />
                </div>
                <p className="text-white/40 text-xs tracking-widest uppercase mb-3">{eyebrow}</p>
                <h3 className="text-2xl text-white tracking-tight mb-8 leading-snug">{title.split("\n").map((line) => <span key={line}>{line}<br /></span>)}</h3>
                <p className="text-white/50 text-sm">{meta}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="faq" className="faq-section page-section py-24 max-w-4xl mx-auto px-6">
        <motion.div {...fadeUp(0)} className="text-center mb-16">
          <p className="text-white/40 text-xs tracking-widest uppercase mb-4">A FEW GOOD QUESTIONS</p>
          <h2 className="text-4xl md:text-5xl text-white tracking-tight">Nothing hidden. <em style={{ fontFamily: "\"Instrument Serif\", serif", fontStyle: "italic", fontWeight: 400, color: "rgba(255,255,255,0.7)" }}>Nothing complicated.</em></h2>
        </motion.div>
        <div className="space-y-4">
          {faqs.map(([question, answer], index) => (
            <motion.details {...fadeUp(index * 0.1)} key={question} open={index === 0} className="liquid-glass rounded-2xl p-6 md:p-8 cursor-pointer group">
              <summary className="flex justify-between items-center text-white font-medium text-lg list-none outline-none">
                <span>{question}</span>
                <span className="text-white/40 group-open:rotate-45 transition-transform text-2xl font-light">+</span>
              </summary>
              <p className="mt-4 text-white/60 leading-relaxed pr-8">{answer}</p>
            </motion.details>
          ))}
        </div>
      </section>

      <section className="final-cta page-section py-32 text-center">
        <motion.div {...fadeUp(0)}>
          <p className="text-white/40 text-xs tracking-widest uppercase mb-4">YOUR NEXT REVISION SESSION</p>
          <h2 className="text-5xl md:text-7xl text-white tracking-tight mb-10">Make the next hour <br /><em style={{ fontFamily: "\"Instrument Serif\", serif", fontStyle: "italic", fontWeight: 400, color: "rgba(255,255,255,0.7)" }}>count for more.</em></h2>
          <Link to="/build" className="liquid-glass inline-flex items-center gap-2 text-white px-8 py-4 rounded-full text-sm font-medium hover:bg-white/5 transition-colors">
            Build your sheet <ArrowUpRight size={17} />
          </Link>
        </motion.div>
      </section>
      <GlobalSearch />
      <Footer />
    </div>
  );
}
