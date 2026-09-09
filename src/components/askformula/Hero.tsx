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

function WorkspacePreview({ active, progress }: { active: number; progress: number }) {
  return <div className="story-preview-stack">
    {[0, 1, 2].map((index) => {
      const distance = progress * (storyItems.length - 1) - index;
      const proximity = Math.min(1, Math.abs(distance));
      const opacity = Math.max(0, 1 - Math.max(0, proximity - 0.08) * 1.45);
      const translateX = distance > 0 ? -distance * 11 : -distance * 15;
      const translateY = Math.abs(distance) * 12;
      const scale = 1 - Math.min(0.08, Math.abs(distance) * 0.08);
      return <div key={index} className={`story-preview story-preview-${index} ${active === index ? "is-active" : ""} ${index < active ? "is-past" : ""}`} style={{ opacity, transform: `perspective(1100px) translate3d(${translateX}%, ${translateY}px, ${-Math.abs(distance) * 90}px) scale(${scale})`, zIndex: active === index ? 3 : 2 - Math.round(Math.abs(distance)) }}>
        <div className="story-preview-chrome"><div className="window-dots"><span /><span /><span /></div><span>askformula / {index === 0 ? "library" : index === 1 ? "builder" : "my-sheet"}</span><Copy size={13} /></div>
        {index === 0 && <div className="library-preview"><div className="library-heading"><span>Formula library</span><small>312 results</small></div><div className="library-search">Search across Physics, Chemistry, Maths, and Biology <span>⌘ K</span></div><div className="library-list"><div><b>01</b><span>Equations of Motion</span><i>Physics</i></div><div><b>02</b><span>Work, Energy & Power</span><i>Physics</i></div><div><b>03</b><span>Quadratic Equations</span><i>Mathematics</i></div><div><b>04</b><span>Current Electricity</span><i>Physics</i></div></div></div>}
        {index === 1 && <div className="builder-preview"><div className="builder-title"><span>Build your reference sheet</span><small>STEP 02 OF 04</small></div><div className="builder-columns"><div className="builder-options"><span className="selected-option">JEE Main</span><span>CBSE / NCERT</span><span>NEET</span></div><div className="builder-formula"><small>SELECTED CHAPTER</small><strong>Kinematics</strong><div className="builder-progress"><span /></div><p>12 formulas will be added to your sheet.</p></div></div></div>}
        {index === 2 && <div className="sheet-preview"><div className="sheet-meta">JEE MAIN · CLASS 11 <span>EXPORT PDF</span></div><div className="sheet-title">Kinematics</div><div className="sheet-equation">v² = u² + 2as</div><div className="sheet-rule" /><div className="sheet-vars"><span><b>v</b> final velocity</span><span><b>u</b> initial velocity</span><span><b>a</b> acceleration</span><span><b>s</b> displacement</span></div><div className="sheet-check"><Check size={13} /> 12 formulas organized</div></div>}
      </div>;
    })}
  </div>;
}
function ScrollStory() {
  const storyRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const activeRef = useRef(0);

  useEffect(() => {
    let raf = 0;
    let lastTime = 0;
    let targetCamera = 0;
    let camera = 0;
    const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
    const readScroll = () => {
      if (!storyRef.current) return;
      const rect = storyRef.current.getBoundingClientRect();
      const localScroll = Math.max(0, -rect.top);
      const cameraLength = Math.max(1, window.innerHeight * 1.15);
      targetCamera = clamp(localScroll / cameraLength, 0, storyItems.length - 1);
      if (!raf) raf = requestAnimationFrame(smoothCamera);
    };
    const smoothCamera = (time: number) => {
      const elapsed = lastTime ? Math.min(100, time - lastTime) : 16.67;
      lastTime = time;
      const delta = targetCamera - camera;
      const ease = 1 - Math.pow(0.845, elapsed / 16.67);
      camera = Math.abs(delta) < 0.00045 ? targetCamera : camera + delta * ease;
      const normalized = camera / Math.max(1, storyItems.length - 1);
      setProgress(normalized);
      const next = Math.min(storyItems.length - 1, Math.round(camera));
      if (next !== activeRef.current) { activeRef.current = next; setActive(next); }
      raf = Math.abs(targetCamera - camera) >= 0.00045 ? requestAnimationFrame(smoothCamera) : 0;
    };
    readScroll();
    window.addEventListener("scroll", readScroll, { passive: true });
    window.addEventListener("resize", readScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", readScroll);
      window.removeEventListener("resize", readScroll);
    };
  }, []);

  return <section ref={storyRef} className="scroll-story">
    <div className="story-sticky">
      <div className="story-copy">
        <p className="section-label">ONE SPACE / THREE MOMENTS</p>
        {storyItems.map((item, index) => <div className={`story-copy-item story-copy-${item.accent} ${active === index ? "is-active" : ""}`} key={item.label}><span>{item.label}</span><h2>{item.title.split("\n").map((line) => <span key={line}>{line}<br /></span>)}</h2><p>{item.body}</p><div className="story-progress"><span style={{ transform: `scaleX(${active === index ? 1 : 0})` }} /></div></div>)}
        <div className="story-counter"><span>0{active + 1}</span><i /> <span>0{storyItems.length}</span></div>
      </div>
      <div className="story-visual"><WorkspacePreview active={active} progress={progress} /><div className="story-visual-glow" /></div>
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
