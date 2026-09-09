import {
  ArrowUpRight,
  Atom,
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

export default function Hero() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 5;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * -5;
    setTilt({ x, y });
  }

  return (
    <main className="flex-grow pt-20">
      <section className="hero-shell">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-orb hero-orb-one" aria-hidden="true" />
        <div className="hero-orb hero-orb-two" aria-hidden="true" />
        <div className="hero-copy">
          <div className="eyebrow-pill"><Sparkles size={14} /> v4.0 Quiz Engine is live</div>
          <p className="hero-kicker">A calmer way to revise</p>
          <h1>Your syllabus,<br /><em>made useful.</em></h1>
          <p className="hero-description">
            Build focused formula sheets for JEE, NEET and NCERT. Keep the signal, lose the noise, and walk into revision with a system that feels like yours.
          </p>
          <div className="hero-actions">
            <Link to="/build" className="button button-primary">Build your sheet <ArrowUpRight size={17} /></Link>
            <Link to="/quiz" className="button button-quiet"><Play size={15} fill="currentColor" /> Practice quiz</Link>
          </div>
          <div className="hero-proof"><span className="proof-dot" /> No sign-up required to start <span className="proof-separator" /> Export to PDF in seconds</div>
        </div>

        <div className="hero-product-wrap">
          <div className="hero-product-shadow" aria-hidden="true" />
          <div
            className="formula-product"
            onPointerMove={handlePointerMove}
            onPointerLeave={() => setTilt({ x: 0, y: 0 })}
            style={{ transform: `perspective(1200px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)` }}
          >
            <div className="product-window-bar">
              <div className="window-dots"><span /><span /><span /></div>
              <span className="product-path">askformula / physics / kinematics</span>
              <Copy size={15} />
            </div>
            <div className="product-body">
              <div className="product-side-label">CHAPTER 01 <span>MECHANICS</span></div>
              <div className="formula-heading"><span>Kinematics</span><small>JEE · CLASS 11</small></div>
              <div className="equation-card">
                <span className="equation-label">01 / EQUATIONS OF MOTION</span>
                <div className="equation">v² = u² + 2as</div>
                <div className="equation-rule" />
                <div className="variable-grid">
                  <div><b>v</b><span>final velocity</span></div>
                  <div><b>u</b><span>initial velocity</span></div>
                  <div><b>a</b><span>acceleration</span></div>
                  <div><b>s</b><span>displacement</span></div>
                </div>
              </div>
              <div className="product-footer-row"><span><Check size={13} /> 12 formulas organized</span><span>PDF READY <ChevronRight size={14} /></span></div>
            </div>
          </div>
          <div className="floating-chip chip-top">physics / kinematics.tex</div>
          <div className="floating-chip chip-bottom"><span className="chip-spark" /> Focus mode on</div>
        </div>
      </section>

      <section id="how-it-works" className="workflow-section page-section">
        <div className="section-intro"><p className="section-label">THE SIMPLE PART</p><h2>From blank page to<br /><em>ready-to-revise.</em></h2><p>Four deliberate steps. One sheet that makes sense when you need it.</p></div>
        <div className="workflow-grid">
          {workflow.map(({ number, title, body, icon: Icon }, index) => (
            <div className={`workflow-step ${index === 3 ? "workflow-step-last" : ""}`} key={number}>
              <div className="step-top"><span>{number}</span><Icon size={18} /></div>
              <div><h3>{title}</h3><p>{body}</p></div>
              {index < workflow.length - 1 && <div className="step-connector" aria-hidden="true" />}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
