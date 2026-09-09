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
import { useScroll } from "framer-motion";

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



function WorkspacePreview({ active, progress }: { active: number; progress: number }) {
  return <div className="story-preview-stack">
    {[0, 1, 2].map((index) => {
      // Calculate dynamic positions based on progress (0 to 1) for the 3 steps
      const distance = progress * (storyItems.length - 1) - index;
      const proximity = Math.min(1, Math.abs(distance));
      const opacity = Math.max(0, 1 - Math.max(0, proximity - 0.08) * 1.45);
      const translateX = distance > 0 ? -distance * 11 : -distance * 15;
      const translateY = Math.abs(distance) * 12;
      const scale = 1 - Math.min(0.08, Math.abs(distance) * 0.08);

      const isActive = active === index;
      const isPast = index < active;

      return <div key={index} className={`story-preview story-preview-${index} ${isActive ? "is-active" : ""} ${isPast ? "is-past" : ""}`} style={{ opacity, transform: `perspective(1100px) translate3d(${translateX}%, ${translateY}px, ${-Math.abs(distance) * 90}px) scale(${scale})`, zIndex: isActive ? 3 : 2 - Math.round(Math.abs(distance)) }}>
        <div className="story-preview-chrome"><div className="window-dots"><span /><span /><span /></div><span>askformula / {index === 0 ? "library" : index === 1 ? "builder" : "my-sheet"}</span><Copy size={13} /></div>
        {index === 0 && <div className="library-preview"><div className="library-heading"><span>Formula library</span><small>312 results</small></div><div className="library-search">Search across Physics, Chemistry, Maths, and Biology <span>⌘ K</span></div><div className="library-list"><div><b>01</b><span>Equations of Motion</span><i>Physics</i></div><div><b>02</b><span>Work, Energy & Power</span><i>Physics</i></div><div><b>03</b><span>Quadratic Equations</span><i>Mathematics</i></div><div><b>04</b><span>Current Electricity</span><i>Physics</i></div></div></div>}
        {index === 1 && <div className="builder-preview"><div className="builder-title"><span>Build your reference sheet</span><small>STEP 02 OF 04</small></div><div className="builder-columns"><div className="builder-options"><span className="selected-option">JEE Main</span><span>CBSE / NCERT</span><span>NEET</span></div><div className="builder-formula"><small>SELECTED CHAPTER</small><strong>Kinematics</strong><div className="builder-progress"><span /></div><p>12 formulas will be added to your sheet.</p></div></div></div>}
        {index === 2 && <div className="sheet-preview"><div className="sheet-meta">JEE MAIN · CLASS 11 <span>EXPORT PDF</span></div><div className="sheet-title">Kinematics</div><div className="sheet-equation">v² = u² + 2as</div><div className="sheet-rule" /><div className="sheet-vars"><span><b>v</b> final velocity</span><span><b>u</b> initial velocity</span><span><b>a</b> acceleration</span><span><b>s</b> displacement</span></div><div className="sheet-check"><Check size={13} /> 12 formulas organized</div></div>}
      </div>;
    })}
  </div>;
}

function ScrollStory() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      setProgress(latest);
      const newActive = Math.min(
        storyItems.length - 1,
        Math.max(0, Math.round(latest * (storyItems.length - 1)))
      );
      setActive(newActive);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return <section ref={containerRef} className="scroll-story" style={{ height: "300vh", position: "relative" }}>
    <div className="story-sticky" style={{ position: "sticky", top: 0, height: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
      <div className="story-content" style={{ display: "grid", gridTemplateColumns: ".8fr 1.2fr", gap: "7vw", maxWidth: "1160px", width: "100%", margin: "0 auto", padding: "40px" }}>
        <div className="story-copy" style={{ position: "relative", zIndex: 3, height: "100%" }}>
          <p className="section-label" style={{ marginBottom: "20px" }}>ONE SPACE / THREE MOMENTS</p>
          <div style={{ position: "relative", height: "300px" }}>
            {storyItems.map((item, index) => {
              const isActive = active === index;
              return (
                <div
                  className={`story-copy-item story-copy-${item.accent} ${isActive ? "is-active" : ""}`}
                  key={item.label}
                  style={{
                    position: "absolute",
                    top: 0, left: 0, width: "100%",
                    opacity: isActive ? 1 : 0,
                    transform: `translateY(${isActive ? 0 : 24}px)`,
                    transition: "opacity 500ms ease, transform 700ms cubic-bezier(.23,1,.32,1)",
                    pointerEvents: isActive ? "auto" : "none"
                  }}
                >
                  <span style={{ color: "rgba(242,240,233,.42)", fontSize: "10px", letterSpacing: ".16em", fontFamily: "ui-monospace,monospace" }}>{item.label}</span>
                  <h2 style={{ margin: "18px 0", color: "var(--paper)", fontSize: "clamp(38px,4vw,62px)", fontWeight: 420, letterSpacing: "-.07em", lineHeight: .98 }}>
                    {item.title.split("\n").map((line) => <span key={line}>{line}<br /></span>)}
                  </h2>
                  <p style={{ maxWidth: "300px", color: "rgba(242,240,233,.52)", fontSize: "13px", lineHeight: 1.7 }}>{item.body}</p>

                  <div className="story-progress" style={{ width: "150px", height: "2px", marginTop: "34px", overflow: "hidden", background: "rgba(242,240,233,.12)" }}>
                    <span style={{ display: "block", width: "100%", height: "100%", transformOrigin: "left", background: "var(--blue)", transition: "transform 700ms cubic-bezier(.23,1,.32,1)", transform: `scaleX(${isActive ? 1 : 0})` }} />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="story-counter" style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "54px", color: "rgba(242,240,233,.45)", fontSize: "10px", fontFamily: "ui-monospace,monospace" }}>
            <span>0{active + 1}</span>
            <i style={{ display: "block", width: "48px", height: "1px", background: "rgba(242,240,233,.2)" }} />
            <span>0{storyItems.length}</span>
          </div>
        </div>
        <div className="story-visual" style={{ position: "relative", height: "500px", perspective: "1000px" }}>
          <WorkspacePreview active={active} progress={progress} />
          <div className="story-visual-glow" style={{ position: "absolute", inset: "16% 5%", zIndex: -1, borderRadius: "50%", background: "#61758a", filter: "blur(70px)", opacity: .14 }} />
        </div>
      </div>
    </div>
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
    <ScrollStory />
    <section id="how-it-works" className="workflow-section page-section"><div className="section-intro"><p className="section-label">THE SIMPLE PART</p><h2>From blank page to<br /><em>ready-to-revise.</em></h2><p>Four deliberate steps. One sheet that makes sense when you need it.</p></div><div className="workflow-grid">{workflow.map(({ number, title, body, icon: Icon }, index) => <div className={`workflow-step ${index === 3 ? "workflow-step-last" : ""}`} key={number}><div className="step-top"><span>{number}</span><Icon size={18} /></div><div><h3>{title}</h3><p>{body}</p></div>{index < workflow.length - 1 && <div className="step-connector" aria-hidden="true" />}</div>)}</div></section>
  </main>;
}
