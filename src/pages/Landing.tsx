import { Link } from "react-router";
import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  Atom,
  BookOpen,
  BrainCircuit,
  ChevronRight,
  Command,
  FileText,
  FlaskConical,
  Layers3,
  Menu,
  Plus,
  Search,
  Sparkles,
  Star,
  Target,
  X,
  Zap,
} from "lucide-react";
import GlobalSearch from "@/components/askformula/GlobalSearch";

const subjects = [
  { name: "Physics", count: "428 formulas", color: "coral", icon: Atom, chapter: "Mechanics" },
  { name: "Chemistry", count: "312 formulas", color: "blue", icon: FlaskConical, chapter: "Organic chemistry" },
  { name: "Mathematics", count: "506 formulas", color: "gold", icon: Target, chapter: "Calculus" },
  { name: "Biology", count: "274 formulas", color: "mint", icon: BrainCircuit, chapter: "Human physiology" },
];

const recent = [
  { title: "Laws of Motion", subject: "Physics", meta: "12 formulas · 8 min read", accent: "coral", icon: "F = ma" },
  { title: "Electrochemistry", subject: "Chemistry", meta: "18 formulas · 14 min read", accent: "blue", icon: "E°cell" },
  { title: "Differential Calculus", subject: "Mathematics", meta: "26 formulas · 22 min read", accent: "gold", icon: "dy/dx" },
];

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-3" aria-label="AskFormula home">
      <span className="logo-mark"><span /></span>
      <span className="text-[17px] font-semibold tracking-[-0.04em] text-[#f3f0e9]">AskFormula</span>
    </Link>
  );
}

function SectionLabel({ children, action }: { children: React.ReactNode; action?: string }) {
  return (
    <div className="mb-5 flex items-center justify-between">
      <p className="eyebrow">{children}</p>
      {action && <button className="text-xs font-medium text-[#777a72] transition-colors hover:text-[#c9ff54]">{action} <ArrowUpRight className="ml-1 inline h-3.5 w-3.5" /></button>}
    </div>
  );
}

export default function Landing() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");
  const filteredSubjects = useMemo(() => subjects.filter((subject) => subject.name.toLowerCase().includes(query.toLowerCase())), [query]);

  return (
    <div className="min-h-screen bg-[#0d0f0d] text-[#f3f0e9] selection:bg-[#c9ff54] selection:text-[#10120f]">
      <header className="site-header">
        <Logo />
        <nav className="hidden items-center gap-7 md:flex">
          <a className="nav-link active" href="#explore">Explore</a>
          <a className="nav-link" href="#collections">Collections</a>
          <a className="nav-link" href="#how-it-works">How it works</a>
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <button onClick={() => window.dispatchEvent(new Event("open-global-search"))} className="key-search"><Command className="h-3.5 w-3.5" /><span>Search</span><kbd>⌘ K</kbd></button>
          <Link to="/build" className="button button-lime">Open builder <ArrowUpRight className="h-4 w-4" /></Link>
        </div>
        <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">{mobileOpen ? <X /> : <Menu />}</button>
      </header>

      {mobileOpen && <div className="mobile-menu"><a href="#explore" onClick={() => setMobileOpen(false)}>Explore</a><a href="#collections" onClick={() => setMobileOpen(false)}>Collections</a><Link to="/build">Open builder <ArrowUpRight className="inline h-4 w-4" /></Link></div>}

      <main>
        <section className="hero-shell">
          <div className="hero-copy">
            <div className="pill"><span className="live-dot" /> The smarter way to revise</div>
            <h1>Make every<br /><em>formula</em> count.</h1>
            <p className="hero-sub">A focused formula library for ambitious students. Find exactly what you need, build your own revision sheets, and keep moving.</p>
            <div className="hero-actions">
              <Link to="/build" className="button button-lime button-large">Build a sheet <ArrowUpRight className="h-4 w-4" /></Link>
              <button onClick={() => window.dispatchEvent(new Event("open-global-search"))} className="text-action"><Search className="h-4 w-4" /> Search the library <span className="text-[#676b64]">⌘K</span></button>
            </div>
            <div className="proof-row"><div className="avatar-stack"><span>AK</span><span>MS</span><span>RP</span><span>+2k</span></div><span>Used by 2,000+ students to revise with less noise.</span></div>
          </div>
          <div className="hero-visual" aria-label="Formula preview">
            <div className="orbit orbit-one" /><div className="orbit orbit-two" />
            <div className="formula-card">
              <div className="formula-top"><span className="tiny-label">01 / MECHANICS</span><Star className="h-4 w-4 text-[#c9ff54]" /></div>
              <p className="formula-title">Newton's second law</p>
              <div className="formula-equation">F <span>=</span> m <i>a</i></div>
              <div className="formula-rule" />
              <p className="formula-note">Force is the rate of change of momentum. In constant mass systems, it is the product of mass and acceleration.</p>
              <div className="formula-tags"><span>CORE CONCEPT</span><span>JEE · 11</span></div>
            </div>
            <div className="floating-note"><span className="note-icon"><Zap className="h-4 w-4" /></span><span><b>Quick recall</b><small>3 min session</small></span><ChevronRight className="ml-auto h-4 w-4 text-[#6d716a]" /></div>
            <div className="visual-caption">A better way to remember<br /><span>what matters.</span></div>
          </div>
        </section>

        <section id="explore" className="content-wrap">
          <SectionLabel action="View all formulas">Browse by subject</SectionLabel>
          <div className="subject-grid">
            {filteredSubjects.map(({ name, count, color, icon: Icon, chapter }) => (
              <Link to={`/build?subject=${name.toLowerCase()}`} key={name} className={`subject-card subject-${color}`}>
                <div className="subject-icon"><Icon className="h-5 w-5" /></div><span className="subject-arrow"><ArrowUpRight className="h-4 w-4" /></span>
                <h3>{name}</h3><p>{count}</p><div className="subject-foot"><span>Start with {chapter}</span><ChevronRight className="h-4 w-4" /></div>
              </Link>
            ))}
          </div>
        </section>

        <section id="collections" className="content-wrap split-section">
          <div className="split-heading"><SectionLabel>Curated for clarity</SectionLabel><h2>Everything you need.<br /><span>Nothing you don't.</span></h2><p>Built around the way real revision works: short bursts, high signal, and a library that gets out of your way.</p><Link to="/build" className="text-action lime-action">Explore the builder <ArrowUpRight className="h-4 w-4" /></Link></div>
          <div className="feature-stack">
            <div className="feature-card feature-lime"><div><div className="feature-icon"><Layers3 className="h-5 w-5" /></div><h3>Build your own sheet</h3><p>Choose chapters, filter by exam, and create a sharp revision document in seconds.</p></div><span className="feature-number">01</span></div>
            <div className="feature-card feature-dark"><div><div className="feature-icon"><BookOpen className="h-5 w-5" /></div><h3>Learn in context</h3><p>Every formula comes with definitions, key points, and the intuition behind it.</p></div><span className="feature-number">02</span></div>
            <div className="feature-card feature-dark"><div><div className="feature-icon"><FileText className="h-5 w-5" /></div><h3>Export & take it anywhere</h3><p>Save a clean PDF for the last-minute train ride, desk session, or exam hall.</p></div><span className="feature-number">03</span></div>
          </div>
        </section>

        <section className="content-wrap recent-section" id="how-it-works">
          <SectionLabel action="See all activity">Pick up where you left off</SectionLabel>
          <div className="recent-grid">{recent.map((item, index) => <Link to="/build" className={`recent-card recent-${item.accent}`} key={item.title}><div className="recent-top"><span className="recent-index">0{index + 1}</span><span className="recent-subject">{item.subject}</span><ArrowUpRight className="ml-auto h-4 w-4" /></div><div className="recent-symbol">{item.icon}</div><h3>{item.title}</h3><p>{item.meta}</p><div className="progress"><span style={{ width: `${[72, 38, 15][index]}%` }} /></div></Link>)}</div>
        </section>

        <section className="cta-wrap"><div className="cta-card"><div><p className="eyebrow">Your next breakthrough is closer than you think</p><h2>Less searching.<br /><em>More solving.</em></h2></div><div className="cta-right"><p>Start with one chapter. Leave with a plan.</p><Link to="/build" className="button button-lime button-large">Create your first sheet <Plus className="h-4 w-4" /></Link></div></div></section>
      </main>

      <footer className="site-footer"><Logo /><div className="footer-links"><a href="#explore">Library</a><a href="#collections">Collections</a><Link to="/build">Builder</Link><a href="#">About</a></div><span className="footer-note">Made for the curious · © 2026 AskFormula</span></footer>
      <GlobalSearch />
    </div>
  );
}
