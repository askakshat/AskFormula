import { ArrowRight, Check, Search } from "lucide-react";
import { FormEvent, useState } from "react";

export default function Hero() {
  const [query, setQuery] = useState("");
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    window.dispatchEvent(new Event("open-global-search"));
  };

  return (
    <main className="reference-main">
      <section className="reference-hero">
        <div className="reference-grid-bg" aria-hidden="true" />
        <div className="reference-hero-content">
          <p className="reference-kicker"><span /> NCERT STEM ENGINE <b>V4.0</b></p>
          <h1>Stop searching.<br /><em>Start solving.</em></h1>
          <p className="reference-hero-body">The cleanest way to find, learn, and revise every formula across your CBSE, JEE, and NEET syllabus.</p>
          <form className="reference-search" onSubmit={handleSubmit}>
            <Search size={16} />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search a formula — e.g. quadratic, Ohm's law" aria-label="Search formulas" />
            <button type="submit">Find formula <ArrowRight size={15} /></button>
          </form>
          <div className="reference-proof"><span><Check size={12} /> Free to use</span><span><Check size={12} /> No sign-up</span><span><Check size={12} /> Built for speed</span></div>
        </div>
        <div className="reference-hero-footer"><span>ONE SEARCH. EVERY FORMULA.</span><span>SCROLL TO EXPLORE ↓</span></div>
      </section>
    </main>
  );
}
