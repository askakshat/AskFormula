import { useState } from "react";
import { Link } from "react-router";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Check,
  ChevronDown,
  ChevronRight,
  Download,
  FileText,
  FolderOpen,
  LayoutDashboard,
  Menu,
  MessageCircle,
  MoreHorizontal,
  Play,
  Search,
  Sparkles,
  Target,
  X,
} from "lucide-react";
import GlobalSearch from "@/components/askformula/GlobalSearch";

const navItems = ["About", "Features", "Pricing", "FAQ"];

function Brand() {
  return <Link to="/" className="fresh-brand"><span className="fresh-brand-mark"><span /></span><span>AskFormula</span></Link>;
}

function ProductMockup() {
  const [active, setActive] = useState("Overview");
  const sidebar = [
    { name: "Overview", icon: LayoutDashboard },
    { name: "Formula library", icon: BookOpen },
    { name: "My sheets", icon: FolderOpen },
    { name: "Quick quiz", icon: Target },
    { name: "Progress", icon: BarChart3 },
  ];
  return (
    <div className="product-stage">
      <div className="product-window">
        <aside className="product-sidebar">
          <div className="product-logo"><span className="fresh-brand-mark"><span /></span><b>AskFormula</b></div>
          <div className="product-space-label">YOUR STUDY SPACE</div>
          <div className="product-nav">{sidebar.map(({ name, icon: Icon }) => <button key={name} className={active === name ? "selected" : ""} onClick={() => setActive(name)}><Icon /><span>{name}</span>{name === "My sheets" && <span className="nav-count">3</span>}</button>)}</div>
          <div className="sidebar-bottom"><div className="sidebar-tip"><Sparkles /><span><b>Focus mode</b><small>Make a 20 min plan</small></span></div><div className="profile-row"><span className="profile-avatar">A</span><span><b>Akshat</b><small>Class 12 · JEE</small></span><MoreHorizontal className="ml-auto" /></div></div>
        </aside>
        <div className="product-main">
          <div className="product-topbar"><div className="mobile-product-logo"><span className="fresh-brand-mark"><span /></span></div><div className="product-breadcrumb">My workspace <ChevronRight /> <b>{active}</b></div><div className="product-top-actions"><button><Search /></button><span className="product-notification" /><span className="profile-avatar small">A</span></div></div>
          <div className="product-content">
            <div className="product-greeting"><div><span className="product-kicker">MONDAY, 10 SEPTEMBER</span><h3>Good morning, Akshat<span>.</span></h3><p>Make today count. You’re closer than you think.</p></div><button className="mockup-button">Build a new sheet <ArrowRight /></button></div>
            <div className="study-banner"><div><span className="banner-label">CONTINUE STUDYING</span><h4>Electrostatics</h4><p>Physics · Chapter 2 · 18 formulas</p><div className="banner-progress"><span /></div><small>64% complete</small></div><div className="banner-formula">E = <i>kq</i><sub>1</sub>q<sub>2</sub> / r<sup>2</sup></div><button className="circle-arrow"><ArrowRight /></button></div>
            <div className="mockup-section-head"><span>YOUR LIBRARY</span><button>View all <ArrowRight /></button></div>
            <div className="mockup-cards"><div className="mockup-card blue"><div className="card-icon"><BookOpen /></div><div><b>Physics</b><span>428 formulas</span></div><ArrowRight /></div><div className="mockup-card lavender"><div className="card-icon"><Sparkles /></div><div><b>Chemistry</b><span>312 formulas</span></div><ArrowRight /></div><div className="mockup-card sand"><div className="card-icon"><Target /></div><div><b>Mathematics</b><span>506 formulas</span></div><ArrowRight /></div></div>
            <div className="mockup-bottom-grid"><div><div className="mockup-section-head"><span>RECENT SHEETS</span><button>See all <ArrowRight /></button></div><div className="sheet-row"><span className="sheet-file"><FileText /></span><span><b>JEE Physics — Mechanics</b><small>Updated 2 hours ago · 24 formulas</small></span><MoreHorizontal className="ml-auto" /></div><div className="sheet-row"><span className="sheet-file"><FileText /></span><span><b>Organic Chemistry essentials</b><small>Updated yesterday · 32 formulas</small></span><MoreHorizontal className="ml-auto" /></div></div><div className="progress-widget"><span>WEEKLY PROGRESS</span><strong>4.5<span>h</span></strong><small>+18% from last week</small><div className="mini-bars"><i /><i /><i /><i /><i /><i /><i /></div></div></div>
          </div>
        </div>
      </div>
      <div className="product-glow" />
    </div>
  );
}

function FeatureVisual({ type }: { type: "search" | "context" | "sheet" }) {
  if (type === "search") return <div className="feature-visual search-visual"><div className="visual-search"><Search /><span>Try “kinematics”</span><kbd>⌘ K</kbd></div><div className="search-results"><div><span className="result-dot coral" /><span><b>Equations of motion</b><small>Physics · Kinematics</small></span><ArrowRight /></div><div><span className="result-dot blue" /><span><b>Motion in a straight line</b><small>Physics · Class 11</small></span><ArrowRight /></div><div><span className="result-dot gold" /><span><b>Projectile motion</b><small>Physics · JEE Main</small></span><ArrowRight /></div></div></div>;
  if (type === "context") return <div className="feature-visual context-visual"><div className="context-sheet"><span className="mini-kicker">THERMODYNAMICS</span><h4>First law of thermodynamics</h4><strong>ΔQ = ΔU + ΔW</strong><div className="context-line" /><p>Energy supplied to a system is used to increase its internal energy and do external work.</p><div className="context-chips"><span>DEFINITION</span><span>JEE · 11</span></div></div><div className="context-note"><MessageCircle /><span><b>In plain English</b><small>Think of energy as a budget.</small></span></div></div>;
  return <div className="feature-visual sheet-visual"><div className="sheet-preview"><div className="sheet-preview-head"><span>ASKFORMULA</span><Download /></div><h4>JEE Physics</h4><small>MECHANICS · REVISION SHEET</small><div className="sheet-formula-lines"><span>v = u + at</span><span>s = ut + ½at²</span><span>v² = u² + 2as</span></div><div className="sheet-footer-line" /></div><div className="sheet-pill"><Download /><span>Exported as PDF</span><Check /></div></div>;
}

export default function Landing() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const faqs = ["What is AskFormula?", "Which syllabuses are covered?", "Can I export my formula sheet?", "Is AskFormula free to use?"];
  return (
    <div className="fresh-site">
      <header className="fresh-header"><Brand /><nav className="fresh-nav">{navItems.map((item) => <a key={item} href={`#${item.toLowerCase()}`}>{item}</a>)}</nav><div className="fresh-header-actions"><Link to="/auth" className="login-link">Login</Link><Link to="/build" className="fresh-button small">Get started <ArrowRight /></Link></div><button className="fresh-menu-button" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button></header>
      {menuOpen && <div className="fresh-mobile-menu">{navItems.map((item) => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{item}</a>)}<Link to="/auth">Login</Link><Link to="/build" className="fresh-button">Get started <ArrowRight /></Link></div>}

      <main>
        <section className="fresh-hero" id="about"><div className="hero-kicker"><span /> Formula library for ambitious students</div><h1>Your syllabus<br />deserves a <em>system.</em></h1><p>AskFormula brings every formula, concept, and revision sheet into one focused space — so you can spend less time searching and more time solving.</p><Link to="/build" className="fresh-button hero-button">Get started free <ArrowRight /></Link><ProductMockup /></section>

        <section className="intro-section"><span className="section-label">INTRO</span><div className="intro-copy"><h2>The right formula at the right moment can change everything.</h2><div><p>Revision shouldn’t feel like a scavenger hunt across five different notebooks, PDFs, and tabs. AskFormula gives your syllabus a home — organized, searchable, and built around how you actually learn.</p><Link to="#features" className="inline-link">See how it works <ArrowRight /></Link></div></div></section>

        <section className="statement-section"><span className="section-label">A BETTER WAY TO REVISE</span><h2>One calm place for<br /><em>everything that matters.</em></h2><div className="statement-glow" /></section>

        <section className="features-section" id="features"><div className="section-heading"><span className="section-label">CORE FEATURES</span><h2>Study with less noise.<br /><em>Move with more clarity.</em></h2></div><div className="feature-list"><article className="feature-row"><div className="feature-copy"><span className="feature-number">01</span><h3>Find the formula<br />you’re looking for.</h3><p>Search across your entire syllabus in seconds. Filter by subject, class, chapter, or exam — and get straight to the useful part.</p><Link to="/build" className="inline-link">Explore the library <ArrowRight /></Link></div><FeatureVisual type="search" /></article><article className="feature-row reverse"><div className="feature-copy"><span className="feature-number">02</span><h3>Understand it<br />in context.</h3><p>A formula is more than a line of symbols. Learn what each variable means, when to use it, and how it connects to the bigger idea.</p><Link to="/build" className="inline-link">See a formula up close <ArrowRight /></Link></div><FeatureVisual type="context" /></article><article className="feature-row"><div className="feature-copy"><span className="feature-number">03</span><h3>Build a sheet<br />that fits you.</h3><p>Pick the chapters you need, remove the noise, and create a clean revision document ready for your next study session.</p><Link to="/build" className="inline-link">Open the builder <ArrowRight /></Link></div><FeatureVisual type="sheet" /></article></div></section>

        <section className="pricing-section" id="pricing"><div className="section-heading centered"><span className="section-label">PRICING</span><h2>Start simple.<br /><em>Grow from there.</em></h2><p>Everything you need to build a better revision habit, without adding another complicated tool to your life.</p></div><div className="pricing-card"><div className="pricing-tier"><span className="pricing-label">ASKFORMULA</span><h3>Free to focus.</h3><p>Full access to the formula library and sheet builder for your core exam prep.</p><Link to="/build" className="fresh-button">Get started free <ArrowRight /></Link></div><div className="pricing-features"><div><Check /> Full formula library</div><div><Check /> JEE, NEET & NCERT coverage</div><div><Check /> Custom revision sheets</div><div><Check /> Browser-based PDF export</div><div><Check /> Progress & quick quiz tools</div><div><Check /> No credit card required</div></div></div></section>

        <section className="faq-section" id="faq"><div className="faq-intro"><span className="section-label">FAQ</span><h2>Questions,<br /><em>answered.</em></h2><p>Can’t find what you’re looking for? <a href="mailto:hello@askformula.app">Reach out <ArrowRight /></a></p></div><div className="faq-list">{faqs.map((question, index) => <div className={`faq-item ${faqOpen === index ? "open" : ""}`} key={question}><button onClick={() => setFaqOpen(faqOpen === index ? null : index)}><span>{question}</span><ChevronDown /></button>{faqOpen === index && <p>{index === 0 ? "AskFormula is a focused formula library and revision-sheet builder for students preparing for JEE, NEET, and NCERT exams." : index === 1 ? "We currently cover Class 11 and 12 Physics, Chemistry, Mathematics, and Biology, along with JEE and NEET-focused content." : index === 2 ? "Yes. Select your chapters, customize the sheet, and export a clean PDF directly from the browser." : "Yes. AskFormula is free to start and designed to give you the essential tools for focused revision."}</p>}</div>)}</div></section>

        <section className="final-cta"><div className="final-cta-inner"><span className="section-label">YOUR NEXT SESSION IS ONE CLICK AWAY</span><h2>Make revision<br /><em>feel lighter.</em></h2><Link to="/build" className="fresh-button hero-button">Start for free <ArrowRight /></Link></div></section>
      </main>

      <footer className="fresh-footer"><Brand /><div className="footer-nav"><a href="#about">About</a><a href="#features">Features</a><a href="#pricing">Pricing</a><a href="#faq">FAQ</a><Link to="/build">Builder</Link></div><span>Made for the curious · © 2026 AskFormula</span></footer><GlobalSearch />
    </div>
  );
}
