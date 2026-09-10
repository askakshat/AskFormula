import GlobalSearch from "@/components/askformula/GlobalSearch";
import Hero from "@/components/askformula/Hero";
import Footer from "@/components/askformula/Footer";
import { Link } from "react-router";
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
        <div className="header-inner">
          <Link to="/" className="brand-lockup"><span className="brand-mark">A</span><span>AskFormula</span></Link>
          <nav className="desktop-nav"><a href="#how-it-works">How it works</a><a href="#templates">Templates</a><a href="#faq">FAQ</a></nav>
          <div className="header-actions">
            <button className="search-trigger" onClick={() => window.dispatchEvent(new Event("open-global-search"))}><Command size={13} /><span>K</span><span className="search-trigger-label">Search formulas</span></button>
            <Link to="/build" className="header-cta">Start building <ArrowUpRight size={15} /></Link>
            <button className="mobile-search" onClick={() => window.dispatchEvent(new Event("open-global-search"))} aria-label="Search formulas"><Search size={18} /></button>
          </div>
        </div>
      </header>

      <Hero />

      <section id="templates" className="templates-section page-section">
        <div className="section-intro templates-intro"><div><p className="section-label">START WITH A SHORTCUT</p><h2>Built for the way<br /><em>you actually study.</em></h2></div><p>Pick a starting point, then make it yours. Every template is structured for speed, clarity, and a little less last-minute panic.</p></div>
        <div className="template-grid">
          {templates.map(({ href, eyebrow, title, meta, icon: Icon, tone }, index) => <Link to={href} key={href} className={`template-card template-${tone}`}><div className="template-card-top"><span className="template-icon"><Icon size={19} /></span><ArrowUpRight className="template-arrow" size={19} /></div><div className={`template-mini-preview template-mini-${index}`} aria-hidden="true">{index === 0 && <><span className="mini-equation">v² = u² + 2as</span><i /><b>18 CHAPTERS</b></>}{index === 1 && <><span className="mini-orbit" /><span className="mini-cell">DNA</span><b>14 SYSTEMS</b></>}{index === 2 && <><span className="mini-bars"><i /><i /><i /><i /></span><span className="mini-sigma">∑</span><b>12 UNITS</b></>}</div><p className="template-eyebrow">{eyebrow}</p><h3>{title.split("\n").map((line) => <span key={line}>{line}<br /></span>)}</h3><p className="template-meta">{meta}</p></Link>)}
        </div>
      </section>

      <section id="faq" className="faq-section page-section">
        <div className="section-intro"><p className="section-label">A FEW GOOD QUESTIONS</p><h2>Nothing hidden.<br /><em>Nothing complicated.</em></h2></div>
        <div className="faq-list">{faqs.map(([question, answer], index) => <details key={question} open={index === 0} className="faq-item"><summary><span>{question}</span><span className="faq-plus">+</span></summary><p>{answer}</p></details>)}</div>
      </section>

      <section className="final-cta page-section"><div><p className="section-label">YOUR NEXT REVISION SESSION</p><h2>Make the next hour<br /><em>count for more.</em></h2></div><Link to="/build" className="button button-primary">Make my sheet <ArrowUpRight size={17} /></Link></section>
      <GlobalSearch />
      <Footer />
    </div>
  );
}
