import {
  ArrowUpRight,
  Atom,
  BarChart3,
  BookOpen,
  Check,
  ChevronRight,
  Copy,
  FileText,
  Layers3,
  Play,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router";
import { useState } from "react";

const workflow = [
  { number: "01", title: "Select board", body: "CBSE, ICSE, state boards", icon: BookOpen },
  { number: "02", title: "Choose class", body: "Class 11 or Class 12", icon: Layers3 },
  { number: "03", title: "Pick subjects", body: "Physics, Chem, Maths, Bio", icon: Atom },
  { number: "04", title: "Export PDF", body: "A clean sheet, ready to revise", icon: FileText },
];

const navItems = [
  ["Overview", BarChart3],
  ["Formulas", FileText],
  ["Discussions", Layers3],
  ["Practice sets", Atom],
  ["Courses", BookOpen],
];

export default function Hero() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 4;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * -4;
    setTilt({ x, y });
  }

  return (
    <main className="flex-grow pt-20">
      <section className="hero-shell hero-reference-shell">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-orb hero-orb-one" aria-hidden="true" />
        <div className="hero-orb hero-orb-two" aria-hidden="true" />
        <div className="hero-copy hero-centered-copy">
          <div className="eyebrow-pill"><Sparkles size={14} /> Your personal formula workspace</div>
          <h1>Your formulas<br /><em>deserve their own home.</em></h1>
          <p className="hero-description">AskFormula gives students a calm, focused space to collect, shape, and revisit the formulas that matter for JEE, NEET, and NCERT.</p>
          <div className="hero-actions hero-centered-actions">
            <Link to="/build" className="button button-primary">Get started free <ArrowUpRight size={17} /></Link>
            <Link to="/quiz" className="button button-quiet"><Play size={15} fill="currentColor" /> See how it works</Link>
          </div>
        </div>

        <div className="hero-product-wrap hero-shell-wrap">
          <div className="hero-product-shadow" aria-hidden="true" />
          <div
            className="formula-product app-shell-product"
            onPointerMove={handlePointerMove}
            onPointerLeave={() => setTilt({ x: 0, y: 0 })}
            style={{ transform: `perspective(1400px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)` }}
          >
            <aside className="app-shell-sidebar">
              <div className="app-sidebar-search"><span>Search formulas...</span><span>⌕</span></div>
              <p className="app-sidebar-label">YOUR WORKSPACE</p>
              {navItems.map(([label, Icon], index) => <div className={`app-nav-item ${index === 0 ? "active" : ""}`} key={label as string}><Icon size={13} /><span>{label as string}</span>{index === 1 && <b>42</b>}</div>)}
              <div className="app-sidebar-bottom"><span className="sidebar-status" /> Live Sync Engine Active</div>
            </aside>
            <div className="app-shell-main">
              <div className="product-window-bar"><div className="window-dots"><span /><span /><span /></div><span className="product-path">askformula / physics / kinematics</span><Copy size={15} /></div>
              <div className="product-body">
                <div className="product-side-label">JEE MAIN · CLASS 11 <span>MECHANICS / 18 CHAPTERS</span></div>
                <div className="formula-heading"><span>Kinematics</span><small>LAST EDITED JUST NOW</small></div>
                <div className="equation-card"><span className="equation-label">01 / EQUATIONS OF MOTION</span><div className="equation">v² = u² + 2as</div><div className="equation-rule" /><div className="variable-grid"><div><b>v</b><span>final velocity</span></div><div><b>u</b><span>initial velocity</span></div><div><b>a</b><span>acceleration</span></div><div><b>s</b><span>displacement</span></div></div></div>
                <div className="product-footer-row"><span><Check size={13} /> 12 formulas organized</span><span>PDF READY <ChevronRight size={14} /></span></div>
              </div>
            </div>
          </div>
          <div className="floating-chip chip-top">physics / kinematics.tex</div>
          <div className="floating-chip chip-bottom"><span className="chip-spark" /> Focus mode on</div>
          <div className="hero-wave" aria-hidden="true" />
        </div>
      </section>

      <section id="how-it-works" className="workflow-section page-section">
        <div className="section-intro"><p className="section-label">THE SIMPLE PART</p><h2>From blank page to<br /><em>ready-to-revise.</em></h2><p>Four deliberate steps. One sheet that makes sense when you need it.</p></div>
        <div className="workflow-grid">{workflow.map(({ number, title, body, icon: Icon }, index) => <div className={`workflow-step ${index === 3 ? "workflow-step-last" : ""}`} key={number}><div className="step-top"><span>{number}</span><Icon size={18} /></div><div><h3>{title}</h3><p>{body}</p></div>{index < workflow.length - 1 && <div className="step-connector" aria-hidden="true" />}</div>)}</div>
      </section>
    </main>
  );
}
