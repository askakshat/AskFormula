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
import { useEffect, useRef, useState } from "react";

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

const storyItems = [
  { label: "01 / COLLECT", title: "Everything you need,\nin one calm place.", body: "Browse a structured library of formulas without losing the thread of what you were studying.", accent: "blue" },
  { label: "02 / SHAPE", title: "Keep only what\nyou need next.", body: "Choose chapters, pin the essentials, and turn a syllabus into a sheet that feels like yours.", accent: "green" },
  { label: "03 / REVISE", title: "Open it when\nit matters.", body: "A clean reference sheet for the last ten minutes, the long train ride, or the night before the exam.", accent: "violet" },
];




function StoryBoxes() {
  return <section className="story-boxes" style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: "1000px", margin: "80px auto", padding: "0 24px" }}>
    <div style={{ textAlign: "center", marginBottom: "40px" }}>
      <p className="section-label">ONE SPACE / THREE MOMENTS</p>
    </div>

    {storyItems.map((item, index) => {
      const isReverse = index % 2 !== 0;
      return (
        <div
          key={item.label}
          className={`story-box story-box-${item.accent}`}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "40px",
            alignItems: "center",
            padding: "40px",
            background: "rgba(12, 16, 21, 0.4)",
            border: "1px solid rgba(242, 240, 233, 0.12)",
            borderRadius: "24px",
            direction: isReverse ? "rtl" : "ltr"
          }}
        >
          <div style={{ direction: "ltr" }}>
            <span style={{ color: "rgba(242,240,233,.42)", fontSize: "10px", letterSpacing: ".16em", fontFamily: "ui-monospace,monospace" }}>{item.label}</span>
            <h2 style={{ margin: "18px 0", color: "var(--paper)", fontSize: "clamp(32px,3vw,48px)", fontWeight: 420, letterSpacing: "-.06em", lineHeight: 1.1 }}>
              {item.title.split("\n").map((line) => <span key={line}>{line}<br /></span>)}
            </h2>
            <p style={{ color: "rgba(242,240,233,.52)", fontSize: "14px", lineHeight: 1.6, maxWidth: "340px" }}>{item.body}</p>
          </div>
          <div style={{ direction: "ltr", position: "relative", height: "360px", background: "linear-gradient(145deg, #27333a, #11171c 72%)", borderRadius: "16px", overflow: "hidden", border: "1px solid rgba(242, 240, 233, 0.16)", boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}>
            <div className="story-preview-chrome"><div className="window-dots"><span /><span /><span /></div><span>askformula / {index === 0 ? "library" : index === 1 ? "builder" : "my-sheet"}</span><Copy size={13} /></div>

            {index === 0 && <div className="library-preview"><div className="library-heading"><span>Formula library</span><small>312 results</small></div><div className="library-search">Search across Physics, Chemistry, Maths, and Biology <span>⌘ K</span></div><div className="library-list"><div><b>01</b><span>Equations of Motion</span><i>Physics</i></div><div><b>02</b><span>Work, Energy & Power</span><i>Physics</i></div><div><b>03</b><span>Quadratic Equations</span><i>Mathematics</i></div><div><b>04</b><span>Current Electricity</span><i>Physics</i></div></div></div>}

            {index === 1 && <div className="builder-preview"><div className="builder-title"><span>Build your reference sheet</span><small>STEP 02 OF 04</small></div><div className="builder-columns"><div className="builder-options"><span className="selected-option">JEE Main</span><span>CBSE / NCERT</span><span>NEET</span></div><div className="builder-formula"><small>SELECTED CHAPTER</small><strong>Kinematics</strong><div className="builder-progress"><span /></div><p>12 formulas will be added to your sheet.</p></div></div></div>}

            {index === 2 && <div className="sheet-preview" style={{ margin: "20px auto 0", transform: "scale(0.85)", transformOrigin: "top center" }}><div className="sheet-meta">JEE MAIN · CLASS 11 <span>EXPORT PDF</span></div><div className="sheet-title">Kinematics</div><div className="sheet-equation">v² = u² + 2as</div><div className="sheet-rule" /><div className="sheet-vars"><span><b>v</b> final velocity</span><span><b>u</b> initial velocity</span><span><b>a</b> acceleration</span><span><b>s</b> displacement</span></div><div className="sheet-check"><Check size={13} /> 12 formulas organized</div></div>}
          </div>
        </div>
      );
    })}
  </section>;
}

export default function Hero() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    setTilt({ x: ((event.clientX - rect.left) / rect.width - 0.5) * 4, y: ((event.clientY - rect.top) / rect.height - 0.5) * -4 });
  }

  return <main className="flex-grow pt-20">
    <section className="hero-shell hero-reference-shell">
      <div className="hero-grid" aria-hidden="true" /><div className="hero-orb hero-orb-one" aria-hidden="true" /><div className="hero-orb hero-orb-two" aria-hidden="true" />
      <div className="hero-copy hero-centered-copy"><div className="eyebrow-pill"><Sparkles size={14} /> Your personal formula workspace</div><h1>Your formulas<br /><em>deserve their own home.</em></h1><p className="hero-description">AskFormula gives students a calm, focused space to collect, shape, and revisit the formulas that matter for JEE, NEET, and NCERT.</p><div className="hero-actions hero-centered-actions"><Link to="/build" className="button button-primary">Get started free <ArrowUpRight size={17} /></Link><Link to="/quiz" className="button button-quiet"><Play size={15} fill="currentColor" /> See how it works</Link></div></div>
      <div className="hero-product-wrap hero-shell-wrap"><div className="hero-product-shadow" aria-hidden="true" /><div className="formula-product app-shell-product" onPointerMove={handlePointerMove} onPointerLeave={() => setTilt({ x: 0, y: 0 })} style={{ transform: `perspective(1400px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)` }}><aside className="app-shell-sidebar"><div className="app-sidebar-search"><span>Search formulas...</span><span>⌕</span></div><p className="app-sidebar-label">YOUR WORKSPACE</p>{navItems.map(([label, Icon], index) => <div className={`app-nav-item ${index === 0 ? "active" : ""}`} key={label as string}><Icon size={13} /><span>{label as string}</span>{index === 1 && <b>42</b>}</div>)}<div className="app-sidebar-bottom"><span className="sidebar-status" /> Live Sync Engine Active</div></aside><div className="app-shell-main"><div className="product-window-bar"><div className="window-dots"><span /><span /><span /></div><span className="product-path">askformula / physics / kinematics</span><Copy size={15} /></div><div className="product-body"><div className="product-side-label">JEE MAIN · CLASS 11 <span>MECHANICS / 18 CHAPTERS</span></div><div className="formula-heading"><span>Kinematics</span><small>LAST EDITED JUST NOW</small></div><div className="equation-card"><span className="equation-label">01 / EQUATIONS OF MOTION</span><div className="equation">v² = u² + 2as</div><div className="equation-rule" /><div className="variable-grid"><div><b>v</b><span>final velocity</span></div><div><b>u</b><span>initial velocity</span></div><div><b>a</b><span>acceleration</span></div><div><b>s</b><span>displacement</span></div></div></div><div className="product-footer-row"><span><Check size={13} /> 12 formulas organized</span><span>PDF READY <ChevronRight size={14} /></span></div></div></div></div><div className="floating-chip chip-top">physics / kinematics.tex</div><div className="floating-chip chip-bottom"><span className="chip-spark" /> Focus mode on</div><div className="hero-wave" aria-hidden="true" /></div>
    </section>
    <StoryBoxes />
    <section id="how-it-works" className="workflow-section page-section"><div className="section-intro"><p className="section-label">THE SIMPLE PART</p><h2>From blank page to<br /><em>ready-to-revise.</em></h2><p>Four deliberate steps. One sheet that makes sense when you need it.</p></div><div className="workflow-grid">{workflow.map(({ number, title, body, icon: Icon }, index) => <div className={`workflow-step ${index === 3 ? "workflow-step-last" : ""}`} key={number}><div className="step-top"><span>{number}</span><Icon size={18} /></div><div><h3>{title}</h3><p>{body}</p></div>{index < workflow.length - 1 && <div className="step-connector" aria-hidden="true" />}</div>)}</div></section>
  </main>;
}
