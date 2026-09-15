import re

with open('src/pages/QuizDashboard.tsx', 'r') as f:
    content = f.read()

# I need to add 'exam' state.
state_str = """
  const [exam, setExam] = useState<"school" | "jee" | "neet" | null>(null);
  const [selectedClass, setSelectedClass] = useState<"11" | "12" | null>(null);
"""
content = re.sub(
    r'const \[selectedClass, setSelectedClass\] = useState<"11" \| "12" \| null>\(null\);',
    state_str.strip(),
    content
)

# And add exam selection in the UI right before Syllabus Level.
# Actually, I can combine Syllabus Level and Exam, or put Exam as Step 1, Class as Step 2.
# Let's see the structure.
# <div className="mt-8 space-y-10">
#   {/* Step 1: Syllabus Level */}

exam_ui = """
            {/* Step 1: Curriculum */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/10 text-xs font-medium text-white/80 border border-white/[0.15]">1</span>
                <h2 className="text-lg font-medium text-white/95">Curriculum</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { id: "school", label: "School & Boards", desc: "Core standard derivations" },
                  { id: "jee", label: "JEE (Main & Adv.)", desc: "Calculus-based & multi-concept" },
                  { id: "neet", label: "NEET UG", desc: "High-speed formula recall" }
                ].map((track) => (
                  <button
                    key={track.id}
                    onClick={() => { setExam(track.id as any); setSelectedClass(null); setSubject(null); setSelectedChapters([]); }}
                    className={`relative p-5 rounded-2xl border text-left transition-all duration-300 ${
                      exam === track.id
                        ? "bg-[rgba(162,212,248,0.06)] border-[#a2d4f8]/50 shadow-[0_0_25px_rgba(162,212,248,0.12)]"
                        : "bg-white/[0.02] border-white/[0.08] hover:bg-white/[0.04] hover:border-white/[0.15]"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className={`text-base font-semibold ${exam === track.id ? "text-[#a2d4f8]" : "text-white/80"}`}>{track.label}</span>
                      {exam === track.id && (
                        <svg className="w-5 h-5 text-[#a2d4f8]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      )}
                    </div>
                    <span className="text-xs text-[#9bb8cf]/70 font-sans">{track.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Syllabus Level */}
            <div className={`transition-opacity duration-300 ${!exam ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}>
              <div className="flex items-center gap-3 mb-5">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/10 text-xs font-medium text-white/80 border border-white/[0.15]">2</span>
"""

content = content.replace(
    """            {/* Step 1: Syllabus Level */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/10 text-xs font-medium text-white/80 border border-white/[0.15]">1</span>""",
    exam_ui.strip()
)

# Fix numbering
content = content.replace(
    """{/* Step 2: Subject */}
            <div className={`transition-opacity duration-300 ${!selectedClass ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}>
              <div className="flex items-center gap-3 mb-5">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/10 text-xs font-medium text-white/80 border border-white/[0.15]">2</span>""",
    """{/* Step 3: Subject */}
            <div className={`transition-opacity duration-300 ${!selectedClass ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}>
              <div className="flex items-center gap-3 mb-5">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/10 text-xs font-medium text-white/80 border border-white/[0.15]">3</span>"""
)

content = content.replace(
    """{/* Step 3: Target Chapters */}
            <div className={`transition-opacity duration-300 ${!subject ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}>
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/10 text-xs font-medium text-white/80 border border-white/[0.15]">3</span>""",
    """{/* Step 4: Target Chapters */}
            <div className={`transition-opacity duration-300 ${!subject ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}>
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/10 text-xs font-medium text-white/80 border border-white/[0.15]">4</span>"""
)

with open('src/pages/QuizDashboard.tsx', 'w') as f:
    f.write(content)
