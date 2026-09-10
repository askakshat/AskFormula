import GlobalSearch from "@/components/askformula/GlobalSearch";
import Hero from "@/components/askformula/Hero";
import Footer from "@/components/askformula/Footer";
import { ArrowUpRight, Atom, FlaskConical, FunctionSquare } from "lucide-react";
import { Link } from "react-router";

const subjects = [
  { href: "/build?subject=physics", code: "PH", title: "Physics", body: "Mechanics, fields, waves, and the laws that move everything.", meta: "12 chapters · 238 formulas", icon: Atom },
  { href: "/build?subject=chemistry", code: "CH", title: "Chemistry", body: "Reactions, constants, and the patterns behind matter.", meta: "11 chapters · 196 formulas", icon: FlaskConical },
  { href: "/build?subject=mathematics", code: "MA", title: "Mathematics", body: "Calculus, algebra, and identities — ready when you are.", meta: "13 chapters · 264 formulas", icon: FunctionSquare },
];

const workflow = [
  ["01", "Choose your exam", "CBSE, ICSE, State Boards, JEE or NEET."],
  ["02", "Set your level", "Class 11 or Class 12 — keep it relevant."],
  ["03", "Pick a subject", "Physics, Chemistry, or Mathematics."],
  ["04", "Revise smarter", "Export a clean sheet and get back to solving."],
];

export default function Landing() {
  return (
    <div className="landing-page reference-landing">
      <header className="site-header reference-header">
        <div className="header-inner">
          <Link to="/" className="brand-lockup"><span className="brand-mark">A</span><span>AskFormula</span></Link>
          <nav className="desktop-nav"><a href="#subjects">Subjects</a><a href="#workflow">How it works</a><a href="/quiz">Practice quiz</a></nav>
          <Link to="/build" className="header-cta">Launch app <ArrowUpRight size={15} /></Link>
        </div>
      </header>

      <Hero />

      <section id="subjects" className="reference-section subjects-section">
        <div className="reference-section-head"><div><p className="reference-label">01 / The library</p><h2>Your syllabus,<br /><em>finally organised.</em></h2></div><p>High-signal reference material for the moments when you need an answer, not another tab.</p></div>
        <div className="subject-grid">
          {subjects.map(({ href, code, title, body, meta, icon: Icon }) => <Link to={href} key={code} className="subject-card"><div className="subject-card-top"><span className="subject-code">{code}</span><Icon size={17} /></div><div><h3>{title}</h3><p>{body}</p></div><div className="subject-card-bottom"><span>{meta}</span><ArrowUpRight size={15} /></div></Link>)}
        </div>
      </section>

      <section id="workflow" className="reference-section workflow-reference">
        <div className="reference-section-head"><div><p className="reference-label">02 / The workflow</p><h2>Less friction.<br /><em>More recall.</em></h2></div><div><p>Turn a blank page into a focused revision sheet in four calm, predictable steps.</p><Link to="/build" className="reference-text-link">Build a sheet <ArrowUpRight size={14} /></Link></div></div>
        <div className="workflow-reference-grid">{workflow.map(([number, title, body]) => <div className="reference-step" key={number}><span>{number}</span><h3>{title}</h3><p>{body}</p></div>)}</div>
        <p className="reference-note">Made for the 15 minutes before a test, the 2 hours before an exam, and every study session in between.</p>
        <Link to="/build" className="reference-outline-link">Open the formula engine <ArrowUpRight size={15} /></Link>
      </section>

      <GlobalSearch />
      <Footer />
    </div>
  );
}
